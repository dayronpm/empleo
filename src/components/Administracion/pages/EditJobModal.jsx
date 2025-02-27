import React from 'react';

const EditJobModal = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = {
      categoria: formData.get('categoria'),
      provincia: formData.get('provincia'),
      municipio: formData.get('municipio'),
      nivelExperiencia: formData.get('nivelExperiencia'),
      salario: formData.get('salario'),
      descripcion: formData.get('descripcion'),
      requerimientos: formData.get('requerimientos'),
      beneficios: formData.get('beneficios'),
      procesoAplicacion: formData.get('procesoAplicacion'),
    };
    onAdd(newData); // Llamar a la función para agregar la oferta
    onClose(); // Cerrar el modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
        {/* Icono de Cerrar */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contenido del Modal */}
        <h3 className="text-xl font-bold mb-4">Agregar Oferta de Trabajo</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Campo Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
              <select
                name="categoria"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Selecciona una categoría</option>
                <option value="Tiempo Completo">Tiempo Completo</option>
                <option value="Medio Tiempo">Medio Tiempo</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            {/* Campo Provincia */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Provincia</label>
              <select
                name="provincia"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Selecciona una provincia</option>
                <option value="La Habana">La Habana</option>
                <option value="Matanzas">Matanzas</option>
                <option value="Camagüey">Camagüey</option>
                <option value="Santiago de Cuba">Santiago de Cuba</option>
              </select>
            </div>

            {/* Campo Municipio */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Municipio</label>
              <select
                name="municipio"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Selecciona un municipio</option>
                <option value="Centro Habana">Centro Habana</option>
                <option value="Vedado">Vedado</option>
                <option value="Playa">Playa</option>
              </select>
            </div>

            {/* Campo Nivel de Experiencia */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nivel de Experiencia</label>
              <select
                name="nivelExperiencia"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Selecciona un nivel</option>
                <option value="Junior">Junior</option>
                <option value="Medio">Medio</option>
                <option value="Senior">Senior</option>
              </select>
            </div>

            {/* Campo Salario */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Salario</label>
              <input
                type="number"
                name="salario"
                placeholder="Ej. 2000"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Campo Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                name="descripcion"
                rows="3"
                placeholder="Descripción de la oferta..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>

            {/* Campo Requerimientos */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Requerimientos</label>
              <textarea
                name="requerimientos"
                rows="3"
                placeholder="Lista de requerimientos..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>

            {/* Campo Beneficios */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Beneficios</label>
              <textarea
                name="beneficios"
                rows="3"
                placeholder="Lista de beneficios..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>

            {/* Campo Proceso de Aplicación */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Proceso de Aplicación</label>
              <textarea
                name="procesoAplicacion"
                rows="3"
                placeholder="Describe el proceso de aplicación..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>

            {/* Botones del Formulario */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
               Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;