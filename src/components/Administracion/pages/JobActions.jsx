import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const JobActions = ({ isMultiDeleteMode, setIsMultiDeleteMode, onAdd }) => {
  return (
    <div className="flex space-x-4">
      {/* Botón Agregar Oferta de Trabajo */}
      <button
        title="Agregar Oferta de Trabajo"
        className="flex items-center text-green-500 hover:text-green-700 transition-colors"
        onClick={onAdd}
      >
        <FaPlus size={16} className="mr-1" />
        Agregar
      </button>

      {/* Botón Eliminar Múltiples Ofertas de Trabajo */}
      <button
        title="Eliminar Múltiples Ofertas de Trabajo"
        className={`flex items-center ${
          isMultiDeleteMode ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
        } transition-colors`}
        onClick={() => setIsMultiDeleteMode(!isMultiDeleteMode)}
      >
        <FaTrash size={16} className="mr-1" />
        Eliminar
      </button>
    </div>
  );
};

export default JobActions;