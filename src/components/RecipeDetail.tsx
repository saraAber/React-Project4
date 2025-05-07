import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Chip,
    Divider,
    Box,
    Grid,
    Card,
    CardMedia,
    CircularProgress,
    Button,
    Avatar,
    Stack,
    IconButton,
    Tooltip,
    useTheme,
    useMediaQuery,
    Breadcrumbs,
    Link,
    Fade
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CategoryIcon from '@mui/icons-material/Category';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

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

const RecipeDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [bookmarked, setBookmarked] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/category");
                setCategories(response.data);
            } catch (error) {
                console.error("שגיאה בטעינת הקטגוריות", error);
            }
        };

        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/recipe/${id}`);
                setRecipe(response.data);
                // Check if recipe is bookmarked (could be from localStorage or API)
                const bookmarkedRecipes = JSON.parse(localStorage.getItem('bookmarkedRecipes') || '[]');
                setBookmarked(bookmarkedRecipes.includes(Number(id)));
                setLoading(false);
            } catch (error) {
                console.error("שגיאה בטעינת המתכון", error);
                setLoading(false);
            }
        };

        fetchCategories();
        fetchRecipe();
    }, [id]);

    const handleBookmark = () => {
        const bookmarkedRecipes = JSON.parse(localStorage.getItem('bookmarkedRecipes') || '[]');
        
        if (bookmarked) {
            // Remove from bookmarks
            const updatedBookmarks = bookmarkedRecipes.filter((recipeId: number) => recipeId !== Number(id));
            localStorage.setItem('bookmarkedRecipes', JSON.stringify(updatedBookmarks));
        } else {
            // Add to bookmarks
            bookmarkedRecipes.push(Number(id));
            localStorage.setItem('bookmarkedRecipes', JSON.stringify(bookmarkedRecipes));
        }
        
        setBookmarked(!bookmarked);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: recipe?.Name,
                text: `בדוק את המתכון הזה: ${recipe?.Name}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href)
                .then(() => alert('הקישור הועתק ללוח'));
        }
    };

    const getCategoryName = (categoryId: number) => {
        const category = categories.find((cat: { Id: number; Name: string }) => cat.Id === categoryId);
        return category ? category.Name : "קטגוריה לא ידועה";
    };

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                bgcolor: '#f8f8f8'
            }}>
                <CircularProgress size={60} thickness={4} sx={{ color: '#b57e2c' }} />
            </Box>
        );
    }

    if (!recipe) {
        return (
            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h5" gutterBottom>לא נמצאו פרטי המתכון</Typography>
                    <Button 
                        variant="contained" 
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/recipes')}
                        sx={{
                            mt: 2,
                            backgroundColor: '#b57e2c',
                            '&:hover': { backgroundColor: '#8c6321' },
                        }}
                    >
                        חזרה לרשימת המתכונים
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Box sx={{ 
            minHeight: '100vh',
            bgcolor: '#f8f8f8',
            pt: { xs: 8, md: 12 },
            pb: 8
        }}>
            <Container maxWidth="lg">
                {/* Breadcrumb Navigation */}
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, direction: 'rtl' }}>
                    <Link underline="hover" color="inherit" href="/">
                        ראשי
                    </Link>
                    <Link underline="hover" color="inherit" href="/recipes">
                        מתכונים
                    </Link>
                    <Typography color="text.primary">{recipe.Name}</Typography>
                </Breadcrumbs>

                {/* Back Button */}
                <Button 
                    variant="text" 
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/recipes')}
                    sx={{ mb: 3, color: '#000' }}
                >
                    חזרה לרשימת המתכונים
                </Button>

                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Fade in={true} timeout={500}>
                            <Card elevation={3} sx={{ overflow: 'hidden', borderRadius: 3 }}>
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="400"
                                        image={recipe.Img || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
                                        alt={recipe.Name}
                                        sx={{ 
                                            objectFit: 'cover',
                                            filter: 'brightness(0.7)'
                                        }}
                                        onError={(e: any) => {
                                            e.target.src = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";
                                            e.target.onerror = null;
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            bgcolor: 'rgba(0, 0, 0, 0.6)',
                                            color: 'white',
                                            p: 3
                                        }}
                                    >
                                        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                                            {recipe.Name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 1 }}>
                                            <Chip
                                                icon={<AccessTimeIcon />}
                                                label={`${recipe.Duration} דקות`}
                                                sx={{ 
                                                    bgcolor: 'rgba(255,255,255,0.9)', 
                                                    color: '#000',
                                                    fontWeight: 'bold',
                                                    '& .MuiChip-icon': { color: '#b57e2c' }
                                                }}
                                            />
                                            <Chip
                                                icon={<FitnessCenterIcon />}
                                                label={recipe.Difficulty}
                                                sx={{ 
                                                    bgcolor: 'rgba(255,255,255,0.9)', 
                                                    color: '#000',
                                                    fontWeight: 'bold',
                                                    '& .MuiChip-icon': { color: '#b57e2c' }
                                                }}
                                            />
                                            <Chip
                                                icon={<CategoryIcon />}
                                                label={getCategoryName(recipe.CategoryId)}
                                                sx={{ 
                                                    bgcolor: 'rgba(255,255,255,0.9)', 
                                                    color: '#000',
                                                    fontWeight: 'bold',
                                                    '& .MuiChip-icon': { color: '#b57e2c' }
                                                }}
                                            />
                                            <Chip
                                                icon={<PersonIcon />}
                                                label={`משתמש ${recipe.UserId}`}
                                                sx={{ 
                                                    bgcolor: 'rgba(255,255,255,0.9)', 
                                                    color: '#000',
                                                    fontWeight: 'bold',
                                                    '& .MuiChip-icon': { color: '#b57e2c' }
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Card>
                        </Fade>
                    </Grid>
                    
                    {/* Recipe Description */}
                    <Grid item xs={12}>
                        <Fade in={true} timeout={700}>
                            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant="h5" gutterBottom sx={{ 
                                    color: '#b57e2c',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}>
                                    <RestaurantMenuIcon /> אודות המתכון
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                                    {recipe.Description || "אין תיאור למתכון זה"}
                                </Typography>
                                
                                {/* Action Buttons */}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                                    <Tooltip title={bookmarked ? "הסר מהמועדפים" : "הוסף למועדפים"}>
                                        <IconButton 
                                            onClick={handleBookmark}
                                            sx={{ 
                                                color: bookmarked ? '#b57e2c' : 'gray'
                                            }}
                                        >
                                            {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="הדפס מתכון">
                                        <IconButton onClick={handlePrint}>
                                            <PrintIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="שתף מתכון">
                                        <IconButton onClick={handleShare}>
                                            <ShareIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Paper>
                        </Fade>
                    </Grid>
                    
                    {/* Ingredients */}
                    <Grid item xs={12} md={5}>
                        <Fade in={true} timeout={900}>
                            <Paper elevation={2} sx={{ 
                                p: 3, 
                                height: '100%',
                                borderRadius: 2,
                                border: '1px solid #e0e0e0',
                                position: 'relative'
                            }}>
                                <Typography variant="h5" gutterBottom sx={{ 
                                    color: '#b57e2c',
                                    fontWeight: 'bold',
                                    borderBottom: '2px solid #b57e2c',
                                    pb: 1
                                }}>
                                    מרכיבים
                                </Typography>
                                
                                {/* Fancy ingredient header background */}
                                <Box 
                                    sx={{ 
                                        position: 'absolute',
                                        top: 20,
                                        right: -10,
                                        bgcolor: '#b57e2c',
                                        width: 30,
                                        height: 30,
                                        transform: 'rotate(45deg)',
                                        zIndex: 0
                                    }} 
                                />
                                
                                <List sx={{ 
                                    mt: 2,
                                    '& .MuiListItem-root': {
                                        borderBottom: '1px dashed #e0e0e0',
                                        py: 1.5
                                    },
                                    '& .MuiListItem-root:last-child': {
                                        borderBottom: 'none'
                                    }
                                }}>
                                    {recipe.Ingridents && recipe.Ingridents.length > 0 ? (
                                        recipe.Ingridents.map((ingredient, index) => (
                                            <ListItem key={index} sx={{ 
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    bgcolor: 'rgba(181, 126, 44, 0.05)',
                                                    transform: 'translateX(-5px)'
                                                }
                                            }}>
                                                <ListItemText 
                                                    primary={
                                                        <Typography variant="body1" fontWeight="500">
                                                            {ingredient.Name}
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
                                        <Typography variant="body1" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                                            לא נמצאו מרכיבים למתכון זה
                                        </Typography>
                                    )}
                                </List>
                            </Paper>
                        </Fade>
                    </Grid>
                    
                    {/* Instructions */}
                    <Grid item xs={12} md={7}>
                        <Fade in={true} timeout={1100}>
                            <Paper elevation={2} sx={{ 
                                p: 3, 
                                height: '100%',
                                borderRadius: 2,
                                border: '1px solid #e0e0e0',
                                position: 'relative'
                            }}>
                                <Typography variant="h5" gutterBottom sx={{ 
                                    color: '#b57e2c',
                                    fontWeight: 'bold',
                                    borderBottom: '2px solid #b57e2c',
                                    pb: 1
                                }}>
                                    אופן ההכנה
                                </Typography>
                                
                                {/* Fancy instructions header background */}
                                <Box 
                                    sx={{ 
                                        position: 'absolute',
                                        top: 20,
                                        right: -10,
                                        bgcolor: '#000',
                                        width: 30,
                                        height: 30,
                                        transform: 'rotate(45deg)',
                                        zIndex: 0
                                    }} 
                                />
                                
                                <List sx={{ mt: 2 }}>
                                    {recipe.Instructions && recipe.Instructions.length > 0 ? (
                                        recipe.Instructions.map((instruction, index) => (
                                            <ListItem key={index} alignItems="flex-start" sx={{ 
                                                py: 2,
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    bgcolor: 'rgba(0, 0, 0, 0.02)'
                                                }
                                            }}>
                                                <ListItemText
                                                    primary={
                                                        <Box sx={{ display: "flex" }}>
                                                            <Avatar
                                                                sx={{
                                                                    bgcolor: '#b57e2c',
                                                                    color: 'white',
                                                                    width: 32,
                                                                    height: 32,
                                                                    mr: 2,
                                                                    fontWeight: 'bold'
                                                                }}
                                                            >
                                                                {index + 1}
                                                            </Avatar>
                                                            <Typography 
                                                                variant="body1" 
                                                                sx={{ 
                                                                    lineHeight: 1.8, 
                                                                    fontSize: '1.05rem',
                                                                    pt: 0.3
                                                                }}
                                                            >
                                                                {instruction.Name}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                            </ListItem>
                                        ))
                                    ) : (
                                        <Typography variant="body1" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                                            לא נמצאו הוראות הכנה למתכון זה
                                        </Typography>
                                    )}
                                </List>
                            </Paper>
                        </Fade>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default RecipeDetail;