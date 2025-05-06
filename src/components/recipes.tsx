"use client"

import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import AddIcon from "@mui/icons-material/Add"
import VisibilityIcon from "@mui/icons-material/Visibility"
import HomeIcon from "@mui/icons-material/Home"

const Recipes = () => {
  const navigate = useNavigate()

  // Sample featured recipes - this would typically come from your API
  const featuredRecipes = [
    {
      id: 1,
      title: "פסטה ברוטב עגבניות",
      image:
        "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1008&q=80",
      description: "פסטה ברוטב עגבניות ביתי עשיר",
    },
    {
      id: 2,
      title: "סלט ירקות טרי",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description: "סלט ירקות טרי עם רוטב שמן זית ולימון",
    },
    {
      id: 3,
      title: "עוגת שוקולד",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      description: "עוגת שוקולד עשירה ונימוחה",
    },
  ]

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: 10, // Space for the fixed header
        pb: 5,
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Hero Section */}
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.5)",
          }}
        />
        <Box
          sx={{
            position: "relative",
            p: { xs: 3, md: 6 },
            textAlign: "center",
          }}
        >
          <Typography component="h1" variant="h3" color="inherit" gutterBottom fontWeight="bold">
            עולם המתכונים שלנו
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            גלו מתכונים חדשים, שתפו את היצירות שלכם, והתחברו לקהילת הבישול שלנו
          </Typography>
        </Box>
      </Paper>

      <Container maxWidth="lg">
        {/* Action Buttons */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: 4,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                },
              }}
            >
              <VisibilityIcon sx={{ fontSize: 48, color: "#b57e2c", mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight="medium">
                צפייה במתכונים
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                גלו מגוון רחב של מתכונים מעוררי השראה
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/showRecepies")}
                startIcon={<VisibilityIcon />}
                sx={{
                  mt: "auto",
                  backgroundColor: "#000",
                  "&:hover": { backgroundColor: "#333" },
                  borderRadius: 2,
                }}
              >
                לצפייה במתכונים
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: 4,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                },
              }}
            >
              <AddIcon sx={{ fontSize: 48, color: "#b57e2c", mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight="medium">
                הוספת מתכון
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                שתפו את המתכונים האהובים עליכם עם הקהילה
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/addRecipe")}
                startIcon={<AddIcon />}
                sx={{
                  mt: "auto",
                  backgroundColor: "#b57e2c",
                  "&:hover": { backgroundColor: "#8c6321" },
                  borderRadius: 2,
                }}
              >
                להוספת מתכון
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: 4,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                },
              }}
            >
              <HomeIcon sx={{ fontSize: 48, color: "#b57e2c", mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight="medium">
                חזרה לעמוד הבית
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                חזרו לעמוד הראשי של האתר
              </Typography>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/")}
                startIcon={<HomeIcon />}
                sx={{
                  mt: "auto",
                  borderColor: "#000",
                  color: "#000",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
                  borderRadius: 2,
                }}
              >
                לעמוד הבית
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Featured Recipes */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
            מתכונים מומלצים
          </Typography>
          <Grid container spacing={4}>
            {featuredRecipes.map((recipe) => (
              <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardMedia component="img" height="200" image={recipe.image} alt={recipe.title} />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {recipe.title}
                    </Typography>
                    <Typography>{recipe.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => navigate("/showRecepies")} sx={{ color: "#b57e2c" }}>
                      צפייה במתכון
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default Recipes
