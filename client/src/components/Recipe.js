import React from "react";
import './Recipe.css';

const Recipe = ({recipe}) => {
    return (
        <div className="recipeCard">
            <img src={recipe.image} alt="404 image not found" className="recipeImg"/>
            <h3 className="recipeName">{recipe.name}</h3>
            <p className="recipeDiets">{!recipe.createdInDb ? recipe.diets.map(el => el + (' ')) : recipe.diets.map(el => el.name + (' ')) }</p>
        </div>
    )
}

export default Recipe;