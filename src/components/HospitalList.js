import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";

function HospitalList() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const snapshot = await firestore.collection("hospitals").get();
        const hospitalData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHospitals(hospitalData);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div>
      <h1>Hospital List</h1>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital.id}>
            <Link to={`/hospital/${hospital.id}`}>{hospital.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HospitalList;
