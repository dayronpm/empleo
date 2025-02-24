// src/components/Navbar.jsx
import React from 'react';
import { FaBars, FaBell } from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Botón de Menú Hamburguesa */}
      <button onClick={toggleSidebar}>
        <FaBars size={24} />
      </button>

      {/* Título */}
      <h1 className="text-xl font-bold">Gestión de Empleo</h1>

      {/* Icono de Notificaciones */}
      <div className="flex items-center">
        <FaBell size={24} className="mr-4 cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;