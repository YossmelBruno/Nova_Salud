import { useState } from "react";
import Ventas from "./Ventas";
import Inventario from "./Inventario";
import Clientes from "./Clientes";

const NAV_ITEMS = [
  {
    id: "inicio",
    label: "Inicio",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: "ventas",
    label: "Ventas",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
  {
    id: "inventario",
    label: "Inventario",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 00-4 0v2"/>
        <path d="M8 7V5a2 2 0 014 0v2"/>
        <line x1="12" y1="12" x2="12" y2="17"/>
        <line x1="9" y1="14.5" x2="15" y2="14.5"/>
      </svg>
    ),
  },
  {
    id: "clientes",
    label: "Clientes",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
];

const STATS = [
  { label: "Ventas Hoy", value: "S/ 3,840", change: "+12%", up: true },
  { label: "Productos Activos", value: "1,248", change: "+3", up: true },
  { label: "Clientes Nuevos", value: "24", change: "+8%", up: true },
  { label: "Stock Crítico", value: "7", change: "-2", up: false },
];

const RECENTS = [
  { id: "#00821", product: "Amoxicilina 500mg", qty: 3, total: "S/ 18.50", time: "hace 5 min" },
  { id: "#00820", product: "Omeprazol 20mg", qty: 2, total: "S/ 12.00", time: "hace 18 min" },
  { id: "#00819", product: "Paracetamol 1g", qty: 10, total: "S/ 30.00", time: "hace 34 min" },
  { id: "#00818", product: "Ibuprofeno 400mg", qty: 5, total: "S/ 22.50", time: "hace 51 min" },
  { id: "#00817", product: "Metformina 850mg", qty: 1, total: "S/ 8.00", time: "hace 1 h" },
];

const LOW_STOCK = [
  { name: "Losartán 50mg", stock: 4, min: 10 },
  { name: "Atorvastatina 20mg", stock: 6, min: 15 },
  { name: "Clonazepam 0.5mg", stock: 2, min: 8 },
  { name: "Levotiroxina 100mcg", stock: 5, min: 12 },
];

const renderPageContent = (key) => ({
  ventas: <Ventas />,
  inventario: <Inventario />,
  clientes: <Clientes />,
})[key];

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Nunito', 'Segoe UI', sans-serif",
    background: "#f0f4f2",
    color: "#1a2e25",
  },
  sidebar: {
    width: 240,
    minHeight: "100vh",
    background: "linear-gradient(180deg, #064e3b 0%, #0a6652 60%, #0d7a62 100%)",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
    boxShadow: "4px 0 24px rgba(6,78,59,0.18)",
  },
  sidebarTop: {
    padding: "32px 24px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
  },
  logoMark: {
    width: 38,
    height: 38,
    borderRadius: 10,
    background: "rgba(255,255,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
  },
  logoName: {
    fontSize: 20,
    fontWeight: 800,
    color: "#fff",
    letterSpacing: "-0.3px",
  },
  logoSub: {
    fontSize: 11,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginTop: 2,
  },
  nav: {
    padding: "20px 12px",
    flex: 1,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "1.5px",
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase",
    padding: "0 12px",
    marginBottom: 8,
  },
  navItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "11px 14px",
    borderRadius: 10,
    cursor: "pointer",
    marginBottom: 4,
    background: active ? "rgba(255,255,255,0.15)" : "transparent",
    color: active ? "#fff" : "rgba(255,255,255,0.65)",
    fontWeight: active ? 700 : 500,
    fontSize: 14,
    transition: "all 0.18s",
    border: active ? "1px solid rgba(255,255,255,0.18)" : "1px solid transparent",
  }),
  navDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#4ade80",
    marginLeft: "auto",
    boxShadow: "0 0 6px #4ade80",
  },
  sidebarFooter: {
    padding: "16px 20px 24px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  userBadge: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 700,
    color: "#fff",
  },
  userName: {
    fontSize: 13,
    fontWeight: 600,
    color: "#fff",
  },
  userRole: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
  },
  main: {
    marginLeft: 240,
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  topbar: {
    background: "#fff",
    borderBottom: "1px solid #e5ede9",
    padding: "0 32px",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  pageTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: "#0a2e20",
  },
  topbarRight: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f0f4f2",
    border: "1px solid #d1e0d8",
    borderRadius: 8,
    padding: "7px 14px",
    fontSize: 13,
    color: "#5a7a6a",
    width: 200,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: "#f0f4f2",
    border: "1px solid #d1e0d8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#3a6a52",
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#ef4444",
    position: "absolute",
    top: 6,
    right: 6,
  },
  content: {
    padding: "28px 32px",
    flex: 1,
  },
  welcomeBanner: {
    background: "linear-gradient(120deg, #064e3b 0%, #0a7a5c 100%)",
    borderRadius: 16,
    padding: "24px 32px",
    marginBottom: 28,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  welcomeText: {
    color: "#fff",
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 800,
    marginBottom: 4,
  },
  welcomeSub: {
    fontSize: 14,
    color: "rgba(255,255,255,0.65)",
  },
  welcomeBadge: {
    background: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: "12px 20px",
    textAlign: "center",
    backdropFilter: "blur(6px)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  welcomeBadgeVal: {
    fontSize: 24,
    fontWeight: 800,
    color: "#4ade80",
    display: "block",
  },
  welcomeBadgeLbl: {
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
    letterSpacing: "0.5px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    marginBottom: 28,
  },
  statCard: {
    background: "#fff",
    borderRadius: 14,
    padding: "18px 20px",
    border: "1px solid #e5ede9",
    boxShadow: "0 2px 8px rgba(6,78,59,0.05)",
  },
  statLabel: {
    fontSize: 12,
    color: "#6a8a78",
    fontWeight: 600,
    letterSpacing: "0.3px",
    marginBottom: 8,
    display: "block",
  },
  statValue: {
    fontSize: 24,
    fontWeight: 800,
    color: "#0a2e20",
    marginBottom: 6,
    display: "block",
  },
  statChange: (up) => ({
    fontSize: 12,
    fontWeight: 600,
    color: up ? "#059669" : "#dc2626",
    background: up ? "#d1fae5" : "#fee2e2",
    padding: "2px 8px",
    borderRadius: 6,
    display: "inline-block",
  }),
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 14,
    border: "1px solid #e5ede9",
    boxShadow: "0 2px 8px rgba(6,78,59,0.05)",
    overflow: "hidden",
  },
  cardHeader: {
    padding: "16px 20px",
    borderBottom: "1px solid #e5ede9",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#0a2e20",
  },
  cardBadge: {
    fontSize: 11,
    background: "#d1fae5",
    color: "#065f46",
    padding: "3px 10px",
    borderRadius: 20,
    fontWeight: 600,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    fontSize: 11,
    color: "#7a9a88",
    fontWeight: 700,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    padding: "10px 20px",
    textAlign: "left",
    background: "#f8faf9",
    borderBottom: "1px solid #e5ede9",
  },
  td: {
    padding: "12px 20px",
    fontSize: 13,
    color: "#1a2e25",
    borderBottom: "1px solid #f0f4f2",
  },
  tdMuted: {
    padding: "12px 20px",
    fontSize: 12,
    color: "#8aaa98",
    borderBottom: "1px solid #f0f4f2",
  },
  stockRow: {
    padding: "14px 20px",
    borderBottom: "1px solid #f0f4f2",
  },
  stockName: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1a2e25",
    marginBottom: 6,
  },
  stockBar: {
    height: 6,
    borderRadius: 3,
    background: "#e5ede9",
    overflow: "hidden",
    marginBottom: 4,
  },
  stockBarFill: (pct) => ({
    height: "100%",
    width: `${pct}%`,
    borderRadius: 3,
    background: pct < 40 ? "#ef4444" : pct < 65 ? "#f59e0b" : "#10b981",
    transition: "width 0.4s ease",
  }),
  stockInfo: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11,
    color: "#8aaa98",
  },
  placeholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 400,
    gap: 16,
  },
  placeholderIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    background: "#d1fae5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: "#0a2e20",
    margin: 0,
  },
  placeholderDesc: {
    fontSize: 14,
    color: "#6a8a78",
    margin: 0,
  },
};

