import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import { TYPE } from "../actions/recipesActions";
import LoaderSpinner from "./LoaderSpinner";
import RecipeCard from "./RecipeCard";
import { Endpoint } from "../constants/endpoints";
import RecipeReducerContext from "../context/RecipeReducerContext";

const MainDashboard = () => {
  const { recipeState, recipeDispatch } = useContext(RecipeReducerContext);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const getAllRecipes = async () => {
      try {
        setIsLoading(true);
        const { data: recipes } = await axiosPrivate.get(Endpoint.RECIPES.ALL, {
          signal: controller.signal,
        });

        recipeDispatch({ type: TYPE.READ_ALL_RECIPES, payload: recipes });
      } catch (err) {
        if (err.response.status === 401) {
          return navigate(window.location.pathname);
        }

        recipeDispatch({ type: TYPE.NO_DATA, payload: null });
      } finally {
        setIsLoading(false);
      }
    };

    if (!recipeState?.recipes) {
      getAllRecipes();
    }

    return () => {
      controller.abort("Unmount");
    };
  }, [recipeState]);

  return (
    <section className="wrapper | padding-block-700">
      <section className="dashboard">
        <div className="user-summary">
          <h2 className="fs-secondary-heading">
            {auth?.user.username}&apos;s book
          </h2>
          <div className="user-summary__info">
            {recipeState.recipes ? (
              <>
                <p className="fs-400">
                  Total Recipes:
                  <b className="fw-medium"> {recipeState.recipes.length}</b>
                </p>
                <p className="fs-400">
                  Last Recipe:{" "}
                  <b className="fw-medium">
                    {recipeState.recipes?.at(0)?.name || "You have no recipes"}
                  </b>
                </p>
                <NavLink to="/myrecipes/create">
                  <span className="material-icons">add_circle_outline</span>
                </NavLink>
              </>
            ) : (
              <>
                <p>You have not created any recipes yet!</p>
                <NavLink to="/myrecipes/create">
                  <span className="material-icons">add_circle_outline</span>
                </NavLink>
              </>
            )}
          </div>
        </div>
        <div className="user-recipes">
          {isLoading ? (
            <LoaderSpinner />
          ) : recipeState?.recipes ? (
            recipeState.recipes.map((rec) => (
              <RecipeCard key={rec._id} recipe={rec} />
            ))
          ) : null}
        </div>
      </section>
    </section>
  );
};

export default MainDashboard;
