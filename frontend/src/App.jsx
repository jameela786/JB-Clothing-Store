import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Components/AuthContext/AuthContext'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import LandingPage from './Components/LandingPage/LandingPageP'
import LoadingScreen from './Components/LoadingScreen/LoadingScreen'
import { GuestRoute } from './Components/ProtectedRoute/ProtectedRoute'
import { ProtectedRoute } from './Components/ProtectedRoute/ProtectedRoute'
import { ProductDetail } from './Components/ProductDetail/ProductDetail'
import { useAuth } from './Components/AuthContext/AuthContext'
// import './App.css'

function App() {


  return (
    <AuthProvider>
      <AuthChecker>


        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            {/* GUEST ONLY - Redirect to home if already logged in */}
            <Route path="/login" element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            } />
          </Routes>
        </Router>
      </AuthChecker>
    </AuthProvider>

  )
}

function AuthChecker({ children }) {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />; // Show spinner while checking auth
  }

  return children;
}

export default App
