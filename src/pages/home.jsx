import "./home.css";
import SearchBar from "../component/searchBar";
import { useState, useEffect } from "react";
import RecipeCard from "../component/recipeCard.jsx";

function Home(){
    const [ search, setSearch ] = useState("");
    const [ recipes, setRecipes ] = useState([]);
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);

    

    useEffect(()=>{
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

    useEffect(()=>{
        const fetchRecipe = async()=>{
            setLoading(true);
            setError("");

            try{
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`
                );

                const data = await response.json();
                setRecipes(data.meals || []);
            }catch(err){
                setError("Something went wrong.");
                setRecipes([]);
            }

            setLoading(false);
        };

        fetchRecipe();
    },[search]);

    return(
        <>
            <section className="home">
                <div className="align">
                    <p className="miniTitle scroll-reveal">
                        <span>🌱</span>Cook.Eat.Enjoy.
                    </p>

                    <h1 className="scroll-reveal">
                        Discover Recipes You'll <span>Love🥯</span>
                    </h1>

                    <p className="heroDes scroll-reveal scroll-reveal-delay-2"> 
                        Find delicious recipes for any occasion.
                        Simple ingredient, amazing result.
                    </p>

                    <div className="searchBar scroll-reveal scroll-reveal-delay-3">
                        <SearchBar search={search} setSearch={setSearch} isSearching={loading} />
                    </div>
                    
                    <div className="cate scroll-reveal scroll-reveal-delay-4">
                        <span className="cates quick">
                            <span>⏱</span>
                            <p>Quick & Easy</p>
                        </span>
                        <span className="cates health">
                            <span>🌿</span>
                            <p>Healthy</p>
                        </span>
                        <span className="cates vege">
                            <span>🥒</span>
                            <p>Vegetarian</p>
                        </span>
                        <span className="cates Sweet">
                            <span>🍨</span>
                            <p>Dessert</p>
                        </span>
                    </div>
                </div>

            </section>
            <section>
                <div className="alignPopular">
                    {loading && (
                        <div className="skeletonCards">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div className="skeletonCard" key={index}></div>
                            ))}
                        </div>
                    )}
                    {error && <p className="statusMessage errorMessage">{error}</p>}
                    <span className="span scroll-reveal">
                        <h2 className="section-title">Popular Recipes</h2>
                        <p className="result">{recipes.length} result{recipes.length !== 1 ? 's' : ''} shown</p> 
                    </span>                   
                    <div className="popularGrid">
                        {!loading && recipes.map((recipe, index)=>(
                            <RecipeCard
                                key={recipe.idMeal}
                                recipe={recipe}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
export default Home;