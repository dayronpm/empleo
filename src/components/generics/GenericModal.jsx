// GenericModal.jsx

import React, { useState, useEffect } from "react";

const GenericModal = ({
  isOpen,
  onClose,
  title,
  formContent, // Prop explícita para el contenido del formulario
  actions,
  initialValues,
  validationSchema,
  onSubmit,
  customStyles,
}) => {
  const [formData, setFormData] = useState(initialValues || {});
  const [errors, setErrors] = useState({});

  // Inicializar el estado cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setFormData(initialValues || {});
      setErrors({});
    }
  }, [isOpen, initialValues]);

  // Manejador de cambios genérico
  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  // Validación de campos individuales
  const validateField = (name, value) => {
    if (validationSchema && validationSchema[name]) {
      try {
        validationSchema[name](value, formData);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      } catch (error) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
      }
    }
  };

  // Validación completa del formulario
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};
    for (const [name, validator] of Object.entries(validationSchema || {})) {
      try {
        validator(formData[name], formData);
      } catch (error) {
        formIsValid = false;
        newErrors[name] = error.message;
      }
    }
    setErrors(newErrors);
    return formIsValid;
  };

  // Manejador de envío
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData); // Llama al manejador de envío
    } else {
      // No cerrar el modal si hay errores
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${
        customStyles?.overlay || ""
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-[400px] max-w-full relative ${
          customStyles?.content || ""
        }`}
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          X
        </button>

        {/* Título del modal */}
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {/* Contenido del modal */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {formContent
            ? formContent({ formData, errors, handleChange }) // Usar formContent si está definido
            : null}

          {/* Acciones personalizadas */}
          <div className="flex justify-end gap-2">
            {actions.map(({ label, onClick, primary = false }, index) => (
              <button
                key={index}
                onClick={(e) => {
                  if (onClick === "submit") {
                    handleSubmit(e);
                  } else if (onClick === "close") {
                    onClose();
                  } else {
                    onClick();
                  }
                }}
                className={`px-4 py-2 rounded ${
                  primary
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                } transition-colors`}
              >
                {label}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenericModal;