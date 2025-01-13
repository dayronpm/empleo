import React from 'react';

const Filtro = ({ setFiltroNombre, setFiltroModalidad, setFiltroNivel, setFiltroRequisitos, setFiltroPrecio }) => {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        onChange={(e) => setFiltroNombre(e.target.value)}
        className="border p-2 rounded w-full sm:w-1/4 md:w-1/5"
      />

      <select
        onChange={(e) => setFiltroModalidad(e.target.value)}
        className="border p-2 rounded w-full sm:w-1/4 md:w-1/5"
      >
        <option value="">Todas las modalidades</option>
        <option value="Online">Online</option>
        <option value="Presencial">Presencial</option>
      </select>

      <select
        onChange={(e) => setFiltroNivel(e.target.value)}
        className="border p-2 rounded w-full sm:w-1/4 md:w-1/5"
      >
        <option value="">Todos los niveles</option>
        <option value="Principiante">Principiante</option>
        <option value="Intermedio">Intermedio</option>
        <option value="Avanzado">Avanzado</option>
      </select>

      <select
        onChange={(e) => setFiltroRequisitos(e.target.value)}
        className="border p-2 rounded w-full sm:w-1/4 md:w-1/5"
      >
        <option value="">Todos los requisitos</option>
        <option value="Sí">Con requisitos previos</option>
        <option value="No">Sin requisitos previos</option>
      </select>

      <input
        type="number"
        placeholder="Filtrar por precio máximo..."
        onChange={(e) => setFiltroPrecio(e.target.value)}
        className="border p-2 rounded w-full sm:w-1/4 md:w-1/5"
      />
    </div>
  );
};

export default Filtro;
