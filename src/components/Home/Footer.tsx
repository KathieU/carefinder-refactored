import React from "react";
import styles from "./footer.module.css";

function Footer(): JSX.Element {
  return (
    <footer className={styles.footer} data-testid="footer">
      <div className={styles.footer1} data-testid="footer1">
        <h5>CareFinder</h5>
        <p>Plot 42, Akinza Street, Victoria island, Lagos +2349167351788</p>
      </div>
      <div className={styles.footer2} data-testid="footer2">
        <h5>About Us</h5>
        <p>News & Media Contact Us</p>
      </div>
      <div className={styles.footer3} data-testid="footer3">
        <h5>Quick Links</h5>
        <p>My account</p>
        <p>Book an appointment</p>
        <p>Library</p>
      </div>
    </footer>
  );
}

export default Footer;
