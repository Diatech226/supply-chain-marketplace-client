import React, { useState } from 'react';

const CreatePricingForm = () => {
  const [form, setForm] = useState({
    region: '',
    mode: 'air',
    minWeight: '',
    maxWeight: '',
    price: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert('Tarif créé avec succès');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="region" placeholder="Région" onChange={handleChange} required />
      <select name="mode" onChange={handleChange}>
        <option value="air">Avion</option>
        <option value="marine">Bateau</option>
      </select>
      <input type="number" name="minWeight" placeholder="Poids min (kg)" onChange={handleChange} required />
      <input type="number" name="maxWeight" placeholder="Poids max (kg)" onChange={handleChange} required />
      <input type="number" name="price" placeholder="Prix (€)" onChange={handleChange} required />
      <button type="submit">Créer</button>
    </form>
  );
};

export default CreatePricingForm;
