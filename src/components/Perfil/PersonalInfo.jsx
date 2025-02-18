import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs"; // Ícono de lápiz para editar
import { BsShieldLock } from "react-icons/bs"; // Ícono de seguridad para modificar contraseña
import { BsTrash } from "react-icons/bs"; // Ícono de eliminar teléfono
import { BsPlusCircle } from "react-icons/bs";
import GenericModal from "../generics/GenericModal";
import { changePasswordModalConfig, editInfoModalConfig } from "../helpers/ModalConfigurations";
import usePersonalInfo from "./usePersonalInfo"; // Ícono de agregar teléfono
import NotificationPopup from "../generics/NotificationPopup";

const PersonalInfo = () => {
  
  const showNotification = (message, type = "info") => {
    setNotification({ isOpen: true, message, type });
  };

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
    setConfirmPassword,
  } = usePersonalInfo(showNotification);

  const [notification, setNotification] = useState({
    isOpen: false,
    message: "",
    type: "info", // Puede ser "success", "error", o "info"
  });

  

  const handleSubmitPassword = (formData) => {
    const errors = handleSavePassword(formData); // Obtener los errores
    if (errors) {
      // Si hay errores, pasarlos al estado `errors` del modal
      throw new Error(JSON.stringify(errors));
    }
  };
  
  return (
    <div className="bg-[#e0e8f0] p-6 rounded-lg shadow-md mb-6">
      {/* Título */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">Información personal</h2>

      {/* Contenido principal */}
      <div className="flex flex-wrap gap-8">
        {/* Campos de información personal */}
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Nombre completo:</strong>
          <span>{info.nombre}</span>
        </div>
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Nombre de usuario:</strong>
          <span>{info.username}</span>
        </div>
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Provincia:</strong>
          <span>{info.provincia}</span>
        </div>
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Municipio:</strong>
          <span>{info.municipio}</span>
        </div>
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Teléfonos:</strong>
          <div className="flex flex-col">
            {info.telefono.map((phone, index) => (
              <span key={index}>{phone}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Correo electrónico:</strong>
          <span>{info.correo}</span>
        </div>

        {/* Botón para editar información personal */}
        <button
          onClick={openEditModal}
          className="flex items-center gap-1 text-red-500 hover:underline"
        >
          <BsPencilSquare size={16} /> Editar información
        </button>

        {/* Botón para cambiar contraseña */}
        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="flex items-center gap-1 text-blue-500 hover:underline"
        >
          <BsShieldLock size={16} /> Cambiar contraseña
        </button>
      </div>

      {/* Modal genérico para editar información personal */}
      <GenericModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title={editInfoModalConfig.title}
        formContent={editInfoModalConfig.formContent}
        actions={editInfoModalConfig.actions}
        initialValues={info}
        validationSchema={editInfoModalConfig.validationSchema}
        customStyles={editInfoModalConfig.customStyles}
        onSubmit={(data) => handleSaveChanges(data)}
      />

      {/* Modal genérico para cambiar contraseña */}
      <GenericModal
      isOpen={isPasswordModalOpen}
      onClose={() => setIsPasswordModalOpen(false)}
      title={changePasswordModalConfig.title}
      formContent={changePasswordModalConfig.formContent} // Pasar formContent explícitamente
      actions={changePasswordModalConfig.actions}
      initialValues={changePasswordModalConfig.initialValues}
      validationSchema={changePasswordModalConfig.validationSchema}
      customStyles={changePasswordModalConfig.customStyles}
      onSubmit={handleSubmitPassword}
      />

      <NotificationPopup
        isOpen={notification.isOpen}
        onClose={() => setNotification({ isOpen: false, message: "", type: "info" })}
        message={notification.message}
        type={notification.type}
      />
    </div>
  );
};

export default PersonalInfo;