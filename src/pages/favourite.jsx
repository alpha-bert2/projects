import { useEffect, useState } from "react";
import RecipeCard from "../component/recipeCard";
import "./favorite.css"


function Favourite(){
      const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedRecipes =
        JSON.parse(localStorage.getItem("favorites")) || [];

        setFavorites(savedRecipes);
  }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll(".scroll-reveal").forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    return (
    <section className="favorites">
        <span className="favtitle scroll-reveal">
            <h1>My Favorite Recipes</h1>
            <p>{favorites.length} recipe{favorites.length !== 1 ? "s":""} 🧡</p>
        </span>
        {favorites.length === 0 ? (
            <div className="emptyFavorites scroll-reveal">
                <div className="emptyHeart">💛</div>
                <p>No favorites yet.</p>
            </div>
        ) : (
            <div className="recipe-grid">
            {favorites.map((recipe, index) => (
                <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                index={index}
                />
            ))}
            </div>
        )}
    </section>
  );
}
export default Favourite;