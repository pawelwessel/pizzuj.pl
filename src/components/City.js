"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function City({ city }) {
  const [places, setPlaces] = useState([]);
  const pathname = usePathname();
  async function getPlace() {
    const response = await fetch(`http://localhost:3000/api/getTextPlaces/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: city }),
    }).then((res) => res.json());
    return response;
  }

  useEffect(() => {
    async function fetchPlaces() {
      const response = await getPlace(pathname); // Extract search term from URL
      setPlaces(response.sort((a, b) => b.rating - a.rating)); // Assuming each place has a `rating` property
    }
    fetchPlaces();
  }, []);

  return (
    <div>
      <h1>Pizza Places in {city}</h1>
      <div>
        <h2 onClick={() => console.log(places)}>Google Places Data:</h2>
        <ul>
          {places.map((place, index) => (
            <li key={index}>{place.name}</li> // Assuming each place has a `name` property
          ))}
        </ul>
      </div>
    </div>
  );
}
