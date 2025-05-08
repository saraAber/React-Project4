"use client"

import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import { useFieldArray, useForm } from "react-hook-form"
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Divider,
  FormHelperText,
  Alert,
  Snackbar,
  CircularProgress,
  Card,
  CardMedia,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import RestaurantIcon from "@mui/icons-material/Restaurant"
import ImageIcon from "@mui/icons-material/Image"

interface Ingredient {
  name: string
  count: string
  type: string
}

interface Instruction {
  instruction: string
}

const AddRecipe = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [previewImage, setPreviewImage] = useState("")

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      Name: "",
      UserId: user?.Id || "",
      Categoryid: "",
      Img: "",
      Duration: "",
      Difficulty: "",
      Description: "",
      Ingridents: [{ Name: "", Count: "", Type: "" }],
      Instructions: "",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Ingridents",
  })

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/category")
        setCategories(response.data)
      } catch (error) {
        console.error("שגיאה בטעינת הקטגוריות", error)
        setError("שגיאה בטעינת הקטגוריות")
      }
    }
    fetchCategories()
  }, [])

  // Watch for image URL changes to update preview
  const watchedImg = watch("Img")
  useEffect(() => {
    setPreviewImage(watchedImg)
  }, [watchedImg])

  const handleAddRecipe = async (data) => {
    if (!user) {
      setError("יש להתחבר כדי להוסיף מתכון")
      return
    }

    setLoading(true)
    setError("")

    try {
      const formattedData = {
        ...data,
        Instructions: data.Instructions.split("\n").map((instruction) => ({ Name: instruction.trim() })),
        UserId: user?.Id || "",
      }

      const res = await axios.post("http://localhost:8080/api/recipe", formattedData)
      setSuccess(true)
      setTimeout(() => {
        navigate("/showRecepies")
      }, 2000)
    } catch (error) {
      console.log("error", error)
      setError("הוספת המתכון נכשלה")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <RestaurantIcon sx={{ fontSize: 40, color: "#b57e2c", mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            הוספת מתכון חדש
          </Typography>
          <Typography variant="body1" color="text.secondary">
            שתפו את המתכון האהוב עליכם עם הקהילה
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <form onSubmit={handleSubmit(handleAddRecipe)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="שם המתכון"
                variant="outlined"
                {...register("Name", { required: "שדה זה חובה" })}
                error={!!errors.Name}
                helperText={errors.Name?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="רמת קושי"
                variant="outlined"
                select
                {...register("Difficulty", { required: "שדה זה חובה" })}
                error={!!errors.Difficulty}
                helperText={errors.Difficulty?.message}
              >
                <MenuItem value="קל">קל</MenuItem>
                <MenuItem value="בינוני">בינוני</MenuItem>
                <MenuItem value="קשה">קשה</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="זמן הכנה (בדקות)"
                variant="outlined"
                type="number"
                {...register("Duration", { required: "שדה זה חובה" })}
                error={!!errors.Duration}
                helperText={errors.Duration?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="תיאור קצר"
                variant="outlined"
                multiline
                rows={2}
                {...register("Description")}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.Categoryid}>
                <InputLabel>קטגוריה</InputLabel>
                <Select label="קטגוריה" {...register("Categoryid", { required: "שדה זה חובה" })}>
                  {categories.map((category) => (
                    <MenuItem key={category.Id} value={category.Id}>
                      {category.Name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.Categoryid && <FormHelperText>{errors.Categoryid.message}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL לתמונה"
                variant="outlined"
                {...register("Img")}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <ImageIcon />
                    </IconButton>
                  ),
                }}
              />
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

              {fields.map((item, index) => (
                <Box key={item.id} sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    label="שם מוצר"
                    {...register(`Ingridents.${index}.Name`, { required: "זהו שדה חובה" })}
                    error={!!errors.Ingridents?.[index]?.Name}
                    helperText={errors.Ingridents?.[index]?.Name?.message}
                    sx={{ flex: 2 }}
                  />
                  <TextField
                    label="כמות"
                    type="number"
                    {...register(`Ingridents.${index}.Count`, { required: "זהו שדה חובה" })}
                    error={!!errors.Ingridents?.[index]?.Count}
                    helperText={errors.Ingridents?.[index]?.Count?.message}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="סוג כמות"
                    {...register(`Ingridents.${index}.Type`, { required: "זהו שדה חובה" })}
                    error={!!errors.Ingridents?.[index]?.Type}
                    helperText={errors.Ingridents?.[index]?.Type?.message}
                    sx={{ flex: 1 }}
                  />
                  <IconButton
                    color="error"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    sx={{ alignSelf: "center" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}

              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => append({ Name: "", Count: "", Type: "" })}
                sx={{ mb: 3 }}
              >
                הוסף רכיב
              </Button>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="הוראות הכנה (שורה לכל שלב)"
                {...register("Instructions", { required: "שדה זה חובה" })}
                error={!!errors.Instructions}
                helperText={errors.Instructions?.message}
                sx={{ mb: 3 }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                minWidth: 200,
                backgroundColor: "#b57e2c",
                "&:hover": { backgroundColor: "#8c6321" },
                borderRadius: 2,
                py: 1.5,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : <>הוסף מתכון 🚀</>}
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
          המתכון נוסף בהצלחה! 🎉
        </Alert>
      </Snackbar>

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

export default AddRecipe
