import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]); // מצב לשמירת המתכונים
    const [loading, setLoading] = useState(true); // מצב לטעינה

    const fetchRecipes = async () => {
        try {
            const res = await axios("http://localhost:8080/api/recipe");
            setRecipes(res.data); // הנחת שהתגובה היא מערך של מתכונים
            setLoading(false); // עדכון מצב הטעינה
        } catch (error: any) {
            console.log("Error fetching recipes:", error);
            setLoading(false); // עדכון מצב הטעינה במקרה של שגיאה
        }
    };

    useEffect(() => {
        fetchRecipes(); // קריאה לפונקציה כשמטעינים את הקומפוננטה
    }, []); // [] כדי להריץ רק פעם אחת

    if (loading) {
        return <div>Loading...</div>; // הצגת הודעת טעינה
    }

    return (
        <div>
            <h2>Recipes</h2>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.Id}>
                        <h3>{recipe.Name}</h3>
                        <img src={recipe.Img} alt={recipe.Name} style={{ width: '200px', height: 'auto' }} />
                        <p><strong>Duration:</strong> {recipe.Duration} minutes</p>
                        <p><strong>Difficulty:</strong> {recipe.Difficulty}</p>
                        <p><strong>Description:</strong> {recipe.Description}</p>
                        <p><strong>Created At:</strong> {recipe.createdAt}</p>
                        <p><strong>Updated At:</strong> {recipe.updatedAt}</p>
                        <p><strong>User ID:</strong> {recipe.UserId}</p>
                        <p><strong>Category ID:</strong> {recipe.Categoryid}</p>

                        <h4>Ingredients:</h4>
                        <ul>
                            {recipe.Ingridents.map((ingredient) => (
                                <div key={ingredient.Id}>
                                    {ingredient.Count} {ingredient.Type} of {ingredient.Name}
                                </div>
                            ))}
                        </ul>

                        <h4>Instructions:</h4>
                        <ul>
                            {recipe.Instructions.map((instruction) => (
                                <li key={instruction.Id}>
                                    {instruction.Name}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recipes;
