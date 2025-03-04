// src/components/TableActions.jsx
import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const TableActions = ({ isMultiDeleteMode, setIsMultiDeleteMode, onAdd }) => {
  return (
    <div className="flex justify-end mb-4 space-x-4">
      {/* Botón Agregar Persona */}
      <button
        title="Agregar Persona"
        className="flex items-center text-green-500 hover:text-green-700 transition-colors"
        onClick={onAdd}
      >
        <FaPlus size={16} className="mr-1" />
        Agregar
      </button>

      {/* Botón Eliminar Múltiples Personas */}
      <button
        title="Eliminar Múltiples Personas"
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

export default TableActions;