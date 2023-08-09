import { NavLink } from "react-router-dom";
import { binaryToBase64 } from "../helpers/binaryToBase64";

const RecipeCard = ({ recipe }) => {
  const imgURL = binaryToBase64(recipe.image.data);

  return (
    <figure className="recipe" style={{ backgroundImage: `url(${imgURL})` }}>
      <div className="recipe-content | flow">
        <figcaption className="recipe-title">{recipe.name}</figcaption>
        <ul role="list" className="recipe-info">
          <li role="listitem">Ingredients: {recipe.ingredients.length}</li>
          <li role="listitem">Steps: {recipe.preparationSteps.length}</li>
          <li role="listitem">Category: {recipe.category || "None"}</li>
        </ul>
        <NavLink
          to={recipe._id}
          className="recipe-btn"
          state={{ recipe, imgURL }}
        >
          See full recipe
        </NavLink>
      </div>
    </figure>
  );
};

export default RecipeCard;
