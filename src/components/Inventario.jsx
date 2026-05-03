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

const defaultForm = {
  name: "",
  category: "",
  stock: 0,
  price: 0,
  supplier: "",
};

const categories = ["Antibióticos", "Analgésicos", "Gastrointestinal", "Antidiabéticos", "Antihipertensivos", "Hipolipemiantes", "Ansiolíticos", "Hormonas"];

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
    minHeight: 680,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: 12,
  },
  titleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  title: {
    margin: 0,
    fontSize: 26,
    fontWeight: 800,
    color: "#0a2e20",
  },
  subtitle: {
    margin: 0,
    color: "#6a8a78",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(160px, 1fr))",
    gap: 14,
  },
  statCard: {
    background: "#fff",
    borderRadius: 18,
    padding: 20,
    border: "1px solid #e5ede9",
    boxShadow: "0 8px 24px rgba(6,78,59,0.06)",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: "#6a8a78",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
  statValue: {
    fontSize: 24,
    fontWeight: 800,
    color: "#0a2e20",
  },
  graphCard: {
    background: "#fff",
    borderRadius: 18,
    padding: 20,
    border: "1px solid #e5ede9",
    boxShadow: "0 8px 24px rgba(6,78,59,0.06)",
  },
  graphHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  graphTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    color: "#0a2e20",
  },
  graphLegend: {
    display: "flex",
    gap: 10,
    fontSize: 12,
    color: "#6a8a78",
  },
  barChart: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
    height: 160,
    marginTop: 8,
  },
  bar: (pct) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  }),
  barTrack: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    background: "#f0f4f2",
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: 2,
  },
  barFill: (pct) => ({
    width: "100%",
    height: `${pct}%`,
    borderRadius: 16,
    background: "linear-gradient(180deg, #22c55e 0%, #0f766e 100%)",
    transition: "height 0.3s ease",
  }),
  barLabel: {
    fontSize: 12,
    color: "#6a8a78",
    marginTop: 4,
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 20,
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(10, 46, 32, 0.6)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease-out",
  },
  modalContent: {
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 25px 50px rgba(6,78,59,0.25)",
    maxWidth: 500,
    width: "90%",
    maxHeight: "90vh",
    overflow: "auto",
    animation: "slideIn 0.3s ease-out",
  },
  panel: {
    background: "#fff",
    borderRadius: 18,
    border: "1px solid #e5ede9",
    boxShadow: "0 8px 24px rgba(6,78,59,0.06)",
    overflow: "hidden",
  },
  panelHeader: {
    padding: "18px 22px",
    borderBottom: "1px solid #f0f4f2",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  panelTitle: {
    margin: 0,
    fontSize: 15,
    fontWeight: 700,
    color: "#0a2e20",
  },
  addButton: {
    border: "none",
    borderRadius: 12,
    padding: "10px 16px",
    background: "linear-gradient(135deg, #16a34a 0%, #0f766e 100%)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "14px 20px",
    textAlign: "left",
    fontSize: 11,
    fontWeight: 700,
    color: "#5f7867",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    background: "#f8faf9",
  },
  td: {
    padding: "16px 20px",
    fontSize: 13,
    color: "#1a2e20",
    borderBottom: "1px solid #f0f4f2",
    verticalAlign: "middle",
  },
  stockBadge: (stock) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 700,
    background: stock < 50 ? "#fee2e2" : stock < 100 ? "#fef3c7" : "#d1fae5",
    color: stock < 50 ? "#991b1b" : stock < 100 ? "#92400e" : "#065f46",
  }),
  actionButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
    color: "#0f766e",
    padding: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: "24px",
    background: "linear-gradient(135deg, #f8faf9 0%, #f0f4f2 100%)",
    borderRadius: 16,
    border: "1px solid #e5ede9",
  },
  inputGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    position: "relative",
  },
  label: {
    fontSize: 13,
    color: "#0a2e20",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  input: {
    height: 48,
    borderRadius: 12,
    border: "2px solid #d8e3dc",
    padding: "0 16px",
    fontSize: 15,
    color: "#0f2f1c",
    background: "#fff",
    transition: "all 0.2s ease",
    outline: "none",
  },
  inputFocus: {
    borderColor: "#0f766e",
    boxShadow: "0 0 0 3px rgba(15, 118, 110, 0.1)",
  },
  select: {
    height: 48,
    borderRadius: 12,
    border: "2px solid #d8e3dc",
    padding: "0 16px",
    fontSize: 15,
    color: "#0f2f1c",
    background: "#fff url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzBmMmYxYyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==') no-repeat right 12px center",
    backgroundSize: "12px",
    transition: "all 0.2s ease",
    outline: "none",
    cursor: "pointer",
  },
  selectFocus: {
    borderColor: "#0f766e",
    boxShadow: "0 0 0 3px rgba(15, 118, 110, 0.1)",
  },
  icon: {
    width: 16,
    height: 16,
    color: "#6a8a78",
    flexShrink: 0,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginTop: 8,
  },
  submitButton: {
    border: "none",
    borderRadius: 12,
    background: "linear-gradient(135deg, #16a34a 0%, #0f766e 100%)",
    color: "#fff",
    fontWeight: 700,
    padding: "14px 24px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(15, 118, 110, 0.3)",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  submitButtonHover: {
    transform: "translateY(-1px)",
    boxShadow: "0 6px 16px rgba(15, 118, 110, 0.4)",
  },
  cancelButton: {
    border: "2px solid #d1e7dd",
    borderRadius: 12,
    background: "#fff",
    color: "#0f766e",
    fontWeight: 700,
    padding: "14px 24px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  cancelButtonHover: {
    background: "#f0f4f2",
    borderColor: "#0f766e",
  },
  form: {
    padding: 22,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  inputGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#0a2e20",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  icon: {
    width: 16,
    height: 16,
    color: "#6a8a78",
    flexShrink: 0,
  },
  input: {
    border: "1px solid #d1e7dd",
    borderRadius: 8,
    padding: "12px 14px",
    fontSize: 14,
    color: "#0a2e20",
    background: "#fff",
    transition: "all 0.2s ease",
    outline: "none",
  },
  inputFocus: {
    borderColor: "#16a34a",
    boxShadow: "0 0 0 3px rgba(22, 163, 74, 0.1)",
  },
  select: {
    border: "1px solid #d1e7dd",
    borderRadius: 8,
    padding: "12px 14px",
    fontSize: 14,
    color: "#0a2e20",
    background: "#fff",
    transition: "all 0.2s ease",
    outline: "none",
    cursor: "pointer",
  },
  selectFocus: {
    borderColor: "#16a34a",
    boxShadow: "0 0 0 3px rgba(22, 163, 74, 0.1)",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
    paddingTop: 8,
  },
  cancelButton: {
    border: "1px solid #d1e7dd",
    borderRadius: 8,
    padding: "10px 16px",
    background: "#fff",
    color: "#6a8a78",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  submitButton: {
    border: "none",
    borderRadius: 8,
    padding: "10px 16px",
    background: "linear-gradient(135deg, #16a34a 0%, #0f766e 100%)",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  submitButtonHover: {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
  },
};

function formatCurrency(value) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 2,
  }).format(value);
}

