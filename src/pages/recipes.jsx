import { useState, useEffect } from "react";
import RecipeCard from "../component/recipeCard.jsx";
import "./recipes.css";
import "./home.css";

// Popular local cuisine areas available in TheMealDB
const CUISINE_AREAS = [
    { name: "Ghanaian", emoji: "🇬🇭" },
    { name: "Nigerian", emoji: "🇳🇬" },
    { name: "Kenyan", emoji: "🇰🇪" },
    { name: "Ethiopian", emoji: "🇪🇹" },
    { name: "South African", emoji: "🇿🇦" },
    { name: "Indian", emoji: "🇮🇳" },
    { name: "Italian", emoji: "🇮🇹" },
    { name: "Mexican", emoji: "🇲🇽" },
    { name: "Japanese", emoji: "🇯🇵" },
    { name: "Chinese", emoji: "🇨🇳" },
    { name: "Jamaican", emoji: "🇯🇲" },
    { name: "French", emoji: "🇫🇷" },
    { name: "American", emoji: "🇺🇸" },
    { name: "British", emoji: "🇬🇧" },
    { name: "Moroccan", emoji: "🇲🇦" },
    { name: "Turkish", emoji: "🇹🇷" },
];

function Recipe() {
    const [area, setArea] = useState("Ghanaian");
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        const fetchLocalDishes = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(area)}`
                );
                const data = await response.json();

                if (data.meals) {
                    setMeals(data.meals);
                } else {
                    setMeals([]);
                }
            } catch (err) {
                setError("Something went wrong while fetching local dishes. Please try again.");
                setMeals([]);
            }

            setLoading(false);
        };

        fetchLocalDishes();
    }, [area]);

    return (
        <section className="localDishes">
            <div className="alignLocal">
                <p className="miniTitle scroll-reveal">
                    <span>🌍</span>Local & Traditional Dishes
                </p>

                <h1 className="scroll-reveal">
                    Explore <span>Cuisines</span> From Around The <span>World 🍜</span>
                </h1>

                <p className="heroDes scroll-reveal scroll-reveal-delay-2">
                    Discover authentic traditional dishes from different cultures and regions. 
                    Pick a cuisine to explore its local flavours.
                </p>

                <div className="cuisineSelector scroll-reveal scroll-reveal-delay-3">
                    {CUISINE_AREAS.map((cuisine) => (
                        <button
                            key={cuisine.name}
                            className={`cuisineBtn ${area === cuisine.name ? "activeCuisine" : ""}`}
                            onClick={() => setArea(cuisine.name)}
                        >
                            <span>{cuisine.emoji}</span>
                            <p>{cuisine.name}</p>
                        </button>
                    ))}
                </div>

                <div className="cuisineInfo scroll-reveal scroll-reveal-delay-4">
                    <h2>
                        {area} Dishes
                        <span className="resultCount">
                            {meals.length > 0 && ` (${meals.length} result${meals.length !== 1 ? "s" : ""})`}
                        </span>
                    </h2>
                </div>
            </div>

            <div className="alignPopular">
                {loading && (
                    <div className="skeletonCards">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div className="skeletonCard" key={index}></div>
                        ))}
                    </div>
                )}
                {error && <p className="statusMessage errorMessage">{error}</p>}
                {!loading && !error && meals.length === 0 && (
                    <p className="statusMessage">No dishes found for {area} cuisine. Try another area!</p>
                )}

                <div className="popularGrid">
                    {!loading && meals.map((meal, index) => (
                        <RecipeCard
                            key={meal.idMeal}
                            recipe={meal}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Recipe;

