import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users/me', {
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error('❌ Sync error:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    syncUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
