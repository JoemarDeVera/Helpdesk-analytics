const axios = require("axios");

exports.predictTicket = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  try {
    // ML service endpoint
    const response = await axios.post("http://localhost:5000/api/ai/predict", { title, description });
    res.json(response.data);
  } catch (err) {
    console.error("Error calling ML service:", err.message);
    res.status(500).json({ error: "Failed to get AI prediction" });
  }
};