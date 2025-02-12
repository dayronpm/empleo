import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs"; // Ícono de lápiz para editar
import { BsShieldLock } from "react-icons/bs"; // Ícono de seguridad para modificar contraseña
import { BsTrash } from "react-icons/bs"; // Ícono de eliminar teléfono
import { BsPlusCircle } from "react-icons/bs"; // Ícono de agregar teléfono

const PersonalInfo = () => {
  // Estado inicial de la información personal
  const [info, setInfo] = useState({
    fullName: "Juan Pérez",
    username: "juanperez",
    province: "La Habana",
    municipality: "Plaza",
    phones: ["+53 55555555"],
    email: "juanperez@example.com",
  });

  // Estado para manejar el modal de edición de información
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Estado para manejar el modal de edición de contraseña
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(""); // Contraseña actual
  const [newPassword, setNewPassword] = useState(""); // Nueva contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirmar nueva contraseña

  // Función para abrir el modal de edición de información
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  // Función para cerrar el modal de edición de información
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Función para actualizar un campo específico
  const handleInputChange = (field, value) => {
    setInfo({ ...info, [field]: value });
  };

  // Función para agregar un nuevo teléfono
  const addPhone = () => {
    setInfo({ ...info, phones: [...info.phones, ""] });
  };

  // Función para eliminar un teléfono
  const removePhone = (index) => {
    if (info.phones.length > 1) {
      const updatedPhones = info.phones.filter((_, i) => i !== index);
      setInfo({ ...info, phones: updatedPhones });
    }
  };

  // Función para guardar los cambios de información personal
  const handleSaveChanges = () => {
    // Validación: Asegúrate de que todos los campos estén completos
    if (!info.fullName || !info.username || !info.province || !info.municipality || !info.email) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Simulación de guardado exitoso
    alert("Información actualizada exitosamente.");
    closeEditModal();
  };

  // Función para guardar la nueva contraseña
  const handleSavePassword = () => {
    // Validación: Verificar que todos los campos estén completos
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Validación: Verificar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Simulación de validación de la contraseña actual
    const storedPassword = "oldpassword123"; // Contraseña almacenada (simulada)
    if (currentPassword !== storedPassword) {
      alert("La contraseña actual es incorrecta.");
      return;
    }

    // Simulación de guardado exitoso
    alert("Contraseña actualizada exitosamente.");
    setIsPasswordModalOpen(false); // Cierra el modal
    setCurrentPassword(""); // Limpia los campos
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="bg-[#e0e8f0] p-6 rounded-lg shadow-md mb-6"> {/* Fondo ligeramente más oscuro */}
      {/* Título */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">Información personal</h2>

      {/* Contenido principal */}
      <div className="flex flex-wrap gap-8">
        {/* Nombre completo */}
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Nombre completo:</strong>
          <span>{info.fullName}</span>
        </div>

        {/* Nombre de usuario */}
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Nombre de usuario:</strong>
          <span>{info.username}</span>
        </div>

        {/* Provincia */}
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Provincia:</strong>
          <span>{info.province}</span>
        </div>

        {/* Municipio */}
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Municipio:</strong>
          <span>{info.municipality}</span>
        </div>

        {/* Teléfono */}
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Teléfonos:</strong>
          <div className="flex flex-col">
            {info.phones.map((phone, index) => (
              <span key={index}>{phone}</span>
            ))}
          </div>
        </div>

        {/* Correo electrónico */}
        <div className="flex items-center gap-2">
          <strong className="text-gray-700">Correo electrónico:</strong>
          <span>{info.email}</span>
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
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Editar información personal</h3>
            <form className="space-y-4">
              {/* Nombre completo */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={info.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Ingrese su nombre completo"
                />
              </div>

              {/* Nombre de usuario */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  value={info.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Ingrese su nombre de usuario"
                />
              </div>

              {/* Provincia */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Provincia
                </label>
                <select
                  value={info.province}
                  onChange={(e) => handleInputChange("province", e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option>La Habana</option>
                  <option>Matanzas</option>
                  <option>Villa Clara</option>
                  <option>Cienfuegos</option>
                </select>
              </div>

              {/* Municipio */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Municipio
                </label>
                <select
                  value={info.municipality}
                  onChange={(e) => handleInputChange("municipality", e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option>Plaza</option>
                  <option>Centro Habana</option>
                  <option>Vedado</option>
                  <option>Marianao</option>
                </select>
              </div>

              {/* Teléfonos */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfonos
                </label>
                {info.phones.map((phone, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) =>
                        handleInputChange(
                          "phones",
                          info.phones.map((p, i) => (i === index ? e.target.value : p))
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Ingrese un número de teléfono"
                    />
                    {/* Botón de eliminar solo visible si hay más de un teléfono */}
                    {info.phones.length > 1 && (
                      <button
                        onClick={() => removePhone(index)}
                        className="text-red-500 hover:underline"
                      >
                        <BsTrash size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {/* Botón para agregar un nuevo teléfono */}
                <button
                  onClick={addPhone}
                  type="button"
                  className="flex items-center gap-1 text-blue-500 hover:underline"
                >
                  <BsPlusCircle size={16} /> Agregar teléfono
                </button>
              </div>

              {/* Correo electrónico */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={info.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Ingrese su correo electrónico"
                />
              </div>

              {/* Botones de acción */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 transition-colors rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para cambiar contraseña */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Cambiar contraseña</h3>
            <form className="space-y-4">
              {/* Campo de contraseña actual */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contraseña actual
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Ingrese su contraseña actual"
                />
              </div>

              {/* Campo de nueva contraseña */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Ingrese su nueva contraseña"
                />
              </div>

              {/* Campo de confirmar nueva contraseña */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirmar nueva contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Confirme su nueva contraseña"
                />
              </div>

              {/* Botones de acción */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 transition-colors rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSavePassword}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;