"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Divider,
  CircularProgress,
  Card,
  CardMedia,
  Snackbar,
  Alert,
  Breadcrumbs,
  Link,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import SaveIcon from "@mui/icons-material/Save"
import EditIcon from "@mui/icons-material/Edit"
import HomeIcon from "@mui/icons-material/Home"
import MenuBookIcon from "@mui/icons-material/MenuBook"

const EditRecipe = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [previewImage, setPreviewImage] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const fetchRecipe = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:8080/api/recipe/${id}`)
      setRecipe(response.data)
      setPreviewImage(response.data.Img || "")
    } catch (error) {
      console.error("Error fetching recipe:", error)
      setError("שגיאה בטעינת המתכון")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/category")
      setCategories(response.data)
    } catch (error) {
      console.error("Error fetching categories:", error)
      setError("שגיאה בטעינת הקטגוריות")
    }
  }

  useEffect(() => {
    fetchRecipe()
    fetchCategories()
  }, [id])

  const handleUpdate = async () => {
    if (recipe) {
      setLoading(true)
      try {
        await axios.post("http://localhost:8080/api/recipe/edit", recipe)
        setSuccess(true)
        setTimeout(() => {
          navigate("/showRecepies")
        }, 2000)
      } catch (error) {
        console.error("Error updating recipe:", error)
        setError("שגיאה בעדכון המתכון")
      } finally {
        setLoading(false)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (recipe) {
      setRecipe({
        ...recipe,
        [name]: value,
      })
      if (name === "Img") {
        setPreviewImage(value)
      }
    }
  }

  const handleInstructionChange = (index, value) => {
    if (recipe) {
      const newInstructions = [...recipe.Instructions]
      newInstructions[index] = { Name: value }
      setRecipe({
        ...recipe,
        Instructions: newInstructions,
      })
    }
  }

  const handleIngredientsChange = (index, e) => {
    const { name, value } = e.target
    if (recipe) {
      const newIngridents = [...recipe.Ingridents]
      newIngridents[index] = { ...newIngridents[index], [name]: value }
      setRecipe({
        ...recipe,
        Ingridents: newIngridents,
      })
    }
  }

  const addInstruction = () => {
    if (recipe) {
      setRecipe({
        ...recipe,
        Instructions: [...recipe.Instructions, { Name: "" }],
      })
    }
  }

  const addIngredient = () => {
    if (recipe) {
      setRecipe({
        ...recipe,
        Ingridents: [...recipe.Ingridents, { Name: "", Count: "", Type: "" }],
      })
    }
  }

  const removeInstruction = (index) => {
    if (recipe && recipe.Instructions.length > 1) {
      const newInstructions = [...recipe.Instructions]
      newInstructions.splice(index, 1)
      setRecipe({
        ...recipe,
        Instructions: newInstructions,
      })
    }
  }

  const removeIngredient = (index) => {
    if (recipe && recipe.Ingridents.length > 1) {
      const newIngridents = [...recipe.Ingridents]
      newIngridents.splice(index, 1)
      setRecipe({
        ...recipe,
        Ingridents: newIngridents,
      })
    }
  }

  if (loading && !recipe) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size={60} thickness={4} sx={{ color: "#b57e2c" }} />
      </Box>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link
          underline="hover"
          color="inherit"
          href="/"
          onClick={(e) => {
            e.preventDefault()
            navigate("/")
          }}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          ראשי
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/showRecepies"
          onClick={(e) => {
            e.preventDefault()
            navigate("/showRecepies")
          }}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <MenuBookIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          מתכונים
        </Link>
        <Typography color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
          <EditIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          עריכת מתכון
        </Typography>
      </Breadcrumbs>

      {recipe ? (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <EditIcon sx={{ fontSize: 40, color: "#b57e2c", mb: 1 }} />
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              עריכת מתכון
            </Typography>
            <Typography variant="body1" color="text.secondary">
              עדכן את פרטי המתכון שלך
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth label="שם המתכון" name="Name" value={recipe.Name} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="תיאור"
                name="Description"
                value={recipe.Description}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="זמן הכנה (דקות)"
                name="Duration"
                type="number"
                value={recipe.Duration}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>רמת קושי</InputLabel>
                <Select name="Difficulty" value={recipe.Difficulty} onChange={handleChange} label="רמת קושי" required>
                  <MenuItem value="קל">קל</MenuItem>
                  <MenuItem value="בינוני">בינוני</MenuItem>
                  <MenuItem value="קשה">קשה</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>קטגוריה</InputLabel>
                <Select name="Categoryid" value={recipe.Categoryid} onChange={handleChange} label="קטגוריה" required>
                  {categories.map((category) => (
                    <MenuItem key={category.Id} value={category.Id}>
                      {category.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="URL לתמונה" name="Img" value={recipe.Img || ""} onChange={handleChange} />
            </Grid>

            {previewImage && (
              <Grid item xs={12}>
                <Card sx={{ maxWidth: 300, mx: "auto", mb: 2, borderRadius: 2, overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={previewImage}
                    alt="תצוגה מקדימה של תמונת המתכון"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                      e.target.onerror = null
                    }}
                  />
                </Card>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                רכיבי המתכון
              </Typography>

              {recipe.Ingridents.map((ingredient, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    label="שם מוצר"
                    name="Name"
                    value={ingredient.Name}
                    onChange={(e) => handleIngredientsChange(index, e)}
                    sx={{ flex: 2 }}
                  />
                  <TextField
                    label="כמות"
                    name="Count"
                    value={ingredient.Count}
                    onChange={(e) => handleIngredientsChange(index, e)}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="סוג כמות"
                    name="Type"
                    value={ingredient.Type}
                    onChange={(e) => handleIngredientsChange(index, e)}
                    sx={{ flex: 1 }}
                  />
                  <IconButton
                    color="error"
                    onClick={() => removeIngredient(index)}
                    disabled={recipe.Ingridents.length <= 1}
                    sx={{ alignSelf: "center" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}

              <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={addIngredient} sx={{ mb: 3 }}>
                הוסף רכיב
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                הוראות הכנה
              </Typography>

              {recipe.Instructions.map((instruction, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`שלב ${index + 1}`}
                    value={instruction.Name}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                  />
                  <IconButton
                    color="error"
                    onClick={() => removeInstruction(index)}
                    disabled={recipe.Instructions.length <= 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}

              <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={addInstruction} sx={{ mb: 3 }}>
                הוסף שלב
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/showRecepies")}>
              חזרה למתכונים
            </Button>

            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleUpdate}
              disabled={loading}
              sx={{
                backgroundColor: "#b57e2c",
                "&:hover": { backgroundColor: "#8c6321" },
                minWidth: 150,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "שמור שינויים"}
            </Button>
          </Box>
        </Paper>
      ) : (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6">המתכון לא נמצא</Typography>
          <Button variant="contained" onClick={() => navigate("/showRecepies")} sx={{ mt: 2 }}>
            חזרה למתכונים
          </Button>
        </Paper>
      )}

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
          המתכון עודכן בהצלחה!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setError("")} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default EditRecipe
