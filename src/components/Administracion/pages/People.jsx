// src/pages/People.jsx
import { useState } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Dropdown from '../components/Dropdown';
import { notifySuccess, notifyError } from '../components/ToastNotification'; // Importación corregida

const People = () => {
  const [people, setPeople] = useState([
    { id: 1, nombreCompleto: 'Juan Pérez', provincia: 'Madrid', municipio: 'Alcobendas', rolLaboral: 'Desarrollador' },
    { id: 2, nombreCompleto: 'María López', provincia: 'Barcelona', municipio: 'Sabadell', rolLaboral: 'Diseñadora' },
    { id: 3, nombreCompleto: 'Carlos Gómez', provincia: 'Valencia', municipio: 'Torrent', rolLaboral: 'Analista' },
    { id: 4, nombreCompleto: 'Ana Martínez', provincia: 'Sevilla', municipio: 'Dos Hermanas', rolLaboral: 'Gerente' },
    { id: 5, nombreCompleto: 'Luis Fernández', provincia: 'Zaragoza', municipio: 'Zaragoza', rolLaboral: 'Consultor' },
    { id: 6, nombreCompleto: 'Elena Ruiz', provincia: 'Málaga', municipio: 'Málaga', rolLaboral: 'Marketing' },
    { id: 7, nombreCompleto: 'Javier Torres', provincia: 'Murcia', municipio: 'Murcia', rolLaboral: 'Ingeniero' },
    { id: 8, nombreCompleto: 'Sofía Ramírez', provincia: 'Palma', municipio: 'Palma', rolLaboral: 'Contadora' },
    { id: 9, nombreCompleto: 'David Sánchez', provincia: 'Las Palmas', municipio: 'Las Palmas', rolLaboral: 'Técnico' },
    { id: 10, nombreCompleto: 'Laura González', provincia: 'Bilbao', municipio: 'Bilbao', rolLaboral: 'Abogada' },
    // ... más personas ...
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Estado para controlar el modal de agregar
  const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false); // Estado para activar el modo de eliminación múltiple

  // Función para manejar la edición de una persona
  const handleEdit = (person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  // Función para manejar la eliminación de una persona
  const handleDelete = (id) => {
    setPeople(people.filter((person) => person.id !== id));
    notifySuccess('Usuario eliminado correctamente'); // Usa la función de notificación
  };

  // Función para manejar la eliminación múltiple de personas
  const handleDeleteMultiple = (ids) => {
    setPeople(people.filter((person) => !ids.includes(person.id)));
    notifySuccess(`${ids.length} usuarios eliminados correctamente`);
  };

  // Función para agregar una nueva persona
  const handleAddPerson = (newPerson) => {
    const newId = people.length > 0 ? Math.max(...people.map((p) => p.id)) + 1 : 1; // Genera un nuevo ID
    setPeople([...people, { id: newId, ...newPerson }]);
    notifySuccess('Persona agregada correctamente');
  };

  const headers = ['Nombre Completo', 'Provincia', 'Municipio', 'Rol Laboral'];

  return (
    <div className="p-4">
      {/* Título */}
      <h2 className="text-2xl font-bold mb-4">Personas</h2>

      {/* Encabezado con Botones Agregar y Eliminar */}
      <div className="flex justify-end mb-4 space-x-4">
        {/* Botón Agregar Persona */}
        <button
          title="Agregar Persona"
          className="flex items-center text-green-500 hover:text-green-700 transition-colors"
          onClick={() => setIsAddModalOpen(true)} // Abrir el modal de agregar
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Agregar
        </button>

        {/* Botón Eliminar Múltiples Personas */}
        <button
          title="Eliminar Múltiples Personas"
          className={`flex items-center ${
            isMultiDeleteMode ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          } transition-colors`}
          onClick={() => setIsMultiDeleteMode(!isMultiDeleteMode)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Eliminar
        </button>
      </div>

      {/* Tabla */}
      <Table
        headers={headers}
        data={people}
        actions={{
          onEdit: handleEdit,
          onDelete: handleDelete,
          onDeleteMultiple: handleDeleteMultiple,
          onAdd: () => setIsAddModalOpen(true), // Abre el modal para agregar una nueva persona
        }}
        isMultiDeleteMode={isMultiDeleteMode}
      />

      {/* Modal de Edición */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Editar Información de {selectedPerson?.nombreCompleto}</h3>
        <Dropdown options={['Información Personal', 'Información Laboral']} onSelect={(option) => console.log(option)} />
      </Modal>

      {/* Modal de Agregar Persona */}
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
            <h3 className="text-xl font-bold mb-4">Agregar Persona</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const contraseña = formData.get('contraseña');
                const confirmarContraseña = formData.get('confirmarContraseña');

                if (contraseña !== confirmarContraseña) {
                  notifyError('Las contraseñas no coinciden');
                  return;
                }

                const newData = {
                  nombreCompleto: formData.get('nombreCompleto'),
                  nombreUsuario: formData.get('nombreUsuario'),
                  contraseña,
                };
                handleAddPerson(newData); // Agregar la nueva persona
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
                    placeholder="Ej. Juan Pérez"
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
                    placeholder="Ej. juan.perez"
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

export default People;