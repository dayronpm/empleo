// ModalConfigurations.jsx

import React from "react";

export const changePasswordModalConfig = {
  title: "Cambiar contraseña",
  initialValues: {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  },
  validationSchema: {
    currentPassword: (value) =>
      value ? undefined : "La contraseña actual es obligatoria.",
    newPassword: (value) =>
      value ? undefined : "La nueva contraseña es obligatoria.",
    confirmPassword: (value, formData) =>
      value === formData.newPassword ? undefined : "Las contraseñas no coinciden.",
  },
  actions: [
    { label: "Cancelar", onClick: "close" },
    { label: "Guardar", onClick: "submit", primary: true },
  ],
  customStyles: {
    overlay: "bg-black bg-opacity-70",
    content: "w-[400px]",
  },
  formContent: ({ formData, errors, handleChange }) => {
    return (
      <>
        {/* Campo de contraseña actual */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Contraseña actual</label>
          <input
            type="password"
            value={formData.currentPassword || ""}
            onChange={(e) => handleChange("currentPassword", e.target.value)}
            className={`w-full p-2 border rounded ${errors.currentPassword && "border-red-500"}`}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
          )}
        </div>

        {/* Campo de nueva contraseña */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nueva contraseña</label>
          <input
            type="password"
            value={formData.newPassword || ""}
            onChange={(e) => handleChange("newPassword", e.target.value)}
            className={`w-full p-2 border rounded ${errors.newPassword && "border-red-500"}`}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>

        {/* Campo de confirmación de nueva contraseña */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Confirmar nueva contraseña</label>
          <input
            type="password"
            value={formData.confirmPassword || ""}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            className={`w-full p-2 border rounded ${errors.confirmPassword && "border-red-500"}`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
      </>
    );
  },
};