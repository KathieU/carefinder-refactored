import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import ReactMarkdown from "react-markdown";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import styles from "./add.module.css";

interface Location {
  id: string;
  name: string;
}

function AddHospital(): JSX.Element {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchLocations = async (): Promise<void> => {
      try {
        const locationsSnapshot = await firestore.collection("locations").get();
        const locationsData: Location[] = locationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Location[];
        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedLocation(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleEditorChange = ({ html, text }: { html: string; text: string }): void => {
    setMarkdownContent(text);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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

  const renderHTML = (text: string): React.ReactElement => {
    return <ReactMarkdown>{text}</ReactMarkdown>;
  };

  return (
    <div className={styles.add}>
      <h2>Add Hospital</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className={styles.selectLocation}>
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
        <div className={styles.selectName}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className={styles.selectAddress}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div className={styles.selectPhone}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
        <div className={styles.selectEmail}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className={styles.description}>
          <label htmlFor="description">Description:</label>
          <Editor
            value={markdownContent}
            onChange={handleEditorChange}
            renderHTML={renderHTML}
            style={{ height: "300px" }}
          />
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
        <button type="submit">Add Hospital</button>
      </form>
    </div>
  );
}

export default AddHospital;
