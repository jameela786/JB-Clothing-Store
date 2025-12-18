import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        </Routes>
        

 
    </Router>
  )
}

export default App
