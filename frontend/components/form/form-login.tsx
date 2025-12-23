import React from "react";
import MyInput from "components/input/Input";
import MyButton from "components/button/Button";
import formCss from "./form.module.css"
import buttonCss from "../button/button.module.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLogIn } from "hooks/login";

export default function MyFormLogIn() {
  const navigate = useNavigate(); // Inicializa el hook
  const { loginUser, loading, error } = useLogIn();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  // Obtén los valores de los inputs
  const formData = new FormData(event.currentTarget);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const data = { email, password };
    // Guarda los datos en localStorage
    try {
      const result = await loginUser(data);
      localStorage.setItem("userData", JSON.stringify(result["Usuario logueado"])); // Guardar usuario completo con id
      localStorage.setItem("userId", result["Usuario logueado"]?.id.toString());
      console.log("Datos guardados en localStorage:", data, result);
      alert('✅ ¡Login exitoso! Redirigiendo...');
      // Redirige a la página de inicio
      navigate("/menu");
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };
  return (
<form className={formCss.formStyle} onSubmit={handleSubmit}>
  {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el error si existe */}
  <h1>Inicia Sesión!!</h1>
  <MyInput htmlFor="email"type="email"name="email"placeholder="Ingrese su Email">
    Email
  </MyInput>
  <MyInput htmlFor="password"type="password"name="password"placeholder="Ingrese su Contraseña">
    Password
  </MyInput>
  <MyButton id="button-form" type="submit" className={buttonCss.menu1Button}>Confirmar</MyButton>
  <Link to="/register">¿No tenes una cuenta? Registrate!</Link>
</form>
  )
}