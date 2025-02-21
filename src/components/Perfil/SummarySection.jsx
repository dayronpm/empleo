import React from "react";

const SummarySection = ({ summary, setSummary, isEditing }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Resumen Profesional</h2>
      {isEditing ? (
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full p-2 border rounded resize-none h-24"
        />
      ) : (
        <p>{summary || "No hay resumen registrado."}</p>
      )}
    </div>
  );
};

export default SummarySection;