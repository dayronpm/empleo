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
        { label: "Nombre de la habilidad", key: "name" },
        {
          label: "Nivel",
          key: "level",
          type: "select",
          options: ["Básico", "Intermedio", "Avanzado"],
        },
      ]}
      isEditing={isEditing}
    />
  );
};

export default SkillsSection;