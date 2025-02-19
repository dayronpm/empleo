import React from "react";
import { languagesList } from "./data";
import Section from "./Section";

const LanguagesSection = ({ languages, setLanguages, addItem, editItem, deleteItem, isEditing }) => {
  // Filtrar las opciones disponibles en el dropdown
  const getAvailableLanguages = () => {
    const selectedLanguages = languages.map((lang) => lang.language);
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
              <div className="space-y-2">
                {/* Input no editable para mostrar el idioma seleccionado */}
                <input
                  type="text"
                  value={value || "No seleccionado"}
                  readOnly
                  className="w-full p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg cursor-not-allowed"
                />
                {/* Dropdown para seleccionar idioma */}
                <select
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="">Seleccione un idioma</option>
                  {getAvailableLanguages().map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

            ) : (
              // Campo visible (input deshabilitado) para mostrar el idioma seleccionado
              <input
                type="text"
                value={value || "No especificado"}
                readOnly
                disabled
                className="w-full p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg cursor-not-allowed"
              />
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
                <option value="No especificado">No especificado</option>
                <option value="Below A1">Below A1</option>
                <option value="A1 (Beginner)">A1 (Beginner)</option>
                <option value="A2 (Elementary)">A2 (Elementary)</option>
                <option value="B1 (Intermediate)">B1 (Intermediate)</option>
                <option value="B2 (Upper-Intermediate)">B2 (Upper-Intermediate)</option>
                <option value="C1 (Advanced)">C1 (Advanced)</option>
                <option value="C2 (Proficient)">C2 (Proficient)</option>
              </select>
            ) : (
              <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
                <span className="font-medium text-gray-800">{value || "No especificado"}</span>
              </div>
            ),
        },
      ]}
      isEditing={isEditing}
    />
  );
};

export default LanguagesSection;
