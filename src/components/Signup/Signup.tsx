import React, { useState } from "react";
import { auth } from "../../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import googleIcon from "./googleIcon.jpg";

function Signup(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      // Handle successful signup, e.g., display a success message
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Error signing up. Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await auth.signInWithPopup(new GoogleAuthProvider());
      // Handle successful signup, e.g., display a success message
      navigate("/login");
    } catch (error) {
      console.error("Error signing up with Google:", error);
      setError("Error signing up with Google. Please try again.");
    }
  };

  const isFormValid = () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    setError("");
    return true;
  };

  return (
    <div className={styles.signup}>
      <div className={styles.signup1}>
        <h2>CareFinder</h2>
        <h3>Join Our Community</h3>
        <p>Enjoy seamless access to medical services.</p>
        <div className={styles.image}></div>
      </div>
      <div className={styles.signup2}>
        <div className={styles.signupForm}>
          <h1>Create An Account</h1>

          <form onSubmit={handleSignup}>
            <div className={styles.name}>
              <label>Name</label>
              <br />
              <input
                placeholder="Enter Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={styles.email}>
              <label>Email Address</label>
              <br />
              <input
                placeholder="Enter Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.password}>
              <label>Password</label>
              <br />
              <input
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <span>{error}</span>}
            <button type="submit">Create Account</button>
          </form>
          <p>OR</p>
          <button onClick={handleGoogleSignup}>
            <img src={googleIcon} alt="google icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
