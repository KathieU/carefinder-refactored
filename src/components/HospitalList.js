import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";

function HospitalList() {
  const [hospitals, setHospitals] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const hospitalsSnapshot = await firestore
          .collection("locations")
          .doc(id)
          .collection("hospitals")
          .get();

        const hospitalsData = hospitalsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setHospitals(hospitalsData);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, [id]);

  return (
    <div>
      <h1>Hospitals in Location</h1>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital.id}>
            <strong>{hospital.name}</strong>
            <br />
            Location: {hospital.location}
            <br />
            Address: {hospital.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HospitalList;

//   const handleLocationClick = (location) => {
//     setSelectedLocation(location);
//   };

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       if (selectedLocation) {
//         try {
//           const hospitalsSnapshot = await firestore
//             .collection("locations")
//             .doc(selectedLocation.id)
//             .collection("hospitals")
//             .get();

//           const hospitalsData = hospitalsSnapshot.docs.map((doc) => ({
//             id: doc.id,
//             locationId: selectedLocation.id,
//             locationName: selectedLocation.name,
//             ...doc.data(),
//           }));

//           setHospitals(hospitalsData);
//         } catch (error) {
//           console.error("Error fetching hospitals:", error);
//         }
//       }
//     };

//     fetchHospitals();
//   }, [selectedLocation]);

//   const [hospitals, setHospitals] = useState([]);

//   return (
//     <div>
//       <h1>List of Locations</h1>
//       <ul>
//         {locations.map((location) => (
//           <li
//             key={location.id}
//             onClick={() => handleLocationClick(location)}
//             style={{ cursor: "pointer" }}
//           >
//             {location.name}
//           </li>
//         ))}
//       </ul>

//       {selectedLocation && (
//         <div>
//           <h2>Hospitals in {selectedLocation.name}</h2>
//           <ul>
//             {hospitals.map((hospital) => (
//               <li key={hospital.id}>
//                 <strong>{hospital.name}</strong>
//                 <br />
//                 Location: {hospital.locationName}
//                 <br />
//                 Address: {hospital.address}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default HospitalList;
