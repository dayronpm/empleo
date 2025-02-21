import React, { useState } from "react";
import { technicalSkillsList } from "./data"; // Lista predefinida de habilidades
import Section from "./Section";

const SkillsSection = ({ skills, setSkills, addItem, editItem, deleteItem, isEditing }) => {

  // Filtrar las opciones disponibles en el dropdown
  const getAvailableSkills = () => {
    const selectedSkills = skills.map((skill) => skill.name); // Obtener habilidades ya seleccionadas
    return technicalSkillsList.filter((skill) => !selectedSkills.includes(skill)); // Filtrar habilidades no seleccionadas
  };

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
              <div className="space-y-2">
                {/* Input no editable para mostrar la habilidad seleccionada */}
                <input
                  type="text"
                  value={value}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="Habilidad seleccionada"
                />
                
                {/* Dropdown para seleccionar habilidad */}
                <select
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="">Seleccione una habilidad</option>
                  {getAvailableSkills().map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              // Campo visible para mostrar la habilidad seleccionada
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
                <option value="">Seleccione un nivel</option>
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
