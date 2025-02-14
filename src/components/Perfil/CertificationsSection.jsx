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
        { label: "Nombre de la certificación", key: "name" },
        { label: "Institución", key: "institution" },
        { label: "Año", key: "year" },
      ]}
      isEditing={isEditing}
    />
  );
};

export default CertificationsSection;