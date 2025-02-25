import React, { useState, useEffect } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import SummarySection from "./SummarySection";
import Section from "../generics/Section";
import { getSectionConfigs } from "../helpers/SectionConfigurations";
import { confirmationModalConfig } from "../helpers/ModalConfigurations";
import GenericModal from "../generics/GenericModal";
import { toast } from 'react-toastify';
import useCurriculum from "./useCurriculum";

const ProfessionalInfo = () => {
  const [activeSection, setActiveSection] = useState("summary");
  const [projects, setProjects] = useState([]);
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
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const { saveLanguages, saveSkills } = useCurriculum();

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

  const validateProjects = () => {
    return projects.every((project) => 
      project.name.trim() !== "" &&
      project.startDate &&
      project.description.trim() !== ""
    );
  };

  const saveChanges = async () => {
    if (activeSection === "languages" && !validateLanguages()) {
      setIsWarningModalOpen(true);
      return;
    }
    if (activeSection === "skills" && !validateSkills()) {
      setIsWarningModalOpen(true);
      return;
    }
    if (activeSection === "education" && !validateEducation()) {
      setIsWarningModalOpen(true);
      return;
    }
    if (activeSection === "experience" && !validateExperience()) {
      setIsWarningModalOpen(true);
      return;
    }
    if (activeSection === "projects" && !validateProjects()) {
      setIsWarningModalOpen(true);
      return;
    }
    
    try {
      if (activeSection === "languages") {
        console.log('Estado actual de languages:', languages);
        
        const formattedLanguages = languages.map(lang => ({
          language: lang.language,
          level: lang.spokenLevel
        }));
        
        console.log('Idiomas formateados:', formattedLanguages);
        
        await saveLanguages(formattedLanguages);
        toast.success('Idiomas guardados correctamente');
      }
      else if (activeSection === "skills") {
        console.log('Estado actual de skills:', skills);
        const formattedSkills = skills.map(skill => ({
          name: skill.name,
          level: skill.level
        }));
        console.log('Habilidades formateadas:', formattedSkills);
        await saveSkills(formattedSkills);
        toast.success('Habilidades guardadas correctamente');
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar:', error);
      toast.error('Error al guardar los cambios');
    }
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
      case "projects":
        return projects.length > 0;
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
    setIsWarningModalOpen(false);
  };

  const sectionConfigs = getSectionConfigs(isEditing);

  // Objeto para mapear los nombres de las secciones a sus variables de estado
  const sectionStateMap = {
    experience: experiences,
    education: educations,
    skills: skills,
    languages: languages,
    certifications: certifications,
    projects: projects
  };

  // Objeto para mapear los nombres de las secciones a sus funciones setState
  const sectionSetStateMap = {
    experience: setExperiences,
    education: setEducations,
    skills: setSkills,
    languages: setLanguages,
    certifications: setCertifications,
    projects: setProjects
  };

  // Función para cargar los datos del usuario
  const loadUserData = async () => {
    try {
      const userId = localStorage.getItem('id');
      const response = await fetch('http://localhost:3001/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId })
      });

      if (!response.ok) {
        throw new Error('Error al cargar los datos del usuario');
      }

      const userData = await response.json();
      
      // Cargar idiomas
      if (userData.idiomas) {
        try {
          const parsedLanguages = JSON.parse(userData.idiomas);
          const formattedLanguages = parsedLanguages.map(lang => ({
            id: Date.now() + Math.random(),
            language: lang.language,
            spokenLevel: lang.level
          }));
          
          setLanguages(formattedLanguages);
          setOriginalState(prev => ({
            ...prev,
            languages: formattedLanguages
          }));
        } catch (e) {
          console.error('Error al parsear los idiomas:', e);
        }
      }

      // Cargar habilidades
      if (userData.habilidades) {
        try {
          const parsedSkills = JSON.parse(userData.habilidades);
          const formattedSkills = parsedSkills.map(skill => ({
            id: Date.now() + Math.random(),
            name: skill.name,
            level: skill.level
          }));
          
          setSkills(formattedSkills);
          setOriginalState(prev => ({
            ...prev,
            skills: formattedSkills
          }));
        } catch (e) {
          console.error('Error al parsear las habilidades:', e);
        }
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      toast.error('Error al cargar los datos del usuario');
    }
  };

  // Cargar datos cuando el componente se monta
  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <div className="bg-[#e0e8f0] p-6 rounded-lg shadow-md mb-6 relative">
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
          <option value="projects">Proyectos</option>
        </select>
      </div>

      {activeSection === "summary" && (
        <SummarySection summary={summary} setSummary={setSummary} isEditing={isEditing} />
      )}
      
      {activeSection !== "summary" && sectionConfigs[activeSection] && (
        <Section
          {...sectionConfigs[activeSection]}
          items={sectionStateMap[activeSection]}
          onAdd={() => addItem(
            sectionStateMap[activeSection],
            sectionSetStateMap[activeSection],
            sectionConfigs[activeSection].defaultItem
          )}
          onEdit={(id, field, value) => editItem(
            sectionStateMap[activeSection],
            sectionSetStateMap[activeSection],
            id,
            field,
            value
          )}
          onDelete={(id) => deleteItem(
            sectionStateMap[activeSection],
            sectionSetStateMap[activeSection],
            id
          )}
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
      {isEditing && activeSection === "summary" && (
        <div className="flex justify-start space-x-2 mt-4">
          {summary.trim() === "" && (
            <button
              onClick={cancelChanges}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 flex items-center gap-1"
            >
              Cancelar
            </button>
          )}
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

      <GenericModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={confirmDelete}
        {...confirmationModalConfig(deleteAction ? "¿Está seguro de que desea realizar esta acción?" : "")}
      />

      <GenericModal
        isOpen={isWarningModalOpen}
        onClose={closeWarningModal}
        onSubmit={closeWarningModal}
        {...confirmationModalConfig(
          activeSection === "languages"
            ? "Por favor, selecciona un idioma válido para cada entrada."
            : activeSection === "skills"
            ? "Por favor, selecciona una habilidad válida para cada entrada."
            : activeSection === "education"
            ? "Por favor, completa al menos un campo."
            : activeSection === "experience"
            ? "Por favor, completa al menos un campo."
            : activeSection === "projects"
            ? "Por favor, completa todos los campos."
            : "Por favor, completa al menos un campo."
        )}
      />
    </div>
  );
};

export default ProfessionalInfo;