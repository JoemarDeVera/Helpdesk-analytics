-- SLA POLICIES
INSERT INTO sla_policies (priority, resolution_time_hours) VALUES
('Low', 72),
('Medium', 48),
('High', 24);

-- USERS (IT agents & admins)
INSERT INTO users (full_name, email, role) VALUES
('Alex Cruz', 'alex.cruz@company.com', 'agent'),
('Maria Santos', 'maria.santos@company.com', 'agent'),
('John Reyes', 'john.reyes@company.com', 'agent'),
('Liza Fernandez', 'liza.fernandez@company.com', 'agent'),
('IT Admin', 'admin@company.com', 'admin');

-- TICKETS (REALISTIC DATA)
INSERT INTO tickets (
    title, description, category, priority, status,
    created_at, resolved_at, assigned_agent, sla_id
) VALUES
(
    'Cannot connect to Wi-Fi',
    'User reports intermittent Wi-Fi disconnection since morning.',
    'IT Support', 'High', 'Resolved',
    '2026-02-10 08:30:00', '2026-02-10 18:00:00', 1, 3
),
(
    'Email not syncing',
    'Outlook email is not syncing on laptop.',
    'Technical Support', 'Medium', 'Resolved',
    '2026-02-11 09:15:00', '2026-02-12 10:30:00', 2, 2
),
(
    'PC will not turn on',
    'Desktop computer does not power on after pressing the power button.',
    'Technical Support', 'High', 'Resolved',
    '2026-02-12 14:00:00', '2026-02-12 16:00:00', 3, 3
),
(
    'Request for system access',
    'New employee requesting access to internal HR system.',
    'Human Resources', 'Low', 'Closed',
    '2026-02-09 10:00:00', '2026-02-11 09:00:00', 4, 1
),
(
    'VPN connection failure',
    'User cannot connect to company VPN from home.',
    'IT Support', 'High', 'In Progress',
    '2026-02-13 11:00:00', NULL, 1, 3
),
(
    'Billing charge incorrect',
    'Customer reports an incorrect charge on their account this month.',
    'Billing and Payments', 'Medium', 'Open',
    '2026-02-14 09:00:00', NULL, 2, 2
),
(
    'Product compatibility question',
    'Customer asking about compatibility of purchased product with their system.',
    'Product Support', 'Low', 'Open',
    '2026-02-14 10:30:00', NULL, 3, 1
);

-- AI PREDICTIONS (SIMULATED)
INSERT INTO ticket_predictions (
    ticket_id, predicted_category, predicted_priority, sla_breach_risk
) VALUES
(1, 'IT Support', 'High', 'Low'),
(2, 'Technical Support', 'Medium', 'Low'),
(3, 'Technical Support', 'High', 'High'),
(5, 'IT Support', 'High', 'High'),
(6, 'Billing and Payments', 'Medium', 'Low'),
(7, 'Product Support', 'Low', 'Low');