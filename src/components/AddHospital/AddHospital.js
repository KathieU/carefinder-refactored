import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import ReactMarkdown from "react-markdown";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

function AddHospital() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsSnapshot = await firestore.collection("locations").get();
        const locationsData = locationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEditorChange = ({ html, text }) => {
    setMarkdownContent(text);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure a location is selected
      if (!selectedLocation) {
        setErrorMessage("Please select a location.");
        return;
      }

      // Create a new hospital object
      const newHospital = {
        name,
        address,
        phone,
        email,
        description: markdownContent,
      };

      // Add the new hospital to the hospitals subcollection of the selected location document
      await firestore
        .collection("locations")
        .doc(selectedLocation)
        .collection("hospitals")
        .add(newHospital);

      // Clear the form fields and display success message
      setSelectedLocation("");
      setName("");
      setAddress("");
      setPhone("");
      setEmail("");
      setMarkdownContent("");
      setSuccessMessage("Hospital added successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding hospital:", error);
      setErrorMessage("Failed to add hospital. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h1>Add Hospital</h1>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="location">Location:</label>
          <select
            id="location"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <option value="">Select a location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <Editor
            value={markdownContent}
            onChange={handleEditorChange}
            style={{ height: "300px" }}
          />
          <ReactMarkdown source={markdownContent} />
        </div>
        <button type="submit">Add Hospital</button>
      </form>
    </div>
  );
}

export default AddHospital;
