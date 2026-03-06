const express = require("express");
const router = express.Router();

const {
  getSlaCompliance,
  getTicketStats,
  getDashboardStats

} = require("../controllers/analytics.controller");

router.get("/sla-compliance", getSlaCompliance);
router.get("/ticket-stats", getTicketStats);
router.get("/dashboard", getDashboardStats);

module.exports = router;