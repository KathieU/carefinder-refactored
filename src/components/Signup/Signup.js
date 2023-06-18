import React, { useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
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
      await auth.signInWithPopup(new googleAuthProvider());
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
    <div>
      <h1>Signup</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignup}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <button onClick={handleGoogleSignup}>Signup with Google</button>
    </div>
  );
}

export default Signup;
