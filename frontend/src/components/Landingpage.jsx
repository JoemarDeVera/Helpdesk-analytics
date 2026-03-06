import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
const cells = Array.from({ length: 120 }, () => {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.style.animationDelay = `${Math.random() * 4}s`;
      cell.style.animationDuration = `${3 + Math.random() * 4}s`;
      grid.appendChild(cell);
      return cell;
    });
    return () => cells.forEach((c) => c.remove());
  }, []);

  return (
    <div style={styles.root}>
      <style>{css}</style>

      {/* Animated grid background */}
      <div ref={gridRef} style={styles.grid} />

      {/* Noise overlay */}
      <div style={styles.noise} />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoDot} />
          <span style={styles.logoText}>HelpDesk AI</span>
        </div>
        <button onClick={() => navigate("/tickets")} style={styles.headerBtn}>
          Launch App →
        </button>
      </header>

      {/* Hero */}
      <main style={styles.main}>
        <div style={styles.badge}>
          <span style={styles.badgeDot} />
            IT Service Desk Platform
        </div>

        <h1 style={styles.h1}>
          <span style={styles.h1Line1}>Smarter Ticket Management</span>
          <br />
          <span style={styles.h1Line2}>Predict. Prioritize. Resolve.</span>
        </h1>

        <p style={styles.subtitle}>
          Intelligent helpdesk analytics that automatically classifies tickets,
          predicts priority, and flags SLA risks — before they escalate.
        </p>

        <div style={styles.actions}>
          <button
            onClick={() => navigate("/tickets")}
            style={styles.primaryBtn}
            onMouseEnter={(e) => {
              e.target.style.background = "#fff";
              e.target.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#fff";
            }}
          >
            Open Dashboard
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            style={styles.secondaryBtn}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.3)";
              e.target.style.color = "rgba(255,255,255,0.8)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.1)";
              e.target.style.color = "rgba(255,255,255,0.4)";
            }}
          >
            View Analytics
          </button>
        </div>

        {/* Stats row */}
        <div style={styles.statsRow}>
          {[
            { value: "< 2s", label: "Prediction Time" },
            { value: "3x", label: "Faster Routing" },
            { value: "ML", label: "Powered Engine" },
          ].map((s) => (
            <div key={s.label} style={styles.stat}>
              <span style={styles.statValue}>{s.value}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Feature cards */}
      <section style={styles.features}>
        {[
          {
            icon: "⬡",
            title: "Auto Classification",
            desc: "ML model instantly categorizes every incoming ticket into the right department.",
          },
          {
            icon: "◈",
            title: "Priority Prediction",
            desc: "Trained on real support data to predict Low, Medium, or High priority accurately.",
          },
          {
            icon: "◎",
            title: "SLA Risk Detection",
            desc: "Flags tickets likely to breach SLA before it happens, so agents can act fast.",
          },
        ].map((f) => (
          <div
            key={f.title}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
            }}
          >
            <span style={styles.cardIcon}>{f.icon}</span>
            <h3 style={styles.cardTitle}>{f.title}</h3>
            <p style={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <span style={styles.footerText}>HelpDesk AI — Built with React · Node.js · FastAPI · SQLite</span>
      </footer>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#080808",
    color: "#fff",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    overflowX: "hidden",
    position: "relative",
  },
  grid: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridTemplateRows: "repeat(10, 1fr)",
    pointerEvents: "none",
    zIndex: 0,
  },
  noise: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
    pointerEvents: "none",
    zIndex: 1,
    opacity: 0.4,
  },
  header: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 48px",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#fff",
    display: "inline-block",
  },
  logoText: {
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#fff",
  },
  headerBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.5)",
    fontSize: "11px",
    fontFamily: "inherit",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  main: {
    position: "relative",
    zIndex: 10,
    maxWidth: "720px",
    margin: "0 auto",
    padding: "60px 48px 80px",
    textAlign: "center",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "10px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "6px 14px",
    borderRadius: "100px",
    marginBottom: "40px",
    animation: "fadeUp 0.6s ease both",
  },
  badgeDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "#2f80ed",
    display: "inline-block",
    animation: "pulse 2s infinite",
  },
  h1: {
    fontSize: "clamp(48px, 8vw, 88px)",
    fontWeight: "800",
    lineHeight: "1.0",
    letterSpacing: "-0.03em",
    margin: "0 0 28px",
    fontFamily: "'DM Mono', monospace",
  },
  h1Line1: {
    color: "#fff",
    animation: "fadeUp 0.6s 0.1s ease both",
    display: "inline-block",
  },
  h1Line2: {
    color: "rgba(255,255,255,0.25)",
    animation: "fadeUp 0.6s 0.2s ease both",
    display: "inline-block",
  },
  subtitle: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "rgba(255,255,255,0.35)",
    maxWidth: "480px",
    margin: "0 auto 48px",
    animation: "fadeUp 0.6s 0.3s ease both",
  },
  actions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    marginBottom: "64px",
    animation: "fadeUp 0.6s 0.4s ease both",
  },
  primaryBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.8)",
    color: "#fff",
    fontSize: "11px",
    fontFamily: "inherit",
    fontWeight: "700",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    padding: "14px 32px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  secondaryBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.4)",
    fontSize: "11px",
    fontFamily: "inherit",
    fontWeight: "700",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    padding: "14px 32px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  statsRow: {
    display: "flex",
    justifyContent: "center",
    gap: "48px",
    animation: "fadeUp 0.6s 0.5s ease both",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#fff",
    letterSpacing: "-0.02em",
  },
  statLabel: {
    fontSize: "10px",
    color: "rgba(255,255,255,0.25)",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },
  features: {
    position: "relative",
    zIndex: 10,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1px",
    maxWidth: "960px",
    margin: "0 auto 80px",
    padding: "0 48px",
    background: "rgba(255,255,255,0.05)",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  card: {
    background: "rgba(255,255,255,0.02)",
    padding: "40px 32px",
    transition: "all 0.2s",
    cursor: "default",
    borderColor: "rgba(255,255,255,0.05)",
  },
  cardIcon: {
    fontSize: "24px",
    display: "block",
    marginBottom: "16px",
    color: "rgba(255,255,255,0.3)",
  },
  cardTitle: {
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#fff",
    marginBottom: "12px",
  },
  cardDesc: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "rgba(255,255,255,0.3)",
    margin: 0,
  },
  footer: {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    padding: "32px 48px",
    borderTop: "1px solid rgba(255,255,255,0.04)",
  },
  footerText: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.15)",
    letterSpacing: "0.1em",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');

  .grid-cell {
    border: 1px solid rgba(255,255,255,0.0);
    animation: flicker linear infinite;
  }

  @keyframes flicker {
    0%, 90%, 100% { border-color: rgba(255,255,255,0.0); background: transparent; }
    95% { border-color: rgba(255,255,255,0.04); background: rgba(255,255,255,0.01); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`;