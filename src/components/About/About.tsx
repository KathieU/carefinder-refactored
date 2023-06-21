import React from "react";
import styles from "./about.module.css";
import { Helmet } from "react-helmet-async";

function About(): JSX.Element {
  return (
    <div className={styles.about}>
      <Helmet>
        <title>About</title>
        <meta name="description" content="Find out details about the Carefinder app on this page"/>
        <link rel="canonical" href="/about"/>
      </Helmet>
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
