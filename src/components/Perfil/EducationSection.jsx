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
          period: "",
          details: "",
        })
      }
      onEdit={(id, field, value) => editItem(educations, setEducations, id, field, value)}
      onDelete={(id) => deleteItem(educations, setEducations, id)}
      fields={[
        { label: "Institución", key: "institution" },
        { label: "Título", key: "degree" },
        { label: "Período", key: "period" },
        { label: "Detalles adicionales", key: "details", type: "textarea" },
      ]}
      isEditing={isEditing}
    />
  );
};

export default EducationSection;