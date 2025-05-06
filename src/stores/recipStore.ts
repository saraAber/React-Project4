import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/category`);
        return response.data;
    } catch (error) {
        console.error("שגיאה בטעינת הקטגוריות", error);
        throw error;
    }
};

export const addRecipe = async (recipeData: any) => {
    try {
        const response = await axios.post(`${API_URL}/recipe`, recipeData);
        return response.data;
    } catch (error) {
        console.error("שגיאה בהוספת המתכון", error);
        throw error;
    }
};
