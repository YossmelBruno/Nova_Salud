import { useMemo, useState } from "react";

const initialProducts = [
  { id: 1, name: "Amoxicilina 500mg", category: "Antibióticos", stock: 150, price: 9.25, supplier: "FarmaLab" },
  { id: 2, name: "Ibuprofeno 400mg", category: "Analgésicos", stock: 200, price: 4.5, supplier: "MediCorp" },
  { id: 3, name: "Omeprazol 20mg", category: "Gastrointestinal", stock: 80, price: 6.0, supplier: "HealthPharm" },
  { id: 4, name: "Paracetamol 1g", category: "Analgésicos", stock: 120, price: 3.0, supplier: "MediCorp" },
  { id: 5, name: "Metformina 850mg", category: "Antidiabéticos", stock: 90, price: 8.0, supplier: "FarmaLab" },
  { id: 6, name: "Losartán 50mg", category: "Antihipertensivos", stock: 60, price: 5.5, supplier: "HealthPharm" },
  { id: 7, name: "Atorvastatina 20mg", category: "Hipolipemiantes", stock: 70, price: 12.0, supplier: "BioMed" },
  { id: 8, name: "Clonazepam 0.5mg", category: "Ansiolíticos", stock: 40, price: 3.5, supplier: "NeuroPharm" },
  { id: 9, name: "Levotiroxina 100mcg", category: "Hormonas", stock: 50, price: 7.0, supplier: "EndoLab" },
  { id: 10, name: "Insulina Humana", category: "Antidiabéticos", stock: 30, price: 25.0, supplier: "BioMed" },
];

const defaultForm = { name: "", category: "", stock: 0, price: 0, supplier: "" };
const categories = ["Antibióticos", "Analgésicos", "Gastrointestinal", "Antidiabéticos", "Antihipertensivos", "Hipolipemiantes", "Ansiolíticos", "Hormonas"];

