import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import formCss from "../form/form.module.css"
export default function MyUserReports() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = JSON.parse(localStorage.getItem("userId") || "{}");
  console.log("userId:", userId); // Verifica el valor
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch(`/api/users/${userId}/pets`);
        if (!res.ok) throw new Error("Error al obtener las mascotas");
        const data = await res.json();
        console.log("Datos de mascotas:", data);
        const petsArray = data.reports || data.pets || [];
        console.log("Array de mascotas:", petsArray);
        setPets(petsArray);
      } catch (err: Error | any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, [userId, navigate]);

  const handleEditPet = (petId: string) => {
  navigate(`/edit-pet/${petId}`); // Redirige a una nueva ruta para editar la mascota
  };

  const handleCreateReport = () => {
    navigate("/reporting");
  };

  const handleDeletePet = async (petId: string) => {
  if (window.confirm("¿Estás seguro de que deseas eliminar esta mascota?")) {
    try {
      const res = await fetch(`/api/users/${userId}/pets/${petId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar la mascota");
      alert("Mascota eliminada con éxito");
      setPets((prevPets) => prevPets.filter((pet: any) => pet.id !== petId)); // Actualiza el estado
    } catch (err: Error | any) {
      setError(err.message);
    }
  }
};

  return (
    <div className={formCss.formStyle} >
      <h1>Mis Reportes</h1>
      {loading && <p>Cargando reportes...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {pets.length > 0 && (
        <ul>
          {pets.map((pet: any) => (
            <li key={pet.id}>
            {pet.name}
            <button onClick={() => handleEditPet(pet.id)}>Editar</button>
            <button onClick={() => handleDeletePet(pet.id)}>Eliminar</button>
        </li>
    ))}
        </ul>
      )}
      <button onClick={handleCreateReport}>Crear Reporte</button>
    </div>
  );
};