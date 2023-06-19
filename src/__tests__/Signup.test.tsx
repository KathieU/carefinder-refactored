import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { auth, googleAuthProvider } from "../firebase";
import Signup from "../components/Signup/Signup";

// Mock the Firebase authentication methods
jest.mock("../firebase", () => ({
  auth: {
    createUserWithEmailAndPassword: jest.fn(),
    signInWithPopup: jest.fn(),
  },
  googleAuthProvider: jest.fn(),
}));

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

test("Signup component submits signup form correctly", async () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );

  // Assert that the heading is rendered correctly
  const heading = screen.getByRole("heading", { name: "Signup" });
  expect(heading).toBeInTheDocument();

  // Get the email and password inputs
  const emailInput = screen.getByLabelText("Email:");
  const passwordInput = screen.getByLabelText("Password:");

  // Mock the authentication sign-up function
  auth.createUserWithEmailAndPassword.mockResolvedValueOnce({});

  // Simulate user input by changing the input values
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  // Submit the signup form
  fireEvent.submit(screen.getByRole("button", { name: "Signup" }));

  // Assert that the create user function is called with the correct arguments
  expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
    "test@example.com",
    "password123"
  );
});

test("Signup component handles Google signup correctly", async () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );

  // Mock the authentication sign-in with Google function
  auth.signInWithPopup.mockResolvedValueOnce({});

  // Mock the useNavigate hook
  const mockNavigate = jest.fn();
  jest
    .spyOn(require("react-router-dom"), "useNavigate")
    .mockReturnValue(mockNavigate);

  // Click the "Signup with Google" button
  fireEvent.click(screen.getByRole("button", { name: "Signup with Google" }));

  // Assert that the sign-in with Google function is called with the correct provider
  expect(auth.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider);

  // Assert that the navigate function is called with the correct path
  expect(mockNavigate).toHaveBeenCalledWith("/login");
});
