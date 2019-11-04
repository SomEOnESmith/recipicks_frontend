import { FETCH_RECIPES } from "./actionTypes";
import instance from "./instance";

// export const fetchRecipes = () => async dispatch => {
//   try {
//     const res = await instance.get("recipes/");
//     const recipes = res.data;
//     console.log("TCL: recipes", recipes);
//     dispatch({ type: FETCH_RECIPES, payload: recipes });
//   } catch (error) {
//     console.error(error);
//   }
// };

export const fetchRecipesByIngredients = ingredientsItems => async dispatch => {
  try {
    const res = await instance.post("recipes/ingredients/", ingredientsItems);
    const recipes = res.data;
    dispatch({ type: FETCH_RECIPES, payload: recipes });
  } catch (error) {
    console.error(error);
  }
};
