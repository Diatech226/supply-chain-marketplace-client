// src/pages/PublicDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const PublicDashboard = () => {
  return (
    <div>
      <h1>Bienvenue sur notre plateforme logistique</h1>
      <p>Obtenez un devis ou suivez votre colis ci-dessous :</p>
      <Link to="/quote-request">Demander un devis</Link>
      <br />
      <Link to="/track-shipment">Suivre un colis</Link>
    </div>
  );
};

export default PublicDashboard;