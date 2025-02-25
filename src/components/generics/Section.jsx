import React, { useState } from "react";
import { BsPencilSquare, BsTrash, BsPlus } from "react-icons/bs";
import GenericModal from "./GenericModal";
import { confirmationModalConfig } from "../helpers/ModalConfigurations";

const Section = ({ title, items, onAdd, onEdit, onDelete, fields, isEditing, readOnlyRender }) => {
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
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
            {isEditing ? (
              // Renderizado en modo edición (el existente)
              <div className="space-y-4">
                {fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    {field.customInput(
                      item[field.key],
                      (value) => onEdit(item.id, field.key, value),
                      items
                    )}
                  </div>
                ))}
                <button
                  onClick={() => openModal(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            ) : (
              // Renderizado en modo lectura
              <div>
                {readOnlyRender ? (
                  readOnlyRender(item)
                ) : (
                  // Renderizado por defecto si no hay readOnlyRender
                  <div className="space-y-2">
                    {fields.map((field) => (
                      <div key={field.key}>
                        {field.customInput(
                          item[field.key],
                          () => {},
                          items
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {isEditing && (
        <button
          onClick={() => onAdd()}
          className="mt-4 text-blue-500 hover:text-blue-700"
        >
          + Agregar nuevo
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
