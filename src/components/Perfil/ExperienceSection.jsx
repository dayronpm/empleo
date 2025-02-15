import React from "react";
import Section from "./Section";

const ExperienceSection = ({ experiences, setExperiences, addItem, editItem, deleteItem, isEditing }) => {
  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: "",
      position: "",
      startDate: new Date(),
      endDate: null,
      description: "",
    };
    setExperiences([...experiences, newExperience]);
  };

  return (
    <Section
      title="Experiencia Laboral"
      items={experiences}
      onAdd={handleAddExperience}
      onEdit={(id, field, value) => editItem(experiences, setExperiences, id, field, value)}
      onDelete={(id) => deleteItem(experiences, setExperiences, id)}
      fields={[
        { 
          label: "Nombre de la empresa", 
          key: "company",
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
          label: "Cargo o puesto que ocupaste", 
          key: "position",
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
          label: "Fecha de Inicio", 
          key: "startDate",
          customInput: (value, onChange) =>
            isEditing ? (
              <input
                type="date"
                value={value.toISOString().split("T")[0]}
                onChange={(e) => onChange(new Date(e.target.value))}
                className="w-full p-2 border rounded"
              />
            ) : (
              <span>{value ? value.toISOString().split("T")[0] : "No especificado"}</span>
            ),
        },
        { 
          label: "Fecha de Fin", 
          key: "endDate",
          customInput: (value, onChange) =>
            isEditing ? (
              <input
                type="date"
                value={value ? value.toISOString().split("T")[0] : ""}
                onChange={(e) => onChange(new Date(e.target.value))}
                className="w-full p-2 border rounded"
              />
            ) : (
              <span>{value ? value.toISOString().split("T")[0] : "Actualidad"}</span>
            ),
        },
        { 
          label: "Descripción de tus responsabilidades y logros en este trabajo", 
          key: "description",
          customInput: (value, onChange) =>
            isEditing ? (
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <span>{value || "No especificado"}</span>
            ),
        },
      ]}
      isEditing={isEditing}
    />
  );
};

export default ExperienceSection;