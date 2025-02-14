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
        { 
          label: "Empresa", 
          key: "company", 
          placeholder: "Ejemplo: Tech Solutions S.A." 
        },
        { 
          label: "Puesto", 
          key: "position", 
          placeholder: "Ejemplo: Desarrollador de Software" 
        },
        { 
          label: "Período", 
          key: "period", 
          placeholder: "Ejemplo: 2020 - 2021" 
        },
        { 
          label: "Descripción", 
          key: "description", 
          type: "textarea", 
          placeholder: "Ejemplo: Desarrollo de aplicaciones web, mantenimiento de sistemas..." 
        },
      ]}
      isEditing={isEditing}
    />
  );
};

export default ExperienceSection;