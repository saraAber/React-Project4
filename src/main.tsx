import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login, Receipt } from '@mui/icons-material'
import Signup from './components/signup.tsx'
import ShowRecipes from './components/showRecipies.tsx'
import EditRecipe from './components/editRecipe.tsx'
import AddRecipe from './components/addRecipe.tsx'
import Recipes from './components/recipes.tsx'

// const routes = createBrowserRouter([
//   {
//     path: "*", element: <App />, children: [
//       // {path:"add-recipe",element:<AddRecipe/>},
//       {
//         path: "Login",
//         element: <Login />
//       },{path: "Signup",
//         element: <Signup />},
//         {path:"Recipes",element:<Recipes/>,children:
//           [{path:"ShowRecipes",element:<ShowRecipes/>}
//           ,{path:"edit-recipe/:name",element:<EditRecipe/>}
//         ]},
      
//       {path:"add-recipe",element:<AddRecipe/>}]
     
//   }
 
// ])
// createRoot(document.getElementById('root')!).render(
//   <RouterProvider router={routes} />,
//   //add-recipe
// )


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
