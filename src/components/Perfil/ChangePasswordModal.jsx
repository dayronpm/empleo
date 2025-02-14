import React from "react";
import { MdClose } from "react-icons/md"; // Importamos el ícono de cruz

const ChangePasswordModal = ({
  isOpen,
  onClose,
  currentPassword,
  newPassword,
  confirmPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      {/* Contenedor del modal */}
      <div className="bg-white p-6 rounded-lg w-[400px] max-w-full relative">
        {/* Botón de cierre con ícono de React */}
        <button
          onClick={onClose} // Cerrar el modal al hacer clic en el ícono
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <MdClose size={24} /> {/* Ícono de cruz de React Icons */}
        </button>

        {/* Título del modal */}
        <h2 className="text-xl font-bold mb-4">Cambiar contraseña</h2>

        {/* Campo de contraseña actual */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Contraseña actual</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => onCurrentPasswordChange(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ingrese su contraseña actual"
          />
        </div>

        {/* Campo de nueva contraseña */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nueva contraseña</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => onNewPasswordChange(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ingrese su nueva contraseña"
          />
        </div>

        {/* Campo de confirmar nueva contraseña */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Confirmar nueva contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Confirme su nueva contraseña"
          />
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 transition-colors rounded"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;