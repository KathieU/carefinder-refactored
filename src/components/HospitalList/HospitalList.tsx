import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import { CSVLink } from "react-csv";
import styles from "./hospital.module.css";

interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

function HospitalList(): JSX.Element {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const { id } = useParams<{ id: string }>();

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
        })) as Hospital[];

        setHospitals(hospitalsData);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, [id]);

  const csvHeaders = [
    { label: "Name", key: "name" },
    { label: "Address", key: "address" },
    { label: "Phone", key: "phone" },
    { label: "Email", key: "email" },
  ];

  const csvData = hospitals.map((hospital) => ({
    name: hospital.name,
    address: hospital.address,
    phone: hospital.phone,
    email: hospital.email,
  }));

  const handleEmailShare = () => {
    const emailBody = `Here is the list of hospitals:\n\n${hospitals
      .map(
        (hospital) =>
          `${hospital.name} - ${hospital.address} - ${hospital.phone} - ${hospital.email}`
      )
      .join("\n")}`;

    window.location.href = `mailto:?subject=List%20of%20Hospitals&body=${encodeURIComponent(
      emailBody
    )}`;
  };

  return (
    <div className={styles.hospital}>
      <h2>Hospitals near you</h2>

      <ul className={styles.cardList}>
        {hospitals.map((hospital) => (
          <li key={hospital.id} className={styles.cardItem}>
            <strong>{hospital.name}</strong>
            <br />
            Address: {hospital.address}
            <br />
            Phone: {hospital.phone}
            <br />
            Email: {hospital.email}
          </li>
        ))}
      </ul>
      <button onClick={handleEmailShare}>Share via Email</button>
      <button>
        <CSVLink data={csvData} headers={csvHeaders} className={styles.csv}>
          Export to CSV
        </CSVLink>
      </button>
    </div>
  );
}

export default HospitalList;
