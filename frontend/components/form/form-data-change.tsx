import React, { useState } from "react";
import MyInput from "components/input/Input";
import MyButton from "components/button/Button";
import formCss from "./form.module.css"
import cssButton from "../button/button.module.css";
import { useDataChange } from "hooks/datachange"; // Asegúrate de que la ruta sea correcta

export default function MyChangerData() {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const { changeData, loading, error, successMessage } = useDataChange();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Crea un objeto con los datos a actualizar
    const updateData = {
      name: newName,
      email: newEmail,
      location: newLocation,
    };

    await changeData(updateData);
  };

    const handleBack = async (e: React.MouseEvent) => {
      e.preventDefault();
      window.history.back();
    }
  return (
    <div style={{ margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ color: "#5982FF" }}>Nueva contraseña</h1>
      <form className={formCss.formStyle} onSubmit={handleSubmit}>
        <MyInput
          htmlFor="newName"
          name="newName"
          placeholder="Ingresa tu nuevo nombre"
          type="text"
          onChange={(e) => setNewName(e.target.value)}
          
        >
          Ingresa tu nuevo Nombre
        </MyInput>
        <MyInput
          htmlFor="newEmail"
          name="newEmail"
          placeholder="Ingresa tu nuevo email"
          type="email"
          onChange={(e) => setNewEmail(e.target.value)}
        >
          Ingresa tu nueva Email
        </MyInput>
        <MyInput
          htmlFor="newLocation"
          name="newLocation"
          placeholder="Ingresa tu nueva ubicación"
          type="text"
          onChange={(e) => setNewLocation(e.target.value)}
        >
          Ingresa tu nueva Ubicación
        </MyInput>
        <MyButton type="button" className={cssButton.menu2Button} onClick={handleBack}>
          ← Volver al menú
        </MyButton>
        <MyButton type="submit" className={cssButton.menu1Button}>
          {loading ? "Guardando..." : "💾 Guardar Cambios"}
        </MyButton>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}
