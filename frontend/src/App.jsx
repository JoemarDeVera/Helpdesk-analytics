import { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/Landingpage";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";

function AppLayout() {
  const [refresh, setRefresh] = useState(0);
  const handleTicketCreated = () => setRefresh((r) => r + 1);
  const location = useLocation();

  const isLanding = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono overflow-x-hidden">
      {!isLanding && (
        <header className="relative border-b border-white/5 px-8 py-5 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm font-bold tracking-widest text-white uppercase hover:text-white/70 transition-all">
              HelpDesk AI
            </Link>
          </div>
          <nav className="flex gap-4">
            <Link to="/tickets" className="text-white/70 hover:text-white transition-all">Dashboard</Link>
            <Link to="/dashboard" className="text-white/70 hover:text-white transition-all">Analytics</Link>
          </nav>
        </header>
      )}

      <main className={!isLanding ? "relative px-8 pb-16" : ""}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/tickets"
            element={
              <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6 items-start">
                <TicketForm onTicketCreated={handleTicketCreated} />
                <TicketList refresh={refresh} />
              </div>
            }
          />
          <Route path="/dashboard" element={<Dashboard refresh={refresh} />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;