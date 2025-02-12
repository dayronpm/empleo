import React, { useState } from "react";

const ProfessionalInfo = () => {
  // Estados para manejar la información profesional
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [certifications, setCertifications] = useState([]);

  // Función para agregar nueva experiencia laboral
  const addExperience = () => {
    setExperiences([
      ...experiences,
      { id: Date.now(), company: "", position: "", period: "", description: "" },
    ]);
  };

  // Función para editar experiencia laboral
  const editExperience = (id, field, value) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  // Función para eliminar experiencia laboral
  const deleteExperience = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta experiencia?")) {
      setExperiences(experiences.filter((exp) => exp.id !== id));
    }
  };

  // Similar para educación, habilidades, idiomas y certificaciones...

  return (
    <div className="bg-[#e0e8f0] p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Información profesional</h2>

      {/* Experiencia laboral */}
      <div className="space-y-4">
        <h3 className="font-semibold">Experiencia laboral</h3>
        {experiences.length === 0 && (
          <p className="text-gray-500">No hay experiencias laborales registradas.</p>
        )}
        {experiences.map((exp) => (
          <div key={exp.id} className="border p-4 rounded-lg">
            <input
              type="text"
              placeholder="Empresa"
              value={exp.company}
              onChange={(e) => editExperience(exp.id, "company", e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Puesto"
              value={exp.position}
              onChange={(e) => editExperience(exp.id, "position", e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Período"
              value={exp.period}
              onChange={(e) => editExperience(exp.id, "period", e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <textarea
              placeholder="Descripción"
              value={exp.description}
              onChange={(e) => editExperience(exp.id, "description", e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <div className="flex gap-2">
              <button
                onClick={() => deleteExperience(exp.id)}
                className="text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addExperience}
          className="text-blue-500 hover:underline"
        >
          + Agregar experiencia
        </button>
      </div>

      {/* Educación */}
      <div className="space-y-4 mt-6">
        <h3 className="font-semibold">Educación</h3>
        {educations.length === 0 && (
          <p className="text-gray-500">No hay estudios registrados.</p>
        )}
        {educations.map((edu) => (
          <div key={edu.id} className="border p-4 rounded-lg">
            <input
              type="text"
              placeholder="Institución"
              value={edu.institution}
              onChange={(e) => {}}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Título"
              value={edu.title}
              onChange={(e) => {}}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Período"
              value={edu.period}
              onChange={(e) => {}}
              className="w-full p-2 mb-2 border rounded"
            />
            <div className="flex gap-2">
              <button className="text-red-500 hover:underline">Eliminar</button>
            </div>
          </div>
        ))}
        <button className="text-blue-500 hover:underline">+ Agregar estudio</button>
      </div>

      {/* Habilidades */}
      <div className="space-y-4 mt-6">
        <h3 className="font-semibold">Habilidades</h3>
        {skills.length === 0 && (
          <p className="text-gray-500">No hay habilidades registradas.</p>
        )}
        {skills.map((skill) => (
          <div key={skill.id} className="border p-4 rounded-lg">
            <input
              type="text"
              placeholder="Nombre de la habilidad"
              value={skill.name}
              onChange={(e) => {}}
              className="w-full p-2 mb-2 border rounded"
            />
            <select
              value={skill.level}
              onChange={(e) => {}}
              className="w-full p-2 mb-2 border rounded"
            >
              <option value="">Selecciona un nivel</option>
              <option value="Básico">Básico</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
            <div className="flex gap-2">
              <button className="text-red-500 hover:underline">Eliminar</button>
            </div>
          </div>
        ))}
        <button className="text-blue-500 hover:underline">+ Agregar habilidad</button>
      </div>

      {/* Idiomas */}
      <div className="space-y-4 mt-6">
        <h3 className="font-semibold">Idiomas</h3>
        {languages.length === 0 && (
          <p className="text-gray-500">No hay idiomas registrados.</p>
        )}
        {languages.map((lang) => (
          <div key={lang.id} className="border p-4 rounded-lg">
            <input
              type="text"
              placeholder="Idioma"
              value={lang.language}
              onChange={(e) => {}}
              className="w-full p-2 mb-2 border rounded"
            />
            <select
              value={lang.spokenLevel}
              onChange={(e) => {}}
              className="w-full p-2 mb-2 border rounded"
            >
              <option value="">Nivel hablado</option>
              <option value="Básico">Básico</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
              <option value="Nativo">Nativo</option>
            </select>
            <select
              value={lang.writtenLevel}
              onChange={(e) => {}}
              className="w-full p-2 mb-2 border rounded"
            >
              <option value="">Nivel escrito</option>
              <option value="Básico">Básico</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
              <option value="Nativo">Nativo</option>
            </select>
            <div className="flex gap-2">
              <button className="text-red-500 hover:underline">Eliminar</button>
            </div>
          </div>
        ))}
        <button className="text-blue-500 hover:underline">+ Agregar idioma</button>
      </div>

      {/* Certificaciones */}
      <div className="space-y-4 mt-6">
        <h3 className="font-semibold">Certificaciones</h3>
        {certifications.length === 0 && (
          <p className="text-gray-500">No hay certificaciones registradas.</p>
        )}
        {certifications.map((cert) => (
          <div key={cert.id} className="border p-4 rounded-lg">
            <input
              type="text"
              placeholder="Nombre de la certificación"
              value={cert.name}
              onChange={(e) => {}}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Institución"
              value={cert.institution}
              onChange={(e) => {}}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Año"
              value={cert.year}
              onChange={(e) => {}}
              className="w-full p-2 mb-2 border rounded"
            />
            <div className="flex gap-2">
              <button className="text-red-500 hover:underline">Eliminar</button>
            </div>
          </div>
        ))}
        <button className="text-blue-500 hover:underline">+ Agregar certificación</button>
      </div>
    </div>
  );
};

export default ProfessionalInfo;