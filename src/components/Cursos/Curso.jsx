import React from 'react';

const Curso = ({ curso, onClick }) => {
  return (
    <div 
      className="border p-4 rounded shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer" 
      onClick={onClick}
    >
      <h2 className="font-semibold">{curso.titulo}</h2>
      <p>{curso.descripcion}</p>
      <p className="mt-2"><strong>Nivel:</strong> {curso.nivel}</p>
      <p><strong>Modalidad:</strong> {curso.modalidad}</p>
      <p><strong>Requisitos Previos:</strong> {curso.requisitos}</p>
      <p><strong>Precio:</strong> {curso.precio}</p>
      <p><strong>Dirección:</strong> {curso.direccion}</p>
      
      <button 
        onClick={(e) => { e.stopPropagation(); onClick(); }} 
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Más información
      </button>
    </div>
  );
};

export default Curso;
