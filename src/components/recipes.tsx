import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Recipes = () => {
    const navigate = useNavigate();

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
                backgroundColor: '#ffffff', // רקע לבן נקי
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    mt: 4, // מרווח עליון כדי להפריד בין הכפתורים לתוכן
                    marginBottom: 4, // מרווח תחתון כדי להפריד בין הכפתורים לתוכן
                }}
            >
                <Typography variant="h4" gutterBottom>
                    ברוכים הבאים לדף המתכונים
                </Typography>
                <Typography variant="body1">
                    כאן תוכלו לצפות במתכונים, להוסיף מתכונים חדשים ולחזור לעמוד הבית.
                </Typography>
            </Container>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/showRecepies')}
                    sx={{ flex: 1, mx: 1 }}
                >
                    צפיה במתכונים
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate('/addRecipe')}
                    sx={{ flex: 1, mx: 1 }}
                >
                    הוספת מתכון
                </Button>
                <Button
                    variant="contained"
                    color="default"
                    onClick={() => navigate('/')}
                    sx={{ flex: 1, mx: 1 }}
                >
                    חזרה לעמוד הבית
                </Button>
            </Box>
        </Box>
    );
};

export default Recipes;