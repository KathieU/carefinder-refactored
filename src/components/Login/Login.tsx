import React, { useState, FormEvent, ChangeEvent } from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { Helmet } from "react-helmet-async";

function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Handle successful login, e.g., redirect to a different page
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div className={styles.signup}>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login to the Carefinder app on this page"/>
        <link rel="canonical" href="/login"/>
      </Helmet>
      <div className={styles.signup1}>
        <h2>CareFinder</h2>
        <h3>Join Our Community</h3>
        <p>Enjoy seamless access to medical services.</p>
        <div className={styles.image}></div>
      </div>
      <div className={styles.signup2}>
        <div className={styles.signupForm}>
          <h2>Welcome Back!</h2>
          <p>Login using correct details</p>
          <form onSubmit={handleLogin}>
            <div className={styles.email}>
              <label htmlFor="emailInput">Email Address</label>
              <input
                placeholder="Enter Email Address"
                type="email"
                id="emailInput"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>
            <div className={styles.password}>
              <label htmlFor="passwordInput">Password</label>
              <input
                placeholder="Enter Password"
                type="password"
                id="passwordInput"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>
            {error && <span>{error}</span>}
            <button type="submit">
              <Link to="/login/add-hospital" className={styles.linkText}>
                Login
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
