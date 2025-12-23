import React, { useState } from "react";
import MyInput from "components/input/Input";
import MyButton from "components/button/Button";
import formCss from "./form.module.css"
import cssButton from "../button/button.module.css";
import { useChangePassword } from "hooks/changePassword"; // Asegúrate de que la ruta sea correcta

export default function MyChangerPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { changePassword, loading, error, successMessage } = useChangePassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    // Validación: Las nuevas contraseñas deben coincidir
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas nuevas no coinciden");
      return;
    }

    // Validación: Longitud mínima
    if (newPassword.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    // Validación: La nueva contraseña no puede ser igual a la actual
    if (currentPassword === newPassword) {
      alert("La nueva contraseña debe ser diferente a la actual");
      return;
    }

    await changePassword(currentPassword, newPassword);
  };

      const handleBack = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      window.history.back();
    }
  return (
    <div style={{ margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ color: "#5982FF" }}>Nueva contraseña</h1>
      <form className={formCss.formStyle} onSubmit={handleSubmit}>
        <MyInput
          htmlFor="currentPassword"
          name="currentPassword"
          placeholder="Ingresa tu contraseña actual"
          type="password"
          onChange={(e) => setCurrentPassword(e.target.value)}
        >
          Ingresa tu contraseña actual
        </MyInput>
        <MyInput
          htmlFor="newPassword"
          name="newPassword"
          placeholder="Ingresa tu nueva contraseña"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
        >
          Ingresa tu nueva contraseña
        </MyInput>
        <MyInput
          htmlFor="confirmPassword"
          name="confirmPassword"
          placeholder="Repite tu nueva contraseña"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        >
          Repite tu nueva contraseña
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
