import React, { useState } from "react";
import { CgExport } from "react-icons/cg"; // Importamos el ícono

const ExportButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (format) => {
    console.log(`Exportando como ${format}`);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Ícono de exportación */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer text-black"
      >
        <CgExport size={24} /> {/* Ícono negro de tamaño 24 */}
      </div>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
          <button
            onClick={() => handleExport("PDF")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Exportar como PDF
          </button>
          <button
            onClick={() => handleExport("DOC")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Exportar como DOC
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;