import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";
import { CSVLink } from "react-csv";
import HospitalList from "../components/HospitalList/HospitalList";

// Mock the CSVLink component
jest.mock("react-csv", () => ({
  CSVLink: jest.fn(({ data, headers }) => (
    <div data-testid="csv-link">
      Export to CSV
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {headers.map((header) => (
              <span key={header.key}>{item[header.key]}</span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )),
}));

test("HospitalList renders correctly", async () => {
  const fakeHospitals = [
    {
      id: "1",
      name: "Hospital 1",
      location: "Location 1",
      address: "Address 1",
    },
    {
      id: "2",
      name: "Hospital 2",
      location: "Location 2",
      address: "Address 2",
    },
  ];

  // Mock Firestore collection and document retrieval
  const collectionMock = jest.fn().mockReturnValueOnce({
    doc: jest.fn().mockReturnValueOnce({
      collection: jest.fn().mockReturnValueOnce({
        get: jest.fn().mockResolvedValueOnce({
          docs: fakeHospitals.map((hospital) => ({
            id: hospital.id,
            data: () => hospital,
          })),
        }),
      }),
    }),
  });
  const firestoreMock = {
    collection: collectionMock,
  };

  render(
    <BrowserRouter>
      <Route path="/locations/:id">
        <HospitalList firestore={firestoreMock} />
      </Route>
    </BrowserRouter>
  );

  // Assert that the loading state is displayed initially
  const loadingMessage = screen.getByText("Loading...");
  expect(loadingMessage).toBeInTheDocument();

  // Wait for the data to be fetched and the component to re-render
  await screen.findByText("HospitalList renders correctly");

  // Assert that the hospitals are rendered correctly
  const hospitalItems = screen.getAllByRole("listitem");
  expect(hospitalItems).toHaveLength(fakeHospitals.length);
  fakeHospitals.forEach((hospital, index) => {
    expect(hospitalItems[index]).toHaveTextContent(hospital.name);
    expect(hospitalItems[index]).toHaveTextContent(
      `Location: ${hospital.location}`
    );
    expect(hospitalItems[index]).toHaveTextContent(
      `Address: ${hospital.address}`
    );
  });

  // Assert that the "Share via Email" button triggers the email share function
  const shareButton = screen.getByRole("button", { name: "Share via Email" });
  fireEvent.click(shareButton);
  // TODO: Add assertions for email share behavior

  // Assert that the CSV export link is rendered with the correct data
  const csvLink = screen.getByTestId("csv-link");
  expect(csvLink).toBeInTheDocument();
  expect(CSVLink).toHaveBeenCalledWith(
    expect.objectContaining({ data: expect.arrayContaining(fakeHospitals) })
  );
});
