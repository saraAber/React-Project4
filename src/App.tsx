import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login'
import Home from './components/home'
import LogUp from './components/signup'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext, UserProvider } from './context/userContext'
import Profile from './components/profile'
import Signup from './components/signup'
import Recipes from './components/recipes'
import AddRecipe from './components/addRecipe'
import Recepies from './components/recipes'
import ShowRecipes from './components/showRecipies'
import EditRecipe from './components/editRecipe'

function App() {
  return (
  //  <UserContext>
  //   <>
  //   <Home/>
  //   </>
  // </UserContext>
    <UserProvider>
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/addRecipe'element={<AddRecipe/>}/>
          <Route path='/showRecepies'element={<ShowRecipes/>}/>
          {/* <Route path='/editRecipe'element={<EditRecipe/>}/> */}
          <Route path='/editRecipe/:id' element={<EditRecipe/>}/>

          {/* <Route path="/" element={<Recepies />} /> */}
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
