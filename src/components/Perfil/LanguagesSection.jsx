import React from "react";
import { languagesList } from "./data";
import Section from "./Section";

const LanguagesSection = ({ languages, setLanguages, addItem, editItem, deleteItem, isEditing }) => {
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
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Seleccione un idioma</option>
                {languagesList.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            ) : (
              <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
                <span className="font-semibold text-gray-900">{value || "No especificado"}</span>
              </div>
            ),
        },
        {
          label: "Nivel del idioma",
          key: "spokenLevel",
          type: "select",
          options: [
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