function computeChartData(products) {
  const categoryTotals = {};
  products.forEach((product) => {
    if (!categoryTotals[product.category]) categoryTotals[product.category] = 0;
    categoryTotals[product.category] += product.stock;
  });

  return Object.entries(categoryTotals).map(([category, stock]) => ({
    label: category.slice(0, 6), // Truncate for display
    value: stock,
  }));
}

export default function Inventario() {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const chartData = useMemo(() => computeChartData(products), [products]);
  const totalProducts = products.length;
  const lowStock = products.filter((item) => item.stock < 50).length;
  const totalValue = products.reduce((sum, item) => sum + item.stock * item.price, 0);

  const handleInput = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: field === "stock" || field === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.category || !form.supplier) return;

    if (editingId) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingId ? { ...product, ...form, stock: Number(form.stock), price: Number(form.price) } : product,
        ),
      );
    } else {
      setProducts((current) => [
        {
          id: Math.max(0, ...current.map((item) => item.id)) + 1,
          ...form,
          stock: Number(form.stock),
          price: Number(form.price),
        },
        ...current,
      ]);
    }

    setForm(defaultForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setForm({ ...product });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setProducts((current) => current.filter((product) => product.id !== id));
    if (editingId === id) {
      setForm(defaultForm);
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setForm(defaultForm);
    setEditingId(null);
    setShowForm(false);
  };

  const maxValue = Math.max(1, ...chartData.map((item) => item.value));

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}
      </style>
      <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <div style={styles.titleBlock}>
            <h1 style={styles.title}>Inventario</h1>
            <p style={styles.subtitle}>Gestiona el stock de productos, proveedores y controla el inventario.</p>
          </div>
          <button style={styles.addButton} type="button" onClick={() => { setForm(defaultForm); setEditingId(null); setShowForm(true); }}>
            Agregar producto
          </button>
        </div>

        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Productos totales</div>
            <div style={styles.statValue}>{totalProducts}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Stock bajo</div>
            <div style={styles.statValue}>{lowStock}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Valor inventario</div>
            <div style={styles.statValue}>{formatCurrency(totalValue)}</div>
          </div>
        </div>
      </div>

      <div style={styles.graphCard}>
        <div style={styles.graphHeader}>
          <h2 style={styles.graphTitle}>Stock por categoría</h2>
          <div style={styles.graphLegend}>{chartData.length} categorías</div>
        </div>
        <div style={styles.barChart}>
          {chartData.map((item, index) => {
            const pct = Math.round((item.value / maxValue) * 100);
            return (
              <div key={index} style={styles.bar(pct || 4)}>
                <div style={styles.barTrack}>
                  <div style={styles.barFill(pct || 4)} />
                </div>
                <div style={styles.barLabel}>{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <h3 style={styles.panelTitle}>Lista de productos</h3>
            <span>{products.length} productos</span>
          </div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["Nombre", "Categoría", "Stock", "Precio", "Proveedor", "Acciones"].map((header) => (
                    <th key={header} style={styles.th}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td style={styles.td}>{product.name}</td>
                    <td style={styles.td}>{product.category}</td>
                    <td style={styles.td}><span style={styles.stockBadge(product.stock)}>{product.stock} unid.</span></td>
                    <td style={styles.td}>{formatCurrency(product.price)}</td>
                    <td style={styles.td}>{product.supplier}</td>
                    <td style={styles.td}>
                      <button style={styles.actionButton} type="button" onClick={() => handleEdit(product)}>
                        Editar
                      </button>
                      <span style={{ margin: "0 6px", color: "#c7d8ce" }}>|</span>
                      <button style={{ ...styles.actionButton, color: "#b91c1c" }} type="button" onClick={() => handleDelete(product.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showForm && (
        <div style={styles.modalOverlay} onClick={handleCancel}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.panelHeader}>
              <h3 style={styles.panelTitle}>{editingId ? "Editar producto" : "Nuevo producto"}</h3>
              <span>{editingId ? `ID ${editingId}` : "Rellena los datos"}</span>
            </div>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.inputGroup}>
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="name">
                    <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleInput("name", e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...styles.input, ...(focusedField === "name" ? styles.inputFocus : {}) }}
                    placeholder="Nombre del producto"
                    required
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="category">
                    <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Categoría
                  </label>
                  <select
                    id="category"
                    value={form.category}
                    onChange={(e) => handleInput("category", e.target.value)}
                    onFocus={() => setFocusedField("category")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...styles.select, ...(focusedField === "category" ? styles.selectFocus : {}) }}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="stock">
                    <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    Stock
                  </label>
                  <input
                    id="stock"
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => handleInput("stock", e.target.value)}
                    onFocus={() => setFocusedField("stock")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...styles.input, ...(focusedField === "stock" ? styles.inputFocus : {}) }}
                    required
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="price">
                    <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    Precio (S/)
                  </label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => handleInput("price", e.target.value)}
                    onFocus={() => setFocusedField("price")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...styles.input, ...(focusedField === "price" ? styles.inputFocus : {}) }}
                    required
                  />
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="supplier">
                  <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2.5C2.89543 2.5 2 3.39543 2 4.5V15.5C2 16.6046 2.89543 17.5 4 17.5H16C17.1046 17.5 18 16.6046 18 15.5V4.5C18 3.39543 17.1046 2.5 16 2.5H4ZM6.5 6C6.22386 6 6 6.22386 6 6.5V9.5C6 9.77614 6.22386 10 6.5 10H13.5C13.7761 10 14 9.77614 14 9.5V6.5C14 6.22386 13.7761 6 13.5 6H6.5Z" clipRule="evenodd" />
                  </svg>
                  Proveedor
                </label>
                <input
                  id="supplier"
                  type="text"
                  value={form.supplier}
                  onChange={(e) => handleInput("supplier", e.target.value)}
                  onFocus={() => setFocusedField("supplier")}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...styles.input, ...(focusedField === "supplier" ? styles.inputFocus : {}) }}
                  placeholder="Nombre del proveedor"
                  required
                />
              </div>

              <div style={styles.footer}>
                <button 
                  type="button" 
                  style={{ ...styles.cancelButton, ...(hoveredButton === "cancel" ? styles.cancelButtonHover : {}) }}
                  onMouseEnter={() => setHoveredButton("cancel")}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={handleCancel}
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  style={{ ...styles.submitButton, ...(hoveredButton === "submit" ? styles.submitButtonHover : {}) }}
                  onMouseEnter={() => setHoveredButton("submit")}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {editingId ? "Guardar cambios" : "Crear producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}