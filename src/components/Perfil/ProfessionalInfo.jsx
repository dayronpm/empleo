import React, { useState, useEffect } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import SummarySection from "./SummarySection";
import Section from "../generics/Section";
import { getSectionConfigs } from "../helpers/SectionConfigurations";
import { confirmationModalConfig, unsavedChangesModalConfig } from "../helpers/ModalConfigurations";
import GenericModal from "../generics/GenericModal";
import { toast } from 'react-toastify';
import useCurriculum from "./useCurriculum";
import NotificationPopup from "../generics/NotificationPopup";

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
  const [pendingSection, setPendingSection] = useState(null);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const { saveLanguages, saveSkills, saveSummary, saveExperience, saveEducation, saveCertifications, saveProjects } = useCurriculum();
  const [notification, setNotification] = useState({
    isOpen: false,
    message: "",
    type: "info"
  });

  const addItem = (state, setState, newItem) => {
    // Validar duplicados según el tipo de elemento
    let isDuplicate = false;
    let duplicateMessage = '';

    switch(activeSection) {
      case 'education':
        isDuplicate = !validateDuplicateEducation(newItem);
        duplicateMessage = 'Ya existe esta titulación para esta institución';
        break;
      case 'experience':
        isDuplicate = !validateDuplicateExperience(newItem);
        duplicateMessage = 'Ya existe este cargo para esta empresa';
        break;
      case 'skills':
        isDuplicate = !validateDuplicateSkill(newItem);
        duplicateMessage = 'Esta habilidad ya está registrada';
        break;
      case 'languages':
        isDuplicate = !validateDuplicateLanguage(newItem);
        duplicateMessage = 'Este idioma ya está registrado';
        break;
      case 'certifications':
        isDuplicate = !validateDuplicateCertification(newItem);
        duplicateMessage = 'Ya existe esta certificación para esta institución';
        break;
    }

    if (isDuplicate) {
      showNotification(duplicateMessage, 'error');
      return;
    }

    setState([...state, { id: Date.now(), ...newItem }]);
  };

  const editItem = (state, setState, id, field, value) => {
    // Validar fechas como antes
    if ((activeSection === "experience" || activeSection === "education") && 
        (field === "startDate" || field === "endDate")) {
      const item = state.find(item => item.id === id);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (value && new Date(value) > today) {
        showNotification('La fecha no puede ser posterior a la fecha actual', 'error');
        return;
      }

      if (field === "endDate" && value) {
        const startDate = item.startDate;
        if (startDate && new Date(value) < new Date(startDate)) {
          showNotification('La fecha de fin no puede ser anterior a la fecha de inicio', 'error');
          return;
        }
      }
      
      if (field === "startDate" && value) {
        const endDate = item.endDate;
        if (endDate && new Date(endDate) < new Date(value)) {
          showNotification('La fecha de inicio no puede ser posterior a la fecha de fin', 'error');
          return;
        }
      }
    }

    // Crear el item actualizado
    const updatedItem = state.find(item => item.id === id);
    const newItem = { ...updatedItem, [field]: value };

    // Validar duplicados según el tipo de elemento
    let isDuplicate = false;
    let duplicateMessage = '';

    switch(activeSection) {
      case 'education':
        if (field === 'institution' || field === 'degree') {
          isDuplicate = !validateDuplicateEducation(newItem);
          duplicateMessage = 'Ya existe esta titulación para esta institución';
        }
        break;
      case 'experience':
        if (field === 'company' || field === 'position') {
          isDuplicate = !validateDuplicateExperience(newItem);
          duplicateMessage = 'Ya existe este cargo para esta empresa';
        }
        break;
      case 'skills':
        if (field === 'name') {
          isDuplicate = !validateDuplicateSkill(newItem);
          duplicateMessage = 'Esta habilidad ya está registrada';
        }
        break;
      case 'languages':
        if (field === 'language') {
          isDuplicate = !validateDuplicateLanguage(newItem);
          duplicateMessage = 'Este idioma ya está registrado';
        }
        break;
      case 'certifications':
        if (field === 'name' || field === 'institution') {
          isDuplicate = !validateDuplicateCertification(newItem);
          duplicateMessage = 'Ya existe esta certificación para esta institución';
        }
        break;
    }

    if (isDuplicate) {
      showNotification(duplicateMessage, 'error');
      return;
    }

    setState(state.map((item) => (item.id === id ? newItem : item)));
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
    if (educations.length === 0) {
      return true;
    }

    return educations.every(
      (edu) =>
        edu.institution.trim() !== "" &&
        edu.degree.trim() !== "" &&
        edu.startDate // Solo estos campos son obligatorios
    );
  };

  const validateExperience = () => {
    if (experiences.length === 0) {
      return true;
    }

    return experiences.every(
      (exp) =>
        exp.company.trim() !== "" &&
        exp.position.trim() !== "" &&
        exp.startDate // Solo estos campos son obligatorios
    );
  };

  const validateExperienceDates = () => {
    return experiences.every((exp) => {
      if (exp.endDate) {
        return new Date(exp.endDate) >= new Date(exp.startDate);
      }
      return true;
    });
  };

  const validateEducationDates = () => {
    return educations.every((edu) => {
      if (edu.endDate) {
        return new Date(edu.endDate) >= new Date(edu.startDate);
      }
      return true;
    });
  };

  const validateProjects = () => {
    if (projects.length === 0) {
      return true;
    }

    return projects.every((project) => 
      project.name.trim() !== "" &&
      project.startDate // Solo estos campos son obligatorios
    );
  };

  const validateCertifications = () => {
    if (certifications.length === 0) {
      return true;
    }

    return certifications.every(
      (cert) =>
        cert.name.trim() !== "" &&
        cert.institution.trim() !== "" &&
        cert.year
    );
  };

  const showNotification = (message, type = "info") => {
    setNotification({
      isOpen: true,
      message,
      type
    });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isOpen: false }));
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
    if (activeSection === "experience") {
      if (!validateExperience()) {
        setIsWarningModalOpen(true);
        return;
      }
      if (!validateExperienceDates()) {
        showNotification('Hay fechas inválidas en la experiencia laboral', 'error');
        return;
      }
    }
    if (activeSection === "projects" && !validateProjects()) {
      setIsWarningModalOpen(true);
      return;
    }
    
    if (activeSection === "education") {
      if (!validateEducationDates()) {
        showNotification('Hay fechas inválidas en la educación', 'error');
        return;
      }
    }
    
    if (activeSection === "certifications" && !validateCertifications()) {
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
      else if (activeSection === "summary") {
        console.log('Guardando resumen:', summary);
        await saveSummary(summary.trim());
        toast.success('Resumen guardado correctamente');
      }
      else if (activeSection === "experience") {
        console.log('Estado actual de experiencia:', experiences);
        const formattedExperience = experiences.map(exp => ({
          company: exp.company.trim(),
          position: exp.position.trim(),
          startDate: exp.startDate,
          endDate: exp.endDate,
          description: exp.description.trim()
        }));
        console.log('Experiencia formateada:', formattedExperience);
        await saveExperience(formattedExperience);
        showNotification('Experiencia guardada correctamente', 'success');
      }
      else if (activeSection === "education") {
        console.log('Estado actual de educación:', educations);
        const formattedEducation = educations.map(edu => ({
          institution: edu.institution.trim(),
          degree: edu.degree.trim(),
          startDate: edu.startDate,
          endDate: edu.endDate,
          details: edu.details ? edu.details.trim() : ""
        }));
        console.log('Educación formateada:', formattedEducation);
        await saveEducation(formattedEducation);
        showNotification('Educación guardada correctamente', 'success');
      }
      else if (activeSection === "certifications") {
        console.log('Estado actual de certificaciones:', certifications);
        const formattedCertifications = certifications.map(cert => ({
          name: cert.name.trim(),
          institution: cert.institution.trim(),
          year: cert.year
        }));
        console.log('Certificaciones formateadas:', formattedCertifications);
        await saveCertifications(formattedCertifications);
        showNotification('Certificaciones guardadas correctamente', 'success');
      }
      else if (activeSection === "projects") {
        console.log('Estado actual de proyectos:', projects);
        const formattedProjects = projects.map(proj => ({
          name: proj.name.trim(),
          startDate: proj.startDate,
          endDate: proj.endDate,
          description: proj.description ? proj.description.trim() : ""
        }));
        console.log('Proyectos formateados:', formattedProjects);
        await saveProjects(formattedProjects);
        showNotification('Proyectos guardados correctamente', 'success');
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar:', error);
      showNotification('Error al guardar los cambios', 'error');
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

  // Función para verificar si hay cambios sin guardar
  const hasUnsavedChanges = () => {
    const currentItems = sectionStateMap[activeSection];
    const originalItems = originalState[activeSection];
    
    if (activeSection === "summary") {
      return summary !== originalState.summary;
    }
    
    // Comparar los arrays de items actuales con los originales
    return JSON.stringify(currentItems) !== JSON.stringify(originalItems);
  };

  // Función para manejar el cambio de sección
  const handleSectionChange = (newSection) => {
    if (isEditing && hasUnsavedChanges()) {
      setPendingSection(newSection);
      setShowUnsavedChangesModal(true);
    } else {
      setActiveSection(newSection);
    }
  };

  // Función para confirmar el cambio de sección sin guardar
  const confirmSectionChange = () => {
    setIsEditing(false);
    setActiveSection(pendingSection);
    setPendingSection(null);
    setShowUnsavedChangesModal(false);
    
    // Revertir los cambios al estado original
    if (activeSection === "summary") {
      setSummary(originalState.summary);
    } else {
      sectionSetStateMap[activeSection](originalState[activeSection]);
    }
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
      
      // Cargar resumen
      if (userData.resumen) {
        try {
          const parsedResumen = JSON.parse(userData.resumen);
          // Si el resumen es un array vacío o no tiene contenido, establecerlo como string vacío
          const resumeContent = Array.isArray(parsedResumen) ? 
            (parsedResumen.length === 0 ? "" : parsedResumen[0]) : // Si es array, tomar el primer elemento o string vacío
            String(parsedResumen); // Si no es array, convertir a string
          
          setSummary(resumeContent || ""); // Asegurar que siempre sea string
          setOriginalState(prev => ({
            ...prev,
            summary: resumeContent || ""
          }));
        } catch (e) {
          console.error('Error al parsear el resumen:', e);
          // Si hay error al parsear, establecer como string vacío
          setSummary("");
          setOriginalState(prev => ({
            ...prev,
            summary: ""
          }));
        }
      }

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

      // Cargar experiencia
      if (userData.experiencia) {
        try {
          const parsedExperience = JSON.parse(userData.experiencia);
          const formattedExperience = parsedExperience.map(exp => ({
            id: Date.now() + Math.random(),
            company: exp.company,
            position: exp.position,
            startDate: new Date(exp.startDate),
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            description: exp.description
          }));
          
          setExperiences(formattedExperience);
          setOriginalState(prev => ({
            ...prev,
            experiences: formattedExperience
          }));
        } catch (e) {
          console.error('Error al parsear la experiencia:', e);
          toast.error('Error al cargar la experiencia laboral');
        }
      }

      // Cargar educación
      if (userData.educacion) {
        try {
          const parsedEducation = JSON.parse(userData.educacion);
          const formattedEducation = parsedEducation.map(edu => ({
            id: Date.now() + Math.random(),
            institution: edu.institution,
            degree: edu.degree,
            startDate: new Date(edu.startDate),
            endDate: edu.endDate ? new Date(edu.endDate) : null,
            details: edu.details || ""
          }));
          
          setEducations(formattedEducation);
          setOriginalState(prev => ({
            ...prev,
            educations: formattedEducation
          }));
        } catch (e) {
          console.error('Error al parsear la educación:', e);
          showNotification('Error al cargar la educación', 'error');
        }
      }

      // Cargar certificaciones
      if (userData.certificaciones) {
        try {
          const parsedCertifications = JSON.parse(userData.certificaciones);
          const formattedCertifications = parsedCertifications.map(cert => ({
            id: Date.now() + Math.random(),
            name: cert.name,
            institution: cert.institution,
            year: cert.year
          }));
          
          setCertifications(formattedCertifications);
          setOriginalState(prev => ({
            ...prev,
            certifications: formattedCertifications
          }));
        } catch (e) {
          console.error('Error al parsear las certificaciones:', e);
          showNotification('Error al cargar las certificaciones', 'error');
        }
      }

      // Cargar proyectos
      if (userData.proyectos) {
        try {
          const parsedProjects = JSON.parse(userData.proyectos);
          const formattedProjects = parsedProjects.map(proj => ({
            id: Date.now() + Math.random(),
            name: proj.name,
            startDate: new Date(proj.startDate),
            endDate: proj.endDate ? new Date(proj.endDate) : null,
            description: proj.description || ""
          }));
          
          setProjects(formattedProjects);
          setOriginalState(prev => ({
            ...prev,
            projects: formattedProjects
          }));
        } catch (e) {
          console.error('Error al parsear los proyectos:', e);
          showNotification('Error al cargar los proyectos', 'error');
        }
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      toast.error('Error al cargar los datos del usuario');
    }
  };

  const deleteSummary = async () => {
    try {
      await saveSummary([]); // Enviar array vacío a la base de datos
      setSummary(""); // Actualizar estado local
      setOriginalState(prev => ({
        ...prev,
        summary: ""
      }));
      toast.success('Resumen eliminado correctamente');
      closeModal();
    } catch (error) {
      console.error('Error al eliminar el resumen:', error);
      toast.error('Error al eliminar el resumen');
    }
  };

  const validateDuplicateEducation = (education) => {
    const duplicates = educations.filter(edu => 
      edu.institution.trim().toLowerCase() === education.institution.trim().toLowerCase() &&
      edu.degree.trim().toLowerCase() === education.degree.trim().toLowerCase() &&
      edu.id !== education.id
    );
    return duplicates.length === 0;
  };

  const validateDuplicateExperience = (experience) => {
    const duplicates = experiences.filter(exp => 
      exp.company.trim().toLowerCase() === experience.company.trim().toLowerCase() &&
      exp.position.trim().toLowerCase() === experience.position.trim().toLowerCase() &&
      exp.id !== experience.id
    );
    return duplicates.length === 0;
  };

  const validateDuplicateSkill = (skill) => {
    const duplicates = skills.filter(s => 
      s.name.trim().toLowerCase() === skill.name.trim().toLowerCase() &&
      s.id !== skill.id
    );
    return duplicates.length === 0;
  };

  const validateDuplicateLanguage = (language) => {
    const duplicates = languages.filter(lang => 
      lang.language.trim().toLowerCase() === language.language.trim().toLowerCase() &&
      lang.id !== language.id
    );
    return duplicates.length === 0;
  };

  const validateDuplicateCertification = (certification) => {
    const duplicates = certifications.filter(cert => 
      cert.name.trim().toLowerCase() === certification.name.trim().toLowerCase() &&
      cert.institution.trim().toLowerCase() === certification.institution.trim().toLowerCase() &&
      cert.id !== certification.id
    );
    return duplicates.length === 0;
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
          onChange={(e) => handleSectionChange(e.target.value)}
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
              onClick={() => openModal(deleteSummary)}
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
            ? "Por favor complete los campos faltantes"
            : activeSection === "experience"
            ? "Por favor complete los campos faltantes"
            : activeSection === "projects"
            ? "Por favor, completa todos los campos."
            : "Por favor, completa al menos un campo."
        )}
      />

      {/* Modal de cambios sin guardar */}
      <GenericModal
        isOpen={showUnsavedChangesModal}
        onClose={() => {
          setShowUnsavedChangesModal(false);
          setPendingSection(null);
        }}
        onSubmit={confirmSectionChange}
        {...unsavedChangesModalConfig}
      />

      <NotificationPopup
        isOpen={notification.isOpen}
        onClose={closeNotification}
        message={notification.message}
        type={notification.type}
      />
    </div>
  );
};

export default ProfessionalInfo;