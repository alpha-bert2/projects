import Navbar from "./component/nav.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home.jsx";
import Recipe from "./pages/recipes.jsx";
import Favourite from "./pages/favourite.jsx";
import About from "./pages/about.jsx";
import RecipeDetails from "./recipeDetails.jsx";
import Footer from "./component/Footer";
import SignOut from "./component/SignOut.jsx";
import SignIn from "./component/SignIn.jsx";
import SignUp from "./component/SignUp.jsx";

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
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
    <Footer />
    </>
  )
}
export default App;