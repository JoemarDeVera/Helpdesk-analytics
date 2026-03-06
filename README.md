# AI Helpdesk Analytics

An intelligent helpdesk web application that automatically classifies support tickets, predicts priority levels, and flags SLA breach risks using a machine learning model trained on real support data.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | SQLite |
| ML Service | FastAPI + scikit-learn |
| Charts | Recharts |

---

## Features

- **ML-Powered Ticket Classification** — Automatically predicts category, priority, and SLA breach risk when a ticket is submitted
- **Live Ticket Management** — Agents can update ticket status and delete resolved tickets
- **Analytics Dashboard** — Real-time charts showing tickets by priority and department, plus resolution rate
- **Full CRUD** — Create, read, update, and delete tickets
- **Dark UI** — Monochrome dark interface with a landing page

---

## Project Structure

```
ai-helpdesk-analytics/
├── frontend/          # React app (Vite)
│   └── src/
│       ├── components/
│       │   ├── LandingPage.jsx
│       │   ├── TicketForm.jsx
│       │   ├── TicketList.jsx
│       │   ├── TicketCard.jsx
│       │   └── Dashboard.jsx
│       └── services/
│           └── api.js
│
├── backend/           # Node.js + Express API
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── tickets.controller.js
│   │   │   ├── analytics.controller.js
│   │   │   └── ai.controller.js
│   │   ├── routes/
│   │   │   ├── tickets.routes.js
│   │   │   ├── analytics.routes.js
│   │   │   └── ai.routes.js
│   │   └── config/
│   │       ├── db.js
│   │       └── initDb.js
│   └── database/
│       ├── schema.sql
│       ├── seed.sql
│       └── helpdesk.db
│
└── ml-service/        # FastAPI ML service
    ├── ml_service.py
    ├── model.py
    ├── dataset.py
    ├── category_model.pkl
    ├── priority_model.pkl
    ├── sla_model.pkl
    └── IT_Support_Ticket_Data.csv
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- Python 3.9+
- npm

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ai-helpdesk-analytics.git
cd ai-helpdesk-analytics
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```
PORT=3000
```

Initialize the database:

```bash
npm run initdb
```

Start the backend:

```bash
npm run dev
```

### 3. Set up the ML Service

```bash
cd ml-service
pip install fastapi uvicorn scikit-learn joblib pandas faker
```

Train the models (only needed once):

```bash
python model.py
```

Start the ML service:

```bash
uvicorn ml_service:app --reload --port 5000
```

### 4. Set up the Frontend

```bash
cd frontend
npm install
npm run dev
```

### 5. Open the app

Visit `http://localhost:5173` in your browser.

---

## Running All Services

You need **3 terminals** running simultaneously:

| Terminal | Command | Port |
|---|---|---|
| Frontend | `npm run dev` (in `/frontend`) | 5173 |
| Backend | `npm run dev` (in `/backend`) | 3000 |
| ML Service | `uvicorn ml_service:app --reload --port 5000` (in `/ml-service`) | 5000 |

---

## How the AI Works

1. Agent submits a ticket with a title and description
2. The frontend sends the text to the FastAPI ML service on port 5000
3. Three Random Forest classifiers predict:
   - **Category** — e.g. Technical Support, IT Support, Billing
   - **Priority** — Low, Medium, or High
   - **SLA Breach Risk** — Low or High
4. Results are saved to the database alongside the ticket

The models are trained on a real IT support ticket dataset (~29,000 tickets) using TF-IDF vectorization with bigrams.

---

## API Endpoints

### Tickets
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tickets` | Get all tickets |
| POST | `/api/tickets` | Create a new ticket |
| PUT | `/api/tickets/:id/status` | Update ticket status |
| DELETE | `/api/tickets/:id` | Delete a ticket |

### Analytics
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/analytics/dashboard` | Get dashboard stats |
| GET | `/api/analytics/ticket-stats` | Get tickets by category |

### ML Service
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/predict` | Predict category, priority, SLA risk |

---

## Future Enhancements

- [ ] User authentication (agent login)
- [ ] Assign tickets to specific agents
- [ ] Email notifications for high priority tickets
- [ ] Replace dataset with better production data for improved ML accuracy
- [ ] SLA countdown timers per ticket
- [ ] Export analytics to PDF/CSV

---

## License

MIT