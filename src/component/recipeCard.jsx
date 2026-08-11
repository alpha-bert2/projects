import { useState, useEffect } from "react";
import "./recipeCard.css";
import { Link } from "react-router-dom";


function RecipeCard({ recipe, onToggle, index = 0 }){

 const [fav, setFav] = useState(false);
 const [heartPulse, setHeartPulse] = useState(false);

 useEffect(() => {
   const favorites =
     JSON.parse(localStorage.getItem("favorites")) || [];
   const alreadyFav = favorites.find(
     (item) => item.idMeal === recipe.idMeal
   );
   if (alreadyFav) {
     setFav(true);
   }
 }, [recipe.idMeal]);

 const toggleFavorites = (event) => {
   event.preventDefault();
   event.stopPropagation();

   const favorites =
     JSON.parse(localStorage.getItem("favorites")) || [];

   const alreadyExists = favorites.find(
     (item) => item.idMeal === recipe.idMeal
   );

   if (alreadyExists) {
     const updated = favorites.filter(
       (item) => item.idMeal !== recipe.idMeal
     );
     localStorage.setItem("favorites", JSON.stringify(updated));
     setFav(false);
     setHeartPulse(true);
     setTimeout(() => setHeartPulse(false), 250);
     if (onToggle) onToggle(recipe.idMeal);
   } else {
     favorites.push(recipe);
     localStorage.setItem("favorites", JSON.stringify(favorites));
     setFav(true);
     setHeartPulse(true);
     setTimeout(() => setHeartPulse(false), 250);
     if (onToggle) onToggle(recipe.idMeal);
   }
 };

    return(
        <Link
            className="mainCard"
            to={`/recipe/${recipe.idMeal}`}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <span className="cardImage">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipeImage" />
            </span>

            <span className="cardDetails">
                <h2>{recipe.strMeal}</h2>
                <span className="caty">
                    <span>
                        <h4>Category</h4>
                        <p>{recipe.strCategory || "—"}</p>
                    </span>
                    <span className="country">
                        <h4>Area</h4>
                        <p>{recipe.strArea || "—"}</p>
                    </span>

                </span>
                <span className="Cardcta">
                    <button className="view">
                        <p>View Recipe </p>
                        ➡
                    </button>
                    <button className="favoriteButton" onClick={toggleFavorites}>
                        <span className={`favoriteHeart ${heartPulse ? "pulse" : ""}`}>{fav ? "🧡" : "🤍"}</span>
                    </button>
                </span>
            </span>
            
        </Link>
    )
}
export default RecipeCard;