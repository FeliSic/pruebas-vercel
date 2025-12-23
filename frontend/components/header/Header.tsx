import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // Importa Outlet
import { Link } from "react-router-dom";
import css from "./header.module.css";

export default function MyHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar la visibilidad del menú

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Cambia el estado al hacer clic en el botón hamburguesa
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Cierra el menú
  };

  return (
    <div>
    <header className={css.header}>
      <h1 style={{ margin: "0" }}>Mi App</h1>
      <button 
        className={css.hamburger} 
        id="hamburger" 
        aria-label="Toggle menu" 
        onClick={toggleMenu} // Agrega el evento onClick
      >
        &#9776;
      </button>
      <nav className={`${css.menu} ${isMenuOpen ? css.open : ''}`} id="menu"> {/* Agrega clase condicional */}
        <button 
          className={css.close} 
          id="close-button" 
          aria-label="Close menu" 
          onClick={closeMenu} // Agrega el evento onClick
        >
          X
        </button>
          <Link to="/home" onClick={closeMenu}>Home</Link>
          <Link to="/menu" onClick={closeMenu}>Mis datos</Link>
          <Link to="/myreports" onClick={closeMenu}>Mis mascotas reportadas</Link>
          <Link to="/messages" onClick={closeMenu}>Mis Mensajes</Link>
      </nav>
      
    </header>
    <Outlet /> {/* Renderiza las rutas hijas aquí */}
    </div>
  );
}
