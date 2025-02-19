// Nombre del archivo: SkillsSection.jsx
// Ruta del archivo: C:/Información/Proyectos/empleo/Frontend/client/src/components/Perfil/SkillsSection.jsx

import React, { useState } from "react";
import { technicalSkillsList } from "./data"; // Lista predefinida de habilidades
import Section from "./Section";

const SkillsSection = ({ skills, setSkills, addItem, editItem, deleteItem, isEditing }) => {
  // Estado temporal para manejar habilidades seleccionadas durante la edición
  const [tempSkills, setTempSkills] = useState(skills);

  // Filtrar las opciones disponibles en el dropdown usando el estado temporal
  const getAvailableSkills = () => {
    const selectedSkills = tempSkills.map((skill) => skill.name); // Obtener habilidades ya seleccionadas
    return technicalSkillsList.filter((skill) => !selectedSkills.includes(skill)); // Filtrar habilidades no seleccionadas
  };

  return (
    <Section
      title="Habilidades"
      items={skills}
      onAdd={() =>
        addItem(skills, setSkills, {
          name: "",
          level: "",
        })
      }
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
                onChange={(e) => {
                  const selectedSkill = e.target.value;

                  // Actualizar el estado temporal inmediatamente
                  setTempSkills((prevTempSkills) => {
                    const updatedTempSkills = prevTempSkills.map((skill) =>
                      skill.id === id ? { ...skill, name: selectedSkill } : skill
                    );
                    return updatedTempSkills;
                  });

                  // Actualizar el estado principal
                  onChange(selectedSkill);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Seleccione una habilidad</option>
                {getAvailableSkills().map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            ) : (
              // Campo visible para mostrar la habilidad seleccionada
              <div>{value || "No especificado"}</div>
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
                <option value="">Seleccione un nivel</option>
                {["Básico", "Intermedio", "Avanzado"].map((level) => (
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

export default SkillsSection;