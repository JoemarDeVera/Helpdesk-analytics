from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

app = FastAPI()

# Allow requests from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models
category_model = joblib.load("category_model.pkl")
priority_model = joblib.load("priority_model.pkl")
sla_model = joblib.load("sla_model.pkl")

class Ticket(BaseModel):
    title: str
    description: str

@app.post("/api/ai/predict")
def predict(ticket: Ticket):
    text = ticket.title + " " + ticket.description

    category = category_model.predict([text])[0]
    priority = priority_model.predict([text])[0]
    sla_risk = sla_model.predict([text])[0]

    return {
        "predicted_category": category,
        "predicted_priority": priority,
        "sla_breach_risk": sla_risk
    }