import { useState } from "react";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Error al registrar el usuario');
      setLoading(false);
      return result;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { registerUser, loading, error };
}