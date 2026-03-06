import { useEffect, useState } from "react";
import { getTickets } from "../services/api";
import TicketCard from "./TicketCard";

function TicketList({ refresh }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const data = await getTickets();
        setTickets(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [refresh]);

  const handleDelete = (id) => {
    setTickets((prev) => prev.filter((t) => t.ticket_id !== id));
  };

  const filters = ["All", "Open", "In Progress", "Resolved", "Closed"];

  const filtered = filter === "All" ? tickets : tickets.filter((t) => t.status === filter);

  const filterCounts = filters.reduce((acc, f) => {
    acc[f] = f === "All" ? tickets.length : tickets.filter((t) => t.status === f).length;
    return acc;
  }, {});

  return (
    <div className="bg-[#0d0d0d] border border-white/0.06 rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b border-white/0.04">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[11px] font-bold tracking-[0.15em] uppercase text-white">All Tickets</h2>
            <p className="text-[10px] text-white/25 mt-0.5">{tickets.length} total</p>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00c853] animate-pulse" />
            <span className="text-[10px] text-white/20 tracking-widest uppercase">Live</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 mt-4 bg-[#080808] border border-white/0.04 rounded-xl p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="flex-1 flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-widest uppercase px-2 py-2 rounded-lg transition-all duration-200"
              style={{
                background: filter === f ? "#2f80ed" : "transparent",
                color: filter === f ? "#fff" : "rgba(255,255,255,0.25)",
              }}
            >
              {f}
              {filterCounts[f] > 0 && (
                <span
                  className="text-[8px] px-1.5 py-0.5 rounded-md font-bold"
                  style={{
                    background: filter === f ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)",
                    color: filter === f ? "#fff" : "rgba(255,255,255,0.3)",
                  }}
                >
                  {filterCounts[f]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 border border-white/15 border-t-white/50 rounded-full animate-spin" />
              <span className="text-[10px] text-white/25 tracking-widest uppercase">Loading tickets...</span>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/0.03 border border-white/0.06 flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="3" width="14" height="2" rx="1" fill="white" fillOpacity="0.15" />
                <rect x="2" y="8" width="10" height="2" rx="1" fill="white" fillOpacity="0.15" />
                <rect x="2" y="13" width="12" height="2" rx="1" fill="white" fillOpacity="0.15" />
              </svg>
            </div>
            <p className="text-[10px] text-white/20 tracking-[0.15em] uppercase">No tickets found</p>
            <p className="text-[10px] text-white/10 mt-1">
              {filter !== "All" ? `No ${filter.toLowerCase()} tickets` : "Submit a ticket to get started"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filtered.map((ticket) => (
              <TicketCard
                key={ticket.ticket_id}
                ticket={ticket}
                onDelete={handleDelete}
                onStatusUpdate={() => setTickets((prev) => [...prev])}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketList;