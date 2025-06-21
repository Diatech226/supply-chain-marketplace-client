
// ✅ Correction complète du formulaire QuoteRequest.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { API_BASE } from '../api/api';

const QuoteRequest = () => {
  const { getToken } = useAuth();
  const [form, setForm] = useState({
    productType: '',
    origin: '',
    destination: '',
    transportType: 'air',
    unitType: 'kg',
    quantity: ''
  });
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [error, setError] = useState('');

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    // Met automatiquement le bon unitType selon transportType
    if (name === 'transportType') {
      updatedForm.unitType = value === 'air' ? 'kg' : 'm3';
    }

    setForm(updatedForm);

    // auto-calcul si tous les champs nécessaires sont remplis
    if (
      updatedForm.origin &&
      updatedForm.destination &&
      updatedForm.transportType &&
      updatedForm.unitType &&
      updatedForm.quantity
    ) {
      try {
        const res = await fetch(`${API_BASE}/api/pricing`);
        const pricings = await res.json();

        const matched = pricings.find(
          (p) =>
            p.origin === updatedForm.origin &&
            p.destination === updatedForm.destination &&
            p.transportType === updatedForm.transportType &&
            p.unitType === updatedForm.unitType
        );

        if (matched) {
          const price = updatedForm.quantity * matched.pricePerUnit;
          setEstimatedPrice(price);
          setError('');
        } else {
          setEstimatedPrice(null);
          setError('Aucune tarification disponible pour cette configuration');
        }
      } catch (err) {
        setEstimatedPrice(null);
        setError('Erreur lors du calcul automatique');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE}/api/quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert('✅ Devis créé avec succès. Prix estimé : ' + data.quote.price + ' €');
      setForm({
        productType: '',
        origin: '',
        destination: '',
        transportType: 'air',
        unitType: 'kg',
        quantity: ''
      });
      setEstimatedPrice(null);
      setError('');
    } catch (err) {
      alert(err.message || 'Erreur lors de la soumission');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Demande de devis</h2>
      <form onSubmit={handleSubmit}>
        <input name="productType" placeholder="Type de produit" value={form.productType} onChange={handleChange} required />
        <input name="origin" placeholder="Lieu d'envoi" value={form.origin} onChange={handleChange} required />
        <input name="destination" placeholder="Destination" value={form.destination} onChange={handleChange} required />

        <select name="transportType" value={form.transportType} onChange={handleChange}>
          <option value="air">Avion</option>
          <option value="sea">Bateau</option>
        </select>

        <input name="quantity" placeholder="Quantité (kg ou m³)" type="number" value={form.quantity} onChange={handleChange} required />

        {estimatedPrice !== null && <p><strong>Prix estimé :</strong> {estimatedPrice.toFixed(2)} €</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Obtenir un devis</button>
      </form>
    </div>
  );
};

export default QuoteRequest;
