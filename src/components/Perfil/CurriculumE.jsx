import React, { useState } from "react";
import { FaFileExport } from "react-icons/fa"; // Importing an export icon
import Header from "./Header";
import EmpresaIn from "./EmpresaIn";


function CurriculumE() {
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
        <EmpresaIn />
        {/* Información profesional */}
      
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

export default CurriculumE;