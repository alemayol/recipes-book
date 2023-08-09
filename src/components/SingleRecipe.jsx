import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { Endpoint } from "../constants/endpoints";
import LoadingStage from "../pages/LoadingStage";
import LoaderSpinner from "./LoaderSpinner";
import { TYPE } from "../actions/recipesActions";
import RecipeReducerContext from "../context/RecipeReducerContext";

const SingleRecipe = () => {
  const { id } = useParams();
  const axios = useAxiosPrivate();
  const actionBackgroundRef = useRef();
  const wrapperRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const { recipeDispatch } = useContext(RecipeReducerContext);

  const [recipe, setRecipe] = useState({
    name: "",
    image: null,
    category: "",
    ingredients: [""],
    steps: [""],
  });
  const [loader, setLoader] = useState(false);
  const [deletingRecipe, setDeletingRecipe] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState({
    deleted: null,
    message: "",
  });

  const handleActionsHover = (e) => {
    if (e._reactName === "onMouseEnter") {
      const wrapperCords = wrapperRef.current.getBoundingClientRect();
      const linkCoords = e.target.getBoundingClientRect();

      const coords = {
        width: linkCoords.width * 0.7,
        bottom: linkCoords.bottom - wrapperCords.bottom,
        left: linkCoords.left * 0.95 - wrapperCords.left,
      };

      actionBackgroundRef.current.style.setProperty(
        "width",
        `${coords.width}px`
      );
      actionBackgroundRef.current.style.setProperty(
        "transform",
        `translate(${coords.left}px, ${coords.bottom}px)`
      );

      actionBackgroundRef.current.style.setProperty("visibility", `visible`);
      actionBackgroundRef.current.style.setProperty("opacity", `1`);
    }

    if (e._reactName === "onMouseLeave") {
      actionBackgroundRef.current.style.setProperty("visibility", `hidden`);
      actionBackgroundRef.current.style.setProperty("opacity", `0`);
    }
  };

  const handleModal = (e) => {
    const modal = document.querySelector(".delete-dialog");
    setDeleteStatus({
      deleted: null,
      message: "",
    });

    if (e.target.matches(".delete-recipe")) {
      modal.showModal();
    }

    if (e.target.matches(".return-delete")) {
      modal.close();
    }
  };

  const handleDeleteRecipe = async () => {
    const controller = new AbortController();

    try {
      setDeletingRecipe(true);

      const response = await axios.delete(
        `${Endpoint.RECIPES.DELETE}${recipe._id}`,
        {
          signal: controller.signal,
        }
      );

      if (response.status !== 200) {
        throw response;
      }

      recipeDispatch({ type: TYPE.DELETE_RECIPE, payload: recipe._id });

      setDeleteStatus({
        deleted: true,
        message: response.data.msg,
      });

      setTimeout(() => {
        return navigate("/myrecipes");
      }, 2000);
    } catch (error) {
      console.log(error);
      setDeleteStatus({
        deleted: false,
        message: "Your recipe could not be deleted. Try Again",
      });
    } finally {
      setDeletingRecipe(false);
      setTimeout(() => {
        controller.abort("Timeout");
      }, 2000);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const getSingleRecipe = async () => {
      try {
        setLoader(true);
        const response = await axios.get(`${Endpoint.RECIPES.SINGLE}${id}`, {
          signal: controller.signal,
        });

        if (response.statusText !== "OK") throw response;

        const image = btoa(
          String.fromCharCode(...new Uint8Array(response.data.image.data))
        );

        response.data.image = `data:image/png;base64,${image}`;

        setRecipe(response.data);
      } catch (err) {
        return null;
      } finally {
        setLoader(false);
      }
    };

    if (location?.state?.recipe) {
      setRecipe({
        ...location.state.recipe,
        steps: location.state.recipe.preparationSteps,
        image: location.state.imgURL,
      });
    } else {
      getSingleRecipe();
    }

    return () => controller.abort("Unmount");
  }, []);

  return (
    <div className="card">
      {loader ? (
        <LoadingStage />
      ) : recipe ? (
        <>
          <NavLink to={"/myrecipes"} className="arrow-back">
            <span className="material-icons">arrow_back</span>
          </NavLink>
          <div className="recipe-wrapper | flow" ref={wrapperRef}>
            <div className="glass-effect"></div>
            <div className="recipe-view__title">
              <img src={recipe.image} alt={`${recipe.name} recipe picture`} />
              <div className="recipe-view__title_names">
                <h2 className=" | fw-bold fs-700">{recipe.name}</h2>
                <h2 className=" | fw-medium fs-600">{recipe.category}</h2>
              </div>
            </div>
            <div className="recipe-view__details | even-columns">
              <div className="recipe-view__ingredients">
                <h3 className=" | fw-medium fs-600">Ingredients</h3>
                <ul role="list" className="flow">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} role="listitem">
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="recipe-view__steps">
                <h3 className=" | fw-medium fs-600">Directions</h3>
                <ol role="list">
                  {recipe.steps.map((ing, i) => (
                    <li key={i} role="listitem">
                      {ing}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="recipe-view__actions | even-columns text-center">
              <NavLink
                to={`/myrecipes/edit/${recipe._id}`}
                state={{ edit: true, id: recipe._id, recipe: recipe }}
                onMouseEnter={handleActionsHover}
                onMouseLeave={handleActionsHover}
              >
                Edit
              </NavLink>
              <button
                className="delete-recipe | reset-btn"
                onClick={handleModal}
                onMouseEnter={handleActionsHover}
                onMouseLeave={handleActionsHover}
              >
                Delete
              </button>
              <div
                className="follow-background"
                ref={actionBackgroundRef}
              ></div>
            </div>
          </div>
        </>
      ) : null}
      <dialog className="delete-dialog | flow">
        <p>Are you sure you want to delete this recipe?</p>
        {deleteStatus.message.length > 1 ? (
          <p className={`deleted-${deleteStatus.deleted}`}>
            {deleteStatus.message}
          </p>
        ) : null}

        {deletingRecipe ? (
          <LoaderSpinner />
        ) : deleteStatus.deleted === true ? null : (
          <div className="dialog-btns">
            <button
              className="confirm-delete | reset-btn"
              onClick={handleDeleteRecipe}
            >
              Delete
            </button>
            <button className="return-delete | reset-btn" onClick={handleModal}>
              Return
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default SingleRecipe;
