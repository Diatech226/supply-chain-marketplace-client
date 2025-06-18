
// src/pages/QuoteRequest.js
import React, { useState } from 'react';

const QuoteRequest = () => {
  const [form, setForm] = useState({
    productType: '',
    location: '',
    weight: '',
    deliveryType: '',
    destination: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    alert('Devis estimé : ' + data.price);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="productType" placeholder="Type de produit" onChange={handleChange} />
      <input name="location" placeholder="Lieu d'envoi" onChange={handleChange} />
      <input name="weight" placeholder="Poids (kg)" onChange={handleChange} />
      <select name="deliveryType" onChange={handleChange}>
        <option value="air">Avion</option>
        <option value="sea">Bateau</option>
      </select>
      <input name="destination" placeholder="Destination" onChange={handleChange} />
      <button type="submit">Obtenir un devis</button>
    </form>
  );
};

export default QuoteRequest;