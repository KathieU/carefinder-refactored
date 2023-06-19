import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { firestore } from "../firebase";
import AddHospital from "../components/AddHospital/AddHospital";

jest.mock("../firebase", () => ({
  firestore: {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    add: jest.fn(),
  },
}));

test("AddHospital renders correctly", async () => {
  const fakeLocations = [
    { id: "1", name: "Location 1" },
    { id: "2", name: "Location 2" },
  ];

  firestore.collection().doc().collection.mockReturnValueOnce({
    add: jest.fn().mockResolvedValueOnce(),
  });

  render(<AddHospital />);

  const locationSelect = screen.getByLabelText("Location:");
  const nameInput = screen.getByLabelText("Name:");
  const addressInput = screen.getByLabelText("Address:");
  const phoneInput = screen.getByLabelText("Phone:");
  const emailInput = screen.getByLabelText("Email:");
  const descriptionInput = screen.getByLabelText("Description:");
  const formSubmitButton = screen.getByRole("button", { name: "Add Hospital" });

  // Assert that the form inputs are rendered correctly
  expect(locationSelect).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(addressInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(formSubmitButton).toBeInTheDocument();

  // Mock the Firestore collection retrieval
  firestore.collection().get.mockResolvedValueOnce({
    docs: fakeLocations.map((location) => ({
      id: location.id,
      data: () => location,
    })),
  });

  // Wait for the locations to be fetched and populate the select input
  await waitFor(() => {
    const locationOptions = screen.getAllByRole("option");
    expect(locationOptions).toHaveLength(fakeLocations.length + 1); // Including the default "Select a location" option
    fakeLocations.forEach((location, index) => {
      expect(locationOptions[index + 1]).toHaveTextContent(location.name);
      expect(locationOptions[index + 1]).toHaveAttribute("value", location.id);
    });
  });

  // Fill in the form fields
  fireEvent.change(locationSelect, { target: { value: "1" } });
  fireEvent.change(nameInput, { target: { value: "Hospital 1" } });
  fireEvent.change(addressInput, { target: { value: "123 Main St" } });
  fireEvent.change(phoneInput, { target: { value: "123-456-7890" } });
  fireEvent.change(emailInput, { target: { value: "hospital1@example.com" } });
  fireEvent.change(descriptionInput, {
    target: { value: "This is the description" },
  });

  // Submit the form
  fireEvent.click(formSubmitButton);

  // Wait for the form submission to complete
  await waitFor(() => {
    expect(firestore.collection().doc().collection().add).toHaveBeenCalledTimes(
      1
    );
  });

  // Assert that the form fields are cleared and success message is displayed
  expect(locationSelect).toHaveValue("");
  expect(nameInput).toHaveValue("");
  expect(addressInput).toHaveValue("");
  expect(phoneInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
  expect(descriptionInput).toHaveValue("");
  expect(screen.getByText("Hospital added successfully!")).toBeInTheDocument();
});
