const express = require("express");
const cors = require("cors");

const ticketRoutes = require("./routes/tickets.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/ai", aiRoutes);

app.use("/api/tickets", ticketRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("AI Helpdesk Backend API is running");
});

module.exports = app;