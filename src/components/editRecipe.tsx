import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import { UserContext } from "../context/userContext"; // ייבוא של UserContext

const EditRecipe = () => {
    const { id } = useParams(); // קבלת ה-Id מה-URL
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(UserContext); // שימוש ב-UserContext כדי לקבל את ה-ID של המשתמש

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/recipe/${id}`);
                setRecipe(res.data);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/api/recipe/${id}`, {
                Name: recipe.Name,
                Description: recipe.Description,
                Duration: recipe.Duration,
                Difficulty: recipe.Difficulty,
                CategoryId: recipe.CategoryId,
                Img: recipe.Img,
                Ingridents: recipe.Ingridents,
                Instructions: recipe.Instructions,
            });
            navigate('/showRecepies'); // ניווט לדף המתכונים אחרי העדכון
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    };

    const addIngredient = () => {
        const newIngredient = { Name: '', Count: 0, Type: '' };
        setRecipe({ ...recipe, Ingridents: [...recipe.Ingridents, newIngredient] });
    };

    const removeIngredient = (index) => {
        const updatedIngredients = recipe.Ingridents.filter((_, i) => i !== index);
        setRecipe({ ...recipe, Ingridents: updatedIngredients });
    };

    const addInstruction = () => {
        setRecipe({ ...recipe, Instructions: [...recipe.Instructions, ''] });
    };

    const removeInstruction = (index) => {
        const updatedInstructions = recipe.Instructions.filter((_, i) => i !== index);
        setRecipe({ ...recipe, Instructions: updatedInstructions });
    };

    if (!recipe) {
        return <Typography>Loading...</Typography>; // הודעת טעינה
    }

    const isUserAuthorized = user?.Id === recipe.UserId; // בדיקה אם המשתמש מורשה לערוך את המתכון

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={10} md={6}>
                <Box>
                    <Typography variant="h4" align="center">Edit Recipe</Typography>
                    <TextField
                        label="Recipe Name"
                        value={recipe.Name}
                        onChange={(e) => setRecipe({ ...recipe, Name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        value={recipe.Description}
                        onChange={(e) => setRecipe({ ...recipe, Description: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Duration (minutes)"
                        type="number"
                        value={recipe.Duration}
                        onChange={(e) => setRecipe({ ...recipe, Duration: e.target.value })}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            inputProps: { min: 0 },
                        }}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Difficulty</InputLabel>
                        <Select
                            value={recipe.Difficulty}
                            onChange={(e) => setRecipe({ ...recipe, Difficulty: e.target.value })}
                        >
                            <MenuItem value="קל">קל</MenuItem>
                            <MenuItem value="בינוני">בינוני</MenuItem>
                            <MenuItem value="קשה">קשה</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={recipe.CategoryId}
                            onChange={(e) => setRecipe({ ...recipe, CategoryId: e.target.value })}
                        >
                            <MenuItem value="חלבי">חלבי</MenuItem>
                            <MenuItem value="פרווה">פרווה</MenuItem>
                            <MenuItem value="בשרי">בשרי</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Image URL"
                        value={recipe.Img}
                        onChange={(e) => setRecipe({ ...recipe, Img: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Typography variant="h6">Ingredients</Typography>
                    {recipe.Ingridents.map((ingredient, index) => (
                        <Box key={index} display="flex" alignItems="center">
                            <TextField
                                label={`Ingredient ${index + 1} Name`}
                                value={ingredient.Name}
                                onChange={(e) => {
                                    const updatedIngredients = [...recipe.Ingridents];
                                    updatedIngredients[index].Name = e.target.value;
                                    setRecipe({ ...recipe, Ingridents: updatedIngredients });
                                }}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Count"
                                type="number"
                                value={ingredient.Count}
                                onChange={(e) => {
                                    const updatedIngredients = [...recipe.Ingridents];
                                    updatedIngredients[index].Count = e.target.value;
                                    setRecipe({ ...recipe, Ingridents: updatedIngredients });
                                }}
                                margin="normal"
                            />
                            <TextField
                                label="Type"
                                value={ingredient.Type}
                                onChange={(e) => {
                                    const updatedIngredients = [...recipe.Ingridents];
                                    updatedIngredients[index].Type = e.target.value;
                                    setRecipe({ ...recipe, Ingridents: updatedIngredients });
                                }}
                                margin="normal"
                            />
                            <Button variant="contained" color="secondary" onClick={() => removeIngredient(index)}>Remove</Button>
                        </Box>
                    ))}
                    <Button variant="contained" onClick={addIngredient}>Add Ingredient</Button>

                    <Typography variant="h6">Instructions</Typography>
                    {recipe.Instructions.map((instruction, index) => (
                        <Box key={index} display="flex" alignItems="center">
                            <TextField
                                label={`Instruction ${index + 1}`}
                                value={instruction}
                                onChange={(e) => {
                                    const updatedInstructions = [...recipe.Instructions];
                                    updatedInstructions[index] = e.target.value;
                                    setRecipe({ ...recipe, Instructions: updatedInstructions });
                                }}
                                fullWidth
                                margin="normal"
                            />
                            <Button variant="contained" color="secondary" onClick={() => removeInstruction(index)}>Remove</Button>
                        </Box>
                    ))}
                    <Button variant="contained" onClick={addInstruction}>Add Instruction</Button>
                    <br />
                    {isUserAuthorized && ( // הצגת כפתור העדכון רק אם המשתמש מורשה
                        <Button variant="contained" onClick={handleUpdate}>
                            Update Recipe
                        </Button>
                    )}
                    {!isUserAuthorized && (
                        alert("אינך כתבת את המתכון כך שאין לך אופציה לערוך אותו")
                    )}
                    {!isUserAuthorized && navigate('/showRecepies')}
                </Box>
            </Grid>
        </Grid>
    );
};

export default EditRecipe;
