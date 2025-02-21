import React from "react";
import Section from "./Section";

const EducationSection = ({ educations, setEducations, addItem, editItem, deleteItem, isEditing }) => {
  return (
    <Section
      title="Educación"
      items={educations}
      onAdd={() =>
        addItem(educations, setEducations, {
          institution: "",
          degree: "",
          startDate: new Date(), // Fecha de inicio predeterminada
          endDate: null, // Fecha de fin puede ser opcional (actualidad)
          details: "",
        })
      }
      onEdit={(id, field, value) => editItem(educations, setEducations, id, field, value)}
      onDelete={(id) => deleteItem(educations, setEducations, id)}
      fields={[
        { 
          label: "Nombre de la institución educativa", 
          key: "institution",
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
          label: "Título obtenido o en curso", 
          key: "degree",
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
          label: "Detalles adicionales", 
          key: "details",
          customInput: (value, onChange) =>
            isEditing ? (
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            ) : (
              <div className="flex flex-col bg-[#f9fafb] p-4 rounded-lg shadow-sm">
                <span className="text-gray-700">{value || "Sin detalles adicionales"}</span>
              </div>
            ),
        },
      ]}
      isEditing={isEditing}
    />
  );
};

export default EducationSection;