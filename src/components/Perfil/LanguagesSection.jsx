// Nombre del archivo: LanguagesSection.jsx
// Ruta del archivo: C:/Información/Proyectos/empleo/Frontend/client/src/components/Perfil/LanguagesSection.jsx

import React, { useState } from "react";
import { languagesList } from "./data";
import Section from "./Section";

const LanguagesSection = ({ languages, setLanguages, addItem, editItem, deleteItem, isEditing }) => {
  // Estado temporal para manejar idiomas seleccionados durante la edición
  const [tempLanguages, setTempLanguages] = useState(languages);

  // Filtrar las opciones disponibles en el dropdown usando el estado temporal
  const getAvailableLanguages = () => {
    const selectedLanguages = tempLanguages.map((lang) => lang.language);
    return languagesList.filter((lang) => !selectedLanguages.includes(lang));
  };

  return (
    <Section
      title="Idiomas"
      items={languages}
      onAdd={() =>
        addItem(languages, setLanguages, {
          language: "",
          spokenLevel: "",
        })
      }
      onEdit={(id, field, value) => editItem(languages, setLanguages, id, field, value)}
      onDelete={(id) => deleteItem(languages, setLanguages, id)}
      fields={[
        {
          label: "Idioma",
          key: "language",
          customInput: (value, onChange) =>
            isEditing ? (
              <select
                value={value}
                onChange={(e) => {
                  const selectedLanguage = e.target.value;

                  // Actualizar el estado temporal inmediatamente
                  setTempLanguages((prevTempLanguages) => {
                    const updatedTempLanguages = prevTempLanguages.map((lang) =>
                      lang.id === id ? { ...lang, language: selectedLanguage } : lang
                    );
                    return updatedTempLanguages;
                  });

                  // Actualizar el estado principal
                  onChange(selectedLanguage);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Seleccione un idioma</option>
                {getAvailableLanguages().map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            ) : (
              // Campo visible para mostrar el idioma seleccionado
              <div>{value || "No especificado"}</div>
            ),
        },
        {
          label: "Nivel del idioma",
          key: "spokenLevel",
          type: "select",
          options: [
            "No especificado",
            "Below A1",
            "A1 (Beginner)",
            "A2 (Elementary)",
            "B1 (Intermediate)",
            "B2 (Upper-Intermediate)",
            "C1 (Advanced)",
            "C2 (Proficient)",
          ],
          customInput: (value, onChange) =>
            isEditing ? (
              <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Seleccione un nivel</option>
                {[
                  "No especificado",
                  "Below A1",
                  "A1 (Beginner)",
                  "A2 (Elementary)",
                  "B1 (Intermediate)",
                  "B2 (Upper-Intermediate)",
                  "C1 (Advanced)",
                  "C2 (Proficient)",
                ].map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            ) : (
              <div>{value || "No especificado"}</div>
            ),
        },
      ]}
      isEditing={isEditing}
    />
  );
};

export default LanguagesSection;