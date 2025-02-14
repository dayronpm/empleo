import React, { useState } from "react";
import SummarySection from "./SummarySection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import LanguagesSection from "./LanguagesSection";
import CertificationsSection from "./CertificationsSection";

const ProfessionalInfo = () => {
  const [activeSection, setActiveSection] = useState("summary");
  const [isEditing, setIsEditing] = useState(false);
  const [summary, setSummary] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [certifications, setCertifications] = useState([]);

  const addItem = (state, setState, newItem) => {
    setState([...state, { id: Date.now(), ...newItem }]);
  };

  const editItem = (state, setState, id, field, value) => {
    setState(state.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const deleteItem = (state, setState, id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
      setState(state.filter((item) => item.id !== id));
    }
  };

  const saveChanges = () => setIsEditing(false);
  const cancelChanges = () => setIsEditing(false);

  return (
    <div className="bg-[#e0e8f0] p-6 rounded-lg shadow-md mb-6">
      <h1 className="text-xl font-bold mb-4">Información profesional</h1>
      {/* Dropdown para seleccionar la sección */}
      <select
        value={activeSection}
        onChange={(e) => setActiveSection(e.target.value)}
        className="p-2 border rounded bg-white"
      >
        <option value="summary">Resumen Profesional</option>
        <option value="experience">Experiencia Laboral</option>
        <option value="education">Educación</option>
        <option value="skills">Habilidades</option>
        <option value="languages">Idiomas</option>
        <option value="certifications">Certificaciones</option>
      </select>

      {/* Botón de edición */}
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-500 hover:underline block mt-4"
        >
          Editar
        </button>
      )}

      {/* Renderizar la sección activa */}
      {activeSection === "summary" && (
        <SummarySection summary={summary} setSummary={setSummary} isEditing={isEditing} />
      )}
      {activeSection === "experience" && (
        <ExperienceSection
          experiences={experiences}
          setExperiences={setExperiences}
          addItem={addItem}
          editItem={editItem}
          deleteItem={deleteItem}
          isEditing={isEditing}
        />
      )}
      {activeSection === "education" && (
        <EducationSection
          educations={educations}
          setEducations={setEducations}
          addItem={addItem}
          editItem={editItem}
          deleteItem={deleteItem}
          isEditing={isEditing}
        />
      )}
      {activeSection === "skills" && (
        <SkillsSection
          skills={skills}
          setSkills={setSkills}
          addItem={addItem}
          editItem={editItem}
          deleteItem={deleteItem}
          isEditing={isEditing}
        />
      )}
      {activeSection === "languages" && (
        <LanguagesSection
          languages={languages}
          setLanguages={setLanguages}
          addItem={addItem}
          editItem={editItem}
          deleteItem={deleteItem}
          isEditing={isEditing}
        />
      )}
      {activeSection === "certifications" && (
        <CertificationsSection
          certifications={certifications}
          setCertifications={setCertifications}
          addItem={addItem}
          editItem={editItem}
          deleteItem={deleteItem}
          isEditing={isEditing}
        />
      )}

      {/* Botones Aceptar y Cancelar */}
      {isEditing && (
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Aceptar
          </button>
          <button
            onClick={cancelChanges}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfessionalInfo;