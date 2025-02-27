import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const CourseActions = ({ isMultiDeleteMode, setIsMultiDeleteMode, onAdd }) => {
  return (
    <div className="flex space-x-4">
      {/* Botón Agregar Curso */}
      <button
        title="Agregar Curso"
        className="flex items-center text-green-500 hover:text-green-700 transition-colors"
        onClick={onAdd}
      >
        <FaPlus size={16} className="mr-1" />
        Agregar
      </button>

      {/* Botón Eliminar Múltiples Cursos */}
      <button
        title="Eliminar Múltiples Cursos"
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

export default CourseActions;