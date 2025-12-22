import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Components/AuthContext/AuthContext'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import LandingPage from './Components/LandingPage/LandingPageP'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landingpage" element={<LandingPage />} />
        </Routes>
      </Router>
    </AuthProvider>

  )
}

export default App
