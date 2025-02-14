import React from "react";
import { BsPencilSquare, BsTrash, BsPlus } from "react-icons/bs"; // Importamos íconos

const Section = ({ title, items, onAdd, onEdit, onDelete, fields, isEditing }) => {
  return (
    <div>
      {/* Título de la Sección */}
      <h2 className="text-xl font-bold mt-6 mb-4">{title}</h2>

      {/* Si no hay registros */}
      {items.length === 0 ? (
        <p className="text-gray-500">No hay registros para esta sección.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="border p-4 mb-4 rounded bg-white shadow-sm">
            {/* Campos Dinámicos */}
            {fields.map(({ label, key, type, placeholder }) => (
              <div key={key} className="mb-4">
                {/* Label */}
                <label htmlFor={`${key}-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                {/* Campo de Entrada */}
                {type === "textarea" ? (
                  <textarea
                    id={`${key}-${item.id}`}
                    name={key}
                    placeholder={placeholder || ""}
                    value={item[key]}
                    onChange={(e) => onEdit(item.id, key, e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <input
                    id={`${key}-${item.id}`}
                    type="text"
                    name={key}
                    placeholder={placeholder || ""}
                    value={item[key]}
                    onChange={(e) => onEdit(item.id, key, e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}
            {/* Botón Eliminar */}
            <button
              onClick={() => onDelete(item.id)}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
            >
              <BsTrash size={16} /> {/* Ícono de basura */}
              Eliminar
            </button>
          </div>
        ))
      )}

      {/* Botón Agregar */}
      {isEditing && (
        <button
          onClick={onAdd}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
        >
          <BsPlus size={16} /> {/* Ícono de agregar */}
          Agregar
        </button>
      )}
    </div>
  );
};

export default Section;