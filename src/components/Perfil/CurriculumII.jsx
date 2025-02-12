import React, { useState } from "react";
import { FaFileExport } from "react-icons/fa"; // Importing an export icon
import Header from "./Header";
import PersonalInfo from "./PersonalInfo";
import ProfessionalInfo from "./ProfessionalInfo";
import ExportButton from "./ExportButton";
import HistoryModal from "./HistoryModal";

function CurriculumII() {
  const [showHistory, setShowHistory] = useState(false);

  // Función para regresar a la página anterior
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Encabezado */}
      <Header />
      {/* Contenido principal */}
      <div className="container mx-auto p-6">
        {/* Información personal */}
        <PersonalInfo />
        {/* Información profesional */}
        <ProfessionalInfo />
        {/* Botón de exportación */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setShowHistory(true)}
            className="bg-transparent border-none cursor-pointer"
          >
            {/* Ícono o contenido del botón */}
          </button>
          <ExportButton />
        </div>
        {/* Historial de cambios */}
        <button
          onClick={() => setShowHistory(true)}
          className="mt-4 text-blue-500 hover:underline"
        >
          Historial de cambios
        </button>
        {/* Modal de historial */}
        {showHistory && <HistoryModal onClose={() => setShowHistory(false)} />}
      </div>
      {/* Botón Cerrar */}
      <button
        onClick={goBack} // Asociamos la función goBack al evento onClick
        className="fixed bottom-4 right-4 bg-red-500 hover:bg-red-600 transition-colors text-white px-6 py-3 rounded-full shadow-md"
      >
        Cerrar
      </button>
    </div>
  );
}

export default CurriculumII;