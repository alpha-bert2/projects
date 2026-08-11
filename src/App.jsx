import Navbar from "./component/nav.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home.jsx";
import Recipe from "./pages/recipes.jsx";
import Favourite from "./pages/favourite.jsx";
import About from "./pages/about.jsx";
import RecipeDetails from "./recipeDetails.jsx";

function App(){
  const location = useLocation();

  return(
    <>
    <Navbar/>
    <div className="pageTransition" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/recipes" element={<Recipe/>}/>
        <Route path="/favourite" element={<Favourite/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<Home/>}/>
        <Route path="/recipe/:idMeal" element={<RecipeDetails />} />
      </Routes>
    </div>
    </>
  )
}
export default App;