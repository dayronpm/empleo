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
    { id: 11, nombreCompleto: 'Miguel Álvarez', provincia: 'Alicante', municipio: 'Elche', rolLaboral: 'Arquitecto' },
    { id: 12, nombreCompleto: 'Isabel Díaz', provincia: 'Córdoba', municipio: 'Córdoba', rolLaboral: 'Profesora' },
    { id: 13, nombreCompleto: 'Daniel Castro', provincia: 'Granada', municipio: 'Granada', rolLaboral: 'Diseñador' },
    { id: 14, nombreCompleto: 'Carmen Vargas', provincia: 'Vigo', municipio: 'Vigo', rolLaboral: 'Administrativa' },
    { id: 15, nombreCompleto: 'Pablo Ortega', provincia: 'Gijón', municipio: 'Gijón', rolLaboral: 'Desarrollador' },
    { id: 16, nombreCompleto: 'Rosa Márquez', provincia: 'Santa Cruz', municipio: 'Santa Cruz', rolLaboral: 'Enfermera' },
    { id: 17, nombreCompleto: 'Antonio Navarro', provincia: 'Pamplona', municipio: 'Pamplona', rolLaboral: 'Médico' },
    { id: 18, nombreCompleto: 'Lucía Jiménez', provincia: 'Donostia', municipio: 'Donostia', rolLaboral: 'Periodista' },
    { id: 19, nombreCompleto: 'Francisco Herrera', provincia: 'Valladolid', municipio: 'Valladolid', rolLaboral: 'Electricista' },
    { id: 20, nombreCompleto: 'Natalia Peña', provincia: 'Oviedo', municipio: 'Oviedo', rolLaboral: 'Psicóloga' },
    { id: 21, nombreCompleto: 'Raúl Medina', provincia: 'Logroño', municipio: 'Logroño', rolLaboral: 'Chef' },
    { id: 22, nombreCompleto: 'Patricia Silva', provincia: 'Badajoz', municipio: 'Badajoz', rolLaboral: 'Veterinaria' },
    { id: 23, nombreCompleto: 'Manuel Castro', provincia: 'Salamanca', municipio: 'Salamanca', rolLaboral: 'Carpintero' },
    { id: 24, nombreCompleto: 'Clara Ríos', provincia: 'Huelva', municipio: 'Huelva', rolLaboral: 'Farmacéutica' },
    { id: 25, nombreCompleto: 'Alejandro Rubio', provincia: 'León', municipio: 'León', rolLaboral: 'Mecánico' },
    { id: 26, nombreCompleto: 'Adriana Vega', provincia: 'Cádiz', municipio: 'Cádiz', rolLaboral: 'Traductora' },
    { id: 27, nombreCompleto: 'José Morales', provincia: 'Jaén', municipio: 'Jaén', rolLaboral: 'Camarero' },
    { id: 28, nombreCompleto: 'Sara Guzmán', provincia: 'Lugo', municipio: 'Lugo', rolLaboral: 'Fotógrafa' },
    { id: 29, nombreCompleto: 'Mario Blanco', provincia: 'Tarragona', municipio: 'Tarragona', rolLaboral: 'Pintor' },
    { id: 30, nombreCompleto: 'Paula Núñez', provincia: 'Ciudad Real', municipio: 'Ciudad Real', rolLaboral: 'Secretaria' },
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