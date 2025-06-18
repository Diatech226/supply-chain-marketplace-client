
// src/App.js
import React from 'react';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

import PublicDashboard from './pages/PublicDashboard';
import QuoteRequest from './pages/QuoteRequest';
import TrackShipment from './pages/TrackShipment';
import ClientPage from './pages/ClientPage';
import AdminPage from './pages/AdminPage';
import DeliveryPage from './pages/DeliveryPage';
import Header from './components/Header';

const clerkPubKey = 'pk_test_YWxsb3dpbmctcG9sbGl3b2ctMjYuY2xlcmsuYWNjb3VudHMuZGV2JA';


const ProtectedRoute = ({ children, role }) => {
  const { user } = useUser();
  const currentRole = user?.publicMetadata?.role || 'client';

  if (currentRole !== role) {
    return <div style={{ padding: '2rem', color: 'red' }}>⛔ Accès non autorisé</div>;
  }

  return children;
};

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<PublicDashboard />} />
            <Route path="/quote-request" element={<QuoteRequest />} />
            <Route path="/track-shipment" element={<TrackShipment />} />

            <Route path="/client" element={
              <SignedIn><ProtectedRoute role="client"><ClientPage /></ProtectedRoute></SignedIn>
            } />
            <Route path="/admin" element={
              <SignedIn><ProtectedRoute role="admin"><AdminPage /></ProtectedRoute></SignedIn>
            } />
            <Route path="/delivery" element={
              <SignedIn><ProtectedRoute role="delivery"><DeliveryPage /></ProtectedRoute></SignedIn>
            } />

            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ClerkProvider>
  );
}

export default App;
