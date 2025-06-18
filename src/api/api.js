export const getShipmentsByUser = async (userId) => {
  const res = await fetch(`http://localhost:5000/api/shipments/user/${userId}`);
  if (!res.ok) throw new Error('Erreur chargement');
  return res.json();
};

export const getAllShipments = async () => {
  const res = await fetch('http://localhost:5000/api/shipments');
  if (!res.ok) throw new Error('Erreur chargement');
  return res.json();
};

export const createShipment = async (data) => {
  const res = await fetch('http://localhost:5000/api/shipments/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const updateShipmentStatus = async (id, status) => {
  const res = await fetch(`http://localhost:5000/api/shipments/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
