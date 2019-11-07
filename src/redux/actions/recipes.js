import { FETCH_RECIPES, FETCH_RECIPE, HANDLE_DELETE } from "./actionTypes";
import instance from "./instance";

export const fetchRecipes = (
  cuisine,
  meals,
  courses,
  ingredients
) => async dispatch => {
  try {
    const res = await instance.get("recipes/", {
      params: {
        ingredients: JSON.stringify(ingredients),
        cuisine: cuisine,
        meals: JSON.stringify(meals),
        courses: JSON.stringify(courses)
      }
    });
    const recipes = res.data;
    dispatch({ type: FETCH_RECIPES, payload: recipes });
  } catch (error) {
    console.error(error);
  }
};

export const fetchRecipe = recipeID => async dispatch => {
  try {
    const res = await instance.get(`recipes/${recipeID}/`);
    const recipe = res.data;
    dispatch({ type: FETCH_RECIPE, payload: recipe });
  } catch (error) {
    console.error(error);
  }
};

export const handleDeleteIngredients = ingredient => {
  return {
    type: HANDLE_DELETE,
    payload: ingredient
  };
};
