import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

function Navbar() {
  return (
    <nav>
      <h1 className={styles.title}>CareFinder</h1>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.homeLink}>
          Home
        </Link>

        <Link to="/about" className={styles.aboutLink}>
          About
        </Link>

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
