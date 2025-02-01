import React, { useState } from 'react';

const API_URL = 'http://localhost:3001'; // Cambia esto si tu servidor está en otra URL
const id = localStorage.getItem('id');

const CourseModal = ({ isOpen, onClose }) => {
  const [courseData, setCourseData] = useState({
    titulo: '',
    descripcion: '',
    nivel: '', // Debe ser uno de los valores del select
    requisitos: '',
    modalidad: '', // Debe ser uno de los valores del select
    descripcionCompleta: '',
    direccion: '',
    precio: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const validateForm = () => {
    if (!courseData.nivel) {
      setErrorMessage('Debes seleccionar un nivel.');
      return false;
    }
    if (!courseData.modalidad) {
      setErrorMessage('Debes seleccionar una modalidad.');
      return false;
    }
    if (parseFloat(courseData.precio) <= 0) {
      setErrorMessage('El precio debe ser un número positivo.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${API_URL}/addcourse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...courseData,
          id: id // Include the user ID
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error adding course');
      }

      const result = await response.json();
      console.log('Course added successfully:', result);
      window.location.reload();
      onClose(); // Cierra el modal
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4 transition-transform duration-300 ease-in-out transform scale-100">
        {/* Header */}
        <h2 className="text-xl font-bold text-center text-blue-600">Agregar Nuevo Curso</h2>
        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título */}
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Descripción */}
          <textarea
            name="descripcion"
            placeholder="Descripción"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Nivel */}
          <select
            name="nivel"
            value={courseData.nivel}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona un nivel</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
          {/* Requisitos */}
          <input
            type="text"
            name="requisitos"
            placeholder="Requisitos"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Modalidad */}
          <select
            name="modalidad"
            value={courseData.modalidad}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona una modalidad</option>
            <option value="Online">Online</option>
            <option value="Presencial">Presencial</option>
          </select>
          {/* Descripción Completa */}
          <textarea
            name="descripcionCompleta"
            placeholder="Descripción Completa"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Dirección */}
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Precio */}
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Botones */}
          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Agregar Curso
            </button>
            <button
              onClick={onClose}
              className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition duration-300"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;