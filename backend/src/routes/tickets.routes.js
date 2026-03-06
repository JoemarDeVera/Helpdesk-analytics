const express = require("express");
const router = express.Router();

const { 
  getAllTickets, 
  createTicket,
  updateTicketStatus,
  deleteTicket
} = require("../controllers/tickets.controller");

router.get("/", getAllTickets);
router.post("/", createTicket);
router.put("/:id/status", updateTicketStatus);
router.delete("/:id", deleteTicket);

module.exports = router;