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
          key: "institution" 
        },
        { 
          label: "Título obtenido o en curso ", 
          key: "degree" 
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
          label: "Detalles adicionales ", 
          key: "details", 
          type: "textarea" 
        },
      ]}
      isEditing={isEditing}
    />
  );
};

export default EducationSection;