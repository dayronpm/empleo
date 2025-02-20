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

export const confirmationModalConfig = (message) => ({
  title: "Confirmación",
  actions: [
    { label: "Cancelar", onClick: "close" },
    { label: "Aceptar", onClick: "submit", primary: true },
  ],
  customStyles: {
    overlay: "bg-black bg-opacity-70",
    content: "w-[400px]",
  },
  formContent: ({ register, errors }) => {
    return (
      <>
        {/* Mensaje del modal */}
        <div className="mb-4">
          <p> {message} </p>
        </div>
      </>
    );
  },
});

export const deleteAccountModalConfig = {
  title: "Eliminar Cuenta",
  actions: [
    { label: "Cancelar", onClick: "close" },
    { label: "Eliminar", onClick: "submit", primary: true },
  ],
  customStyles: {
    overlay: "bg-black bg-opacity-70",
    content: "w-[400px]",
  },
  formContent: ({ register, errors }) => {
    return (
      <>
        <p>Por favor, ingresa tu contraseña para confirmar:</p>
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: "La contraseña es obligatoria",
          })}
          className={`border p-2 w-full mb-4 ${errors.password ? "border-red-500" : ""}`}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </>
    );
  },
  validationSchema: {
    password: {
      required: "La contraseña es obligatoria",
    },
  },
  initialValues: {
    password: "",
  },
};

export const deleteJobModalConfig = (job) => ({
  title: "Confirmar eliminación",
  actions: [
    { label: "Cancelar", onClick: "close" },
    { label: "Eliminar", onClick: "submit", primary: true },
  ],
  customStyles: {
    overlay: "bg-black bg-opacity-70",
    content: "w-[400px]",
  },
  formContent: ({ register, errors, watch }) => {
    const confirmationWord = watch("confirmationWord");

    return (
      <>
        <p className="mb-4">
          Por favor, ingrese la primera palabra del título "{job.titulo}" para confirmar:
        </p>

        {/* Campo de entrada para la palabra de confirmación */}
        <input
          type="text"
          placeholder="Primera palabra del título"
          {...register("confirmationWord", {
            required: "Este campo es obligatorio",
            validate: (value) =>
              value.toLowerCase() === job.titulo.split(" ")[0].toLowerCase() ||
              "La palabra no coincide con el título del trabajo",
          })}
          className={`w-full p-2 border rounded ${errors.confirmationWord && "border-red-500"}`}
        />
        {errors.confirmationWord && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmationWord.message}</p>
        )}
      </>
    );
  },
  validationSchema: {
    confirmationWord: {
      required: "Este campo es obligatorio",
    },
  },
  initialValues: {
    confirmationWord: "",
  },
});

