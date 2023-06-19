import React from "react";
import styles from "./about.module.css";

function About() {
  return (
    <div className={styles.about}>
      <div className={styles.first}></div>
      <div className={styles.second}></div>
      <div className={styles.third}>
        <h2>
          Welcome to <span>CareFinder</span>
        </h2>
        <p>
          Carefinder is a platform where users can search for hosiptals in their
          areas, export hospital details for your records and enhance your
          healthcare experience by connecting with others and sharing valuable
          resources.
        </p>
      </div>
    </div>
  );
}

export default About;
