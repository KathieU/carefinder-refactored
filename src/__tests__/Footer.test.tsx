import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Home/Footer";

describe("Footer component", () => {
  test("renders footer content correctly", () => {
    render(<Footer />);

    expect(screen.getByText("CareFinder")).toBeInTheDocument();
    expect(screen.getByText("Plot 42, Akinza Street, Victoria island, Lagos +2349167351788")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("News & Media Contact Us")).toBeInTheDocument();
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("My account")).toBeInTheDocument();
    expect(screen.getByText("Book an appointment")).toBeInTheDocument();
    expect(screen.getByText("Library")).toBeInTheDocument();
  });

  test("applies correct CSS classes", () => {
    render(<Footer />);

    expect(screen.getByTestId("footer")).toHaveClass("footer");
    expect(screen.getByTestId("footer1")).toBeInTheDocument();
    expect(screen.getByTestId("footer2")).toBeInTheDocument();
    expect(screen.getByTestId("footer3")).toBeInTheDocument();
  });
});
