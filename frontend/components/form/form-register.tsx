import React from "react";
import MyInput from "components/input/Input";
import MyButton from "components/button/Button";
import formCss from "./form.module.css"
import buttonCss from "../button/button.module.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRegister } from "hooks/register";

export default function MyFormRegister() {
 const navigate = useNavigate(); // Inicializa el hook
  const { registerUser, loading, error } = useRegister();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  // Obtén los valores de los inputs
  const formData = new FormData(event.currentTarget);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const location = formData.get("text") as string;

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  const data = {name, email,password,confirmPassword,location}

  try {
    const result = await registerUser(data)
    localStorage.setItem("userData", JSON.stringify(data));
    localStorage.setItem('userId', result["Usuario y Auth creados"]?.id.toString());
    alert('✅ ¡Registro exitoso! Redirigiendo...');
    navigate("/menu");
   } catch (error: any) {
      alert(`Error: ${error.message}`);
  }
  }
  return (
<form className={formCss.formStyle} onSubmit={handleSubmit}>
  {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el error si existe */}
<h1>Registrate!!</h1>
  <MyInput htmlFor="name"type="text"name="name"placeholder="Ingrese su Nombre">
    Name
  </MyInput>
  <MyInput htmlFor="email"type="email"name="email"placeholder="Ingrese su Email">
    Email
  </MyInput>
  <MyInput htmlFor="password"type="password"name="password"placeholder="Ingrese su Contraseña" autoComplete="Ingrese su Contraseña">
    Password
  </MyInput>
  <MyInput htmlFor="confirmPassword"type="password"name="confirmPassword"placeholder="Ingrese su Contraseña nuevamente" autoComplete="Ingrese su Contraseña nuevamente">
    Confirm Password
  </MyInput>
  <MyInput htmlFor="text"type="text"name="text"placeholder="Ingrese su Ubicación">
    Ubicación
  </MyInput>
  <MyButton id="button-form" type="submit" className={buttonCss.menu1Button}>Confirmar</MyButton>
  <Link to="/login">¿Ya tenes una cuenta? Inicia Sesión!</Link>
</form>
  )
}