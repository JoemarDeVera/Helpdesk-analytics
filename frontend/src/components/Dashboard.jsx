import { useEffect, useState } from "react";
import {
  Bar, BarChart, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

const PRIORITY_COLORS = {
  High: "#ff3b3b",
  Medium: "#f5a623",
  Low: "#00c853",
};

const CATEGORY_COLORS = [
  "#2f80ed", "#8b5cf6", "#00bfa5", "#f5a623",
  "#ff3b3b", "#00c853", "#e91e63", "#ff9800",
  "#03a9f4", "#9c27b0",
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#111",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "8px",
        padding: "10px 14px",
        fontSize: "11px",
        fontFamily: "monospace",
      }}>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "4px", letterSpacing: "0.1em" }}>
          {label || payload[0].name}
        </p>
        <p style={{ color: "#fff", fontWeight: "700", fontSize: "14px" }}>
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function Dashboard({ refresh }) {
  const [stats, setStats] = useState({
    total_tickets: 0,
    open_tickets: 0,
    in_progress: 0,
    resolved: 0,
    high_priority: 0,
    medium_priority: 0,
    low_priority: 0,
  });

  const [categoryStats, setCategoryStats] = useState([]);
  const [priorityStats, setPriorityStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dashboardRes = await fetch("http://localhost:3000/api/analytics/dashboard");
        const dashboardData = await dashboardRes.json();
        setStats(dashboardData);
        setPriorityStats([
          { name: "High", value: dashboardData.high_priority || 0 },
          { name: "Medium", value: dashboardData.medium_priority || 0 },
          { name: "Low", value: dashboardData.low_priority || 0 },
        ]);
        const categoryRes = await fetch("http://localhost:3000/api/analytics/ticket-stats");
        const categoryData = await categoryRes.json();
        setCategoryStats(categoryData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  const statCards = [
    { label: "Total Tickets", value: stats.total_tickets, color: "#2f80ed", bg: "rgba(47,128,237,0.08)", border: "rgba(47,128,237,0.15)" },
    { label: "Open", value: stats.open_tickets, color: "#00c853", bg: "rgba(0,200,83,0.08)", border: "rgba(0,200,83,0.15)" },
    { label: "In Progress", value: stats.in_progress, color: "#f5a623", bg: "rgba(245,166,35,0.08)", border: "rgba(245,166,35,0.15)" },
    { label: "Resolved", value: stats.resolved, color: "#00bfa5", bg: "rgba(0,191,165,0.08)", border: "rgba(0,191,165,0.15)" },
    { label: "High Priority", value: stats.high_priority, color: "#ff3b3b", bg: "rgba(255,59,59,0.08)", border: "rgba(255,59,59,0.15)" },
    { label: "Medium Priority", value: stats.medium_priority, color: "#f5a623", bg: "rgba(245,166,35,0.08)", border: "rgba(245,166,35,0.15)" },
    { label: "Low Priority", value: stats.low_priority, color: "#00c853", bg: "rgba(0,200,83,0.08)", border: "rgba(0,200,83,0.15)" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex items-center gap-3 text-white/30">
          <span className="w-4 h-4 border border-white/20 border-t-white/60 rounded-full animate-spin" />
          <span className="text-xs tracking-widest uppercase">Loading analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6">

      {/* Page title */}
      <div className="mb-2">
        <h1 className="text-sm font-bold tracking-widest uppercase text-white">Analytics</h1>
        <p className="text-xs text-white/30 mt-1">Live helpdesk performance overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {statCards.map((s) => (
          <div
            key={s.label}
            className="rounded-xl px-4 py-4 flex flex-col gap-2"
            style={{ background: s.bg, border: `1px solid ${s.border}` }}
          >
            <p className="text-[10px] text-white/40 tracking-widest uppercase leading-tight">{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Priority Bar Chart */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
          <div className="mb-5">
            <h3 className="text-xs font-bold tracking-widest uppercase text-white">Tickets by Priority</h3>
            <p className="text-[10px] text-white/25 mt-1 tracking-wider">Distribution across priority levels</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={priorityStats} barSize={40}>
              <XAxis
                dataKey="name"
                stroke="rgba(255,255,255,0.15)"
                tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.15)"
                tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10, fontFamily: "monospace" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {priorityStats.map((entry) => (
                  <Cell key={entry.name} fill={PRIORITY_COLORS[entry.name] || "#2f80ed"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie Chart */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
          <div className="mb-5">
            <h3 className="text-xs font-bold tracking-widest uppercase text-white">Tickets by Category</h3>
            <p className="text-[10px] text-white/25 mt-1 tracking-wider">Department breakdown</p>
          </div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={220}>
              <PieChart>
                <Pie
                  data={categoryStats}
                  dataKey="total"
                  nameKey="category"
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={2}
                >
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex-1 space-y-2 overflow-y-auto max-h-55">    
              {categoryStats.map((entry, index) => (
                <div key={entry.category} className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }}
                  />
                  <span className="text-[10px] text-white/40 tracking-wide truncate">{entry.category}</span>
                  <span className="text-[10px] text-white/60 font-bold ml-auto">{entry.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resolution rate bar */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-white">Resolution Rate</h3>
            <p className="text-[10px] text-white/25 mt-1 tracking-wider">Resolved vs total tickets</p>
          </div>
          <span className="text-2xl font-bold text-white">
            {stats.total_tickets > 0
              ? Math.round((stats.resolved / stats.total_tickets) * 100)
              : 0}%
          </span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${stats.total_tickets > 0 ? (stats.resolved / stats.total_tickets) * 100 : 0}%`,
              background: "linear-gradient(90deg, #00bfa5, #00c853)",
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-white/25">{stats.resolved} resolved</span>
          <span className="text-[10px] text-white/25">{stats.total_tickets} total</span>
        </div>
      </div>

    </div>
  );
}