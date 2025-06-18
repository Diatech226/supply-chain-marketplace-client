// src/components/ProtectedRoute.js
import React from 'react';
import { RedirectToSignIn, useUser } from '@clerk/clerk-react';

const ProtectedRoute = ({ children, role }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  // En attente du chargement
  if (!isLoaded) return <div>Chargement...</div>;

  // Si non connecté
  if (!isSignedIn) return <RedirectToSignIn />;

  // Si le rôle est manquant ou incorrect
  const currentRole = user?.publicMetadata?.role;
  if (!currentRole || currentRole !== role) {
    return <div>⛔ Accès refusé</div>;
  }

  // Autorisé
  return children;
};

export default ProtectedRoute;
