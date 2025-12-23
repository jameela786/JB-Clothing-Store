// Components/ProtectedRoute/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingScreen />;
    }

    if (!isLoggedIn) {
        // ✅ Redirect to login with return URL
        return <Navigate 
            to={`/login?redirect=${location.pathname}`} 
            replace 
        />;
    }

    return children;
};

// ✅ BONUS: Guest-only routes (login/register)
export const GuestRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return <LoadingScreen />;
    }

    if (isLoggedIn) {
        // Already logged in, go to home
        return <Navigate to="/landingpage" replace />;
    }

    return children;
};