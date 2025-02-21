// GenericModal.jsx
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
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: initialValues, // Establecer valores iniciales del formulario
  });

  // Resetear el formulario cuando se abre el modal
  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues); // Reiniciar el formulario con los valores iniciales
    }
  }, [isOpen, reset, initialValues]);

  // Manejador de envío del formulario
  const handleFormSubmit = (data) => {
    try {
      onSubmit(data); // Llama al manejador de envío externo
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div
    className={`fixed inset-0 flex items-center justify-center z-50 ${customStyles.overlay}`}
    style={{ display: isOpen ? "flex" : "none" }}
  >
    {/* Contenedor del modal */}
    <div
      className={`bg-white rounded-lg shadow-lg p-6 relative overflow-hidden ${customStyles.content}`}
      style={{
        maxHeight: "90vh", // Altura máxima del modal (90% de la altura de la ventana)
        overflowY: "auto", // Habilitar scroll vertical si el contenido es demasiado grande
      }}
    >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          X
        </button>

        {/* Título del modal */}
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {/* Contenido del formulario */}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {formContent({ register, errors, watch, setValue })}

          {/* Acciones personalizadas */}
          <div className="flex justify-end mt-4 space-x-2">
            {actions.map(({ label, onClick, primary = false }, index) => (
              <button
                key={index}
                type={onClick === "submit" ? "submit" : "button"}
                onClick={
                  onClick === "close"
                    ? onClose
                    : onClick === "submit"
                    ? undefined // El envío ya está manejado por el formulario
                    : onClick
                }
                className={`px-4 py-2 rounded transition-colors ${
                  primary
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
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