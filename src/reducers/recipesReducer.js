import { TYPE } from "../actions/recipesActions";

export const initialRecipeStore = {
  recipes: null,
};

export function RecipeReducer(state, action) {
  switch (action.type) {
    case TYPE.READ_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload.map((data) => data),
      };

    case TYPE.CREATE_RECIPE: {
      return {
        ...state,
        recipes: [action.payload, ...state.recipes],
      };
    }

    case TYPE.UPDATE_RECIPE: {
      let newRecipes = state?.recipes.map((recip) =>
        recip._id === action.payload._id ? action.payload : recip
      );
      return {
        ...state,
        recipes: newRecipes || [],
      };
    }

    case TYPE.DELETE_RECIPE: {
      let newRecipes = state.recipes.filter(
        (recip) => recip._id !== action.payload
      );

      return {
        ...state,
        recipes: newRecipes,
      };
    }

    case TYPE.NO_DATA:
      return initialRecipeStore;

    default:
      return state;
  }
}
