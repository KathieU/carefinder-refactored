import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase";
import styles from "./location.module.css";

interface Location {
  id: string;
  name: string;
}

function LocationList(): JSX.Element {
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsSnapshot = await firestore
          .collection("locations")
          .where("name", ">=", searchTerm)
          .get();
        const locationsData = locationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Location[];
        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [searchTerm]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.location}>
      <h2>Select your location</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by location..."
      />
      <ul className={styles.cardList}>
        {locations.map((location) => (
          <li key={location.id} className={styles.cardItem}>
            <Link to={`/location/${location.id}`}>{location.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationList;
