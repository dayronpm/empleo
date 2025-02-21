import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa"; // Mantenemos el ícono de eliminar

const Header = () => {

  return (
    <>
      {/* Encabezado */}
      <header className="bg-gray-900 text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Información del usuario */}
          <div>
           
            <h1 className="text-2xl font-bold text-white">Bienvenid@</h1>
          </div>

          {/* Botones de acciones */}
          <div className="flex gap-4">
            {/* Botón de eliminar cuenta */}
            <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-full shadow-md">
              <FaTrashAlt className="text-white" /> Eliminar cuenta
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
