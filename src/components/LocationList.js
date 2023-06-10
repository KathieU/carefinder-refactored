// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { firestore } from "../firebase";

// function LocationList() {
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const locationsSnapshot = await firestore.collection("locations").get();
//         const locationsData = locationsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setLocations(locationsData);
//       } catch (error) {
//         console.error("Error fetching locations:", error);
//       }
//     };

//     fetchLocations();
//   }, []);

//   return (
//     <div>
//       <h1>List of Locations</h1>
//       <ul>
//         {locations.map((location) => (
//           <li key={location.id}>
//             <Link to={`/location/${location.id}`}>{location.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default LocationList;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";

function LocationList() {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
        }));
        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>List of Locations</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by location..."
      />
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            <Link to={`/location/${location.id}`}>{location.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationList;
