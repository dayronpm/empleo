import React from "react";

const ExperienciaLaboral = ({ experience, handleExperienceChange, removeExperience, addExperience }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mt-6 mb-2">Experiencia Laboral</h2>
      {experience.length === 0 ? (
        <p>No hay experiencias laborales registradas.</p>
      ) : (
        experience.map((exp, index) => (
          <div key={index} className="border p-4 mb-4 rounded">
            {/* Campo Cargo */}
            <label htmlFor={`jobTitle-${index}`} className="block text-black font-medium mb-2">
              Cargo
            </label>
            <input
              id={`jobTitle-${index}`}
              type="text"
              name="jobTitle"
              placeholder="Ejemplo: Desarrollador de Software"
              value={exp.jobTitle}
              onChange={(e) => handleExperienceChange(index, e)}
              className="w-full p-2 border rounded mb-2"
            />
            {/* Campo Empresa */}
            <label htmlFor={`company-${index}`} className="block text-black font-medium mb-2">
              Empresa
            </label>
            <input
              id={`company-${index}`}
              type="text"
              name="company"
              placeholder="Ejemplo: Tech Solutions S.A."
              value={exp.company}
              onChange={(e) => handleExperienceChange(index, e)}
              className="w-full p-2 border rounded mb-2"
            />
            {/* Campo Fechas */}
            <label htmlFor={`dates-${index}`} className="block text-black font-medium mb-2">
              Fechas
            </label>
            <input
              id={`dates-${index}`}
              type="text"
              name="dates"
              placeholder="Ejemplo: 2020 - 2021"
              value={exp.dates}
              onChange={(e) => handleExperienceChange(index, e)}
              className="w-full p-2 border rounded mb-2"
            />
            {/* Campo Responsabilidades */}
            <label htmlFor={`responsibilities-${index}`} className="block text-black font-medium mb-2">
              Responsabilidades
            </label>
            <textarea
              id={`responsibilities-${index}`}
              name="responsibilities"
              placeholder="Ejemplo: Desarrollo de aplicaciones web, mantenimiento de sistemas, etc."
              value={exp.responsibilities}
              onChange={(e) => handleExperienceChange(index, e)}
              className="w-full p-2 border rounded mb-2"
            />
            {/* Botón Eliminar */}
            <button
              onClick={() => removeExperience(index)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Eliminar Experiencia
            </button>
          </div>
        ))
      )}
      {/* Botón Agregar Experiencia */}
      <button
        onClick={addExperience}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Agregar Experiencia
      </button>
    </div>
  );
};

export default ExperienciaLaboral;