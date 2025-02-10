import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login'
import Home from './components/home'
import LogUp from './components/signup'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './components/userContext'
import Profile from './profile'
import Signup from './components/signup'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logup" element={<Signup />} />
        <Route path="/profile" element={<Profile></Profile>} />
      </Routes>
    </Router>    
    </>
  )
}

export default App
