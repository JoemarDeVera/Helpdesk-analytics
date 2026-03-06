const db = require("../config/db");

exports.getAllTickets = (req, res) => {
  const query = `
    SELECT 
      t.ticket_id,
      t.title,
      t.category,
      t.priority,
      t.status,
      t.created_at,
      t.resolved_at,
      u.full_name AS agent
    FROM tickets t
    LEFT JOIN users u ON t.assigned_agent = u.user_id
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.createTicket = (req, res) => {
  const { title, description, category, priority, status, assigned_agent, sla_id } = req.body;

  if (!title || !description || !priority || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
    INSERT INTO tickets 
    (title, description, category, priority, status, created_at, assigned_agent, sla_id)
    VALUES (?, ?, ?, ?, ?, datetime('now'), ?, ?)
  `;

  db.run(
    query,
    [title, description, category || null, priority, status, assigned_agent || null, sla_id || null],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Ticket created successfully",
        ticket_id: this.lastID,
      });
    }
  );
};

exports.updateTicketStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  const query = `
    UPDATE tickets
    SET 
      status = ?,
      resolved_at = CASE
        WHEN ? = 'Resolved' THEN datetime('now')
        ELSE resolved_at
      END
    WHERE ticket_id = ?
  `;

  db.run(query, [status, status, id], function (err) {
    if (err) {
      console.error("DB UPDATE ERROR:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: "Ticket status updated successfully",
      ticket_id: id,
      new_status: status
    });
  });
}; // <-- updateTicketStatus ends here

exports.deleteTicket = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM tickets WHERE ticket_id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Ticket deleted successfully" });
  });
};