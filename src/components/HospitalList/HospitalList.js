import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import { CSVLink } from "react-csv";

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

  const csvHeaders = [
    { label: "Name", key: "name" },
    { label: "Location", key: "location" },
    { label: "Address", key: "address" },
  ];

  const csvData = hospitals.map((hospital) => ({
    name: hospital.name,
    location: hospital.location,
    address: hospital.address,
  }));

  const handleEmailShare = () => {
    const emailBody = `Here is the list of hospitals:\n\n${hospitals
      .map(
        (hospital) =>
          `${hospital.name} - ${hospital.location} - ${hospital.address}`
      )
      .join("\n")}`;

    window.location.href = `mailto:?subject=List%20of%20Hospitals&body=${encodeURIComponent(
      emailBody
    )}`;
  };

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
      <button onClick={handleEmailShare}>Share via Email</button>
      <CSVLink data={csvData} headers={csvHeaders}>
        Export to CSV
      </CSVLink>
    </div>
  );
}

export default HospitalList;
