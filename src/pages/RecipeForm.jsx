import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { TYPE } from "../actions/recipesActions";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { CategoryEnums } from "../constants/categorys";
import LoaderSpinner from "../components/LoaderSpinner";
import { Endpoint } from "../constants/endpoints";
import RecipeReducerContext from "../context/RecipeReducerContext";
import { base64ToImageFile } from "../helpers/base64ToImageFile";

const RecipeForm = () => {
  const { recipeDispatch } = useContext(RecipeReducerContext);
  const axios = useAxiosPrivate();

  const [recipeForm, setRecipeForm] = useState({
    name: "",
    image: null,
    category: "",
    ingredients: [""],
    steps: [""],
  });

  const location = useLocation();

  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (location?.state?.recipe) {
      const dataTransfer = new DataTransfer();
      const fileInput = document.getElementById("image");

      const FileImage = base64ToImageFile(
        location.state.recipe.image,
        location.state.recipe.name
      );

      dataTransfer.items.add(FileImage);
      fileInput.files = dataTransfer.files;

      setRecipeForm({
        ...location.state.recipe,
        steps: location.state.recipe.preparationSteps,
        image: FileImage,
      });

      if (fileInput.webkitEntries.length) {
        fileInput.dataset.file = `${dataTransfer.files[0].name}`;
      }
    }
  }, [location.state]);

  useEffect(() => {
    setErrorMessage("");
  }, [recipeForm]);

  const handleInputChange = (e, i) => {
    if (e.target.classList.contains("ingredient")) {
      let newIngredients = [...recipeForm.ingredients];

      newIngredients[i] = e.target.value;
      setRecipeForm((prev) => {
        return {
          ...prev,
          ingredients: newIngredients,
        };
      });
    }

    if (e.target.classList.contains("step")) {
      let newSteps = [...recipeForm.steps];

      newSteps[i] = e.target.value;
      setRecipeForm((prev) => {
        return {
          ...prev,
          steps: newSteps,
        };
      });
    }

    if (e.target.classList.contains("select-category")) {
      setRecipeForm((prev) => {
        return {
          ...prev,
          category: e.target.value,
        };
      });
    }

    if (e.target.name === "recipe-name") {
      setRecipeForm((prev) => {
        return {
          ...prev,
          name: e.target.value,
        };
      });
    }
  };

  const addInput = (e) => {
    if (
      e.target.classList.contains("add-ingredient") &&
      recipeForm.ingredients.length < 5
    ) {
      setRecipeForm((prev) => {
        return {
          ...prev,
          ingredients: [...prev.ingredients, ""],
        };
      });
    }

    if (
      e.target.classList.contains("add-step") &&
      recipeForm.steps.length < 5
    ) {
      setRecipeForm((prev) => {
        return {
          ...prev,
          steps: [...prev.steps, ""],
        };
      });
    }
  };

  const removeInput = (e) => {
    if (
      e.target.classList.contains("remove-ingredient") &&
      recipeForm.ingredients.length > 1
    ) {
      const newIngredients = recipeForm.ingredients.slice(0, -1);

      setRecipeForm((prev) => {
        return {
          ...prev,
          ingredients: newIngredients,
        };
      });
    }

    if (
      e.target.classList.contains("remove-step") &&
      recipeForm.steps.length > 1
    ) {
      const newSteps = recipeForm.steps.slice(0, -1);

      setRecipeForm((prev) => {
        return {
          ...prev,
          steps: newSteps,
        };
      });
    }
  };

  const handleFileDrop = (e) => {
    const file = e.dataTransfer.files[0];

    if (file.type.match("image/png") || file.type.match("image/jpeg")) {
      setRecipeForm((prev) => {
        return {
          ...prev,
          image: file,
        };
      });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file.type.match("image/png") || file.type.match("image/jpeg")) {
      setRecipeForm((prev) => {
        return {
          ...prev,
          image: file,
        };
      });
    }
  };

  const handleFileChange = (e) => {
    e.target.value = "";

    setRecipeForm((prev) => {
      return {
        ...prev,
        image: null,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    let EndpointActions = {
      Endpoint: "",
      Type: "",
    };

    if (location?.state?.recipe) {
      EndpointActions.Endpoint = `${Endpoint.RECIPES.PATCH}${location.state.recipe._id}`;
      EndpointActions.Type = TYPE.UPDATE_RECIPE;
    } else {
      EndpointActions.Endpoint = Endpoint.RECIPES.CREATE;
      EndpointActions.Type = TYPE.CREATE_RECIPE;
    }

    try {
      setLoader(true);
      let response;

      if (location?.state?.recipe) {
        response = await axios.patch(
          `${EndpointActions.Endpoint}`,
          {
            ...recipeForm,
            preparationSteps: recipeForm.steps,
          },
          {
            signal: controller.abort(),
          }
        );
      } else {
        response = await axios.post(
          `${EndpointActions.Endpoint}`,
          {
            ...recipeForm,
            preparationSteps: recipeForm.steps,
          },
          {
            signal: controller.abort(),
          }
        );
      }

      if (!response.data || !response.statusText === "OK") {
        throw response;
      }

      recipeDispatch({ type: EndpointActions.Type, payload: response.data });

      if (response.status === 201 || response.status === 200) {
        return navigate("/myrecipes");
      }
    } catch (err) {
      if (err.response.data.message[0].kind === "enum") {
        return setErrorMessage(
          `${err.response.data.message[0].value} is not a valid category`
        );
      }

      setErrorMessage(err.response.data.message);
    } finally {
      setLoader(false);
      controller.abort();
    }
  };

  return (
    <section className="wrapper | padding-block-700">
      <p
        className={errorMessage ? "err-message" : "offscreen"}
        aria-live="assertive"
      >
        {errorMessage}
      </p>

      <div className="form-container">
        <form
          className="recipe-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="recipe-image | flow">
            <h2 className="fw-medium">Image</h2>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={handleFileChange}
              onTouchStart={handleFileChange}
              onChange={handleFileUpload}
            />
          </div>
          <div className="recipe-name | flow">
            <h2 className="fw-medium">Name</h2>
            <input
              type="text"
              className="form-input"
              name="recipe-name"
              required
              value={recipeForm.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="recipe-category | flow">
            <h2 className="fw-medium">Category</h2>
            <select
              name="category"
              id="category"
              className="select-category"
              onChange={handleInputChange}
              value={recipeForm.category}
            >
              <option defaultValue>Choose a category</option>
              {CategoryEnums.map((cate) => (
                <option value={cate} key={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>
          <div className="recipe-ingredients | flow">
            <h2 className="fw-medium">Ingredients</h2>
            {recipeForm.ingredients.map((ing, ind) => (
              <input
                type="text"
                key={ind}
                className="form-input | ingredient"
                value={ing}
                onChange={(e) => handleInputChange(e, ind)}
              />
            ))}

            <div className="btns-container">
              {recipeForm.ingredients.length < 5 ? (
                <span
                  className="material-icons | recipes-btn"
                  onClick={addInput}
                >
                  <button type="button" className="add-ingredient | reset-btn">
                    add_circle_outline
                  </button>
                </span>
              ) : null}
              {recipeForm.ingredients.length > 1 ? (
                <span
                  className="material-icons | recipes-btn"
                  onClick={removeInput}
                >
                  <button
                    type="button"
                    className="remove-ingredient | reset-btn"
                  >
                    remove_circle_outline
                  </button>
                </span>
              ) : null}
            </div>
          </div>
          <div className="recipe-steps | flow">
            <h2 className="fw-medium">Preparation Steps</h2>
            {recipeForm.steps.map((step, ind) => (
              <textarea
                name={step}
                cols="30"
                rows="10"
                maxLength="150"
                key={ind}
                className="form-input | step"
                value={step}
                onChange={(e) => handleInputChange(e, ind)}
              />
            ))}

            <div className="btns-container">
              {recipeForm.steps.length < 5 ? (
                <span className="material-icons | recipes-btn">
                  <button
                    type="button"
                    className="add-step | reset-btn"
                    onClick={addInput}
                  >
                    add_circle_outline
                  </button>
                </span>
              ) : null}
              {recipeForm.steps.length > 1 ? (
                <span className="material-icons | recipes-btn">
                  <button
                    className="remove-step | reset-btn"
                    type="button"
                    onClick={removeInput}
                  >
                    remove_circle_outline
                  </button>
                </span>
              ) : null}
            </div>
          </div>
          {loader ? (
            <LoaderSpinner />
          ) : (
            <div className="recipe-update">
              <NavLink to={"/myrecipes"} className="arrow-back">
                <span className="material-icons">arrow_back</span>
              </NavLink>

              <button type="submit" className="button">
                {location?.state?.recipe ? "Update Recipe" : "Create Recipe"}
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default RecipeForm;
