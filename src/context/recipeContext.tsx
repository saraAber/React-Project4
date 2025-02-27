import React, { createContext, useState, useContext, ReactNode } from "react";

// 🎯 נגדיר סוג (Type) לנתוני המוצר במתכון
interface Ingredient {
  Name: string;
  Count: number;
  Type: string;
}

// 🎯 נגדיר סוג (Type) לנתוני המתכון
interface Recipe {
  Id: string;
  Name: string;
  Instructions: string[];
  Difficulty: string;
  Duration: string;
  Description: string;
  UserId: string;
  CategoryId: number;
  Img: string;
  Ingredient: Ingredient[];
}

// 🎯 נגדיר את ה-Context Interface (אובייקט ברירת מחדל)
interface RecipeContextType {
  recipes: Recipe[];
  addRecipe: (recipeData: Recipe) => void;
  removeRecipe: (recipeId: string) => void;
}

// 🎯 יצירת ה-Context עם ערכים ריקים כברירת מחדל
export const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  addRecipe: () => {},
  removeRecipe: () => {},
});

// 🎯 ספק הנתונים (Provider) - עוטף את האפליקציה
export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // 🔹 פונקציה להוספת מתכון
  const addRecipe = (recipeData: Recipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, recipeData]);
  };

  // 🔹 פונקציה להסרת מתכון
  const removeRecipe = (recipeId: string) => {
    setRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe.Id !== recipeId));
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, removeRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

// 🎯 פונקציה מותאמת ל-Context לשימוש נוח יותר
export const useRecipe = () => useContext(RecipeContext);

