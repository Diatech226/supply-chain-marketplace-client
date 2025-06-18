const API_URL = "http://localhost:5000/api/shipments";

export const createShipment = async (data) => {
  const res = await fetch(`${API_URL}/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getShipmentsByUser = async (userId) => {
  const res = await fetch(`${API_URL}/${userId}`);
  return res.json();
};

export const updateShipmentStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

export const getShipments = async (userId) => {
  const res = await fetch(`http://localhost:5000/api/shipments/user/${userId}`);
  if (!res.ok) {
    const err = await res.text();
    throw new Error("Erreur chargement : " + err);
  }
  return res.json();
};

