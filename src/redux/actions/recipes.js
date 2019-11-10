import {
  FETCH_RECIPES,
  FETCH_RECIPE,
  HANDLE_DELETE,
  ADD_RECIPE,
  SET_ERRORS
} from "./actionTypes";
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
  dispatch({ type: FETCH_RECIPE, payload: null });
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

export const addRecipe = (recipeData, history) => {
  return async dispatch => {
    try {
      const response = await instance.post("recipe/create/", recipeData);
      dispatch({ type: ADD_RECIPE, payload: response.data });
      history.replace(`/recipes/${response.data.id}`);
    } catch (error) {
      console.error(error.response.data);
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data
      });
    }
  };
};
