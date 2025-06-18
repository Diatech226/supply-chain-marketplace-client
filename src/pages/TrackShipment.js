
// src/pages/TrackShipment.js
import React, { useState } from 'react';

const TrackShipment = () => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);

  const handleTrack = async () => {
    const res = await fetch(`/api/shipments/track/${code}`);
    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <input placeholder="Code de suivi" onChange={(e) => setCode(e.target.value)} />
      <button onClick={handleTrack}>Suivre</button>
      {result && (
        <div>
          <p>Status: {result.status}</p>
          <p>Destination: {result.destination}</p>
        </div>
      )}
    </div>
  );
};

export default TrackShipment;