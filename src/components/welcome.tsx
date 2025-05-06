"use client"

import { Outlet, useNavigate } from "react-router-dom"
import { Button, Typography, Box, Paper, Container, Stack } from "@mui/material"
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu"

const Welcome = () => {
  const navigate = useNavigate()

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          backgroundImage: 'url("/רקע1.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={6}
            sx={{
              padding: 5,
              borderRadius: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(10px)",
              width: "100%",
              textAlign: "center",
              boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Box sx={{ mb: 4 }}>
              <RestaurantMenuIcon sx={{ fontSize: 60, color: "#b57e2c", mb: 2 }} />
              <Typography
                variant="h3"
                fontWeight="700"
                color="text.primary"
                gutterBottom
                sx={{
                  background: "linear-gradient(45deg, #b57e2c 30%, #000000 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ברוכים הבאים
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
                התחברו או הירשמו כדי להמשיך לאזור האישי
              </Typography>
            </Box>

            <Stack spacing={2}>
              {/* כפתור כניסה */}
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{
                  padding: "16px",
                  fontSize: "1.1rem",
                  borderRadius: "12px",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                  textTransform: "none",
                  backgroundColor: "#000000",
                  "&:hover": {
                    backgroundColor: "#333333",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                    transition: "all 0.2s ease",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                כניסה
              </Button>

              {/* כפתור הרשמה */}
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  padding: "16px",
                  fontSize: "1.1rem",
                  borderRadius: "12px",
                  textTransform: "none",
                  color: "#000000",
                  borderColor: "#000000",
                  borderWidth: "2px",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    borderColor: "#000000",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    transition: "all 0.2s ease",
                  },
                  transition: "all 0.2s ease",
                }}
                onClick={() => navigate("/logup")}
              >
                הרשמה
              </Button>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
              הצטרפו אלינו וגלו מתכונים מדהימים
            </Typography>
          </Paper>
        </Container>
        <Outlet />
      </Box>
    </>
  )
}

export default Welcome
