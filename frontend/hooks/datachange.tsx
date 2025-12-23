// src/hooks/useDataChange.ts
import { useState } from "react";

export function useDataChange() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const changeData = async (updateData: { name?: string; email?: string; location?: string }) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const userId = userData.id; // Asegúrate de que el ID esté en localStorage

    if (!userId) {
      setError("No se encontró el ID del usuario.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al cambiar los datos");
      }

      setSuccessMessage(result.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { changeData, loading, error, successMessage };
}
