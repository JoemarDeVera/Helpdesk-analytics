const db = require("../config/db");

exports.getSlaCompliance = (req, res) => {
  const query = `
    SELECT
      t.ticket_id,
      t.priority,
      ROUND(
        (julianday(t.resolved_at) - julianday(t.created_at)) * 24,
        2
      ) AS resolution_hours,
      s.resolution_time_hours,
      CASE
        WHEN ((julianday(t.resolved_at) - julianday(t.created_at)) * 24) 
             > s.resolution_time_hours THEN 1
        ELSE 0
      END AS sla_breached
    FROM tickets t
    JOIN sla_policies s ON t.sla_id = s.sla_id
    WHERE t.resolved_at IS NOT NULL
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getTicketStats = (req, res) => {
  const query = `
    SELECT
      category,
      COUNT(*) AS total
    FROM tickets
    GROUP BY category
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};


exports.getDashboardStats = (req, res) => {
  const query = `
    SELECT
      COUNT(*) as total_tickets,
      SUM(CASE WHEN status='Open' THEN 1 ELSE 0 END) as open_tickets,
      SUM(CASE WHEN status='In Progress' THEN 1 ELSE 0 END) as in_progress,
      SUM(CASE WHEN status='Resolved' THEN 1 ELSE 0 END) as resolved,
      SUM(CASE WHEN priority='High' THEN 1 ELSE 0 END) as high_priority,
      SUM(CASE WHEN priority='Medium' THEN 1 ELSE 0 END) as medium_priority,
      SUM(CASE WHEN priority='Low' THEN 1 ELSE 0 END) as low_priority
    FROM tickets
  `;

  db.get(query, [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
};