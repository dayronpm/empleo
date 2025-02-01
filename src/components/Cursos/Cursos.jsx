import React, { useState, useEffect } from 'react';
import Curso from './Curso';
import Filtro from './Filtro';

const Cursos = () => {
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroModalidad, setFiltroModalidad] = useState('');
  const [filtroNivel, setFiltroNivel] = useState('');
  const [filtroRequisitos, setFiltroRequisitos] = useState('');
  const [filtroPrecio, setFiltroPrecio] = useState('');
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cursosData, setCursosData] = useState([]); // Estado para almacenar los cursos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const API_URL = 'http://localhost:3001'; // URL del servidor
  const id = localStorage.getItem('id'); // ID del usuario o empresa

  // Función para cargar los cursos desde la API
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch(`${API_URL}/getcourses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }), // Enviamos el ID en el cuerpo de la solicitud
        });

        if (!response.ok) {
          throw new Error('Error al cargar los cursos');
        }

        const data = await response.json();
        setCursosData(data); // Guardamos los cursos en el estado
        setLoading(false); // Finalizamos la carga
      } catch (err) {
        setError(err.message); // Manejamos el error
        setLoading(false); // Finalizamos la carga incluso si hay un error
      }
    };

    fetchCursos(); // Llamamos a la función al montar el componente
  }, [API_URL, id]); // Dependencias: API_URL e id

  // Filtrar cursos según los filtros aplicados
  const cursosFiltrados = cursosData.filter(curso =>
    curso.titulo.toLowerCase().includes(filtroNombre.toLowerCase()) &&
    (filtroModalidad === '' || curso.modalidad === filtroModalidad) &&
    (filtroNivel === '' || curso.nivel === filtroNivel) &&
    (filtroRequisitos === '' || 
     (filtroRequisitos === 'Sí' ? curso.requisitos !== "Ninguno." : curso.requisitos === "Ninguno.")) &&
    (filtroPrecio === '' || parseFloat(curso.precio.replace('$', '')) <= parseFloat(filtroPrecio))
  );

  // Funciones para abrir y cerrar el popup
  const abrirPopup = (curso) => {
    setCursoSeleccionado(curso);
    setIsOpen(true);
  };

  const cerrarPopup = () => {
    setIsOpen(false);
    setCursoSeleccionado(null);
  };

  // Renderizado condicional mientras se cargan los datos
  if (loading) {
    return (
      <div className="p-6 bg-white text-gray-800">
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-4 shadow-md p-4 rounded-lg bg-blue-100">
          Cargando cursos...
        </h1>
      </div>
    );
  }

  // Renderizado en caso de error
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
      <Filtro 
        setFiltroNombre={setFiltroNombre} 
        setFiltroModalidad={setFiltroModalidad} 
        setFiltroNivel={setFiltroNivel}
        setFiltroRequisitos={setFiltroRequisitos}
        setFiltroPrecio={setFiltroPrecio}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursosFiltrados.map(curso => (
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