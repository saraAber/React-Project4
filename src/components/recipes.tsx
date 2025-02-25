// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react';

// // const Recipes = () => {
// //     const [recipes, setRecipes] = useState([]); // מצב לשמירת המתכונים
// //     const [loading, setLoading] = useState(true); // מצב לטעינה

// //     const fetchRecipes = async () => {
// //         try {
// //             const res = await axios("http://localhost:8080/api/recipe");
// //             setRecipes(res.data); // הנחת שהתגובה היא מערך של מתכונים
// //             setLoading(false); // עדכון מצב הטעינה
// //         } catch (error: any) {
// //             console.log("Error fetching recipes:", error);
// //             setLoading(false); // עדכון מצב הטעינה במקרה של שגיאה
// //         }
// //     };

// //     useEffect(() => {
// //         fetchRecipes(); // קריאה לפונקציה כשמטעינים את הקומפוננטה
// //     }, []); // [] כדי להריץ רק פעם אחת

// //     if (loading) {
// //         return <div>Loading...</div>; // הצגת הודעת טעינה
// //     }

// //     return (
// //         <div>
// //             <h2>Recipes</h2>
// //             <ul>
// //                 {recipes.map((recipe) => (
// //                     <li key={recipe.Id}>
// //                         <h3>{recipe.Name}</h3>
// //                         <img src={recipe.Img} alt={recipe.Name} style={{ width: '200px', height: 'auto' }} />
// //                         <p><strong>Duration:</strong> {recipe.Duration} minutes</p>
// //                         <p><strong>Difficulty:</strong> {recipe.Difficulty}</p>
// //                         <p><strong>Description:</strong> {recipe.Description}</p>
// //                         <p><strong>Created At:</strong> {recipe.createdAt}</p>
// //                         <p><strong>Updated At:</strong> {recipe.updatedAt}</p>
// //                         <p><strong>User ID:</strong> {recipe.UserId}</p>
// //                         <p><strong>Category ID:</strong> {recipe.Categoryid}</p>

// //                         <h4>Ingredients:</h4>
// //                         <ul>
// //                             {recipe.Ingridents.map((ingredient) => (
// //                                 <div key={ingredient.Id}>
// //                                     {ingredient.Count} {ingredient.Type} of {ingredient.Name}
// //                                 </div>
// //                             ))}
// //                         </ul>

// //                         <h4>Instructions:</h4>
// //                         <ul>
// //                             {recipe.Instructions.map((instruction) => (
// //                                 <li key={instruction.Id}>
// //                                     {instruction.Name}
// //                                 </li>
// //                             ))}
// //                         </ul>
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //     );
// // };

// // export default Recipes;
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Container, Typography, Card, CardContent, CircularProgress } from '@mui/material';

// const Recipes = () => {
//     const [recipes, setRecipes] = useState([]); // מצב לשמירת המתכונים
//     const [loading, setLoading] = useState(true); // מצב לטעינה

//     const fetchRecipes = async () => {
//         try {
//             const res = await axios("http://localhost:8080/api/recipe");
//             setRecipes(res.data); // הנחת שהתגובה היא מערך של מתכונים
//             setLoading(false); // עדכון מצב הטעינה
//         } catch (error: any) {
//             console.log("Error fetching recipes:", error);
//             setLoading(false); // עדכון מצב הטעינה במקרה של שגיאה
//         }
//     };

//     useEffect(() => {
//         fetchRecipes(); // קריאה לפונקציה כשמטעינים את הקומפוננטה
//     }, []); // [] כדי להריץ רק פעם אחת

//     if (loading) {
//         return <CircularProgress />; // הצגת הודעת טעינה
//     }

//     const deleteRecipe = () => {

//     }

//     return (
//         <Container>
//             <Typography variant="h2" gutterBottom>Recipes</Typography>
//             {recipes.map((recipe) => (
//                 <Card key={recipe.Id} style={{ marginBottom: '20px' }}>
//                     <CardContent>
//                         <Typography variant="h5">{recipe.Name}</Typography>
//                         <img src={recipe.Img} alt={recipe.Name} style={{ width: '200px', height: 'auto' }} />
//                         <Typography><strong>Duration:</strong> {recipe.Duration} minutes</Typography>
//                         <Typography><strong>Difficulty:</strong> {recipe.Difficulty}</Typography>
//                         <Typography><strong>Description:</strong> {recipe.Description}</Typography>
//                         <Typography><strong>Created At:</strong> {recipe.createdAt}</Typography>
//                         <Typography><strong>Updated At:</strong> {recipe.updatedAt}</Typography>
//                         <Typography><strong>User ID:</strong> {recipe.UserId}</Typography>
//                         <Typography><strong>Category ID:</strong> {recipe.Categoryid}</Typography>

