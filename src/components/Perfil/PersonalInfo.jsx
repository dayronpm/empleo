import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs"; // Ícono de lápiz para editar
import { BsShieldLock } from "react-icons/bs"; // Ícono de seguridad para modificar contraseña
import { BsTrash } from "react-icons/bs"; // Ícono de eliminar teléfono
import { BsPlusCircle } from "react-icons/bs";
import ChangePasswordModal from "./ChangePasswordModal";
import EditInfoModal from "./EditInfoModal";
import usePersonalInfo from "./usePersonalInfo"; // Ícono de agregar teléfono

const PersonalInfo = () => {
  // Usamos el hook personalizado para manejar el estado y la lógica
  const {
    info,
    isEditModalOpen,
    isPasswordModalOpen,
    openEditModal,
    closeEditModal,
    setIsPasswordModalOpen,
    handleInputChange,
    addPhone,
    removePhone,
    handleSaveChanges,
    handleSavePassword,
    currentPassword,
    newPassword,
    confirmPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword
  } = usePersonalInfo();

  

  return (
    <div className="bg-[#e0e8f0] p-6 rounded-lg shadow-md mb-6">
      {/* Título */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">Información personal</h2>
      {/* Contenido principal */}
      <div className="flex flex-wrap gap-8">
        {/* Nombre completo */}
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Nombre completo:</strong>
          <span>{info.nombre}</span>
        </div>
        {/* Nombre de usuario */}
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Nombre de usuario:</strong>
          <span>{info.username}</span>
        </div>
        {/* Provincia */}
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Provincia:</strong>
          <span>{info.provincia}</span>
        </div>
        {/* Municipio */}
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Municipio:</strong>
          <span>{info.municipio}</span>
        </div>
        {/* Teléfono */}
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Teléfonos:</strong>
          <div className="flex flex-col">
            {info.telefono.map((phone, index) => (
              <span key={index}>{phone}</span>
            ))}
          </div>
        </div>
        {/* Correo electrónico */}
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Correo electrónico:</strong>
          <span>{info.correo}</span>
        </div>
        {/* Botón para editar información personal */}
        <button
          onClick={openEditModal}
          className="flex items-center gap-1 text-red-500 hover:underline"
        >
          <BsPencilSquare size={16} /> {/* Ícono de lápiz */}
          Editar información
        </button>
        {/* Botón para cambiar contraseña */}
        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="flex items-center gap-1 text-blue-500 hover:underline"
        >
          <BsShieldLock size={16} /> {/* Ícono de seguridad */}
          Cambiar contraseña
        </button>
      </div>
      {/* Modal para editar información personal */}
      <EditInfoModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        info={info}
        onInputChange={handleInputChange}
        onSaveChanges={handleSaveChanges}
        addPhone={addPhone}
        removePhone={removePhone}
      />
      {/* Modal para cambiar contraseña */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        onCurrentPasswordChange={setCurrentPassword}
        onNewPasswordChange={setNewPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onSave={handleSavePassword}
      />
    </div>
  );
};

export default PersonalInfo;