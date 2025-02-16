import React, { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import SummarySection from "./SummarySection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import LanguagesSection from "./LanguagesSection";
import CertificationsSection from "./CertificationsSection";
import ConfirmationModal from "./ConfirmationModal";

const ProfessionalInfo = () => {
  const [activeSection, setActiveSection] = useState("summary");
  const [isEditing, setIsEditing] = useState(false);
  const [summary, setSummary] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [originalState, setOriginalState] = useState({
    summary: "",
    experiences: [],
    educations: [],
    skills: [],
    languages: [],
    certifications: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAction, setDeleteAction] = useState(null);

  const addItem = (state, setState, newItem) => {
    setState([...state, { id: Date.now(), ...newItem }]);
  };

  const editItem = (state, setState, id, field, value) => {
    setState(state.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const deleteItem = (state, setState, id) => {
    setState(state.filter((item) => item.id !== id));
  };

  const startEditing = () => {
    setOriginalState({
      summary,
      experiences,
      educations,
      skills,
      languages,
      certifications,
    });
    setIsEditing(true);
  };

  const saveChanges = () => {
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setSummary(originalState.summary);
    setExperiences(originalState.experiences);
    setEducations(originalState.educations);
    setSkills(originalState.skills);
    setLanguages(originalState.languages);
    setCertifications(originalState.certifications);
    setIsEditing(false);
  };

  const hasChanges = () => {
    switch (activeSection) {
      case "summary":
        return summary.trim() !== "";
      case "experience":
        return experiences.length > 0;
      case "education":
        return educations.length > 0;
      case "skills":
        return skills.length > 0;
      case "languages":
        return languages.length > 0;
      case "certifications":
        return certifications.length > 0;
      default:
        return false;
    }
  };

  const openModal = (action) => {
    setDeleteAction(() => action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setDeleteAction(null);
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteAction) {
      deleteAction();
    }
    closeModal();
  };

  return (
    <div className="bg-[#e0e8f0] p-6 rounded-lg shadow-md mb-6 relative">
      <h1 className="text-xl font-bold mb-4">Información profesional</h1>
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

      {!isEditing && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={startEditing}
            className="flex items-center gap-1 text-blue-500 hover:underline"
          >
            <BsPencilSquare size={16} />
            Editar
          </button>
          {activeSection === "summary" && summary.trim() !== "" && (
            <button
              onClick={() => openModal(() => setSummary(""))}
              className="flex items-center gap-1 text-red-500 hover:underline"
            >
              <BsTrash size={16} />
              Eliminar
            </button>
          )}
        </div>
      )}

      {isEditing && hasChanges() && (
        <div className="flex justify-start space-x-2 mt-4">
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
          >
            Aceptar
          </button>
          <button
            onClick={cancelChanges}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 flex items-center gap-1"
          >
            Cancelar
          </button>
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        message="¿Estás seguro de que deseas eliminar este elemento?"
      />
    </div>
  );
};

export default ProfessionalInfo;
