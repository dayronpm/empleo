import React, { useState, useEffect } from "react";
import PhoneInput from "./PhoneInput";
import { MdClose } from "react-icons/md"; // Importamos el ícono de cruz
import { provincesAndMunicipalities } from "./data";// Importamos los datos de provincias y municipios

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

  // Estado local para la copia temporal de los datos
  const [tempInfo, setTempInfo] = useState(info);

  // Estado para almacenar los municipios disponibles según la provincia seleccionada
  const [availableMunicipalities, setAvailableMunicipalities] = useState([]);

  // Actualizar la copia temporal cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setTempInfo(info); // Inicializar la copia temporal con los datos actuales
      // Cargar los municipios iniciales basados en la provincia actual
      const initialProvince = info.provincia || Object.keys(provincesAndMunicipalities)[0];
      setAvailableMunicipalities(provincesAndMunicipalities[initialProvince]);
    }
  }, [isOpen, info]);

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (field, value) => {
    setTempInfo((prevInfo) => ({ ...prevInfo, [field]: value }));

    // Si el campo es "provincia", actualizar los municipios disponibles
    if (field === "provincia") {
      setAvailableMunicipalities(provincesAndMunicipalities[value]);
      setTempInfo((prevInfo) => ({ ...prevInfo, municipio: "" })); // Limpiar el municipio seleccionado
    }
  };

  // Función para agregar un nuevo teléfono
  const handleAddPhone = () => {
    setTempInfo((prevInfo) => ({
      ...prevInfo,
      telefono: [...prevInfo.telefono, ""],
    }));
  };

  // Función para eliminar un teléfono
  const handleRemovePhone = (index) => {
    setTempInfo((prevInfo) => {
      if (prevInfo.telefono.length > 1) {
        const updatedPhones = prevInfo.telefono.filter((_, i) => i !== index);
        return { ...prevInfo, telefono: updatedPhones };
      }
      return prevInfo;
    });
  };

  // Validación del nombre completo
  const validateFullName = (name) => {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Solo letras y espacios
    return nameRegex.test(name);
  };

  // Validación del teléfono
  const validatePhone = (phone) => {
    const phoneRegex = /^\+53\d{6,8}$/; // Debe empezar con +53 y tener 6-8 dígitos
    return phoneRegex.test(phone);
  };

  // Validación del correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato básico de correo
    return emailRegex.test(email);
  };

  // Función para guardar los cambios
  const handleSave = () => {
    // Validación del nombre completo
    if (!tempInfo.nombre || !validateFullName(tempInfo.nombre)) {
      alert("El campo 'Nombre completo' es obligatorio y no puede contener números ni caracteres especiales.");
      return;
    }

    // Validación de los teléfonos
    const invalidPhones = tempInfo.telefono.some((phone) => phone && !validatePhone(phone));
    if (invalidPhones) {
      alert("Los teléfonos deben comenzar con '+53' y tener entre 6 y 8 dígitos.");
      return;
    }

    //Validación del correo
    if(tempInfo.correo){
      if (!validateEmail(tempInfo.correo)) {
        alert("El correo electrónico no tiene un formato válido.");
        return;
      }
    }
    

    // Si pasa todas las validaciones, guardar los cambios
    onSaveChanges(tempInfo); // Actualizar el estado global con los datos temporales
    onClose(); // Cerrar el modal
  };

  // Función para cerrar el modal y descartar cambios
  const handleClose = () => {
    onClose(); // Cerrar el modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Contenedor del modal */}
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto relative"
        style={{ maxHeight: "80vh" }}
      >
        {/* Botón de cierre con ícono de React */}
        <button
          onClick={handleClose} // Cerrar el modal al hacer clic en el ícono
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <MdClose size={24} /> {/* Ícono de cruz de React Icons */}
        </button>
        {/* Título del modal */}
        <h2 className="text-xl font-bold mb-4">Editar información personal</h2>
        {/* Formulario */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault(); // Prevenir el envío del formulario
          }}
        >
          {/* Campo de nombre completo */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nombre completo</label>
            <input
              type="text"
              value={tempInfo.nombre}
              onChange={(e) => handleInputChange("nombre", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Ingrese su nombre completo"
            />
          </div>
          {/* Campo de provincia */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Provincia</label>
            <select
              value={tempInfo.provincia}
              onChange={(e) => handleInputChange("provincia", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Prefiero no decirlo</option> {/* Nueva opción */}
              {Object.keys(provincesAndMunicipalities).map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          {/* Campo de municipio */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Municipio</label>
            <select
              value={tempInfo.municipio}
              onChange={(e) => handleInputChange("municipio", e.target.value)}
              className="w-full p-2 border rounded"
            >
              {/* Opción "Prefiero no decirlo" siempre visible */}
              <option value="">Prefiero no decirlo</option>

              {/* Opciones de municipios según la provincia seleccionada */}
              {tempInfo.provincia &&
                availableMunicipalities.map((municipality) => (
                  <option key={municipality} value={municipality}>
                    {municipality}
                  </option>
                ))}
            </select>
          </div>
          {/* Campos de teléfono */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Teléfonos</label>
            {tempInfo.telefono.map((phone, index) => (
              <PhoneInput
                key={index}
                value={phone}
                onChange={(value) =>
                  handleInputChange(
                    "telefono",
                    tempInfo.telefono.map((p, i) => (i === index ? value : p))
                  )
                }
                onDelete={() => handleRemovePhone(index)}
                showDeleteButton={tempInfo.telefono.length > 1}
              />
            ))}
            {/* Botón para agregar un nuevo teléfono */}
            <button
              onClick={handleAddPhone}
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
              value={tempInfo.correo}
              onChange={(e) => handleInputChange("correo", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Ingrese su correo electrónico"
            />
          </div>
          {/* Botones de acción */}
          <div className="flex justify-end gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 transition-colors rounded"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInfoModal;