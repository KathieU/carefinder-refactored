import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";

function HospitalDetails() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const docRef = await firestore.collection("hospitals").doc(id).get();
        if (docRef.exists) {
          setHospital({ id: docRef.id, ...docRef.data() });
        } else {
          console.error("Hospital not found");
        }
      } catch (error) {
        console.error("Error fetching hospital:", error);
      }
    };

    fetchHospital();
  }, [id]);

  if (!hospital) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hospital Details</h1>
      <p>Name: {hospital.name}</p>
      <p>Address: {hospital.address}</p>
      {/* Additional hospital details */}
    </div>
  );
}

export default HospitalDetails;
