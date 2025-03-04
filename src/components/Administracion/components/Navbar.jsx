// src/components/Navbar.jsx
import React from 'react';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el localStorage
    localStorage.removeItem('adminAuth');
    // Redirigir al login
    navigate('/admin/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Botón de Menú Hamburguesa */}
      <button onClick={toggleSidebar}>
        <FaBars size={24} />
      </button>

      {/* Título */}
      <h1 className="text-xl font-bold">Gestión de Empleo</h1>

      {/* Botón de Cerrar Sesión */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 hover:text-red-400 transition-colors"
        title="Cerrar Sesión"
      >
        <span className="text-sm">Cerrar Sesión</span>
        <FaSignOutAlt size={20} />
      </button>
    </nav>
  );
};

export default Navbar;