import React from 'react';

const Filters = ({ onFilterChange }) => {
    return (
        <div className="flex space-x-4 mb-4 md:mb-0">
            <select name="category" onChange={onFilterChange} className="border border-gray-300 rounded-lg p-2">
                <option value="">Categoría</option>
                <option value="full-time">Tiempo Completo</option>
                <option value="part-time">Medio Tiempo</option>
                <option value="freelance">Freelance</option>
            </select>
            <select name="location" onChange={onFilterChange} className="border border-gray-300 rounded-lg p-2">
                <option value="">Ubicación</option>
                <option value="madrid">Madrid</option>
                <option value="barcelona">Barcelona</option>
                <option value="valencia">Valencia</option>
                <option value="sevilla">Sevilla</option>
                <option value="bilbao">Bilbao</option>
            </select>
            <select name="experienceLevel" onChange={onFilterChange} className="border border-gray-300 rounded-lg p-2">
                <option value="">Nivel de Experiencia</option>
                <option value="junior">Junior</option>
                <option value="mid">Medio</option>
                <option value="senior">Senior</option>
            </select>
        </div>
    );
};

export default Filters;
