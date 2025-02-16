import React from "react";
import Section from "./Section";

const CertificationsSection = ({ certifications, setCertifications, addItem, editItem, deleteItem, isEditing }) => {
  return (
    <Section
      title="Certificaciones"
      items={certifications}
      onAdd={() =>
        addItem(certifications, setCertifications, {
          name: "",
          institution: "",
          year: "",
        })
      }
      onEdit={(id, field, value) => editItem(certifications, setCertifications, id, field, value)}
      onDelete={(id) => deleteItem(certifications, setCertifications, id)}
      fields={[
        { 
          label: "Nombre de la certificación", 
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
          label: "Institución", 
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
                <span className="font-medium text-gray-800">{value || "No especificado"}</span>
              </div>
            ),
        },
        { 
          label: "Año", 
          key: "year", 
          yearSelector: true,
          customInput: (value, onChange) =>
            isEditing ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onChange(Math.max(1900, (value || new Date().getFullYear()) - 1))}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={value || new Date().getFullYear()}
                  onChange={(e) => {
                    const year = parseInt(e.target.value);
                    if (!isNaN(year) && year >= 1900 && year <= new Date().getFullYear()) {
                      onChange(year);
                    }
                  }}
                  className="w-20 p-2 border rounded text-center"
                  min="1900"
                  max={new Date().getFullYear()}
                />
                <button
                  type="button"
                  onClick={() => onChange(Math.min(new Date().getFullYear(), (value || new Date().getFullYear()) + 1))}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
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

export default CertificationsSection;