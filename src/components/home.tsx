import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, Paper } from "@mui/material";

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff", // רקע לבן נקי
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 5,
                    borderRadius: "12px",
                    backgroundColor: "#ffffff", // מסגרת לבנה אלגנטית
                    width: "400px",
                    textAlign: "center",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // צל עדין למראה מקצועי
                }}
            >
                <Typography variant="h4" fontWeight="600" color="text.primary" gutterBottom>
                    ברוכים הבאים
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 3 }}>
                    התחברו או הירשמו כדי להמשיך 🎯
                </Typography>

                {/* כפתור כניסה */}
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/login")}
                    sx={{
                        padding: "12px",
                        fontSize: "1rem",
                        borderRadius: "8px",
                        boxShadow: "none",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#1565c0" },
                    }}
                >
                    כניסה
                </Button>

                {/* כפתור הרשמה עם מסגרת תכלת */}
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                        marginTop: 2,
                        padding: "12px",
                        fontSize: "1rem",
                        borderRadius: "8px",
                        textTransform: "none",
                        color: "#1976d2", // צבע תכלת
                        borderColor: "#1976d2", // מסגרת תכלת
                        "&:hover": { backgroundColor: "#1976d2", color: "white" }, // רקע תכלת בלחיצה
                    }}
                    onClick={() => navigate("/logup")}
                >
                    הרשמה
                </Button>
            </Paper>
        </Box>
    );
};

export default Home;
