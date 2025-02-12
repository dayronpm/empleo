import React from "react";
import PhoneInput from "./PhoneInput";

const EditInfoModal = ({
  isOpen,
  onClose,
  info,
  onInputChange,
  onSaveChanges,
  addPhone,
  removePhone,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[400px] max-w-full">
        {/* Título del modal */}
        <h2 className="text-xl font-bold mb-4">Editar información personal</h2>

        {/* Campo de nombre completo */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre completo</label>
          <input
            type="text"
            value={info.nombre}
            onChange={(e) => onInputChange("nombre", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ingrese su nombre completo"
          />
        </div>

        {/* Campo de nombre de usuario */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre de usuario</label>
          <input
            type="text"
            value={info.username}
            onChange={(e) => onInputChange("username", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ingrese su nombre de usuario"
          />
        </div>

        {/* Campo de provincia */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Provincia</label>
          <select
            value={info.provincia}
            onChange={(e) => onInputChange("provincia", e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="La Habana">La Habana</option>
            <option value="Matanzas">Matanzas</option>
            <option value="Villa Clara">Villa Clara</option>
            <option value="Cienfuegos">Cienfuegos</option>
          </select>
        </div>

        {/* Campo de municipio */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Municipio</label>
          <select
            value={info.municipio}
            onChange={(e) => onInputChange("municipio", e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Plaza">Plaza</option>
            <option value="Centro Habana">Centro Habana</option>
            <option value="Vedado">Vedado</option>
            <option value="Marianao">Marianao</option>
          </select>
        </div>

        {/* Campos de teléfono */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Teléfonos</label>
          {info.telefono.map((phone, index) => (
            <PhoneInput
              key={index}
              value={phone}
              onChange={(value) =>
                onInputChange(
                  "telefono",
                  info.telefono.map((p, i) => (i === index ? value : p))
                )
              }
              onDelete={() => removePhone(index)}
              showDeleteButton={info.telefono.length > 1}
            />
          ))}
          {/* Botón para agregar un nuevo teléfono */}
          <button
            onClick={addPhone}
            className="flex items-center gap-1 text-blue-500 hover:underline mt-2"
          >
            <span>Agregar teléfono</span>
          </button>
        </div>

        {/* Campo de correo electrónico */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Correo electrónico</label>
          <input
            type="email"
            value={info.correo}
            onChange={(e) => onInputChange("correo", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ingrese su correo electrónico"
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
            onClick={onSaveChanges}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors rounded"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInfoModal;