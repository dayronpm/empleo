import React, { useState } from 'react';
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

  const cursosData = [
    {
      id: 1,
      titulo: 'Curso de React',
      descripcion: 'Aprende a construir aplicaciones web con React.',
      nivel: 'Intermedio',
      requisitos: 'Conocimientos básicos de JavaScript.',
      modalidad: 'Online',
      descripcionCompleta: 'En este curso aprenderás desde los fundamentos de React hasta la creación de aplicaciones completas utilizando hooks y context API.',
      direccion: 'www.ejemplo.com/curso-react',
      precio: '$200'
    },
    {
      id: 2,
      titulo: 'Curso de Python',
      descripcion: 'Introducción a la programación con Python.',
      nivel: 'Principiante',
      requisitos: 'Ninguno.',
      modalidad: 'Presencial',
      descripcionCompleta: 'Este curso cubre desde los conceptos básicos hasta estructuras de datos avanzadas en Python.',
      direccion: 'Calle Ejemplo, Ciudad',
      precio: '$150'
    },
    {
      id: 3,
      titulo: 'Curso de JavaScript Avanzado',
      descripcion: 'Profundiza en JavaScript y sus frameworks.',
      nivel: 'Avanzado',
      requisitos: 'Conocimientos intermedios de JavaScript.',
      modalidad: 'Online',
      descripcionCompleta: 'Aprende sobre ES6, Promesas, Async/Await y frameworks como Angular y Vue.js.',
      direccion: 'www.ejemplo.com/curso-js-avanzado',
      precio: '$250'
    },
    {
      id: 4,
      titulo: 'Curso de Diseño UX/UI',
      descripcion: 'Aprende los principios del diseño centrado en el usuario.',
      nivel: 'Intermedio',
      requisitos: 'Ninguno.',
      modalidad: 'Presencial',
      descripcionCompleta: 'Este curso te enseñará a crear interfaces intuitivas y atractivas para tus usuarios.',
      direccion: 'Calle Diseño, Ciudad',
      precio: '$180'
    },
    {
      id: 5,
      titulo: 'Curso de Desarrollo Web Full Stack',
      descripcion: 'Desde el front-end hasta el back-end.',
      nivel: 'Avanzado',
      requisitos: 'Conocimientos básicos de HTML y CSS.',
      modalidad: 'Online',
      descripcionCompleta: 'Aprende a desarrollar aplicaciones web completas utilizando tecnologías como Node.js y MongoDB.',
      direccion: 'www.ejemplo.com/curso-fullstack',
      precio: '$300'
    },
    {
      id: 6,
      titulo: 'Curso de Marketing Digital',
      descripcion: 'Estrategias para el marketing en línea.',
      nivel: 'Principiante',
      requisitos: 'Ninguno.',
      modalidad: 'Presencial',
      descripcionCompleta: 'Descubre cómo utilizar herramientas digitales para mejorar la visibilidad de tu negocio.',
      direccion: 'Calle Marketing, Ciudad',
      precio: '$120'
    },
    {
      id: 7,
      titulo: 'Curso de Data Science con Python',
      descripcion: 'Análisis y visualización de datos.',
      nivel: 'Intermedio',
      requisitos: 'Conocimientos básicos de Python.',
      modalidad: 'Online',
      descripcionCompleta: 'Aprende a analizar datos utilizando bibliotecas como Pandas y Matplotlib.',
      direccion: 'www.ejemplo.com/curso-data-science',
      precio: '$220'
    },
    {
        id : 8,
        titulo : "Curso de Fotografía Digital",
        descripcion : "Mejora tus habilidades fotográficas.",
        nivel : "Principiante",
        requisitos : "Ninguno.",
        modalidad : "Presencial",
        descripcionCompleta : "Este curso te enseñará técnicas básicas y avanzadas para capturar imágenes impresionantes.",
        direccion : "Calle Fotografía, Ciudad",
        precio : "$130"
    },
    {
        id : 9,
        titulo : "Curso de Excel Avanzado",
        descripcion : "Domina las funciones avanzadas de Excel.",
        nivel : "Intermedio",
        requisitos : "Conocimientos básicos de Excel.",
        modalidad : "Online",
        descripcionCompleta : "Aprenderás a utilizar tablas dinámicas, macros y funciones avanzadas.",
        direccion : "www.ejemplo.com/curso-excel-avanzado",
        precio : "$175"
     },
     {
        id : 10,
        titulo : "Curso de Seguridad Informática",
        descripcion : "Fundamentos de la ciberseguridad.",
        nivel : "Avanzado",
        requisitos : "Conocimientos básicos de redes.",
        modalidad : "Presencial",
        descripcionCompleta : "Descubre cómo proteger sistemas informáticos contra amenazas cibernéticas.",
        direccion : "Calle Seguridad, Ciudad",
        precio : "$250"
     }
  ];

  const cursosFiltrados = cursosData.filter(curso =>
    curso.titulo.toLowerCase().includes(filtroNombre.toLowerCase()) &&
    (filtroModalidad === '' || curso.modalidad === filtroModalidad) &&
    (filtroNivel === '' || curso.nivel === filtroNivel) &&
    (filtroRequisitos === '' || (filtroRequisitos === 'Sí' ? curso.requisitos !== "Ninguno." : curso.requisitos === "Ninguno.")) &&
    (filtroPrecio === '' || curso.precio.replace('$', '') <= filtroPrecio)
  );

  const abrirPopup = (curso) => {
    setCursoSeleccionado(curso);
    setIsOpen(true);
  };

  const cerrarPopup = () => {
    setIsOpen(false);
    setCursoSeleccionado(null);
  };

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

        {isOpen && (
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
