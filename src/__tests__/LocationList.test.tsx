import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { firestore } from "../firebase";
import LocationList from "../components/LocationList/LocationList";

// Mock the Firestore collection and query methods
jest.mock("../firebase", () => ({
  firestore: {
    collection: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    get: jest.fn(),
  },
}));

test("LocationList renders correctly", async () => {
  const fakeLocations = [
    { id: "1", name: "Location 1" },
    { id: "2", name: "Location 2" },
  ];

  // Mock the Firestore collection retrieval
  firestore.collection.mockReturnValueOnce({
    where: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValueOnce({
      docs: fakeLocations.map((location) => ({
        id: location.id,
        data: () => location,
      })),
    }),
  });

  render(
    <BrowserRouter>
      <LocationList />
    </BrowserRouter>
  );

  // Assert that the heading is rendered correctly
  const heading = screen.getByRole("heading", { name: "List of Locations" });
  expect(heading).toBeInTheDocument();

  // Assert that the search input is rendered correctly
  const searchInput = screen.getByPlaceholderText("Search by location...");
  expect(searchInput).toBeInTheDocument();

  // Assert that the locations are rendered correctly
  const locationList = screen.getByRole("list");
  expect(locationList).toBeInTheDocument();
  fakeLocations.forEach((location) => {
    const locationName = screen.getByText(location.name);
    expect(locationName).toBeInTheDocument();
  });

  // Mock the Firestore collection retrieval with a different search term
  const searchTerm = "Location 2";
  firestore.collection.mockReturnValueOnce({
    where: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValueOnce({
      docs: fakeLocations
        .filter((location) => location.name.includes(searchTerm))
        .map((location) => ({
          id: location.id,
          data: () => location,
        })),
    }),
  });

  // Trigger a search by changing the search input value
  fireEvent.change(searchInput, { target: { value: searchTerm } });

  // Wait for the component to re-render with the filtered locations
  await screen.findByText("Location 2");

  // Assert that the filtered locations are rendered correctly
  const filteredLocationName = screen.getByText("Location 2");
  expect(filteredLocationName).toBeInTheDocument();
});
