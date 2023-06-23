import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../components/Home/Home";


describe("Home", () => {
  it("renders the Home component correctly", () => {
    render(<Home />);

    // Check if the text content is rendered correctly
    expect(screen.getByText("Find the nearest hospital to you and make an appointment")).toBeInTheDocument();
    expect(screen.getByText("Discover Your Perfect Care: Find Your Hospital, Anytime, Anywhere!")).toBeInTheDocument();
    expect(screen.getByText("GET STARTED")).toBeInTheDocument();
    expect(screen.getByText("Learn more")).toBeInTheDocument();
    expect(screen.getByText("Find a hospital nearby")).toBeInTheDocument();
    expect(screen.getByText("Welcome to")).toBeInTheDocument();
    expect(screen.getByText("CareFinder")).toBeInTheDocument();
    expect(screen.getByText("Carefinder is a platform where users can search for hospitals in their areas, export hospital details for their records, and enhance their healthcare experience by connecting with others and sharing valuable resources.")).toBeInTheDocument();
    expect(screen.getByText("OUR SERVICES")).toBeInTheDocument();
    expect(screen.getByText("Search Doctors")).toBeInTheDocument();
    expect(screen.getByText("Effortlessly Find the Best Doctors Near You")).toBeInTheDocument();
    expect(screen.getByText("Search Hospitals")).toBeInTheDocument();
    expect(screen.getByText("Effortlessly Find the Best Hospitals Near You")).toBeInTheDocument();
    expect(screen.getByText("Export Hospitals")).toBeInTheDocument();
    expect(screen.getByText("See a list of hospitals.")).toBeInTheDocument();
    expect(screen.getByText("Share Hospitals")).toBeInTheDocument();
    expect(screen.getByText("Share the list of hospitals with others.")).toBeInTheDocument();

    // Check if the image elements are rendered correctly
    expect(screen.getByAltText("doctor icon")).toBeInTheDocument();
    expect(screen.getByAltText("hospital icon")).toBeInTheDocument();
    expect(screen.getByAltText("export icon")).toBeInTheDocument();
    expect(screen.getByAltText("share icon")).toBeInTheDocument();
  });
});
