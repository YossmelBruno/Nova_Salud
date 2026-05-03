import { useMemo, useState } from "react";

const initialSales = [
  { id: 1, client: "Claudia R.", product: "Amoxicilina 500mg", qty: 2, total: 18.5, date: "2026-05-01", status: "Completado" },
  { id: 2, client: "Jorge L.", product: "Ibuprofeno 400mg", qty: 1, total: 4.5, date: "2026-05-02", status: "Completado" },
  { id: 3, client: "Ana G.", product: "Omeprazol 20mg", qty: 3, total: 18.0, date: "2026-05-03", status: "Pendiente" },
  { id: 4, client: "Luis C.", product: "Paracetamol 1g", qty: 5, total: 15.0, date: "2026-05-04", status: "Completado" },
  { id: 5, client: "María P.", product: "Metformina 850mg", qty: 2, total: 16.0, date: "2026-05-05", status: "Cancelado" },
];

const defaultForm = {
  client: "",
  product: "",
  qty: 1,
  total: 0,
  date: new Date().toISOString().slice(0, 10),
  status: "Pendiente",
};

const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

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
  badge: (status) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 700,
    background: status === "Completado" ? "#d1fae5" : status === "Pendiente" ? "#fef3c7" : "#fee2e2",
    color: status === "Completado" ? "#065f46" : status === "Pendiente" ? "#92400e" : "#991b1b",
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
};

function formatCurrency(value) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 2,
  }).format(value);
}

function computeChartData(sales) {
  const totals = {};
  sales.forEach((sale) => {
    if (!totals[sale.date]) totals[sale.date] = 0;
    totals[sale.date] += sale.total;
  });

  const daysWithValues = [...new Set(sales.map((sale) => sale.date))].sort();

  return daysWithValues.map((date) => ({
    label: date.slice(8),
    value: totals[date],
  }));
}

export default function Ventas() {
  const [sales, setSales] = useState(initialSales);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const chartData = useMemo(() => computeChartData(sales), [sales]);
  const totalToday = sales.reduce((sum, item) => sum + item.total, 0);
  const totalOrders = sales.length;
  const completed = sales.filter((item) => item.status === "Completado").length;

  const handleInput = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: field === "qty" || field === "total" ? Number(value) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.client || !form.product || !form.date) return;

    if (editingId) {
      setSales((current) =>
        current.map((sale) =>
          sale.id === editingId ? { ...sale, ...form, total: Number(form.total) } : sale,
        ),
      );
    } else {
      setSales((current) => [
        {
          id: Math.max(0, ...current.map((item) => item.id)) + 1,
          ...form,
          total: Number(form.total),
        },
        ...current,
      ]);
    }

    setForm(defaultForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (sale) => {
    setForm({ ...sale });
    setEditingId(sale.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setSales((current) => current.filter((sale) => sale.id !== id));
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
    <div style={styles.page}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideIn {
            from { 
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to { 
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <div style={styles.titleBlock}>
            <h1 style={styles.title}>Ventas</h1>
            <p style={styles.subtitle}>Administra las ventas, crea nuevos pedidos y revisa el rendimiento semanal.</p>
          </div>
          <button style={styles.addButton} type="button" onClick={() => { setForm(defaultForm); setEditingId(null); setShowForm(true); }}>
            Agregar venta
          </button>
        </div>

        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Ingresos totales</div>
            <div style={styles.statValue}>{formatCurrency(totalToday)}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Pedidos activos</div>
            <div style={styles.statValue}>{totalOrders}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Completados</div>
            <div style={styles.statValue}>{completed}</div>
          </div>
        </div>
      </div>

      <div style={styles.graphCard}>
        <div style={styles.graphHeader}>
          <h2 style={styles.graphTitle}>Ventas últimas fechas</h2>
          <div style={styles.graphLegend}>{chartData.length} registros</div>
        </div>
        <div style={styles.barChart}>
          {days.map((dayLabel, index) => {
            const item = chartData[index] || { value: 0, label: "-" };
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
            <h3 style={styles.panelTitle}>Registro de ventas</h3>
            <span>{sales.length} ventas</span>
          </div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {[["Cliente", "Producto", "Cantidad", "Total", "Estado", "Acciones"]].flat()[0] && ["Cliente", "Producto", "Cantidad", "Total", "Estado", "Acciones"].map((header) => (
                    <th key={header} style={styles.th}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id}>
                    <td style={styles.td}>{sale.client}</td>
                    <td style={styles.td}>{sale.product}</td>
                    <td style={styles.td}>{sale.qty}</td>
                    <td style={styles.td}>{formatCurrency(sale.total)}</td>
                    <td style={styles.td}><span style={styles.badge(sale.status)}>{sale.status}</span></td>
                    <td style={styles.td}>
                      <button style={styles.actionButton} type="button" onClick={() => handleEdit(sale)}>
                        Editar
                      </button>
                      <span style={{ margin: "0 6px", color: "#c7d8ce" }}>|</span>
                      <button style={{ ...styles.actionButton, color: "#b91c1c" }} type="button" onClick={() => handleDelete(sale.id)}>
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
              <h3 style={styles.panelTitle}>{editingId ? "Editar venta" : "Nueva venta"}</h3>
              <span>{editingId ? `ID ${editingId}` : "Rellena los datos"}</span>
            </div>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.inputGroup}>
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="client">
                    <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Cliente
                  </label>
                  <input
                    id="client"
                    type="text"
                    value={form.client}
                    onChange={(e) => handleInput("client", e.target.value)}
                    onFocus={() => setFocusedField("client")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...styles.input, ...(focusedField === "client" ? styles.inputFocus : {}) }}
                    placeholder="Nombre del cliente"
                    required
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="product">
                    <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Producto
                  </label>
                  <input
                    id="product"
                    type="text"
                    value={form.product}
                    onChange={(e) => handleInput("product", e.target.value)}
                    onFocus={() => setFocusedField("product")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...styles.input, ...(focusedField === "product" ? styles.inputFocus : {}) }}
                    placeholder="Medicamento o servicio"
                    required
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="qty">
                    <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    Cantidad
                  </label>
                  <input
                    id="qty"
                    type="number"
                    min="1"
                    value={form.qty}
                    onChange={(e) => handleInput("qty", e.target.value)}
                    onFocus={() => setFocusedField("qty")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...styles.input, ...(focusedField === "qty" ? styles.inputFocus : {}) }}
                    required
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="total">
                    <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    Total (S/)
                  </label>
                  <input
                    id="total"
                    type="number"
                    min="0"
                    step="0.5"
                    value={form.total}
                    onChange={(e) => handleInput("total", e.target.value)}
                    onFocus={() => setFocusedField("total")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...styles.input, ...(focusedField === "total" ? styles.inputFocus : {}) }}
                    required
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="date">
                    <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Fecha
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => handleInput("date", e.target.value)}
                    onFocus={() => setFocusedField("date")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...styles.input, ...(focusedField === "date" ? styles.inputFocus : {}) }}
                    required
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="status">
                    <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Estado
                  </label>
                  <select
                    id="status"
                    value={form.status}
                    onChange={(e) => handleInput("status", e.target.value)}
                    onFocus={() => setFocusedField("status")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...styles.select, ...(focusedField === "status" ? styles.selectFocus : {}) }}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Completado">Completado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
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
                  {editingId ? "Guardar cambios" : "Crear venta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
