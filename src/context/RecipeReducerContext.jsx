import { createContext, useReducer } from "react";
import { RecipeReducer, initialRecipeStore } from "../reducers/recipesReducer";

const RecipeReducerContext = createContext();

export const RecipeReducerProvider = ({ children }) => {
  const [recipeState, recipeDispatch] = useReducer(
    RecipeReducer,
    initialRecipeStore
  );

  const recipeProviderState = {
    recipeState,
    recipeDispatch,
  };

  return (
    <RecipeReducerContext.Provider value={recipeProviderState}>
      {children}
    </RecipeReducerContext.Provider>
  );
};

export default RecipeReducerContext;
