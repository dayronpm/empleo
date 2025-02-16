import React from "react";

import { technicalSkillsList } from "./data";
import Section from "./Section";

const SkillsSection = ({ skills, setSkills, addItem, editItem, deleteItem, isEditing }) => {


  return (
    <Section
      title="Habilidades"
      items={skills}
      onAdd={() => addItem(skills, setSkills, { name: "", level: "" })}
      onEdit={(id, field, value) => editItem(skills, setSkills, id, field, value)}
      onDelete={(id) => deleteItem(skills, setSkills, id)}
      fields={[
        {
          label: "Nombre de la habilidad",
          key: "name",
          customInput: (value, onChange) =>
            isEditing ? (
              <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Seleccione una habilidad</option>
                {technicalSkillsList.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
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
          label: "Nivel",
          key: "level",
          type: "select",
          options: ["Básico", "Intermedio", "Avanzado"],
          customInput: (value, onChange) =>
            isEditing ? (
              <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
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

export default SkillsSection;
