import { useState, useEffect } from "react";

interface Location {
  lat: number;
  lng: number;
}

interface Pet {
  id: number;
  nombre: string;
  bio: string;
  location: Location;
  status: string;
  img: string;
  User: {
    id: number;
    name: string;
    email: string;
  };
}

export function useNearbyPets(radius = 5) {
  const [location, setLocation] = useState<Location | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalización no soportada por tu navegador");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocation({ lat, lng });

        try {
          const res = await fetch("http://localhost:3000/nearby-pets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat, lng, radius }),
          });

          if (!res.ok) throw new Error("Error al obtener mascotas cercanas");
          const data = await res.json();
          setPets(data.pets);
          setError(null);
        } catch (e: any) {
          setError(e.message);
          setPets([]);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("No se pudo obtener la ubicación: " + err.message);
        setLoading(false);
      }
    );
  }, [radius]);

  return { location, pets, loading, error };
}