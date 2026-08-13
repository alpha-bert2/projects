import "./footer.css";

function Footer() {
  return (
    <footer className="ucook-footer">
      <div className="footer-inner">
        <div className="col">
          <h4>Recipeé</h4>
          <p>Simple, tasty recipes — discover and cook with joy.</p>
        </div>
        <div className="col">
          <h5>Explore</h5>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/recipes">Recipes</a></li>
            <li><a href="/favourite">Favourite</a></li>
          </ul>
        </div>
        <div className="col">
          <h5>Support</h5>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Recipeé — All rights reserved</div>
    </footer>
  );
}

export default Footer;
