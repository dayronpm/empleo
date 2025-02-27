// src/pages/Courses.jsx
import React, { useState } from 'react';
import Table from '../components/Table';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Courses = () => {
  const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Estado para controlar la visibilidad del modal de agregar

  const courses = [
    { id: 1, nombre: 'Introducción a Python', empresa: 'Tech Solutions', duracion: '4 semanas', fechaInicio: '2023-10-01' },
  ];

  const headers = ['Nombre', 'Empresa', 'Duración', 'Fecha de Inicio'];

  const actions = {
    onEdit: (course) => console.log('Editar:', course),
    onDeleteMultiple: (ids) => console.log('Eliminar IDs:', ids),
    onAdd: () => setIsAddModalOpen(true), // Abrir el modal de agregar
  };

  return (
    <div className="p-4">
      {/* Título de la Sección */}
      <h2 className="text-2xl font-bold mb-4">Cursos</h2>

      {/* Encabezado con Botones Agregar y Eliminar */}
      <div className="flex justify-end mb-4 space-x-4">
        {/* Botón Agregar Curso */}
        <button
          title="Agregar Curso"
          className="flex items-center text-green-500 hover:text-green-700 transition-colors"
          onClick={actions.onAdd}
        >
          <FaPlus size={16} className="mr-1" />
          Agregar
        </button>

        {/* Botón Eliminar Múltiples Cursos */}
        <button
          title="Eliminar Múltiples Cursos"
          className={`flex items-center ${
            isMultiDeleteMode ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          } transition-colors`}
          onClick={() => setIsMultiDeleteMode(!isMultiDeleteMode)}
        >
          <FaTrash size={16} className="mr-1" />
          Eliminar
        </button>
      </div>

      {/* Tabla */}
      <Table
        headers={headers}
        data={courses}
        actions={actions}
        isMultiDeleteMode={isMultiDeleteMode}
      />

      {/* Modal de Agregar Curso */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
            {/* Icono de Cerrar en la Esquina Superior Derecha */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
              onClick={() => setIsAddModalOpen(false)}
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
            <h3 className="text-xl font-bold mb-4">Agregar Curso</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newData = {
                  nombreCurso: formData.get('nombreCurso'),
                  modalidad: formData.get('modalidad'),
                  nivel: formData.get('nivel'),
                  requisitos: formData.get('requisitos'),
                  precio: formData.get('precio'),
                  direccion: formData.get('direccion'),
                };
                console.log('Nuevo Curso:', newData); // Simular acción de agregar
                setIsAddModalOpen(false); // Cerrar el modal
              }}
            >
              <div className="space-y-4">
                {/* Campo Nombre del Curso */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre del Curso</label>
                  <input
                    type="text"
                    name="nombreCurso"
                    placeholder="Ej. Introducción a Python"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                {/* Campo Modalidad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Modalidad</label>
                  <select
                    name="modalidad"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">Selecciona una modalidad</option>
                    <option value="online">Online</option>
                    <option value="presencial">Presencial</option>
                  </select>
                </div>

                {/* Campo Nivel */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nivel</label>
                  <select
                    name="nivel"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">Selecciona un nivel</option>
                    <option value="principiante">Principiante</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                  </select>
                </div>

                {/* Campo Requisitos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Requisitos</label>
                  <textarea
                    name="requisitos"
                    rows="3"
                    placeholder="Lista de requisitos..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  ></textarea>
                </div>

                {/* Campo Precio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Precio</label>
                  <input
                    type="number"
                    name="precio"
                    placeholder="Ej. 100"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                {/* Campo Dirección */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    placeholder="Ej. Calle Principal #123"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Botones del Formulario */}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;