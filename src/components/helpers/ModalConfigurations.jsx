export const changePasswordModalConfig = {
  title: "Cambiar contraseña",
  actions: [
    { label: "Cancelar", onClick: "close" },
    { label: "Guardar", onClick: "submit", primary: true },
  ],
  customStyles: {
    overlay: "bg-black bg-opacity-70",
    content: "w-[400px]",
  },
  formContent: ({ register, errors }) => {
    return (
      <>
        {/* Campo de contraseña actual */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Contraseña actual</label>
          <input
            type="password"
            {...register("currentPassword", { required: "La contraseña actual es obligatoria." })}
            className={`w-full p-2 border rounded ${errors.currentPassword && "border-red-500"}`}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
          )}
        </div>
        {/* Campo de nueva contraseña */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nueva contraseña</label>
          <input
            type="password"
            {...register("newPassword", { required: "La nueva contraseña es obligatoria." })}
            className={`w-full p-2 border rounded ${errors.newPassword && "border-red-500"}`}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
          )}
        </div>
        {/* Campo de confirmación de nueva contraseña */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Confirmar nueva contraseña</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "La confirmación de contraseña es obligatoria.",
              validate: (value, formValues) =>
                value === formValues.newPassword || "Las contraseñas no coinciden.",
            })}
            className={`w-full p-2 border rounded ${errors.confirmPassword && "border-red-500"}`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
      </>
    );
  },
};

import React from "react";
import { BsTrash } from "react-icons/bs";
// Editar informacion personal
import { provincesAndMunicipalities } from "../Perfil/data";

export const editInfoModalConfig = {
  title: "Editar información personal",
  actions: [
    { label: "Cancelar", onClick: "close" },
    { label: "Guardar cambios", onClick: "submit", primary: true },
  ],
  customStyles: {
    overlay: "bg-black bg-opacity-70",
    content: "w-[600px]",
  },
  formContent: ({ register, errors, watch, setValue }) => {
    const province = watch("provincia");
    const municipalities = province ? provincesAndMunicipalities[province] : [];
    
    // Función para manejar cambio de provincia
    const handleProvinceChange = (e) => {
      setValue("provincia", e.target.value);
      setValue("municipio", ""); // Limpiar municipio al cambiar provincia
    };
    
    return (
      <>
        {/* Nombre completo */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre completo</label>
          <input
            type="text"
            {...register("nombre", {
              required: "El nombre es obligatorio",
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: "Solo se permiten letras y espacios"
              }
            })}
            className={`w-full p-2 border rounded ${errors.nombre && "border-red-500"}`}
            placeholder="Ingrese su nombre completo"
          />
          {errors.nombre && (
            <p className="text-red-500 text-xs">{errors.nombre.message}</p>
          )}
        </div>

        {/* Provincia */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Provincia</label>
          <select
            {...register("provincia", {})}
            onChange={handleProvinceChange}
            className={`w-full p-2 border rounded`}
          >
            <option value="">Seleccione una provincia</option>
            {Object.keys(provincesAndMunicipalities).map((province) => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>
        </div>

        {/* Municipio */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Municipio</label>
          <select
            {...register("municipio", {})}
            className={`w-full p-2 border rounded`}
          >
            <option value="">Seleccione un municipio</option>
            {municipalities.map((municipality) => (
              <option key={municipality} value={municipality}>{municipality}</option>
            ))}
          </select>
        </div>

        {/* Teléfonos */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Teléfonos</label>
          {watch("telefono").map((phone, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  const newPhones = [...watch("telefono")];
                  newPhones[index] = e.target.value;
                  setValue("telefono", newPhones);
                }}
                className="w-full p-2 border rounded"
                placeholder="Ingrese un número de teléfono"
              />
              {watch("telefono").length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const newPhones = watch("telefono").filter((_, i) => i !== index);
                    setValue("telefono", newPhones);
                  }}
                  className="ml-2 text-red-500"
                >
                  <BsTrash size={16} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setValue("telefono", [...watch("telefono"), ""])}
            className="text-blue-500"
          >
            Agregar teléfono
          </button>
        </div>

        {/* Correo electrónico */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Correo electrónico</label>
          <input
            type="email"
            {...register("correo", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Formato de correo electrónico inválido"
              }
            })}
            className={`w-full p-2 border rounded ${errors.correo && "border-red-500"}`}
            placeholder="Ingrese su correo electrónico"
          />
          {errors.correo && (
            <p className="text-red-500 text-xs">{errors.correo.message}</p>
          )}
        </div>
      </>
    );
  },
  validationSchema: {
    nombre: {
      required: "El nombre es obligatorio",
      pattern: {
        value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        message: "Solo se permiten letras y espacios"
      }
    },
    provincia: {
    },
    municipio: {
    },
    telefono: {
      validate: (value) =>
        value.every(phone =>
          /^\+53\d{6,8}$/.test(phone) || !phone
        ) || "Los teléfonos deben comenzar con '+53' y tener entre 6 y 8 dígitos"
    },
    correo: {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Formato de correo electrónico inválido"
      }
    }
  },
  initialValues: {
    nombre: "",
    provincia: "",
    municipio: "",
    telefono: [""],
    correo: ""
  }
};