//                         <Typography variant="h6">Ingredients:</Typography>
//                         <ul>
//                             {recipe.Ingridents.map((ingredient) => (
//                                 <li key={ingredient.Id}>
//                                     {ingredient.Count} {ingredient.Type} of {ingredient.Name}
//                                 </li>
//                             ))}
//                         </ul>

//                         <Typography variant="h6">Instructions:</Typography>
//                         <ul>
//                             {recipe.Instructions.map((instruction) => (
//                                 <li key={instruction.Id}>
//                                     {instruction.Name}
//                                 </li>
//                             ))}
//                         </ul>
//                         <button onClick={deleteRecipe}>🚮מחיקת מתכון</button>
//                     </CardContent>
//                 </Card>
//             ))}
//         </Container>
//     );
// };

// export default Recipes;


import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Card, CardContent, CircularProgress, Box, Grid, Button } from '@mui/material';
import { UserContext } from './userContext';
import backgroundImage from '../img/רקע1.jpg'; // ודא שהנתיב לתמונה נכון

const Recipes = () => {
    const [recipes, setRecipes] = useState([]); // מצב לשמירת המתכונים
    const [loading, setLoading] = useState(true); // מצב לטעינה
    const { user } = useContext(UserContext); // קבלת המשתמש הנוכחי מ-useContext

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

    const deleteRecipe = async (recipeId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/recipe/${recipeId}`);
            setRecipes(recipes.filter(recipe => recipe.Id !== recipeId));
        } catch (error: any) {
            console.log("Error deleting recipe:", error);
        }
    };

    useEffect(() => {
        fetchRecipes(); // קריאה לפונקציה כשמטעינים את הקומפוננטה
    }, []); // [] כדי להריץ רק פעם אחת

    if (loading) {
        return <CircularProgress />; // הצגת הודעת טעינה
    }

    return (
        <Box
            sx={{
                position: "fixed", // קיבוע ה-Box למסך
                top: 0,
                left: 0,
                height: "100vh", // כיסוי מלא של הגובה
                width: "100vw", // כיסוי מלא של הרוחב
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${backgroundImage})`, // הגדרת התמונה כרקע
                backgroundSize: "cover", // כיסוי מלא של המסך
                backgroundPosition: "center", // מיקום מרכזי של התמונה
                backgroundRepeat: "no-repeat", // ללא חזרה של התמונה
                overflow: "auto", // אפשרות לגלילה
            }}
        >
            <Container>
                <Typography variant="h2" gutterBottom>Recipes</Typography>
                <Grid container spacing={4}>
                    {recipes.map((recipe) => (
                        <Grid item key={recipe.Id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>{recipe.Name}</Typography>
                                    <img src={recipe.Img} alt={recipe.Name} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                                    <Typography variant="body2"><strong>Duration:</strong> {recipe.Duration} minutes</Typography>
                                    <Typography variant="body2"><strong>Difficulty:</strong> {recipe.Difficulty}</Typography>
                                    <Typography variant="body2"><strong>Description:</strong> {recipe.Description}</Typography>
                                    <Typography variant="body2"><strong>Created At:</strong> {recipe.createdAt}</Typography>
                                    <Typography variant="body2"><strong>Updated At:</strong> {recipe.updatedAt}</Typography>
                                    <Typography variant="body2"><strong>User ID:</strong> {recipe.UserId}</Typography>
                                    <Typography variant="body2"><strong>Category ID:</strong> {recipe.Categoryid}</Typography>

                                    <Typography variant="h6" sx={{ mt: 2 }}>Ingredients:</Typography>
                                    <ul>
                                        {recipe.Ingridents.map((ingredient) => (
                                            <li key={ingredient.Id}>
                                                {ingredient.Count} {ingredient.Type} of {ingredient.Name}
                                            </li>
                                        ))}
                                    </ul>

                                    <Typography variant="h6" sx={{ mt: 2 }}>Instructions:</Typography>
                                    <ul>
                                        {recipe.Instructions.map((instruction) => (
                                            <li key={instruction.Id}>
                                                {instruction.Name}
                                            </li>
                                        ))}
                                    </ul>
                                    {user && user.Id === recipe.UserId && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => deleteRecipe(recipe.Id)}
                                            sx={{ mt: 2 }}
                                        >
                                            🚮 מחיקת מתכון
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Recipes;