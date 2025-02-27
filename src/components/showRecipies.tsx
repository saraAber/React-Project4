// import axios from 'axios';
// import React, { useEffect, useState, useContext } from 'react';
// import { Container, Typography, Card, CardContent, CircularProgress, Box, Grid, Button, Avatar } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { deepOrange } from '@mui/material/colors';
// import { UserContext } from '../context/userContext';
// import { useNavigate } from "react-router-dom";

// const ShowRecipes = () => {
//     const navigate = useNavigate();
//     const [recipes, setRecipes] = useState([]); // מצב לשמירת המתכונים
//     const [loading, setLoading] = useState(true); // מצב לטעינה
//     const { user } = useContext(UserContext); // קבלת המשתמש הנוכחי מ-useContext

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

//     const handleDelete = async (id: number, userId: number) => {
//         try {
//             if (user?.Id === userId) {
//                 await axios.post(`http://localhost:8080/api/recipe/delete/${id}`, { Id: id });
//                 setRecipes(recipes.filter(recipe => recipe.Id !== id));
//             } else {
//                 alert(user ? " אינך מורשה למחוק את המתכון מכיוון שאינך יצרת אותו" : " אינך רשאי למחוק את המתכון כי אינך מחובר");
//             }
//         } catch (error) {
//             console.error("שגיאה במחיקת המתכון", error);
//         }
//     };

//     // const handleEdit = async (id: number, userId: number) => {
//     //     if (!(user?.Id === userId)) {
//     //         alert(user ? " אינך מורשה לעדכן את המתכון מכיוון שאינך יצרת אותו" : " אינך רשאי לערוך את המתכון כי אינך מחובר");
//     //     }
//     //     else {
//     //         navigate("/editRecipe");
//     //     }

//     // };
//     useEffect(() => {
//         fetchRecipes(); // קריאה לפונקציה כשמטעינים את הקומפוננטה
//     }, []); // [] כדי להריץ רק פעם אחת

//     if (loading) {
//         return <CircularProgress />; // הצגת הודעת טעינה
//     }

//     return (
//         <Box
//             sx={{
//                 position: 'fixed',
//                 top: 0,
//                 left: 0,
//                 width: '100vw',
//                 height: '100vh',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'flex-start',
//                 alignItems: 'center',
//                 backgroundColor: '#ffffff', // רקע לבן נקי
//                 overflow: 'auto', // אפשרות לגלילה
//             }}
//         >
//             <Container>
//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, mb: 2 }}>
//                     {/* <Avatar
//                         sx={{ bgcolor: "#11111" }}
//                         alt="Remy Sharp"
//                         src="/broken-image.jpg"
//                     >
//                         {user.Name[0]}
//                     </Avatar> */}
//                 </Box>
//                 <Typography variant="h2" gutterBottom>Recipes</Typography>
//                 <Grid container spacing={4}>
//                     {recipes.map((recipe) => (
//                         <Grid item key={recipe.Id} xs={12} sm={6} md={4}>
//                             <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                                 <CardContent>
//                                     <Typography variant="h5" gutterBottom>{recipe.Name}</Typography>
//                                     <img src={recipe.Img} alt={recipe.Name} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
//                                     <Typography variant="body2"><strong>Duration:</strong> {recipe.Duration} minutes</Typography>
//                                     <Typography variant="body2"><strong>Difficulty:</strong> {recipe.Difficulty}</Typography>
//                                     <Typography variant="body2"><strong>Description:</strong> {recipe.Description}</Typography>
//                                     <Typography variant="body2"><strong>Created At:</strong> {recipe.createdAt}</Typography>
//                                     <Typography variant="body2"><strong>Updated At:</strong> {recipe.updatedAt}</Typography>
//                                     <Typography variant="body2"><strong>User ID:</strong> {recipe.UserId}</Typography>
//                                     <Typography variant="body2"><strong>Category ID:</strong> {recipe.CategoryId}</Typography>

//                                     <Typography variant="h6" sx={{ mt: 2 }}>Ingredients:</Typography>
//                                     <ul>
//                                         {recipe.Ingridents.map((ingredient) => (
//                                             <li key={ingredient.Id}>
//                                                 {ingredient.Count} {ingredient.Type} of {ingredient.Name}
//                                             </li>
//                                         ))}
//                                     </ul>

//                                     <Typography variant="h6" sx={{ mt: 2 }}>Instructions:</Typography>
//                                     <ul>
//                                         {recipe.Instructions.map((instruction) => (
//                                             <li key={instruction.Id}>
//                                                 {instruction.Name}
//                                             </li>
//                                         ))}
//                                     </ul>

//                                     <Button
//                                         variant="contained"
//                                         color="secondary"
//                                         onClick={() => handleDelete(recipe.Id, recipe.UserId)}
//                                     >
//                                         Delete Recipe
//                                     </Button>
//                                     <Button
//                                         variant="contained"
//                                         color="secondary"
//                                         onClick={() => navigate(`/editRecipe/${recipe.Id}`)} // העברת ה-Id ב-URL
//                                     >
//                                         Edit Recipe
//                                     </Button>

//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Container>
//         </Box>
//     );
// };

// export default ShowRecipes;




import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Card, CardContent, CircularProgress, Box, Grid, Button, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deepOrange } from '@mui/material/colors';
import { UserContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";

const ShowRecipes = () => {
    const navigate = useNavigate();
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

    const handleDelete = async (id: number, userId: number) => {
        try {
            if (user?.Id === userId) {
                await axios.post(`http://localhost:8080/api/recipe/delete/${id}`, { Id: id });
                setRecipes(recipes.filter(recipe => recipe.Id !== id));
            } else {
                alert(user ? " אינך מורשה למחוק את המתכון מכיוון שאינך יצרת אותו" : " אינך רשאי למחוק את המתכון כי אינך מחובר");
            }
        } catch (error) {
            console.error("שגיאה במחיקת המתכון", error);
        }
    };

    const handleEdit = (id: number, userId: number) => {
        if (user?.Id === userId) {
            navigate(`/editRecipe/${id}`);
        } else {
            alert(user ? " אינך מורשה לעדכן את המתכון מכיוון שאינך יצרת אותו" : " אינך רשאי לערוך את המתכון כי אינך מחובר");
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
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.5)', // רקע שקוף למחצה כדי לא להסתיר את תמונת הרקע
                overflow: 'auto', // אפשרות לגלילה
            }}
        >
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, mb: 2 }}>
                    {/* <Avatar
                        sx={{ bgcolor: "#11111" }}
                        alt="Remy Sharp"
                        src="/broken-image.jpg"
                    >
                        {user.Name[0]}
                    </Avatar> */}
                </Box>
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
                                    <Typography variant="body2"><strong>Category ID:</strong> {recipe.CategoryId}</Typography>

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

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(recipe.Id, recipe.UserId)}
                                    >
                                        Delete Recipe
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleEdit(recipe.Id, recipe.UserId)}
                                    >
                                        Edit Recipe
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default ShowRecipes;