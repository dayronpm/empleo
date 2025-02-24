import React from 'react';
import { languagesList, technicalSkillsList } from '../Perfil/data';

// Función auxiliar para crear un input personalizado básico
const createBasicCustomInput = (isEditing) => (value, onChange) => 
  isEditing ? (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
    />
  ) : (
    <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
      <span className="font-semibold text-gray-900">{value || "No especificado"}</span>
    </div>
  );

// Función auxiliar para crear un textarea personalizado
const createCustomTextarea = (isEditing) => (value, onChange) =>
  isEditing ? (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
    />
  ) : (
    <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
      <span className="text-gray-700">{value || "Sin descripción"}</span>
    </div>
  );

// Función auxiliar para crear un input de fecha personalizado
const createDateInput = (isEditing) => (value, onChange) =>
  isEditing ? (
    <input
      type="date"
      value={value ? value.toISOString().split("T")[0] : ""}
      onChange={(e) => onChange(new Date(e.target.value))}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
    />
  ) : (
    <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
      <span className="font-medium text-gray-800">{value ? value.toLocaleDateString() : "Actualidad"}</span>
    </div>
  );

// Configuraciones para cada sección
export const getSectionConfigs = (isEditing) => ({
  certifications: {
    title: "Certificaciones",
    defaultItem: {
      name: "",
      institution: "",
      year: new Date().getFullYear(),
    },
    fields: [
      {
        label: "Nombre de la certificación",
        key: "name",
        customInput: createBasicCustomInput(isEditing)
      },
      {
        label: "Institución",
        key: "institution", 
        customInput: createBasicCustomInput(isEditing)
      },
      {
        label: "Año",
        key: "year",
        customInput: (value, onChange) => 
          isEditing ? (
            <select
              value={value || new Date().getFullYear()}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              {Array.from({ length: new Date().getFullYear() - 1949 }, (_, i) => 1950 + i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          ) : (
            <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
              <span className="font-medium text-gray-800">{value || "No especificado"}</span>
            </div>
          )
      }
    ]
  },

  education: {
    title: "Educación",
    defaultItem: {
      institution: "",
      degree: "",
      startDate: new Date(),
      endDate: null,
      details: "",
    },
    fields: [
      {
        label: "Nombre de la institución educativa",
        key: "institution",
        customInput: createBasicCustomInput(isEditing)
      },
      {
        label: "Título obtenido o en curso",
        key: "degree",
        customInput: createBasicCustomInput(isEditing)
      },
      {
        label: "Fecha de Inicio",
        key: "startDate",
        customInput: createDateInput(isEditing)
      },
      {
        label: "Fecha de Fin",
        key: "endDate",
        customInput: createDateInput(isEditing)
      },
      {
        label: "Detalles adicionales",
        key: "details",
        customInput: createCustomTextarea(isEditing)
      }
    ]
  },

  experience: {
    title: "Experiencia Laboral",
    defaultItem: {
      company: "",
      position: "",
      startDate: new Date(),
      endDate: null,
      description: "",
    },
    fields: [
      {
        label: "Nombre de la empresa",
        key: "company",
        customInput: createBasicCustomInput(isEditing)
      },
      {
        label: "Cargo o puesto que ocupaste",
        key: "position",
        customInput: createBasicCustomInput(isEditing)
      },
      {
        label: "Fecha de Inicio",
        key: "startDate",
        customInput: createDateInput(isEditing)
      },
      {
        label: "Fecha de Fin",
        key: "endDate",
        customInput: createDateInput(isEditing)
      },
      {
        label: "Descripción de tus responsabilidades y logros",
        key: "description",
        customInput: createCustomTextarea(isEditing)
      }
    ]
  },

  languages: {
    title: "Idiomas",
    defaultItem: {
      language: "",
      spokenLevel: "",
    },
    fields: [
      {
        label: "Idioma",
        key: "language",
        customInput: (value, onChange, items = []) => {
          const selectedLanguages = items.map(item => item.language);
          const availableLanguages = languagesList.filter(lang => !selectedLanguages.includes(lang) || lang === value);
          
          return isEditing ? (
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Seleccione un idioma</option>
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          ) : (
            <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
              <span className="font-semibold text-gray-900">{value || "No especificado"}</span>
            </div>
          );
        }
      },
      {
        label: "Nivel",
        key: "spokenLevel",
        customInput: (value, onChange) =>
          isEditing ? (
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Seleccione un nivel</option>
              {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          ) : (
            <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
              <span className="font-medium text-gray-800">{value || "No especificado"}</span>
            </div>
          )
      }
    ]
  },

  skills: {
    title: "Habilidades",
    defaultItem: {
      name: "",
      level: "",
    },
    fields: [
      {
        label: "Nombre de la habilidad",
        key: "name",
        customInput: (value, onChange, items = []) => {
          const selectedSkills = items.map(item => item.name);
          const availableSkills = technicalSkillsList.filter(skill => !selectedSkills.includes(skill) || skill === value);
          
          return isEditing ? (
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Seleccione una habilidad</option>
              {availableSkills.map((skill) => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          ) : (
            <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
              <span className="font-semibold text-gray-900">{value || "No especificado"}</span>
            </div>
          );
        }
      },
      {
        label: "Nivel",
        key: "level",
        customInput: (value, onChange) =>
          isEditing ? (
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Seleccione un nivel</option>
              {["Básico", "Intermedio", "Avanzado"].map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          ) : (
            <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
              <span className="font-medium text-gray-800">{value || "No especificado"}</span>
            </div>
          )
      }
    ]
  },

  projects: {
    title: "Proyectos",
    defaultItem: {
      name: "",
      startDate: new Date(),
      endDate: null,
      description: "",
    },
    fields: [
      {
        label: "Nombre del proyecto",
        key: "name",
        customInput: createBasicCustomInput(isEditing)
      },
      {
        label: "Fecha de inicio",
        key: "startDate",
        customInput: createDateInput(isEditing)
      },
      {
        label: "Fecha de fin",
        key: "endDate",
        customInput: createDateInput(isEditing)
      },
      {
        label: "Descripción",
        key: "description",
        customInput: createCustomTextarea(isEditing)
      }
    ]
  }
}); 