import React from "react";
import Section from "./Section";

const ProjectsSection = ({ projects, setProjects, addItem, editItem, deleteItem, isEditing }) => {
  return (
    <Section
      title="Proyectos"
      items={projects}
      onAdd={() =>
        addItem(projects, setProjects, {
          name: "",
          startDate: new Date(),
          endDate: null,
          description: "",
        })
      }
      onEdit={(id, field, value) => editItem(projects, setProjects, id, field, value)}
      onDelete={(id) => deleteItem(projects, setProjects, id)}
      fields={[
        {
          label: "Nombre del proyecto",
          key: "name",
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
          label: "Fecha de inicio",
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
          label: "Fecha de fin",
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
          label: "Descripción",
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

export default ProjectsSection;
