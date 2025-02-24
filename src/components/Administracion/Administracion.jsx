// src/components/Administracion.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import People from './pages/People';
import Companies from './pages/Companies';
import Jobs from './pages/Jobs';
import Courses from './pages/Courses';
import Admins from './pages/Admins';
import ToastNotification from './components/ToastNotification';

const Administracion = () => {
  const [activePage, setActivePage] = useState('dashboard'); // Estado para controlar la página activa
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú hamburguesa

  // Función para alternar el menú
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Función para renderizar el contenido según la página activa
  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'people':
        return <People />;
      case 'companies':
        return <Companies />;
      case 'jobs':
        return <Jobs />;
      case 'courses':
        return <Courses />;
      case 'admins':
        return <Admins />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barra Lateral */}
      <Sidebar setActivePage={setActivePage} isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido Principal */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {/* Barra Superior */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Contenido de la Página */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          {renderContent()} {/* Renderizamos el contenido según la página activa */}
        </main>
      </div>

      {/* Notificaciones Globales */}
      <ToastNotification />
    </div>
  );
};

export default Administracion;