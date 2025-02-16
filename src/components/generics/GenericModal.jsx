import React from "react";
import { useForm } from "react-hook-form";

const GenericModal = ({
  isOpen,
  onClose,
  title,
  formContent,
  actions,
  validationSchema,
  onSubmit,
  customStyles,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Resetear el formulario cuando se abre el modal
  React.useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  // Manejador de envío
  const handleFormSubmit = (data) => {
    try {
      onSubmit(data); // Llama al manejador de envío externo
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
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
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {formContent({ register, errors })}
          {/* Acciones personalizadas */}
          <div className="flex justify-end gap-2">
            {actions.map(({ label, onClick, primary = false }, index) => (
              <button
                key={index}
                onClick={(e) => {
                  if (onClick === "submit") {
                    handleSubmit(handleFormSubmit)(e);
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