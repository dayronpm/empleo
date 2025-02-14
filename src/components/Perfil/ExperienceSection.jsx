import React from "react";
import Section from "./Section";

const ExperienceSection = ({ experiences, setExperiences, addItem, editItem, deleteItem, isEditing }) => {
  return (
    <Section
      title="Experiencia Laboral"
      items={experiences}
      onAdd={() =>
        addItem(experiences, setExperiences, {
          company: "",
          position: "",
          period: "",
          description: "",
        })
      }
      onEdit={(id, field, value) => editItem(experiences, setExperiences, id, field, value)}
      onDelete={(id) => deleteItem(experiences, setExperiences, id)}
      fields={[
        { label: "Empresa", key: "company" },
        { label: "Puesto", key: "position" },
        { label: "Período", key: "period" },
        { label: "Descripción", key: "description", type: "textarea" },
      ]}
      isEditing={isEditing}
    />
  );
};

export default ExperienceSection;