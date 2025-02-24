// src/components/Sidebar.jsx
import React from 'react';
import { FaHome, FaUsers, FaBuilding, FaBriefcase, FaGraduationCap, FaUserCog } from 'react-icons/fa';

const Sidebar = ({ setActivePage, isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`bg-gray-600 text-white w-64 h-screen fixed top-0 left-0 overflow-y-auto transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Encabezado del Menú */}
      <div className="p-4 bg-gray-700 text-center text-lg font-bold">
        Menú
      </div>
      {/* Lista de Enlaces */}
      <nav className="mt-4">
        <ul>
          <li>
            <button
              className="flex items-center w-full px-4 py-2 hover:bg-blue-700"
              onClick={() => {
                setActivePage('dashboard');
                toggleSidebar(); // Cierra el menú después de seleccionar
              }}
            >
              <FaHome className="mr-2" />
              Dashboard
            </button>
          </li>
          <li>
            <button
              className="flex items-center w-full px-4 py-2 hover:bg-gray-700"
              onClick={() => {
                setActivePage('people');
                toggleSidebar();
              }}
            >
              <FaUsers className="mr-2" />
              Personas
            </button>
          </li>
          <li>
            <button
              className="flex items-center w-full px-4 py-2 hover:bg-blue-700"
              onClick={() => {
                setActivePage('companies');
                toggleSidebar();
              }}
            >
              <FaBuilding className="mr-2" />
              Empresas
            </button>
          </li>
          <li>
            <button
              className="flex items-center w-full px-4 py-2 hover:bg-blue-700"
              onClick={() => {
                setActivePage('jobs');
                toggleSidebar();
              }}
            >
              <FaBriefcase className="mr-2" />
              Ofertas de Empleo
            </button>
          </li>
          <li>
            <button
              className="flex items-center w-full px-4 py-2 hover:bg-blue-700"
              onClick={() => {
                setActivePage('courses');
                toggleSidebar();
              }}
            >
              <FaGraduationCap className="mr-2" />
              Cursos
            </button>
          </li>
          <li>
            <button
              className="flex items-center w-full px-4 py-2 hover:bg-blue-700"
              onClick={() => {
                setActivePage('admins');
                toggleSidebar();
              }}
            >
              <FaUserCog className="mr-2" />
              Administradores
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;