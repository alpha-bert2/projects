import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./recipeDetails.css";

function RecipeDetails() {
    const { idMeal } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchRecipe() {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
                );
                const data = await response.json();

                if (data.meals && data.meals.length > 0) {
                    setRecipe(data.meals[0]);
                } else {
                    setError("Recipe not found.");
                    setRecipe(null);
                }
            } catch (err) {
                setError("Something went wrong while fetching the recipe. Please try again.");
                setRecipe(null);
            }

            setLoading(false);
        }

        fetchRecipe();
    }, [idMeal]);

    // Helper to extract ingredients and measurements
    const getIngredients = (meal) => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push({
                    ingredient: ingredient.trim(),
                    measure: measure ? measure.trim() : "",
                });
            }
        }
        return ingredients;
    };

    if (loading) {
        return (
            <div className="recipeDetailsContainer">
                <div className="loadingState">
                    <div className="spinner"></div>
                    <p>Loading recipe details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="recipeDetailsContainer">
                <div className="errorState">
                    <p className="errorMessage">{error}</p>
                    <Link to="/recipes" className="backLink">← Back to Recipes</Link>
                </div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="recipeDetailsContainer">
                <div className="errorState">
                    <p className="errorMessage">Recipe not found.</p>
                    <Link to="/recipes" className="backLink">← Back to Recipes</Link>
                </div>
            </div>
        );
    }

    const ingredients = getIngredients(recipe);
    const tags = recipe.strTags ? recipe.strTags.split(",") : [];

    return (
        <section className="recipeDetailsContainer">
            <div className="backSection reveal reveal-delay-1">
                <Link to="/recipes" className="backLink">← Back to Recipes</Link>
            </div>

            {/* Hero Section */}
            <div className="recipeHero reveal reveal-delay-2">
                <div className="recipeHeroImage">
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                </div>
                <div className="recipeHeroInfo">
                    <h1 className="recipeTitle">{recipe.strMeal}</h1>
                    <div className="recipeBadges">
                        {recipe.strCategory && (
                            <span className="badge badgeCategory">{recipe.strCategory}</span>
                        )}
                        {recipe.strArea && (
                            <span className="badge badgeArea">{recipe.strArea}</span>
                        )}
                        {tags.map((tag, index) => (
                            <span key={index} className="badge badgeTag">{tag.trim()}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="recipeContent">
                {/* Ingredients */}
                <div className="ingredientsSection reveal reveal-delay-3">
                    <h2 className="sectionTitle">Ingredients</h2>
                    <div className="ingredientsGrid">
                        {ingredients.map((item, index) => (
                            <div key={index} className="ingredientItem">
                                <span className="ingredientMeasure">{item.measure}</span>
                                <span className="ingredientName">{item.ingredient}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Instructions */}
                <div className="instructionsSection reveal reveal-delay-4">
                    <h2 className="sectionTitle">Instructions</h2>
                    <div className="instructionsText">
                        {recipe.strInstructions.split("\r\n").map((paragraph, index) => (
                            paragraph.trim() && <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* YouTube Video */}
            {recipe.strYoutube && (
                <div className="videoSection reveal reveal-delay-5">
                    <h2 className="sectionTitle">Video Tutorial</h2>
                    <div className="videoWrapper">
                        <iframe
                            src={recipe.strYoutube.replace("watch?v=", "embed/")}
                            title="Recipe Video Tutorial"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </section>
    );
}

export default RecipeDetails;
