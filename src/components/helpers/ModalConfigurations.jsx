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