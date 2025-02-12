import React from "react";
import { BsTrash } from "react-icons/bs"; // Ícono de eliminar teléfono

const PhoneInput = ({ value, onChange, onDelete, showDeleteButton }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Campo de entrada para el número de teléfono */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Ingrese un número de teléfono"
      />
      {/* Botón de eliminar (visible solo si hay más de un teléfono) */}
      {showDeleteButton && (
        <button
          onClick={onDelete}
          className="text-red-500 hover:underline"
          title="Eliminar teléfono"
        >
          <BsTrash size={20} />
        </button>
      )}
    </div>
  );
};

export default PhoneInput;