import React from 'react';

const Filters = ({ onFilterChange }) => {
    return (
        <div className="flex space-x-4 mb-4 md:mb-0">

            {/* Filtro por categoria */}
            <select name="categoria" onChange={onFilterChange} className="border border-gray-300 rounded-lg p-2">
                <option value="">Categoría</option>
                <option value="Tiempo completo">Tiempo Completo</option>
                <option value="Medio tiempo">Medio Tiempo</option>
                <option value="Freelance">Freelance</option>
            </select>

            {/* Filtro por ubicación */}
            <select name="location" onChange={onFilterChange} className="border border-gray-300 rounded-lg p-2">
                <option value="">Ubicación</option>
                <option value="madrid">Madrid</option>
                <option value="barcelona">Barcelona</option>
                <option value="valencia">Valencia</option>
                <option value="sevilla">Sevilla</option>
                <option value="bilbao">Bilbao</option>
            </select>

            {/* Filtro por experiencia */}
            <select name="experiencia" onChange={onFilterChange} className="border border-gray-300 rounded-lg p-2">
                <option value="">Nivel de Experiencia</option>
                <option value="Junior">Junior</option>
                <option value="Medio">Medio</option>
                <option value="Senior">Senior</option>
            </select>
        </div>
    );
};

export default Filters;
