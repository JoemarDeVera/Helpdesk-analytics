const API_URL = "http://localhost:3000"; 

export const getTickets = async () => {
  const response = await fetch(`${API_URL}/api/tickets`);
  return response.json();
};

export const createTicket = async (ticketData) => {
  const response = await fetch(`${API_URL}/api/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  });

  return response.json();
};

export const predictTicket = async (ticketData) => {
  const response = await fetch("http://localhost:5000/api/ai/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  });

  return response.json();
};