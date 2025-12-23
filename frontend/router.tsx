import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyHeader from "./components/header/Header";
import Home from "./pages/pageHome/Home/Home";
import Register from "./pages/pageLogin/Register/Register";
import Login from "./pages/pageLogin/InicioSesion/Session"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyHeader />}>
          <Route path="register" element={<Register />} /> {/* Ruta para registro */}
          <Route path="login" element={<Login />} /> {/* Ruta para login */}
          <Route path="home" element={<Home />} /> {/* Ruta para home */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
//<Route path="search/:query" element={<App2 />} />