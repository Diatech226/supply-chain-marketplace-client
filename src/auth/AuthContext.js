import { ClerkProvider, useUser, useAuth } from '@clerk/clerk-react';
import { useEffect, createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const syncUser = async () => {
      if (!user) return;

      try {
        const token = await getToken();
        const res = await fetch('http://localhost:5000/api/users/me', { credentials: 'include' })

        const data = await res.json();
        setDbUser(data.user);
      } catch (err) {
        console.error("❌ Sync error:", err);
      }
    };

    syncUser();
  }, [user]);

  return (
    <UserContext.Provider value={{ clerkUser: user, dbUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuthUser = () => useContext(UserContext);
