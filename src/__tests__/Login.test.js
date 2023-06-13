import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { auth } from "../firebase";
import Login from "../components/Login";

// Mock the Firebase authentication methods
jest.mock("../firebase", () => ({
  auth: {
    signInWithEmailAndPassword: jest.fn(),
  },
}));

test("Login component submits login form correctly", async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  // Assert that the heading is rendered correctly
  const heading = screen.getByRole("heading", { name: "Login" });
  expect(heading).toBeInTheDocument();

  // Get the email and password inputs
  const emailInput = screen.getByLabelText("Email:");
  const passwordInput = screen.getByLabelText("Password:");

  // Mock the authentication sign-in function
  auth.signInWithEmailAndPassword.mockResolvedValueOnce({});

  // Simulate user input by changing the input values
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  // Submit the login form
  fireEvent.submit(screen.getByRole("button", { name: "Login" }));

  // Assert that the sign-in function is called with the correct arguments
  expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
    "test@example.com",
    "password123"
  );
});
