import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { API_BASE } from '../api/api';

const AdminPricing = () => {
  const { getToken } = useAuth();

  const [form, setForm] = useState({
    origin: '',
    destination: '',
    transportType: 'air',
    unitType: 'kg',
    pricePerUnit: ''
  });

  const [pricings, setPricings] = useState([]);
  const [error, setError] = useState('');

  const fetchPricings = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/pricing`);
      if (!res.ok) throw new Error('Erreur lors du chargement des tarifs');
      const data = await res.json();

      // 🔧 Corrige si l'API retourne un objet contenant le tableau
      setPricings(Array.isArray(data) ? data : data.pricings || []);
    } catch (err) {
      setError('Erreur de chargement : ' + err.message);
    }
  };

  useEffect(() => {
    fetchPricings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 🔄 Lorsque le transport change, forcer automatiquement le bon type d'unité
    let newUnitType = form.unitType;
    if (name === 'transportType') {
      newUnitType = value === 'air' ? 'kg' : 'm3';
    }

    setForm({
      ...form,
      [name]: value,
      ...(name === 'transportType' ? { unitType: newUnitType } : {})
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE}/api/pricing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Erreur à la création');
      await res.json();
      alert('✅ Tarif créé avec succès');

      setForm({
        origin: '',
        destination: '',
        transportType: 'air',
        unitType: 'kg',
        pricePerUnit: ''
      });

      fetchPricings();
    } catch (err) {
      console.error('Erreur soumission :', err);
      alert(err.message || 'Erreur');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE}/api/pricing/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      fetchPricings();
    } catch (err) {
      alert(err.message || 'Erreur');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Créer un tarif</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="origin"
          placeholder="Origine"
          value={form.origin}
          onChange={handleChange}
          required
        />
        <input
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          required
        />
        <select
          name="transportType"
          value={form.transportType}
          onChange={handleChange}
        >
          <option value="air">Avion</option>
          <option value="sea">Bateau</option>
        </select>
        <input
          name="unitType"
          value={form.unitType}
          disabled // désactivé car automatique
          readOnly
        />
        <input
          name="pricePerUnit"
          type="number"
          placeholder="Prix par unité"
          value={form.pricePerUnit}
          onChange={handleChange}
          required
        />
        <button type="submit">Créer</button>
      </form>

      <hr />
      <h3>Tarifs existants</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {pricings.length > 0 ? (
          pricings.map((p) => (
            <li key={p._id}>
              {p.origin} → {p.destination} | {p.transportType} | {p.unitType} : {p.pricePerUnit} €
              <button
                onClick={() => handleDelete(p._id)}
                style={{ marginLeft: '1rem', color: 'red' }}
              >
                Supprimer
              </button>
            </li>
          ))
        ) : (
          <p>Aucun tarif enregistré</p>
        )}
      </ul>
    </div>
  );
};

export default AdminPricing;
