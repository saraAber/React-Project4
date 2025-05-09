
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
import VisibilityIcon from "@mui/icons-material/Visibility"

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
    const [categories, setCategories] = useState<{ Id: number; Name: string }[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("")
    const [maxDuration, setMaxDuration] = useState<string>("")
    const [userIdFilter, setUserIdFilter] = useState<string>("")
    const [showFilters, setShowFilters] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [recipeToDelete, setRecipeToDelete] = useState<{ Id: number } | null>(null)
    const [alertMessage, setAlertMessage] = useState<string>("")
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error" | "info" | "warning">("info")

    // חשוב: לטעון קודם את הקטגוריות ורק אז את המתכונים
    useEffect(() => {
        const loadData = async () => {
            await fetchCategories(); // קודם טוען קטגוריות
            await fetchRecipes();    // ואז טוען מתכונים
        };

        loadData();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/category")
            setCategories(response.data)
            console.log("Categories loaded:", response.data);
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
                filteredRecipes = filteredRecipes.filter((recipe: Recipe) => recipe.CategoryId === Number(selectedCategory))
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
        fetchRecipes() // טוען מחדש את כל המתכונים
    }

    // פונקציה משופרת לקבלת שם הקטגוריה
    const getCategoryName = (categoryid: number) => {
        if (!categories || categories.length === 0) {
            return "טוען קטגוריות...";
        }

        // המרה בטוחה למספר
        const categoryIdNumber = Number(categoryid);

        // מציאת הקטגוריה המתאימה
        const category = categories.find(cat => Number(cat.Id) === categoryIdNumber);

        // החזרת שם הקטגוריה או הודעת ברירת מחדל
        return category ? category.Name : "קטגוריה לא מוכרת";
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
                width: "100%",
                minHeight: "100vh",
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
                                {/* ויתור על height: "100%" והוספת minHeight במקום */}
                                <Card
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        borderRadius: 2,
                                        minHeight: "450px", // הוספת גובה מינימום
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

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            gutterBottom
                                            sx={{
                                                // הגבלת גובה התיאור
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                            }}
                                        >
                                            <strong>תיאור:</strong> {recipe.Description || "אין תיאור"}
                                        </Typography>

                                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                            <PersonIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary" }} />
                                            <Typography variant="body2" color="text.secondary">
                                                מזהה משתמש: {recipe.UserId}
                                            </Typography>
                                        </Box>
                                    </CardContent>

                                    <Box sx={{ mt: 'auto' }}> {/* פתרון חשוב: הזזת הכפתורים לתחתית */}
                                        <Divider sx={{ mx: 2 }} />

                                        {/* שימוש ב-ButtonGroup במקום ב-CardActions */}
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            p: 2,
                                            gap: 1
                                        }}>
                                            {/* שורה ראשונה של כפתורים */}
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => handleDelete(recipe.Id, recipe.UserId)}
                                                    sx={{
                                                        bgcolor: '#000000',
                                                        color: '#fff',
                                                        borderRadius: '8px',
                                                        transition: 'all 0.3s ease',
                                                        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                                                        border: '1px solid transparent',
                                                        '&:hover': {
                                                            bgcolor: 'rgba(0, 0, 0, 0.9)',
                                                            borderColor: '#b57e2c',
                                                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                                            transform: 'translateY(-2px)'
                                                        }
                                                    }}
                                                >
                                                    מחק
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    fullWidth
                                                    startIcon={<EditIcon />}
                                                    onClick={() => handleEdit(recipe.Id, recipe.UserId)}
                                                    sx={{
                                                        color: '#000000',
                                                        borderColor: '#000000',
                                                        borderRadius: '8px',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            borderColor: '#b57e2c',
                                                            color: '#b57e2c',
                                                            bgcolor: 'rgba(181, 126, 44, 0.05)',
                                                            transform: 'translateY(-2px)'
                                                        }
                                                    }}
                                                >
                                                    ערוך
                                                </Button>
                                            </Box>

                                            {/* שורה שנייה - כפתור צפייה בגודל מלא */}
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                startIcon={<VisibilityIcon />}
                                                onClick={() => navigate(`/recipe/${recipe.Id}`)}
                                                sx={{
                                                    bgcolor: '#b57e2c',
                                                    color: '#fff',
                                                    borderRadius: '8px',
                                                    p: '10px',
                                                    fontWeight: 'bold',
                                                    boxShadow: '0 4px 15px rgba(181, 126, 44, 0.3)',
                                                    transition: 'all 0.3s ease',
                                                    border: '1px solid transparent',
                                                    '&:hover': {
                                                        bgcolor: '#8c6321',
                                                        boxShadow: '0 6px 20px rgba(181, 126, 44, 0.4)',
                                                        transform: 'translateY(-2px)',
                                                        borderColor: '#000'
                                                    }
                                                }}
                                            >
                                                צפייה במתכון
                                            </Button>

                                        </Box>
                                    </Box>
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