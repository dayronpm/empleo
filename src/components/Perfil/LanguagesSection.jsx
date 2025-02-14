import React from "react";
import Section from "./Section";

const LanguagesSection = ({ languages, setLanguages, addItem, editItem, deleteItem, isEditing }) => {
  return (
    <Section
      title="Idiomas"
      items={languages}
      onAdd={() =>
        addItem(languages, setLanguages, {
          language: "",
          spokenLevel: "",
          writtenLevel: "",
        })
      }
      onEdit={(id, field, value) => editItem(languages, setLanguages, id, field, value)}
      onDelete={(id) => deleteItem(languages, setLanguages, id)}
      fields={[
        { label: "Idioma", key: "language" },
        {
          label: "Nivel hablado",
          key: "spokenLevel",
          type: "select",
          options: ["Básico", "Intermedio", "Avanzado", "Nativo"],
        },
        {
          label: "Nivel escrito",
          key: "writtenLevel",
          type: "select",
          options: ["Básico", "Intermedio", "Avanzado", "Nativo"],
        },
      ]}
      isEditing={isEditing}
    />
  );
};

export default LanguagesSection;