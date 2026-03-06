-- USERS TABLE (IT agents & admins)
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT CHECK (role IN ('admin', 'agent')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- SLA POLICIES TABLE
CREATE TABLE sla_policies (
    sla_id INTEGER PRIMARY KEY AUTOINCREMENT,
    priority TEXT CHECK (priority IN ('Low', 'Medium', 'High')) UNIQUE NOT NULL,
    resolution_time_hours INTEGER NOT NULL
);

-- TICKETS TABLE (MAIN ANALYTICS TABLE)
CREATE TABLE tickets (
    ticket_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT CHECK (category IN (
        'Technical Support',
        'Product Support',
        'Customer Service',
        'IT Support',
        'Billing and Payments',
        'Returns and Exchanges',
        'Service Outages and Maintenance',
        'Sales and Pre-Sales',
        'Human Resources',
        'General Inquiry'
    )),
    priority TEXT CHECK (priority IN ('Low', 'Medium', 'High')) NOT NULL,
    status TEXT CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    resolved_at DATETIME,
    assigned_agent INTEGER,
    sla_id INTEGER,
    FOREIGN KEY (assigned_agent) REFERENCES users(user_id),
    FOREIGN KEY (sla_id) REFERENCES sla_policies(sla_id)
);

-- AI PREDICTIONS TABLE
CREATE TABLE ticket_predictions (
    prediction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id INTEGER NOT NULL,
    predicted_category TEXT,
    predicted_priority TEXT,
    sla_breach_risk TEXT CHECK (sla_breach_risk IN ('High', 'Low')),
    predicted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id)
);