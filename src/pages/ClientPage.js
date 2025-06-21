import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

const ClientPage = () => {
  const { getToken } = useAuth();
  const [quotes, setQuotes] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();

        const quoteRes = await fetch('/api/quotes/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const shipmentRes = await fetch('/api/client/shipments', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const quoteData = await quoteRes.json();
        const shipmentData = await shipmentRes.json();

        setQuotes(quoteData.quotes || []);
        setShipments(shipmentData || []);
      } catch (err) {
        console.error(err);
        setError('Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mes devis</h2>
      <ul>
        {quotes.map((q) => (
          <li key={q._id}>
            {q.productType} - {q.destination} - {q.deliveryType} - {q.price} €
          </li>
        ))}
      </ul>

      <hr />

      <h2>Mes colis</h2>
      <ul>
        {shipments.map((s) => (
          <li key={s._id}>
            Tracking: {s.trackingCode} - Statut: {s.status} - Destination: {s.destination}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientPage;
