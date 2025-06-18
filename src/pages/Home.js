import { useAuthUser } from '../auth/AuthContext';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { dbUser } = useAuthUser();

  if (!dbUser) return <div>Chargement...</div>;

  switch (dbUser.role) {
    case 'client':
      return <Navigate to="/client" />;
    case 'livreur':
      return <Navigate to="/delivery" />;
    case 'admin':
      return <Navigate to="/admin" />;
    default:
      return <div>Rôle inconnu.</div>;
  }
};

export default Home;
