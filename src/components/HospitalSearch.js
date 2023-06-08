// import React, { useState } from "react";
// // import firebase from "firebase/app";
// // import "firebase/firestore";
// import firebase from "firebase/compat/app";
// import "firebase/compat/firestore";

// import { useCollection } from "react-firebase-hooks/firestore";

// // Initialize Firebase
// firebase.initializeApp({
//   apiKey: "AIzaSyCuUPEC-7WOQSq7enYyHCMPvD_ePt4oN0Q",
//   authDomain: "carefinder-18537.firebaseapp.com",
//   databaseURL: "https://carefinder-18537-default-rtdb.firebaseio.com",
//   projectId: "carefinder-18537",
//   storageBucket: "carefinder-18537.appspot.com",
//   messagingSenderId: "665764269390",
//   appId: "1:665764269390:web:a1c80551185abef6b4221f",
//   measurementId: "G-37H529L275",
//   // Add your Firebase config here
//   // apiKey: '<YOUR_API_KEY>',
//   // authDomain: '<YOUR_AUTH_DOMAIN>',
//   // projectId: '<YOUR_PROJECT_ID>',
// });

// const HospitalSearch = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");

//   const cities = ["City A", "City B", "City C"]; // List of nearby cities

//   // Firestore collection reference
//   const hospitalsRef = firebase.firestore().collection("hospitals");
//   hospitalsRef
//     .add({
//       name: "Hospital A",
//       city: "City A",
//       latitude: 12.3456,
//       longitude: 78.9012,
//     })
//     .then((docRef) => {
//       console.log("Hospital document added with ID:", docRef.id);
//     })
//     .catch((error) => {
//       console.error("Error adding hospital document:", error);
//     });

//   // Query hospitals based on search query and selected city
//   const [hospitals, loading, error] = useCollection(
//     hospitalsRef
//       .where("city", "==", selectedCity)
//       .where("name", ">=", searchQuery)
//       .where("name", "<=", searchQuery + "\uf8ff")
//       .limit(10)
//   );

//   const handleSearch = () => {
//     // Fetch hospitals based on search query and selected city
//     hospitalsRef
//       .where("city", "==", selectedCity)
//       .where("name", ">=", searchQuery)
//       .where("name", "<=", searchQuery + "\uf8ff")
//       .limit(10)
//       .get()
//       .then((querySnapshot) => {
//         // Process querySnapshot to display results
//         // ...
//       })
//       .catch((error) => {
//         console.error("Error searching hospitals:", error);
//       });
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search hospitals..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       <select
//         value={selectedCity}
//         onChange={(e) => setSelectedCity(e.target.value)}
//       >
//         <option value="">Select a city</option>
//         {cities.map((city) => (
//           <option key={city} value={city}>
//             {city}
//           </option>
//         ))}
//       </select>
//       <button onClick={handleSearch}>Search</button>

//       {loading && <div>Loading...</div>}
//       {error && <div>Error: {error.message}</div>}
//       {hospitals && (
//         <ul>
//           {hospitals.docs.map((doc) => (
//             <li key={doc.id}>{doc.data().name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default HospitalSearch;
