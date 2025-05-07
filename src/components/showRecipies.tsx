

import axios from "axios"
import { useEffect, useState, useContext } from "react"
import {
    Container,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Box,
    Grid,
    Button,
    TextField,
    Paper,
    CardMedia,
    CardActions,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Alert,
    Stack,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import FilterListIcon from "@mui/icons-material/FilterList"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import CategoryIcon from "@mui/icons-material/Category"
import PersonIcon from "@mui/icons-material/Person"
import AddIcon from "@mui/icons-material/Add"
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu"
interface Ingredient {
    Name: string;
    Count?: number;
    Type?: string;
}
interface Instruction {
    Name: string;
}
interface Recipe {
    Id: number;
    Name: string;
    Img?: string;
    Duration: number;
    Difficulty: string;
    Description?: string;
    UserId: number;
    CategoryId: number;
    Ingridents?: Ingredient[];
    Instructions?: Instruction[];
}
const ShowRecipes = () => {
    const navigate = useNavigate()
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(true)
    const { user } = useContext(UserContext)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("")
    const [maxDuration, setMaxDuration] = useState<string>("")
    const [userIdFilter, setUserIdFilter] = useState<string>("")
    const [showFilters, setShowFilters] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [recipeToDelete, setRecipeToDelete] = useState<{ Id: number } | null>(null)
    const [alertMessage, setAlertMessage] = useState<string>("")
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error" | "info" | "warning">("info")
    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/category")
            setCategories(response.data)
        } catch (error) {
            console.error("שגיאה בטעינת הקטגוריות", error)
            showAlert("שגיאה בטעינת הקטגוריות", "error")
        }
    }

    const fetchRecipes = async () => {
        try {
            const res = await axios("http://localhost:8080/api/recipe")
            let filteredRecipes = res.data

            if (selectedCategory) {
                filteredRecipes = filteredRecipes.filter((recipe: Recipe) => recipe.CategoryId === selectedCategory)
            }

            if (selectedDifficulty) {
                filteredRecipes = filteredRecipes.filter((recipe: Recipe) => recipe.Difficulty === selectedDifficulty)
            }

            if (maxDuration) {
                filteredRecipes = filteredRecipes.filter((recipe: Recipe) => recipe.Duration <= Number(maxDuration))
            }

            if (userIdFilter) {
                filteredRecipes = filteredRecipes.filter((recipe: Recipe) => recipe.UserId === Number.parseInt(userIdFilter))
            }

            setRecipes(filteredRecipes)
            setLoading(false)
        } catch (error) {
            console.log("Error fetching recipes:", error)
            setLoading(false)
            showAlert("שגיאה בטעינת המתכונים", "error")
        }
    }

    const handleDelete = async (id: number, userId: number) => {
        if (user?.Id === userId) {
            setRecipeToDelete({ Id: id })
            setDeleteDialogOpen(true)
        } else {
            showAlert(
                user ? " אינך מורשה למחוק את המתכון מכיוון שאינך יצרת אותו" : " אינך רשאי למחוק את המתכון כי אינך מחובר",
                "warning",
            )
        }
    }

    const confirmDelete = async () => {
        if (recipeToDelete) {
            try {
                await axios.post(`http://localhost:8080/api/recipe/delete/${recipeToDelete.Id}`, { Id: recipeToDelete.Id })
                setRecipes(recipes.filter((recipe) => recipe.Id !== recipeToDelete.Id))
                showAlert("המתכון נמחק בהצלחה", "success")
            } catch (error) {
                console.error("שגיאה במחיקת המתכון", error)
                showAlert("שגיאה במחיקת המתכון", "error")
            } finally {
                setDeleteDialogOpen(false)
                setRecipeToDelete(null)
            }
        }
    }

    const handleEdit = (id: number, userId: number) => {
        if (user?.Id === userId) {
            navigate(`/editRecipe/${id}`)
        } else {
            showAlert(
                user ? " אינך מורשה לעדכן את המתכון מכיוון שאינך יצרת אותו" : " אינך רשאי לערוך את המתכון כי אינך מחובר",
                "warning",
            )
        }
    }

    const showAlert = (message: string, severity: "success" | "error" | "info" | "warning" = "info") => {
        setAlertMessage(message)
        setAlertSeverity(severity)
    }

    const resetFilters = () => {
        setSelectedCategory("")
        setSelectedDifficulty("")
        setMaxDuration("")
        setUserIdFilter("")
    }

    useEffect(() => {
        fetchCategories()
        fetchRecipes()
    }, [])

    const getCategoryName = (categoryId: number) => {
        const category = categories.find((cat: { Id: number; Name: string }) => cat.Id === categoryId)
        return category ? category.Name : "קטגוריה לא ידועה"
    }

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress size={60} thickness={4} sx={{ color: "#b57e2c" }} />
            </Box>
        )
    }

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                overflow: "auto",
                pt: 8,
                pb: 4,
            }}
        >
            <Container maxWidth="xl">
                <Box sx={{ mb: 5, textAlign: "center" }}>
                    <RestaurantMenuIcon sx={{ fontSize: 48, color: "#b57e2c", mb: 1 }} />
                    <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                        מתכונים
                    </Typography>
                </Box>

                <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6">סינון מתכונים</Typography>
                        <Button
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            onClick={() => setShowFilters(!showFilters)}
                            sx={{ mr: 1 }}
                        >
                            {showFilters ? "הסתר סינון" : "הצג סינון"}
                        </Button>
                    </Box>

                    {showFilters && (
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>קטגוריה</InputLabel>
                                    <Select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        label="קטגוריה"
                                    >
                                        <MenuItem value="">הכל</MenuItem>
                                        {categories.map((category: { Id: number; Name: string }) => (
                                            <MenuItem key={category.Id} value={category.Id}>
                                                {category.Name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>רמת קושי</InputLabel>
                                    <Select
                                        value={selectedDifficulty}
                                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                                        label="רמת קושי"
                                    >
                                        <MenuItem value="">הכל</MenuItem>
                                        <MenuItem value="קל">קל</MenuItem>
                                        <MenuItem value="בינוני">בינוני</MenuItem>
                                        <MenuItem value="קשה">קשה</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="זמן הכנה מקסימלי (דקות)"
                                    value={maxDuration}
                                    onChange={(e) => setMaxDuration(e.target.value)}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="מזהה משתמש"
                                    value={userIdFilter}
                                    onChange={(e) => setUserIdFilter(e.target.value)}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    )}

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                onClick={fetchRecipes}
                                sx={{
                                    backgroundColor: "#000000",
                                    "&:hover": { backgroundColor: "#333333" },
                                }}
                            >
                                סנן
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={resetFilters}
                                disabled={!selectedCategory && !selectedDifficulty && !maxDuration && !userIdFilter}
                            >
                                נקה סינון
                            </Button>
                        </Stack>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate("/addRecipe")}
                            sx={{
                                backgroundColor: "#b57e2c",
                                "&:hover": { backgroundColor: "#8c6321" },
                            }}
                        >
                            הוספת מתכון
                        </Button>
                    </Box>
                </Paper>

                <Grid container spacing={4}>
                    {recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <Grid item key={recipe.Id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                        "&:hover": {
                                            transform: "translateY(-5px)",
                                            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={
                                            recipe.Img ||
                                            "https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                        }
                                        alt={recipe.Name}
                                        onError={(e) => {
                                            e.target.src =
                                                "https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                            e.target.onerror = null
                                        }}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                                            {recipe.Name}
                                        </Typography>

                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                                            <Chip
                                                icon={<AccessTimeIcon />}
                                                label={`${recipe.Duration} דקות`}
                                                size="small"
                                                variant="outlined"
                                            />
                                            <Chip icon={<FitnessCenterIcon />} label={recipe.Difficulty} size="small" variant="outlined" />
                                            <Chip
                                                icon={<CategoryIcon />}
                                                label={getCategoryName(recipe.CategoryId)}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Box>

                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            <strong>תיאור:</strong> {recipe.Description || "אין תיאור"}
                                        </Typography>

                                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                            <PersonIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary" }} />
                                            <Typography variant="body2" color="text.secondary">
                                                מזהה משתמש: {recipe.UserId}
                                            </Typography>
                                        </Box>

                                        {/* הצגת המרכיבים */}
                                        {/* <List>
                                            {recipe.Ingridents && recipe.Ingridents.length > 0 ? (
                                                recipe.Ingridents.map((ingredient, index) => (
                                                    <ListItem key={index} sx={{ py: 1 }}>
                                                        <ListItemText
                                                            primary={
                                                                <Typography variant="body1">
                                                                    <strong>{ingredient.Name}</strong>
                                                                    {ingredient.Count && ingredient.Type
                                                                        ? ` - ${ingredient.Count} ${ingredient.Type}`
                                                                        : ingredient.Count
                                                                            ? ` - ${ingredient.Count}`
                                                                            : ""}
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItem>
                                                ))
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">אין מרכיבים זמינים</Typography>
                                            )}
                                        </List> */}

                                        {/* הצגת הוראות ההכנה */}
                                        {/* <Grid item xs={12} md={8}> 
                                            <Paper elevation={2} sx={{ p: 3, height: "100%", width: '100%', maxWidth: 600 }}> 
                                                <Typography variant="h5" component="h2" gutterBottom>
                                                    אופן ההכנה
                                                </Typography>
                                                <Divider sx={{ mb: 2 }} />

                                                <List>
                                                    {recipe.Instructions && recipe.Instructions.length > 0 ? (
                                                        recipe.Instructions.map((instruction, index) => (
                                                            <ListItem key={index} alignItems="flex-start" sx={{ py: 1 }}>
                                                                <ListItemText
                                                                    primary={
                                                                        <Box sx={{ display: "flex" }}>
                                                                            <Typography
                                                                                variant="body1"
                                                                                component="span"
                                                                                sx={{
                                                                                    bgcolor: "#d81b60",
                                                                                    color: "white",
                                                                                    borderRadius: "50%",
                                                                                    width: 24,
                                                                                    height: 24,
                                                                                    display: "flex",
                                                                                    alignItems: "center",
                                                                                    justifyContent: "center",
                                                                                    mr: 2,
                                                                                    flexShrink: 0,
                                                                                }}
                                                                            >
                                                                                {index + 1}
                                                                            </Typography>
                                                                            <Typography variant="body1">{instruction.Name}</Typography>
                                                                        </Box>
                                                                    }
                                                                />
                                                            </ListItem>
                                                        ))
                                                    ) : (
                                                        <Typography variant="body2" color="text.secondary">
                                                            לא נמצאו הוראות הכנה למתכון זה
                                                        </Typography>
                                                    )}
                                                </List>
                                            </Paper>
                                        </Grid> */}

                                    </CardContent>

                                    <CardActions sx={{ p: 2, pt: 0 }}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDelete(recipe.Id, recipe.UserId)}
                                            sx={{ mr: 1 }}
                                        >
                                            מחק
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<EditIcon />}
                                            onClick={() => handleEdit(recipe.Id, recipe.UserId)}
                                        >
                                            ערוך
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="default"
                                            onClick={() => navigate(`/recipe/${recipe.Id}`)} // ניווט לדף המתכון
                                        >
                                            צפייה במתכון
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Paper sx={{ p: 4, textAlign: "center" }}>
                                <Typography variant="h6">לא נמצאו מתכונים התואמים את החיפוש</Typography>
                                <Button variant="outlined" onClick={resetFilters} sx={{ mt: 2 }}>
                                    נקה סינון
                                </Button>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </Container>

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>מחיקת מתכון</DialogTitle>
                <DialogContent>
                    <DialogContentText>האם אתה בטוח שברצונך למחוק את המתכון? פעולה זו אינה ניתנת לביטול.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>ביטול</Button>
                    <Button onClick={confirmDelete} color="error" autoFocus>
                        מחק
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={!!alertMessage}
                autoHideDuration={6000}
                onClose={() => setAlertMessage("")}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={() => setAlertMessage("")} severity={alertSeverity} sx={{ width: "100%" }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}
export default ShowRecipes
