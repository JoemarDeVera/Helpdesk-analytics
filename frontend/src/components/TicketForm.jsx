import { useState } from "react";
import { createTicket } from "../services/api";

function TicketForm({ onTicketCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Fill title and description first");
    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/ai/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const aiResult = await response.json();
      setPrediction(aiResult);
      await createTicket({
        title,
        description,
        category: aiResult?.predicted_category || "Uncategorized",
        priority: aiResult?.predicted_priority || "Low",
        status: "Open",
        assigned_agent: null,
        sla_id: null,
      });
      setSubmitted(true);
      onTicketCreated();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong. Check ML service and backend.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateAnother = () => {
    setTitle("");
    setDescription("");
    setPrediction(null);
    setSubmitted(false);
  };

  const priorityColor = {
    High: "#ff3b3b",
    Medium: "#f5a623",
    Low: "#00c853",
  };

  return (
    <div className="sticky top-6">
      {/* Card */}
      <div className="bg-[#0d0d0d] border border-white/0.06 rounded-2xl overflow-hidden">

        {/* Header bar */}
        <div className="px-6 py-4 border-b border-white/0.04 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2f80ed]" />
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-white">New Ticket</span>
          </div>
          <span className="text-[10px] text-white/20 tracking-widest uppercase">AI-Assisted</span>
        </div>

        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="block text-[10px] text-white/30 tracking-[0.15em] uppercase">Title</label>
                <input
                  placeholder="Brief issue summary..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#080808] border border-white/0.06 rounded-xl px-4 py-3 text-sm text-white placeholder-white/15 outline-none focus:border-[#2f80ed]/40 focus:bg-[#0a0f1a] transition-all duration-200"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-[10px] text-white/30 tracking-[0.15em] uppercase">Description</label>
                <textarea
                  placeholder="Describe the issue in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="w-full bg-[#080808] border border-white/0.06 rounded-xl px-4 py-3 text-sm text-white placeholder-white/15 outline-none focus:border-[#2f80ed]/40 focus:bg-[#0a0f1a] transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full relative overflow-hidden flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: submitting ? "rgba(47,128,237,0.15)" : "#2f80ed",
                  color: "#fff",
                  border: submitting ? "1px solid rgba(47,128,237,0.3)" : "1px solid transparent",
                }}
              >
                {submitting ? (
                  <>
                    <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing & Submitting...
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1L7.5 4.5L11 6L7.5 7.5L6 11L4.5 7.5L1 6L4.5 4.5L6 1Z" fill="white" />
                    </svg>
                    Submit Ticket
                  </>
                )}
              </button>

              {/* AI note */}
              <p className="text-center text-[10px] text-white/15 tracking-wider">
                AI will auto-classify category, priority & SLA risk
              </p>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Success */}
              <div className="flex items-center gap-3 bg-[#00c853]/0.06 border border-[#00c853]/20 rounded-xl px-4 py-3.5">
                <div className="w-5 h-5 rounded-full bg-[#00c853]/15 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5L3.5 7.5L8.5 2.5" stroke="#00c853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-[#00c853] font-bold tracking-widest uppercase">Ticket Submitted</p>
                  <p className="text-[10px] text-[#00c853]/50 mt-0.5">AI classification complete</p>
                </div>
              </div>

              {/* Prediction */}
              {prediction && (
                <div className="bg-[#080808] border border-white/0.06 rounded-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/0.04 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2f80ed] animate-pulse" />
                    <span className="text-[10px] text-[#2f80ed] tracking-[0.15em] uppercase font-bold">AI Prediction</span>
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-white/0.04">
                    <div className="px-4 py-4">
                      <p className="text-[9px] text-white/25 tracking-widest uppercase mb-1.5">Category</p>
                      <p className="text-[11px] font-bold text-white leading-tight">{prediction.predicted_category}</p>
                    </div>
                    <div className="px-4 py-4">
                      <p className="text-[9px] text-white/25 tracking-widest uppercase mb-1.5">Priority</p>
                      <p className="text-[11px] font-bold leading-tight" style={{ color: priorityColor[prediction.predicted_priority] || "white" }}>
                        {prediction.predicted_priority}
                      </p>
                    </div>
                    <div className="px-4 py-4">
                      <p className="text-[9px] text-white/25 tracking-widest uppercase mb-1.5">SLA Risk</p>
                      <p className="text-[11px] font-bold leading-tight" style={{ color: prediction.sla_breach_risk === "High" ? "#ff3b3b" : "#00c853" }}>
                        {prediction.sla_breach_risk}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Create another */}
              <button
                onClick={handleCreateAnother}
                className="w-full py-3 rounded-xl text-[11px] font-bold tracking-[0.15em] uppercase text-white/30 hover:text-white border border-white/0.06 hover:border-white/15 transition-all duration-200"
              >
                + New Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketForm;