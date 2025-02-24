import React, { useState } from "react";
import { BsPencilSquare, BsTrash, BsPlus } from "react-icons/bs";
import GenericModal from "../generics/GenericModal";
import { confirmationModalConfig } from "../helpers/ModalConfigurations";

const Section = ({ title, items, onAdd, onEdit, onDelete, fields, isEditing }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const openModal = (itemId) => {
    setItemToDelete(itemId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setItemToDelete(null);
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    onDelete(itemToDelete);
    closeModal();
  };

  // Generar una lista de años desde 1950 hasta el año actual
  const currentYear = new Date().getFullYear();
  const yearsList = Array.from({ length: currentYear - 1949 }, (_, i) => 1950 + i);

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
            {fields.map(({ label, key, type, placeholder, customInput, options, yearSelector }) => (
              <div key={key} className="mb-4">
                {/* Label */}
                <label htmlFor={`${key}-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                {/* Campo de Entrada */}
                {customInput ? (
                  customInput(item[key], (value) => onEdit(item.id, key, value), items)
                ) : options ? (
                  <select
                    id={`${key}-${item.id}`}
                    name={key}
                    value={item[key]}
                    onChange={(e) => onEdit(item.id, key, e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : yearSelector ? (
                  <select
                    id={`${key}-${item.id}`}
                    name={key}
                    value={item[key]}
                    onChange={(e) => onEdit(item.id, key, e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona un año</option>
                    {yearsList.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                ) : type === "textarea" ? (
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
              onClick={() => openModal(item.id)}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
            >
              <BsTrash size={16} />
              Eliminar
            </button>
          </div>
        ))
      )}
      {/* Botón Agregar */}
      {isEditing && (
        <button
          onClick={onAdd}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-500 hover:text-blue-700 transition-colors"
        >
          <BsPlus size={16} />
          Agregar
        </button>
      )}
      {/* Modal de confirmación */}
      <GenericModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={confirmDelete}
        {...confirmationModalConfig(
          itemToDelete
            ? `¿Está seguro de que desea eliminar este elemento?`
            : ""
        )}
      />
    </div>
  );
};

export default Section;
