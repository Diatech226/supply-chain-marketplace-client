import React, { useState } from "react";
import { createShipment } from "../services/api";

export default function ShipmentForm({ onCreated }) {
  const [form, setForm] = useState({
    senderId: "",
    receiverId: "",
    origin: "",
    destination: "",
    expectedPrice: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("📤 Sending form:", form);
      const result = await createShipment(form);
      console.log("✅ Created:", result);
      onCreated(result);
      setForm({ senderId: "", receiverId: "", origin: "", destination: "", expectedPrice: "" });
    } catch (err) {
      console.error("❌ Error creating shipment:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {["senderId", "receiverId", "origin", "destination", "expectedPrice"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit">Créer l'expédition</button>
    </form>
  );
}
