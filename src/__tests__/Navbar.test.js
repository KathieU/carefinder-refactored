import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

test("Navbar renders correctly", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  // Assert that the navigation links are rendered correctly
  const homeLink = screen.getByText("Home");
  const loginLink = screen.getByText("Login");
  const signupLink = screen.getByText("Signup");

  expect(homeLink).toBeInTheDocument();
  expect(loginLink).toBeInTheDocument();
  expect(signupLink).toBeInTheDocument();
});
