import React from "react";
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
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <span>{value || "No especificado"}</span>
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
                className="w-full p-2 border rounded"
              >
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            ) : (
              <span>{value || "No especificado"}</span>
            ),
        },
      ]}

      isEditing={isEditing}
    />
  );
};

export default SkillsSection;
