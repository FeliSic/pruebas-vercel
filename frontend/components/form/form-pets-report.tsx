import React, { useState } from "react";
import useDropzone from "hooks/dropzone";
import { useNavigate } from "react-router-dom";
import formCss from "./form.module.css"

export default function CreateReport() {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState({
    imgUrl: "",
    name: "",
    phone: "",
    lastSeenLocation: {
    name: "",
    lat: 0,
    lng: 0,
  },
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLocationChange = (e) => {
  const value = e.target.value;
  setReportData((prevData) => ({
    ...prevData,
    lastSeenLocation: {
      ...prevData.lastSeenLocation,
      name: value,
    },
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userId = JSON.parse(localStorage.getItem("userId") || "{}");

    // Log para verificar los datos que se envían
    const dataToSend = { ...reportData, userId };
    console.log("Datos a enviar:", dataToSend); // Agregá este log

    try {
      const res = await fetch(`http://localhost:3000/post-pets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...reportData, ownerId: userId }),
      });

      if (!res.ok) throw new Error("Error al crear el reporte");
      alert("Reporte creado con éxito");
      navigate("/myreports"); // Redirige a la lista de reportes
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const { dropzoneRef, previewRef } = useDropzone((imageUrl) => {
  setReportData((prevData) => ({ ...prevData, imgUrl: imageUrl }));
});

  return (
    <div>
      <form className={formCss.formStyle} onSubmit={handleSubmit}>
      <h1 style={{textAlign: "center"}}>Crear Reporte</h1>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label htmlFor="nombre" style={{alignSelf: "center", fontWeight: "bold", marginBottom: "5px"}}>Nombre</label>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={reportData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="phone" style={{alignSelf: "center", fontWeight: "bold", marginBottom: "5px"}}>Teléfono</label>
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={reportData.phone}
          onChange={handleChange}
          required
        />
        <label htmlFor="location" style={{alignSelf: "center", fontWeight: "bold", marginBottom: "5px"}}>Locación</label>
        <input
          type="text"
          name="location"
          placeholder="Ubicación"
          value={reportData.lastSeenLocation.name}
          onChange={handleLocationChange}
          required
        />
        <label htmlFor="foto" style={{alignSelf: "center", fontWeight: "bold", marginBottom: "5px"}}>FOTO</label>
        <div ref={dropzoneRef} id="dropzone" style={{border: "2px dashed #5982FF", padding: "30px", textAlign: "center", marginBottom: "15px", width: "100%", cursor: "pointer", borderRadius: "4px", backgroundColor: "#f0f4ff"}}>
          📷 Arrastrá una imagen o hacé clic para seleccionar
        </div>
        <img ref={previewRef} className="pet-picture" style={{display: "none", width: "150px", height: "150px", objectFit: "cover", marginBottom: "15px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"}} />
        <textarea
          name="bio"
          placeholder="Biografía"
          value={reportData.bio}
          onChange={handleChange}
        />
        <button type="submit">Crear Reporte</button>
      </form>
    </div>
  );
};


