import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
    const { id } = useParams(); // קבלת ה-ID מהכתובת
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchRecipe = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/recipe/${id}`);
            setRecipe(response.data);
            setLoading(false);
        } catch (error) {
            console.error("שגיאה בטעינת המתכון", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipe();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!recipe) {
        return <Typography variant="h6">מתכון לא נמצא</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>{recipe.Name}</Typography>
            <img src={recipe.Img} alt={recipe.Name} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
            <Typography variant="h6"><strong>רכיבים:</strong></Typography>
            <Typography variant="body1">
                {recipe.Ingredients && recipe.Ingredients.length > 0 
                    ? recipe.Ingredients.join(', ') 
                    : "אין רכיבים זמינים"}
            </Typography>
            <Typography variant="h6"><strong>הוראות:</strong></Typography>
            <Typography variant="body1">{recipe.Instructions || "אין הוראות זמינות"}</Typography>
            <Button variant="contained" onClick={() => navigate(-1)}>חזור</Button>
        </Container>
    );
};

export default RecipeDetail;
