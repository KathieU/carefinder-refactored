import React from "react";
import { render, screen, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

describe("Navbar", () => {
  test("renders navbar links correctly", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const homeLink = screen.getByText("Home");
    const aboutLink = screen.getByText("About");
    const findLink = screen.getByText("Find Hospital");
    const loginLink = screen.getByText("Login");
    const signupLink = screen.getByText("Signup");

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(findLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();
  });

  test("navigates to correct routes when links are clicked", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const loginLink = screen.getByRole("link", { name: "Login" });
    const signupLink = screen.getByRole("link", { name: "Signup" });

    act(() => {
      loginLink.click();
    });
    expect(window.location.pathname).toBe("/login");

    act(() => {
      signupLink.click();
    });
    expect(window.location.pathname).toBe("/signup");
  });
});
