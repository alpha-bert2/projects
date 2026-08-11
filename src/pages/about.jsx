import { useEffect, useState } from "react";
import "./about.css";
import "./home.css";

function AnimatedCounter({ end, prefix = "", suffix = "", duration = 1400 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrame;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(end * easedProgress));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);

  const formatValue = (value) => new Intl.NumberFormat("en-US").format(value);

  return <span className="statNumber">{prefix}{formatValue(count)}{suffix}</span>;
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const hiddenEls = document.querySelectorAll(".reveal");
    hiddenEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function About(){
  useScrollReveal();

    return(
      <>
        <section className="about">
          <div className="align">
            <p className="miniTitle reveal fadeDown">
              <span>👨‍🍳</span>About Ucook
            </p>
            <h1 className="reveal fadeUp">
              Your <span>Ultimate</span> Recipe Companion <span>🍽️</span>
            </h1>
            <p className="heroDes reveal fadeUp">
              Ucook is your go-to platform for discovering, saving, and sharing delicious recipes from around the world.
              Whether you're a seasoned chef or a curious beginner, we help you turn everyday ingredients into extraordinary meals.
            </p>
          </div>
        </section>

        <section className="mission">
          <div className="alignPopular">
            <div className="aboutGrid">
              <div className="aboutCard reveal fadeUp">
                <span className="aboutIcon">🎯</span>
                <h2>Our Mission</h2>
                <p>To make cooking accessible and enjoyable for everyone by curating diverse recipes that celebrate global cuisines, local traditions, and seasonal ingredients.</p>
              </div>
              <div className="aboutCard reveal fadeUp">
                <span className="aboutIcon">💡</span>
                <h2>What We Offer</h2>
                <p>A vast collection of recipes from TheMealDB API, smart search by ingredients or cuisines, personalized favorites list, and curated collections from African to Asian cuisines.</p>
              </div>
              <div className="aboutCard reveal fadeUp">
                <span className="aboutIcon">🌍</span>
                <h2>Global Flavours</h2>
                <p>Explore traditional dishes from over 15 cuisines worldwide — from Ghanaian jollof to Italian pasta, Mexican tacos to Japanese ramen. There's always something new to try.</p>
              </div>
              <div className="aboutCard reveal fadeUp">
                <span className="aboutIcon">❤️</span>
                <h2>Built With Love</h2>
                <p>Ucook is crafted with passion for food and community. We believe cooking brings people together, and every recipe tells a story worth sharing.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="alignPopular">
            <div className="statsGrid">
              <div className="statCard reveal scaleIn">
                <AnimatedCounter end={15} suffix="+" />
                <p>Cuisines</p>
              </div>
              <div className="statCard reveal scaleIn">
                <AnimatedCounter end={1000} suffix="+" />
                <p>Recipes</p>
              </div>
              <div className="statCard reveal scaleIn">
                <AnimatedCounter end={24} suffix="/7" />
                <p>Fresh Daily</p>
              </div>
              <div className="statCard reveal scaleIn">
                <AnimatedCounter end={100} suffix="%" />
                <p>Community Love</p>
              </div>
            </div>
          </div>
        </section>

        <section className="team">
          <div className="alignPopular">
            <h2 className="section-title reveal fadeUp">
              Join Our <span>Community</span> 🎉
            </h2>
            <p className="heroDes centered reveal fadeUp">
              Start exploring recipes today, save your favorites, and embark on a culinary journey 
              that spans the globe — all from your kitchen.
            </p>
            <div className="ctaRow reveal fadeUp">
              <button className="second-navCTA" onClick={() => window.location.href = "/recipes"}>
                Explore Recipes →
              </button>
              <button className="first-navCTA" onClick={() => window.location.href = "/home"}>
                Learn More
              </button>
            </div>
          </div>
        </section>
      </>
    )
}
export default About;