export const addEditJobModalConfig = (job = null) => ({
  title: job ? "Editar Oferta de Trabajo" : "Agregar Nueva Oferta de Trabajo",
  actions: [
    { label: "Cancelar", onClick: "close" },
    { label: job ? "Guardar Cambios" : "Agregar Oferta", onClick: "submit", primary: true },
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
        {/* Título */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            placeholder="Ingrese el título del trabajo"
            {...register("titulo", {
              required: "Este campo es obligatorio",
            })}
            className={`w-full p-2 border rounded ${errors.titulo && "border-red-500"}`}
          />
          {errors.titulo && (
            <p className="text-red-500 text-sm mt-1">{errors.titulo.message}</p>
          )}
        </div>

        {/* Provincia */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Provincia</label>
          <select
            {...register("provincia", {
              required: "Este campo es obligatorio",
            })}
            onChange={handleProvinceChange}
            className={`w-full p-2 border rounded ${errors.provincia && "border-red-500"}`}
          >
            <option value="">Seleccione una provincia</option>
            {Object.keys(provincesAndMunicipalities).map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
          {errors.provincia && (
            <p className="text-red-500 text-sm mt-1">{errors.provincia.message}</p>
          )}
        </div>

        {/* Municipio */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Municipio</label>
          <select
            {...register("municipio", {
              required: "Este campo es obligatorio",
            })}
            className={`w-full p-2 border rounded ${errors.municipio && "border-red-500"}`}
          >
            <option value="">Seleccione un municipio</option>
            {municipalities.map((municipality) => (
              <option key={municipality} value={municipality}>
                {municipality}
              </option>
            ))}
          </select>
          {errors.municipio && (
            <p className="text-red-500 text-sm mt-1">{errors.municipio.message}</p>
          )}
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            placeholder="Ingrese la descripción del trabajo"
            {...register("descripcion", {
              required: "Este campo es obligatorio",
            })}
            className={`w-full p-2 border rounded ${errors.descripcion && "border-red-500"}`}
          />
          {errors.descripcion && (
            <p className="text-red-500 text-sm mt-1">{errors.descripcion.message}</p>
          )}
        </div>

        {/* Requerimientos */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Requerimientos</label>
          <textarea
            placeholder="Ingrese los requerimientos del trabajo"
            {...register("requerimientos", {
              required: "Este campo es obligatorio",
            })}
            className={`w-full p-2 border rounded ${errors.requerimientos && "border-red-500"}`}
          />
          {errors.requerimientos && (
            <p className="text-red-500 text-sm mt-1">{errors.requerimientos.message}</p>
          )}
        </div>

        {/* Beneficios */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Beneficios</label>
          <textarea
            placeholder="Ingrese los beneficios del trabajo"
            {...register("beneficios", {
              required: "Este campo es obligatorio",
            })}
            className={`w-full p-2 border rounded ${errors.beneficios && "border-red-500"}`}
          />
          {errors.beneficios && (
            <p className="text-red-500 text-sm mt-1">{errors.beneficios.message}</p>
          )}
        </div>

        {/* Proceso de Aplicación */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Proceso de Aplicación</label>
          <textarea
            placeholder="Ingrese el proceso de aplicación del trabajo"
            {...register("proceso_aplicacion", {
              required: "Este campo es obligatorio",
            })}
            className={`w-full p-2 border rounded ${errors.proceso_aplicacion && "border-red-500"}`}
          />
          {errors.proceso_aplicacion && (
            <p className="text-red-500 text-sm mt-1">{errors.proceso_aplicacion.message}</p>
          )}
        </div>

        {/* Salario */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Salario</label>
          <input
            type="number"
            placeholder="Ingrese el salario"
            {...register("salario", {
              required: "Este campo es obligatorio",
              min: { value: 0, message: "El salario debe ser mayor o igual a 0" },
            })}
            className={`w-full p-2 border rounded ${errors.salario && "border-red-500"}`}
          />
          {errors.salario && (
            <p className="text-red-500 text-sm mt-1">{errors.salario.message}</p>
          )}
        </div>

        {/* Categoría */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            {...register("categoria", {
              required: "Este campo es obligatorio",
            })}
            className={`w-full p-2 border rounded ${errors.categoria && "border-red-500"}`}
          >
            <option value="">Seleccione una categoría</option>
            <option value="Medio tiempo">Medio tiempo</option>
            <option value="Tiempo completo">Tiempo completo</option>
            <option value="Freelance">Freelance</option>
          </select>
          {errors.categoria && (
            <p className="text-red-500 text-sm mt-1">{errors.categoria.message}</p>
          )}
        </div>

        {/* Nivel de Experiencia */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nivel de Experiencia</label>
          <select
            {...register("nivel_experiencia", {
              required: "Este campo es obligatorio",
            })}
            className={`w-full p-2 border rounded ${errors.nivel_experiencia && "border-red-500"}`}
          >
            <option value="">Seleccione un nivel de experiencia</option>
            <option value="Junior">Junior</option>
            <option value="Medio">Medio</option>
            <option value="Senior">Senior</option>
          </select>
          {errors.nivel_experiencia && (
            <p className="text-red-500 text-sm mt-1">{errors.nivel_experiencia.message}</p>
          )}
        </div>

        {/* Tipo */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tipo</label>
          <select
            {...register("tipo", {
              required: "Este campo es obligatorio",
            })}
            className={`w-full p-2 border rounded ${errors.tipo && "border-red-500"}`}
          >
            <option value="">Seleccione un tipo</option>
            <option value="Estatal">Estatal</option>
            <option value="No estatal">No estatal</option>
          </select>
          {errors.tipo && (
            <p className="text-red-500 text-sm mt-1">{errors.tipo.message}</p>
          )}
        </div>
      </>
    );
  },
  validationSchema: {
    titulo: {
      required: "El título es obligatorio",
    },
    provincia: {
      required: "La provincia es obligatoria",
    },
    municipio: {
      required: "El municipio es obligatorio",
    },
    descripcion: {
      required: "La descripción es obligatoria",
    },
    requerimientos: {
      required: "Los requerimientos son obligatorios",
    },
    beneficios: {
      required: "Los beneficios son obligatorios",
    },
    proceso_aplicacion: {
      required: "El proceso de aplicación es obligatorio",
    },
    salario: {
      required: "El salario es obligatorio",
      min: {
        value: 0,
        message: "El salario debe ser mayor o igual a 0",
      },
    },
    categoria: {
      required: "La categoría es obligatoria",
    },
    nivel_experiencia: {
      required: "El nivel de experiencia es obligatorio",
    },
    tipo: {
      required: "El tipo es obligatorio",
    },
  },
  initialValues: {
    titulo: job?.titulo || "",
    provincia: job?.provincia || "",
    municipio: job?.municipio || "",
    descripcion: job?.descripcion || "",
    requerimientos: job?.requerimientos || "",
    beneficios: job?.beneficios || "",
    salario: job?.salario || "",
    proceso_aplicacion: job?.aplicacion || "",
    categoria: job?.categoria || "",
    nivel_experiencia: job?.experiencia || "",
    tipo: job?.tipo || "",
  },
});