import { useState } from "react";

function TicketCard({ ticket, onDelete, onStatusUpdate }) {
  const [deleting, setDeleting] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(ticket.status);
  const [updating, setUpdating] = useState(false);

  const priorityColor = {
    High: { text: "#ff3b3b", bg: "rgba(255,59,59,0.08)", border: "rgba(255,59,59,0.15)" },
    Medium: { text: "#f5a623", bg: "rgba(245,166,35,0.08)", border: "rgba(245,166,35,0.15)" },
    Low: { text: "#00c853", bg: "rgba(0,200,83,0.08)", border: "rgba(0,200,83,0.15)" },
  };

  const statusColor = {
    Open: { text: "#2f80ed", bg: "rgba(47,128,237,0.08)", border: "rgba(47,128,237,0.15)" },
    "In Progress": { text: "#f5a623", bg: "rgba(245,166,35,0.08)", border: "rgba(245,166,35,0.15)" },
    Resolved: { text: "#00bfa5", bg: "rgba(0,191,165,0.08)", border: "rgba(0,191,165,0.15)" },
    Closed: { text: "rgba(255,255,255,0.25)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)" },
  };

  const p = priorityColor[ticket.priority] || priorityColor["Low"];
  const s = statusColor[currentStatus] || statusColor["Open"];

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus) return;
    setUpdating(true);
    try {
      await fetch(`http://localhost:3000/api/tickets/${ticket.ticket_id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setCurrentStatus(newStatus);
      if (onStatusUpdate) onStatusUpdate();
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete ticket #${ticket.ticket_id}?`)) return;
    setDeleting(true);
    try {
      await fetch(`http://localhost:3000/api/tickets/${ticket.ticket_id}`, {
        method: "DELETE",
      });
      onDelete(ticket.ticket_id);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete ticket.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="group bg-[#0d0d0d] border border-white/0.06 hover:border-white/0.10 rounded-2xl p-5 transition-all duration-200 hover:bg-[#101010]">

      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <span className="text-[10px] text-white/20 font-mono tracking-wider">#{ticket.ticket_id}</span>
          <h3 className="text-sm font-semibold text-white mt-0.5 truncate leading-snug">{ticket.title}</h3>
        </div>

        {/* Priority pill */}
        <span
          className="text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-lg shrink-0 mt-0.5"
          style={{ color: p.text, background: p.bg, border: `1px solid ${p.border}` }}
        >
          {ticket.priority}
        </span>
      </div>

      {/* Description */}
      <p className="text-[12px] text-white/30 leading-relaxed line-clamp-2 mb-4">{ticket.description}</p>

      {/* Bottom row */}
      <div className="flex items-center justify-between gap-2">
        {/* Category */}
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-1 h-1 rounded-full bg-white/15 shrink-0" />
          <span className="text-[10px] text-white/30 tracking-wide truncate">{ticket.category}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Delete button for resolved */}
          {currentStatus === "Resolved" && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-lg transition-all duration-200 disabled:opacity-40"
              style={{
                color: "rgba(255,59,59,0.5)",
                border: "1px solid rgba(255,59,59,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ff3b3b";
                e.currentTarget.style.borderColor = "rgba(255,59,59,0.3)";
                e.currentTarget.style.background = "rgba(255,59,59,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,59,59,0.5)";
                e.currentTarget.style.borderColor = "rgba(255,59,59,0.1)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {deleting ? "..." : "Delete"}
            </button>
          )}

          {/* Status dropdown */}
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={updating}
            className="text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-lg cursor-pointer appearance-none outline-none disabled:opacity-40 transition-all duration-200"
            style={{
              color: s.text,
              background: s.bg,
              border: `1px solid ${s.border}`,
            }}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;