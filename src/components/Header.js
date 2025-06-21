import React from 'react';
import { useUser, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useUser();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #ddd'
    }}>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">🏠 Dashboard</Link>
        <Link to="/quote-request">💼 Demander un devis</Link>
        <Link to="/track-shipment">📦 Suivi</Link>
        {user?.publicMetadata?.role === 'admin' && <Link to="/admin">⚙️ Admin</Link>}
        {user?.publicMetadata?.role === 'client' && <Link to="/client">👤 Client</Link>}
        {user?.publicMetadata?.role === 'delivery' && <Link to="/delivery">🚚 Livraison</Link>}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user ? (
          <>
            <span>
              Connecté : <strong>{user.primaryEmailAddress?.emailAddress || 'Utilisateur'}</strong>
            </span>
            <UserButton />
            <SignOutButton signOutCallback={() => window.location.href = '/'} />
          </>
        ) : (
          <SignInButton mode="modal" />
        )}
      </div>
    </header>
  );
};

export default Header;
