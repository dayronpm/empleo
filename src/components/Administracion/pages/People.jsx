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

      {/* Tabla */}
      <Table
        headers={headers}
        data={people}
        actions={{
          onEdit: handleEdit,
          onDelete: handleDelete,
          onDeleteMultiple: handleDeleteMultiple,
          onAdd: () => setIsModalOpen(true), // Abre el modal para agregar una nueva persona
        }}
      />

      {/* Modal de Edición */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Editar Información de {selectedPerson?.nombreCompleto}</h3>
        <Dropdown options={['Información Personal', 'Información Laboral']} onSelect={(option) => console.log(option)} />
      </Modal>
    </div>
  );
};

export default People;