import React from "react";
// import styles from "./home.module.css";
import styles from "./landing.module.css";
import hospitalIcon from "./hospitalIcon.jpg";
import doctorIcon from "./doctorIcon.jpg";
import exportIcon from "./exportIcon.jpg";
import shareIcon from "./shareIcon.jpg";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";

function Home(): JSX.Element {
  return (
    <div className={styles.home}>
      <Helmet>
        <title>Carefinder</title>
        <meta name="description" content="Welcome to the Carefinder where you can find hospitals near you"/>
        <link rel="canonical" href="/"/>
      </Helmet>
      <div className={styles.hero}>
        <div className={styles.hero1}>
          <div className={styles.details}>
            <h2>Find the nearest hospital to you in Lagos and make an appointment</h2>
            <p>
              Discover Your Perfect Care: Find Your Hospital, Anytime, Anywhere!
            </p>
            <button>
              <span>GET STARTED</span>
            </button>
            <i>Learn more</i>
          </div>
          <div className={styles.image}></div>
        </div>
        <div className={styles.search}>
          <p>Find a hospital nearby</p>
        </div> 
      </div>
      
      

      <div className={styles.about}>
        <div className={styles.first}></div>
        <div className={styles.second}></div>
        <div className={styles.third}>
          <h2>
            Welcome to <br />
            <b>CareFinder</b>
          </h2>

          <p>
            Carefinder is a platform where users can search for hospitals in
            Lagos, export hospital details for their records, and enhance
            their healthcare experience by connecting with others and sharing
            valuable resources.
          </p>
          <button>
            <span>OUR SERVICES</span>
          </button>
        </div>

        <div className={styles.services}>
          <div className={styles.doctors}>
            <img src={doctorIcon} alt="doctor icon" />
            <h6>Search Doctors</h6>
            <p>Effortlessly Find the Best Doctors Near You</p>
          </div>
          <div className={styles.hospitals}>
            <img src={hospitalIcon} alt="hospital icon" />
            <h6>Search Hospitals</h6>
            <p>Effortlessly Find the Best Hospitals in Lagos</p>
          </div>
          <div className={styles.export}>
            <img src={exportIcon} alt="export icon" />
            <h6>Export Hospitals</h6>
            <p>See a list of hospitals.</p>
          </div>
          <div className={styles.share}>
            <img src={shareIcon} alt="share icon" />
            <h6>Share Hospitals</h6>
            <p>Share the list of hospitals with others.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
