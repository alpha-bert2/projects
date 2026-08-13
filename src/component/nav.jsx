import { useEffect, useState } from "react";
import cook from "../assets/favicon.svg"
import { Link, NavLink } from "react-router-dom";
import "./nav.css";
import recipee from "../assets/recipee.png"

function Navbar(){
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toogleFaMenu = ()=>{
    setMenuOpen(!menuOpen);
  }

  const closeMenu = () => {
    setMenuOpen(false);
  }

  return(
    <header className={scrolled ? "scrolled" : ""}>
        <nav>
            <Link to="/home" className="logo" onClick={closeMenu}>
                <img src={recipee} alt="logo" className="logoImg"/>             
            </Link>

            <span className="navLinks">
                <NavLink to="/home" className={({ isActive }) => isActive ? "naviLink active" : "naviLink"} onClick={closeMenu}>Home</NavLink>
                <NavLink to="/recipes" className={({ isActive }) => isActive ? "naviLink active" : "naviLink"} onClick={closeMenu}>Recipes</NavLink>
                <NavLink to="/favourite" className={({ isActive }) => isActive ? "naviLink active" : "naviLink"} onClick={closeMenu}>Favourite</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "naviLink active" : "naviLink"}>About</NavLink>
            </span>
            
            <span className="navCTA">
              <Link to="/signin" className="first-navCTA" onClick={closeMenu}>
                  Sign in
              </Link>
              <Link to="/signup" className="second-navCTA" onClick={closeMenu}>
                Sign up
              </Link>
            </span>
            <span className={menuOpen ? "menu active" : "menu"}>
               <i className="fa-solid fa-bars" onClick={toogleFaMenu}></i>
            </span>
        </nav>
        <div className={menuOpen ? "navy open" : "navy"}>
          <span className="alignNav">
            <span className="navLink">
                <NavLink to="/home" className={({ isActive }) => isActive ? "naviLink active" : "naviLink"} onClick={closeMenu}>Home</NavLink>
                <NavLink to="/recipes" className={({ isActive }) => isActive ? "naviLink active" : "naviLink"} onClick={closeMenu}>Recipes</NavLink>
                <NavLink to="/favourite" className={({ isActive }) => isActive ? "naviLink active" : "naviLink"} onClick={closeMenu}>Favourite</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "naviLink active" : "naviLink"} onClick={closeMenu}>About</NavLink>
            </span>
            <span className="navCTAs">
              <Link to="/signin" className="first-navCTA">
                  Sign in
              </Link>
              <Link to="/signup" className="second-navCTA">
                Sign up
              </Link>
            </span>
          </span>

        </div>
    </header>
  )
}
export default Navbar;
