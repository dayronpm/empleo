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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            ) : (
              <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
                <span className="font-semibold text-gray-900">{value || "No especificado"}</span>
              </div>
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            ) : (
              <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
                <span className="font-medium text-gray-800">{value || "No especificado"}</span>
              </div>
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            ) : (
              <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
                <span className="font-medium text-gray-800">{value ? value.toLocaleDateString() : "No especificado"}</span>
              </div>
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            ) : (
              <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
                <span className="font-medium text-gray-800">{value ? value.toLocaleDateString() : "Actualidad"}</span>
              </div>
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            ) : (
              <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
                <span className="text-gray-700">{value || "Sin descripción"}</span>
              </div>
            ),
        },
      ]}
      isEditing={isEditing}
    />
  );
};

export default ExperienceSection;