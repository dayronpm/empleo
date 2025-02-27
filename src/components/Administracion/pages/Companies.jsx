// src/pages/Companies.jsx
import React, { useState } from 'react';
import Table from '../components/Table';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Companies = () => {
  const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Estado para controlar la visibilidad del modal de agregar

  const companies = [
    { id: 1, nombre: 'Tech Solutions', ubicacion: 'Barcelona', sector: 'Tecnología', cursosActivos: 3, ofertasEmpleo: 5 },
  ];

  const headers = ['Nombre', 'Ubicación', 'Sector', 'Cursos Activos', 'Ofertas de Empleo'];

  const actions = {
    onEdit: (company) => console.log('Editar:', company),
    onDeleteMultiple: (ids) => console.log('Eliminar IDs:', ids),
    onAdd: () => setIsAddModalOpen(true), // Abrir el modal de agregar
  };

  return (
    <div className="p-4">
      {/* Título de la Sección */}
      <h2 className="text-2xl font-bold mb-4">Empresas</h2>

      {/* Encabezado con Botones Agregar y Eliminar */}
      <div className="flex justify-end mb-4 space-x-4">
        {/* Botón Agregar Empresa */}
        <button
          title="Agregar Empresa"
          className="flex items-center text-green-500 hover:text-green-700 transition-colors"
          onClick={actions.onAdd}
        >
          <FaPlus size={16} className="mr-1" />
          Agregar
        </button>

        {/* Botón Eliminar Múltiples Empresas */}
        <button
          title="Eliminar Múltiples Empresas"
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
        data={companies}
        actions={actions}
        isMultiDeleteMode={isMultiDeleteMode}
      />

      {/* Modal de Agregar Empresa */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
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
            <h3 className="text-xl font-bold mb-4">Agregar Empresa</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const contraseña = formData.get('contraseña');
                const confirmarContraseña = formData.get('confirmarContraseña');

                if (contraseña !== confirmarContraseña) {
                  alert('Las contraseñas no coinciden');
                  return;
                }

                const newData = {
                  nombreCompleto: formData.get('nombreCompleto'),
                  nombreUsuario: formData.get('nombreUsuario'),
                  contraseña,
                };
                console.log('Nueva Empresa:', newData); // Simular acción de agregar
                setIsAddModalOpen(false); // Cerrar el modal
              }}
            >
              <div className="space-y-4">
                {/* Campo Nombre Completo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                  <input
                    type="text"
                    name="nombreCompleto"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                {/* Campo Nombre de Usuario */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                  <input
                    type="text"
                    name="nombreUsuario"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                {/* Campo Contraseña */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <input
                    type="password"
                    name="contraseña"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                {/* Campo Confirmar Contraseña */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                  <input
                    type="password"
                    name="confirmarContraseña"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
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

export default Companies;