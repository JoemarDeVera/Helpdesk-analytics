const express = require("express");
const router = express.Router();
const { predictTicket } = require("../controllers/ai.controller");

// POST /api/ai/predict
router.post("/predict", predictTicket);

module.exports = router;