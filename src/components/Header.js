// src/components/Header.js
import React from 'react';
import { useUser, SignInButton, SignOutButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useUser();

  return (
    <header style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', backgroundColor: '#eee' }}>
      <Link to="/">🏠 Accueil</Link>
      <nav>
        {user ? (
          <>
            <span style={{ marginRight: '1rem' }}>
              Connecté : {user?.primaryEmailAddress?.emailAddress || user?.username}
            </span>
            <SignOutButton signOutCallback={() => window.location.href = '/'} />
          </>
        ) : (
          <SignInButton mode="modal" />
        )}
      </nav>
    </header>
  );
};

export default Header;
