// src/pages/People.jsx
import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Dropdown from '../components/Dropdown';
import { notifySuccess, notifyError } from '../components/ToastNotification';
import { FaPlus, FaTrash } from 'react-icons/fa';
import SearchBar from './SearchBar';

const People = () => {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:3001/getallpersona');
      const peopleData = await response.json();
      
      const formattedPeople = peopleData.map(person => ({
        id: person.id,
        nombreCompleto: person.nombre,
        username: person.username,
        password: person.password,
        provincia: person.provincia || '',
        municipio: person.municipio || '',
        telefono: person.telefono ? JSON.parse(person.telefono) : [],
        correo: person.correo || '',
      }));

      setPeople(formattedPeople);
      setFilteredPeople(formattedPeople);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al cargar personas:', error);
      notifyError('Error al cargar las personas');
      setIsLoading(false);
    }
  };

  const handleAddPerson = async (formData) => {
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.get('nombreUsuario'),
          password: formData.get('contraseña'),
          userType: 'persona',
          name: formData.get('nombreCompleto')
        }),
      });

      const data = await response.json();

      if (response.ok) {
        notifySuccess('Persona agregada exitosamente');
        fetchPeople();
        setIsAddModalOpen(false);
      } else {
        notifyError(data.error || 'Error al agregar la persona');
      }
    } catch (error) {
      console.error('Error:', error);
      notifyError('Error al agregar la persona');
    }
  };

  // Agregar función para eliminar personas
  const handleDeletePeople = async (ids) => {
    try {
      const deletePromises = ids.map(id => {
        const person = people.find(p => p.id === id);
        if (!person) throw new Error('Persona no encontrada');

        return fetch('http://localhost:3001/borrarusuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            id,
            username: person.username,
            password: person.password
          })
        }).then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar la persona');
          }
          return response;
        });
      });

      await Promise.all(deletePromises);
      notifySuccess('Personas eliminadas exitosamente');
      fetchPeople();
      setIsMultiDeleteMode(false);
    } catch (error) {
      console.error('Error:', error);
      notifyError('Error al eliminar las personas');
    }
  };

  const headers = ['Nombre Completo', 'Usuario', 'Provincia', 'Municipio'];

  const actions = {
    onEdit: (person) => {
      setSelectedPerson(person);
      setIsEditModalOpen(true);
    },
    onDeleteMultiple: handleDeletePeople,
    onAdd: () => setIsAddModalOpen(true),
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Personas</h2>
        <div className="flex space-x-4">
          <SearchBar
            data={people}
            setSearchResults={setFilteredPeople}
          />

          <button
            className="flex items-center text-green-500 hover:text-green-700"
            onClick={actions.onAdd}
          >
            <FaPlus className="mr-2" /> Agregar
          </button>
          <button
            className={`flex items-center ${
              isMultiDeleteMode ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
            onClick={() => setIsMultiDeleteMode(!isMultiDeleteMode)}
          >
            <FaTrash className="mr-2" /> Eliminar
          </button>
        </div>
      </div>

      <Table
        headers={headers}
        data={filteredPeople.map(person => ({
          id: person.id,
          visibleData: {
            nombreCompleto: person.nombreCompleto,
            username: person.username,
            provincia: person.provincia,
            municipio: person.municipio,
          },
          ...person
        }))}
        actions={actions}
        isMultiDeleteMode={isMultiDeleteMode}
      />

      {/* Modal de Agregar Persona */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
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

                handleAddPerson(formData);
              }}
            >
              <div className="space-y-4">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <input
                    type="password"
                    name="contraseña"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                  <input
                    type="password"
                    name="confirmarContraseña"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

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

      {/* Los otros modales los agregaremos después */}
    </div>
  );
};

export default People;