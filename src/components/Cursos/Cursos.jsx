import React, { useState, useEffect } from 'react';
import Curso from './Curso';
import GenericFilter from '../generics/GenericFilter';

const Cursos = () => {
  const [filters, setFilters] = useState({});
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cursosData, setCursosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:3001';

  // Configuración de los filtros
  const filterConfig = [
    {
      type: 'text',
      name: 'search',
      label: 'Buscar por título',
      placeholder: 'Buscar cursos...'
    },
    {
      type: 'select',
      name: 'modalidad',
      label: 'Modalidad',
      options: [
        { value: 'Presencial', label: 'Presencial' },
        { value: 'Online', label: 'Online' },
      ]
    },
    {
      type: 'select',
      name: 'nivel',
      label: 'Nivel',
      options: [
        { value: 'Principiante', label: 'Principiante' },
        { value: 'Intermedio', label: 'Intermedio' },
        { value: 'Avanzado', label: 'Avanzado' }
      ]
    },
    {
      type: 'number',
      name: 'precio',
      label: 'Precio máximo',
      placeholder: 'Ingrese el precio máximo',
      min: 0,
      step: 0.01
    }
  ];

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch(`${API_URL}/getallcourses`);
        if (!response.ok) {
          throw new Error('Error al cargar los cursos');
        }
        const data = await response.json();
        setCursosData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
  };

  // Función para restablecer filtros
  const handleResetFilters = () => {
    setFilters({});
  };

  // Aplicar filtros a los cursos
  const cursosFiltrados = cursosData.filter(curso => {
    // Filtro por búsqueda
    if (filters.search && !curso.titulo.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Filtro por modalidad
    if (filters.modalidad && curso.modalidad !== filters.modalidad) {
      return false;
    }

    // Filtro por nivel
    if (filters.nivel && curso.nivel !== filters.nivel) {
      return false;
    }

    // Filtro por requisitos
    if (filters.requisitos) {
      const tieneRequisitos = curso.requisitos !== "Ninguno.";
      if (filters.requisitos === 'Sí' && !tieneRequisitos) return false;
      if (filters.requisitos === 'No' && tieneRequisitos) return false;
    }

    // Filtro por precio
    if (filters.precio) {
      const precioNumerico = parseFloat(curso.precio.replace('$', ''));
      if (precioNumerico > parseFloat(filters.precio)) return false;
    }

    return true;
  });

  const abrirPopup = (curso) => {
    setCursoSeleccionado(curso);
    setIsOpen(true);
  };

  const cerrarPopup = () => {
    setIsOpen(false);
    setCursoSeleccionado(null);
  };

  if (loading) {
    return (
      <div className="p-6 bg-white text-gray-800">
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-4 shadow-md p-4 rounded-lg bg-blue-100">
          Cargando cursos...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white text-gray-800">
        <h1 className="text-4xl font-extrabold text-red-600 text-center mb-4 shadow-md p-4 rounded-lg bg-red-100">
          Error al cargar los cursos
        </h1>
        <p className="text-center text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white text-gray-800">
      <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-4 shadow-md p-4 rounded-lg bg-blue-100">
        Cursos
      </h1>
      <p className="text-lg text-center mb-6 text-gray-700">
        Explora nuestros cursos diseñados para impulsar tu carrera profesional. ¡Aprende nuevas habilidades y mejora tu futuro!
      </p>

      <div className="flex items-end gap-4 mb-6 p-4 bg-white rounded-lg shadow-md">
        <div className="flex-1 flex flex-wrap gap-4">
          <GenericFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            config={filterConfig}
            className="flex flex-wrap gap-4"
          />
        </div>
        <button
          onClick={handleResetFilters}
          className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors duration-200 whitespace-nowrap h-[42px]"
        >
          Restablecer filtros
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursosFiltrados.map((curso) => (
          <Curso key={curso.id} curso={curso} onClick={() => abrirPopup(curso)} />
        ))}
      </div>

      {isOpen && cursoSeleccionado && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold">{cursoSeleccionado.titulo}</h2>
            <p className="mt-2"><strong>Descripción Completa:</strong> {cursoSeleccionado.descripcionCompleta}</p>
            <p className="mt-4"><strong>Nivel:</strong> {cursoSeleccionado.nivel}</p>
            <p><strong>Modalidad:</strong> {cursoSeleccionado.modalidad}</p>
            <p><strong>Requisitos:</strong> {cursoSeleccionado.requisitos}</p>
            <p><strong>Precio:</strong> {cursoSeleccionado.precio}</p>
            <p><strong>Dirección:</strong> {cursoSeleccionado.direccion}</p>
            <button 
              onClick={cerrarPopup} 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cursos;