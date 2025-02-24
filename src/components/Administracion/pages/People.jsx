// src/pages/People.jsx
import { useState } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Dropdown from '../components/Dropdown';
import { notifySuccess, notifyError } from '../components/ToastNotification'; // Importación corregida
import { FaPlus } from 'react-icons/fa'; // Ícono de agregar

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Estado para el modal de agregar
  const [selectedPerson, setSelectedPerson] = useState(null);

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

  // Función para agregar una nueva persona
  const handleAddPerson = (newPerson) => {
    const newId = people.length > 0 ? Math.max(...people.map((p) => p.id)) + 1 : 1; // Genera un nuevo ID
    setPeople([...people, { id: newId, ...newPerson }]);
    setIsAddModalOpen(false); // Cierra el modal
    notifySuccess('Persona agregada correctamente');
  };

  const headers = ['Nombre Completo', 'Provincia', 'Municipio', 'Rol Laboral'];

  const actions = (person) => (
    <>
      <button onClick={() => handleEdit(person)} className="text-blue-500 mr-2">
        Editar
      </button>
      <button onClick={() => handleDelete(person.id)} className="text-red-500">
        Eliminar
      </button>
    </>
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        {/* Título */}
        <h2 className="text-2xl font-bold">Personas</h2>

        {/* Botón de Agregar Persona */}
        <button
          title="Agregar Persona"
          className="flex items-center text-green-500 hover:text-green-700 transition-colors"
          onClick={() => setIsAddModalOpen(true)}
        >
          <FaPlus size={16} className="mr-1" /> Agregar
        </button>
      </div>

      {/* Tabla */}
      <Table headers={headers} data={people} actions={actions} />

      {/* Modal de Edición */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Editar Información de {selectedPerson?.nombreCompleto}</h3>
        <Dropdown options={['Información Personal', 'Información Laboral']} onSelect={(option) => console.log(option)} />
      </Modal>

      {/* Modal de Agregar Persona */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <h3 className="text-xl font-bold mb-4">Agregar Nueva Persona</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newPerson = {
              nombreCompleto: formData.get('nombreCompleto'),
              provincia: formData.get('provincia'),
              municipio: formData.get('municipio'),
              rolLaboral: formData.get('rolLaboral'),
            };
            handleAddPerson(newPerson);
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

            {/* Campo Provincia */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Provincia</label>
              <input
                type="text"
                name="provincia"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Campo Municipio */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Municipio</label>
              <input
                type="text"
                name="municipio"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Campo Rol Laboral */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Rol Laboral</label>
              <input
                type="text"
                name="rolLaboral"
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
                Agregar
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default People;