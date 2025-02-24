// src/pages/People.jsx
import { useState } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Dropdown from '../components/Dropdown';
import { notifySuccess, notifyError } from '../components/ToastNotification'; // Importación corregida

const People = () => {
  const [people, setPeople] = useState([
    { id: 1, nombreCompleto: 'Juan Pérez', provincia: 'Madrid', municipio: 'Alcobendas', rolLaboral: 'Desarrollador' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleEdit = (person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setPeople(people.filter((person) => person.id !== id));
    notifySuccess('Usuario eliminado correctamente'); // Usa la función de notificación
  };

  const headers = ['Nombre Completo', 'Provincia', 'Municipio', 'Rol Laboral'];
  const actions = (person) => (
    <>
      <button onClick={() => handleEdit(person)} className="text-blue-500 mr-2">Editar</button>
      <button onClick={() => handleDelete(person.id)} className="text-red-500">Eliminar</button>
    </>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Personas</h2>
      <Table headers={headers} data={people} actions={actions} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Editar Información de {selectedPerson?.nombreCompleto}</h3>
        <Dropdown options={['Información Personal', 'Información Laboral']} onSelect={(option) => console.log(option)} />
      </Modal>
    </div>
  );
};

export default People;