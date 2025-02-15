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
          label: "Nivel del idioma",
          key: "spokenLevel",
          type: "select",
          options: [ "Below A1",
            "A1 (Beginner)",
            "A2 (Elementary)",
            "B1 (Intermediate)",
            "B2 (Upper-Intermediate)",
            "C1 (Advanced)",
            "C2 (Proficient)",],
        },
       
      ]}
      isEditing={isEditing}
    />
  );
};

export default LanguagesSection;