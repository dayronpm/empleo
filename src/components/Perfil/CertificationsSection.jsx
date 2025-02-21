import React from "react";
import Section from "./Section";

const CertificationsSection = ({ certifications, setCertifications, addItem, editItem, deleteItem, isEditing }) => {
  const currentYear = new Date().getFullYear(); // Año actual
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i); // Array de años desde 1900 hasta el actual


  return (
    <Section
      title="Certificaciones"
      items={certifications}
      onAdd={() =>
        addItem(certifications, setCertifications, {
          name: "",
          institution: "",
          year: currentYear, // Valor predeterminado: año actual
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
          customInput: (value, onChange) =>
            isEditing ? (
              <select
                value={value || currentYear}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
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

export default CertificationsSection;
