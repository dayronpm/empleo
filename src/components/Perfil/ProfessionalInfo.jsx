import React, { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import SummarySection from "./SummarySection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import LanguagesSection from "./LanguagesSection";
import CertificationsSection from "./CertificationsSection";
import { confirmationModalConfig } from "../helpers/ModalConfigurations";
import GenericModal from "../generics/GenericModal";

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
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false); // Estado para el modal de advertencia

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

  const validateLanguages = () => {
    return languages.every((lang) => lang.language.trim() !== "");
  };

  const validateSkills = () => {
    return skills.every((skill) => skill.name.trim() !== "");
  };

  const validateEducation = () => {
    return educations.some(
      (edu) =>
        edu.institution.trim() !== "" ||
        edu.degree.trim() !== "" ||
        edu.details.trim() !== ""
    );
  };

  const validateExperience = () => {
    return experiences.some(
      (exp) =>
        exp.company.trim() !== "" ||
        exp.position.trim() !== "" ||
        exp.description.trim() !== ""
    );
  };

  const saveChanges = () => {
    if (activeSection === "languages" && !validateLanguages()) {
      setIsWarningModalOpen(true); // Abre el modal de advertencia para idiomas
      return;
    }
    if (activeSection === "skills" && !validateSkills()) {
      setIsWarningModalOpen(true); // Abre el modal de advertencia para habilidades
      return;
    }
    if (activeSection === "education" && !validateEducation()) {
      setIsWarningModalOpen(true); // Abre el modal de advertencia para educación
      return;
    }
    if (activeSection === "experience" && !validateExperience()) {
      setIsWarningModalOpen(true); // Abre el modal de advertencia para experiencia laboral
      return;
    }
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

  const closeWarningModal = () => {
    setIsWarningModalOpen(false); // Cierra el modal de advertencia
  };

  return (
    <div className="bg-[#e0e8f0] p-6 rounded-lg shadow-md mb-6 relative">
      {/* Título y Dropdown alineados horizontalmente */}
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-xl font-bold">Información profesional</h1>
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
      </div>

      {/* Contenido dinámico según la sección activa */}
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

      {/* Botones de edición */}
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
      {isEditing && activeSection === "summary" && (
        <div className="flex justify-start space-x-2 mt-4">
          {/* Botón Cancelar Edición visible solo si el campo está vacío */}
          {summary.trim() === "" && (
            <button
              onClick={cancelChanges}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 flex items-center gap-1"
            >
              Cancelar
            </button>
          )}
          {/* Botones Aceptar y Cancelar visibles solo si hay texto en el resumen */}
          {summary.trim() !== "" && (
            <>
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
            </>
          )}
        </div>
      )}
      {isEditing && activeSection !== "summary" && (
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

      {/* Modal de confirmación */}
      <GenericModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={confirmDelete}
        {...confirmationModalConfig(deleteAction ? "¿Está seguro de que desea realizar esta acción?" : "")}
      />

      {/* Modal de advertencia */}
      <GenericModal
        isOpen={isWarningModalOpen}
        onClose={closeWarningModal}
        onSubmit={closeWarningModal} // Solo cierra el modal, no realiza ninguna acción adicional
        {...confirmationModalConfig(
          activeSection === "languages"
            ? "Por favor, selecciona un idioma válido para cada entrada."
            : activeSection === "skills"
            ? "Por favor, selecciona una habilidad válida para cada entrada."
            : activeSection === "education"
            ? "Por favor, completa al menos un campo."
            : "Por favor, completa al menos un campo."
        )}
      />
    </div>
  );
};

export default ProfessionalInfo;