// src/hooks/useChangePassword.ts
import { useState } from "react";

export function useChangePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const changePassword = async (currentPassword: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    console.log("Datos del usuario desde localStorage:", userData); // Verifica que los datos estén correctos
    const userId = userData.id; // Asegúrate de que el ID esté en localStorage

    if (!userId) {
      setError("No se encontró el ID del usuario.");
      setLoading(false);
      return;
    }

    try {
      const requestBody = {
        currentPassword,
        newPassword,
      };

      const response = await fetch(`http://localhost:3000/api/users/${userId}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al cambiar la contraseña");
      }

      setSuccessMessage(result.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error, successMessage };
}
