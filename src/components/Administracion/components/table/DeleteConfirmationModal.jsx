// src/components/DeleteConfirmationModal.jsx
import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, selectedRowsCount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Confirmar Eliminación</h3>
        <p className="mb-4">
          ¿Está seguro de que desea eliminar las {selectedRowsCount} personas seleccionadas? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            onClick={onConfirm}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;