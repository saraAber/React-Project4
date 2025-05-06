

import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "@mui/icons-material";
import Login from "./components/login";
import Gggg from "./components/home";
import Signup from "./components/signup";
import Recipes from "./components/recipes";
import ShowRecipes from "./components/showRecipies";
import AddRecipe from "./components/addRecipe";
import EditRecipe from "./components/editRecipe";
import Welcome from "./components/welcome";
import RecipeDetail from "./components/RecipeDetail";

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: 'home', element: <Welcome /> },
            { index: true, element: <Gggg /> },
            { path: "/login", element: <Login /> },
            { path: "/logup", element: <Signup /> },
            { path: "/recipes", element: < Recipes /> },
            {path:'/showRecepies',element:<ShowRecipes/>},
            {path:'/addRecipe',element:<AddRecipe/>},
            {path:'/editRecipe/:id', element:<EditRecipe/>},
            {path:'/recipe/:id', element:<RecipeDetail/>},
        ]

    }
]);