const styles = {
  page: { display: "flex", flexDirection: "column", gap: 20, width: "100%", padding: "20px", boxSizing: "border-box", fontFamily: "sans-serif" },
  header: { display: "flex", flexDirection: "column", gap: 16 },
  headerTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 },
  title: { margin: 0, fontSize: 26, fontWeight: 800, color: "#0a2e20" },
  subtitle: { margin: 0, color: "#6a8a78" },
  stats: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 },
  statCard: { background: "#fff", borderRadius: 18, padding: 20, border: "1px solid #e5ede9", boxShadow: "0 8px 24px rgba(6,78,59,0.06)" },
  statLabel: { fontSize: 12, fontWeight: 700, color: "#6a8a78", marginBottom: 10, textTransform: "uppercase" },
  statValue: { fontSize: 24, fontWeight: 800, color: "#0a2e20" },
  graphCard: { background: "#fff", borderRadius: 18, padding: 20, border: "1px solid #e5ede9" },
  barChart: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, height: 160 },
  // CORRECCIÓN AQUÍ: Se usaron backticks para el template literal del height
  barFill: (pct) => ({ 
    width: "100%", 
    height: `${pct}%`,
    borderRadius: 16, 
    background: "linear-gradient(180deg, #22c55e 0%, #0f766e 100%)", 
    transition: "height 0.3s ease" 
  }),
  panel: { background: "#fff", borderRadius: 18, border: "1px solid #e5ede9", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#5f7867", textTransform: "uppercase", background: "#f8faf9" },
  td: { padding: "16px 20px", fontSize: 13, borderBottom: "1px solid #f0f4f2" },
  stockBadge: (stock) => ({ padding: "6px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: stock < 50 ? "#fee2e2" : "#d1fae5", color: stock < 50 ? "#991b1b" : "#065f46" }),
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(10, 46, 32, 0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modalContent: { background: "#fff", borderRadius: 20, maxWidth: 500, width: "95%", maxHeight: "90vh", overflow: "auto" },
  form: { padding: 24, display: "flex", flexDirection: "column", gap: 20 },
  input: { height: 48, borderRadius: 12, border: "2px solid #d8e3dc", padding: "0 16px", outline: "none" },
  addButton: { border: "none", borderRadius: 12, padding: "12px 20px", background: "linear-gradient(135deg, #16a34a 0%, #0f766e 100%)", color: "#fff", fontWeight: 700, cursor: "pointer" }
};

export default function Inventario() {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const stats = useMemo(() => {
    const totalValue = products.reduce((acc, p) => acc + (p.stock * p.price), 0);
    const lowStock = products.filter(p => p.stock < 50).length;
    const categoryData = categories.map(cat => ({
      label: cat.slice(0, 5),
      value: products.filter(p => p.category === cat).reduce((acc, p) => acc + p.stock, 0)
    }));
    const maxStock = Math.max(...categoryData.map(d => d.value), 1);
    return { totalValue, lowStock, categoryData, maxStock };
  }, [products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...form, id: editingId } : p));
    } else {
      setProducts([{ ...form, id: Date.now() }, ...products]);
    }
    setShowForm(false);
    setForm(defaultForm);
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
    setShowForm(true);
  };

  const formatCurrency = (val) => new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(val);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <div>
            <h1 style={styles.title}>Panel de Inventario</h1>
            <p style={styles.subtitle}>Control de existencias y proveedores farmacéuticos</p>
          </div>
          <button style={styles.addButton} onClick={() => setShowForm(true)}>+ Nuevo Producto</button>
        </div>
        
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Total Productos</div>
            <div style={styles.statValue}>{products.length}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Stock Crítico</div>
            <div style={styles.statValue}>{stats.lowStock}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Valor Total</div>
            <div style={styles.statValue}>{formatCurrency(stats.totalValue)}</div>
          </div>
        </div>
      </header>

      <section style={styles.graphCard}>
        <h3 style={{ marginBottom: 15 }}>Distribución de Stock</h3>
        <div style={styles.barChart}>
          {stats.categoryData.map((cat, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", alignItems: "center", gap: 8 }}>
              <div style={{ width: "100%", height: "100%", background: "#f0f4f2", borderRadius: 8, display: "flex", alignItems: "flex-end" }}>
                <div style={styles.barFill((cat.value / stats.maxStock) * 100)} />
              </div>
              <span style={{ fontSize: 10, color: "#6a8a78" }}>{cat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div style={styles.panel}>
        <table style={styles.table}>
          <thead>
            <tr>
              {["Producto", "Categoría", "Stock", "Precio", "Proveedor", "Acciones"].map(h => <th key={h} style={styles.th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td style={styles.td}><strong>{p.name}</strong></td>
                <td style={styles.td}>{p.category}</td>
                <td style={styles.td}><span style={styles.stockBadge(p.stock)}>{p.stock} uds</span></td>
                <td style={styles.td}>{formatCurrency(p.price)}</td>
                <td style={styles.td}>{p.supplier}</td>
                <td style={styles.td}>
                  <button onClick={() => handleEdit(p)} style={{ border: "none", background: "none", color: "#0f766e", cursor: "pointer", fontWeight: 600 }}>Editar</button>
                  <button onClick={() => setProducts(products.filter(x => x.id !== p.id))} style={{ border: "none", background: "none", color: "#b91c1c", cursor: "pointer", marginLeft: 10 }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div style={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <form style={styles.form} onSubmit={handleSubmit}>
              <h3>{editingId ? "Actualizar Producto" : "Registrar Nuevo Producto"}</h3>
              <input style={styles.input} placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              <select style={styles.input} value={form.category} onChange={e => setForm({...form, category: e.target.value})} required>
                <option value="">Seleccionar Categoría</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <input style={styles.input} type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: Number(e.target.value)})} />
                <input style={styles.input} type="number" step="0.01" placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} />
              </div>
              <input style={styles.input} placeholder="Proveedor" value={form.supplier} onChange={e => setForm({...form, supplier: e.target.value})} />
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button type="submit" style={styles.addButton}>Confirmar</button>
                <button type="button" onClick={() => setShowForm(false)} style={{ ...styles.addButton, background: "#e5ede9", color: "#6a8a78" }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}