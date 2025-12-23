import React, { useEffect, useState } from "react";
import MyButton from "components/button/Button";
import buttonCss from "../button/button.module.css";
import { useNavigate } from "react-router";

export default function MyMenu() {
  const navigate = useNavigate();
  const [stateData, setStateData] = useState<any>(null);

  const handleLogout = () => {
    localStorage.removeItem("userData"); // Elimina los datos del usuario
    navigate("/register"); // Redirige a la página de login
  };

  const handleChangeData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/change-data");
  };

  const handleChangePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/change-password");
  };

  async function fetchUserData(userId: string | null) {
    if (!userId) {
      console.error("No hay userId disponible");
      return null;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }

      const userData = await response.json();
      console.log("Datos del usuario:", userData); // Verifica que esto muestre los datos correctos
      return userData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  useEffect(() => {
    console.log("Componente MyMenu montado");
    const userId = localStorage.getItem("userId");
    console.log("User ID desde localStorage:", userId); // Verifica que el ID esté correcto
    fetchUserData(userId).then((data) => {
      if (data) {
        setStateData(data); // Guarda los datos del usuario en el estado
      }
    });
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div>
      <h1>Mis datos</h1>
      <div style={{ width: "250px", display: "flex", flexDirection: "column", margin: "0 auto", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <MyButton type="button" onClick={handleChangeData} className={buttonCss.menu1Button}>
          Modificar datos personales
        </MyButton>
        <MyButton type="button" onClick={handleChangePassword} className={buttonCss.menu1Button}>
          Modificar contraseña
        </MyButton>
      </div>
      <div style={{ textAlign: "center" }}>
        <p>Email: {stateData ? stateData.email : "Cargando..."}</p>
        <button type="button" onClick={handleLogout} id="logout">CERRAR SESIÓN</button>
      </div>
    </div>
  );
}
