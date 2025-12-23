import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [showTutorial, setShowTutorial] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
 const navigate = useNavigate()
  const handleShowTutorial = () => setShowTutorial(true);
  const handleBack = () => setShowTutorial(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalización no soportada por tu navegador");
      navigate("/nearby-pets");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        alert(`Ubicación obtenida: Lat ${position.coords.latitude}, Lng ${position.coords.longitude}`);
      },
      (error) => {
        alert("No se pudo obtener la ubicación: " + error.message);
      }
    );
  };

  return (
    <div style={{ maxWidth: 600, margin: "80px auto", padding: 20, textAlign: "center" }}>
      {!showTutorial ? (
        <>
          <h1 style={{ color: "#FF7D7D" }}>Pet Finder App</h1>

          <button
            onClick={getLocation}
            style={{
              marginTop: 20,
              padding: "12px 30px",
              backgroundColor: "#FF7D7D",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              fontSize: 16,
              display: "block",
              width: "100%",
              marginBottom: 20,
            }}
          >
            📍 Dar mi ubicación actual para ver los reportes cercanos
          </button>

          <button
            onClick={() => alert("Aquí iría la navegación a tus reportes")}
            style={{
              marginTop: 10,
              padding: "12px 30px",
              backgroundColor: "#FF7D7D",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              fontSize: 16,
              display: "block",
              width: "100%",
              marginBottom: 20,
            }}
          >
            Ir a ver mis avisos de reporte
          </button>

          <button
            onClick={handleShowTutorial}
            style={{
              marginTop: 10,
              padding: "12px 30px",
              backgroundColor: "#5982FF",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              fontSize: 16,
              display: "block",
              width: "100%",
            }}
          >
            ❓ ¿Cómo funciona Pet Finder?
          </button>
          <p>Email: {userData.email}</p>
        </>
      ) : (
        <>
          <h2 style={{ color: "#5982FF", marginBottom: 20 }}>¿Cómo funciona Pet Finder?</h2>
          <div style={{ textAlign: "left", lineHeight: 1.6 }}>
            <h3 style={{ color: "#FF7D7D" }}>🔍 Perdiste tu mascota</h3>
            <p>
              Publicá un reporte con foto, descripción y ubicación donde la viste por última vez. Tu mascota aparecerá en el mapa para que otros usuarios puedan ayudarte.
            </p>

            <h3 style={{ color: "#FF7D7D", marginTop: 30 }}>👀 Encontraste una mascota</h3>
            <p>
              Buscá mascotas cercanas usando tu ubicación. Si reconocés a alguna, podés reportar el avistaje con tus datos de contacto. El dueño recibirá un email automático con tu información.
            </p>

            <h3 style={{ color: "#FF7D7D", marginTop: 30 }}>📧 Sistema de notificaciones</h3>
            <p>
              Cuando alguien reporta haber visto tu mascota, recibís un email inmediatamente con los datos de contacto y la ubicación del avistaje.
            </p>

            <h3 style={{ color: "#FF7D7D", marginTop: 30 }}>🗺️ Búsqueda por proximidad</h3>
            <p>
              El sistema muestra solo las mascotas perdidas cerca de tu ubicación (radio de 5km por defecto), haciendo más eficiente la búsqueda.
            </p>
          </div>

          <button
            onClick={handleBack}
            style={{
              marginTop: 30,
              padding: "12px 30px",
              backgroundColor: "#5982FF",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            ← Volver a la Home
          </button>
        </>
      )}

      {location && (
        <p style={{ marginTop: 20 }}>
          Ubicación actual: Latitud {location.lat.toFixed(4)}, Longitud {location.lng.toFixed(4)}
        </p>
      )}
    </div>
  );
}
