import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

function Navbar(): JSX.Element {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <nav>
      <Link to="/" className={styles.title}>
      <h1 >CareFinder</h1>
      </Link>
      

      <div className={styles.navLinks}>
        <Link to="/" className={styles.homeLink}>
          Home
        </Link>

        <a
          href="#about-section"
          onClick={(e) => scrollToSection(e, "about-section")}
          className={styles.aboutLink}
        >
          About
        </a>

        {/* <Link to="#about-section" className={styles.aboutLink}>
          About
        </Link> */}

        <Link to="/location" className={styles.findLink}>
          Find Hospital
        </Link>

        <Link to="/login" className={styles.navButton}>
          <span>Login</span>
        </Link>

        <Link to="/signup" className={styles.navButton}>
          <span>Signup</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