export default function Dashboard() {
  const [active, setActive] = useState("inicio");

  const now = new Date().toLocaleDateString("es-PE", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div style={styles.root}>
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* ── SIDEBAR ── */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarTop}>
          <div style={styles.logo}>
            <div style={styles.logoMark}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="rgba(255,255,255,0.3)"/>
                <path d="M11 7h2v5h-2zm0 6h2v2h-2z" fill="#fff"/>
                <path d="M9 11h6v2H9z" fill="#fff"/>
              </svg>
            </div>
            <div>
              <div style={styles.logoName}>Nova Salud</div>
              <div style={styles.logoSub}>Botica Farmacéutica</div>
            </div>
          </div>
        </div>

        <nav style={styles.nav}>
          <div style={styles.navLabel}>Menú principal</div>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.id}
              style={styles.navItem(active === item.id)}
              onClick={() => setActive(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
              {active === item.id && <div style={styles.navDot} />}
            </div>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.userBadge}>
            <div style={styles.avatar}>FA</div>
            <div>
              <div style={styles.userName}>Farmacéutico</div>
              <div style={styles.userRole}>Administrador</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={styles.main}>
        {/* Topbar */}
        <header style={styles.topbar}>
          <span style={styles.pageTitle}>
            {NAV_ITEMS.find((n) => n.id === active)?.label}
          </span>
          <div style={styles.topbarRight}>
            <div style={styles.searchBox}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Buscar producto…
            </div>
            <div style={{ ...styles.iconBtn, position: "relative" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
              <div style={styles.notifDot} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={styles.content}>
          {active !== "inicio" ? (
            renderPageContent(active)
          ) : (
            <>
              {/* Welcome Banner */}
              <div style={styles.welcomeBanner}>
                <div style={styles.welcomeText}>
                  <div style={styles.welcomeTitle}>¡Buenos días, Farmacéutico! 👋</div>
                  <div style={styles.welcomeSub}>{now.charAt(0).toUpperCase() + now.slice(1)}</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  {[
                    { val: "98%", lbl: "Satisfacción" },
                    { val: "34", lbl: "Pedidos hoy" },
                  ].map((b) => (
                    <div key={b.lbl} style={styles.welcomeBadge}>
                      <span style={styles.welcomeBadgeVal}>{b.val}</span>
                      <span style={styles.welcomeBadgeLbl}>{b.lbl}</span>
                    </div>
                  ))}
                </div>
                {/* Decorative circles */}
                <div style={{ position: "absolute", right: 220, top: -40, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", right: 140, bottom: -50, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
              </div>

              {/* Stats */}
              <div style={styles.statsGrid}>
                {STATS.map((s) => (
                  <div key={s.label} style={styles.statCard}>
                    <span style={styles.statLabel}>{s.label}</span>
                    <span style={styles.statValue}>{s.value}</span>
                    <span style={styles.statChange(s.up)}>{s.change} esta semana</span>
                  </div>
                ))}
              </div>

              {/* Two-column section */}
              <div style={styles.twoCol}>
                {/* Recent sales */}
                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardTitle}>Ventas recientes</span>
                    <span style={styles.cardBadge}>Hoy</span>
                  </div>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        {["ID", "Producto", "Cant.", "Total", "Hora"].map((h) => (
                          <th key={h} style={styles.th}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {RECENTS.map((r) => (
                        <tr key={r.id}>
                          <td style={{ ...styles.td, color: "#0a6652", fontWeight: 700 }}>{r.id}</td>
                          <td style={styles.td}>{r.product}</td>
                          <td style={styles.td}>{r.qty}</td>
                          <td style={{ ...styles.td, fontWeight: 700 }}>{r.total}</td>
                          <td style={styles.tdMuted}>{r.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Low stock */}
                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardTitle}>Stock crítico</span>
                    <span style={{ ...styles.cardBadge, background: "#fee2e2", color: "#991b1b" }}>
                      Requiere atención
                    </span>
                  </div>
                  {LOW_STOCK.map((item) => {
                    const pct = Math.round((item.stock / item.min) * 100);
                    return (
                      <div key={item.name} style={styles.stockRow}>
                        <div style={styles.stockName}>{item.name}</div>
                        <div style={styles.stockBar}>
                          <div style={styles.stockBarFill(pct)} />
                        </div>
                        <div style={styles.stockInfo}>
                          <span>Stock: <strong>{item.stock}</strong> unid.</span>
                          <span>Mín: {item.min} unid.</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}