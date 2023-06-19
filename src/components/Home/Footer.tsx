import React from "react";
import styles from "./footer.module.css";

function Footer() {
  return (
    <footer>
      <div className={styles.footer1}>
        <h5>CareFinder</h5>
        <p>Plot 42, Akinza Street, Victoria island, Lagos +2349167351788</p>
      </div>
      <div className={styles.footer2}>
        <h5>About Us</h5>
        <p>News & Media Contact Us</p>
      </div>
      <div className={styles.footer3}>
        <h5>Quick Links</h5>
        <p>My account </p>
        <p>Book an appointment</p>
        <p>Library</p>
      </div>
    </footer>
  );
}

export default Footer;
