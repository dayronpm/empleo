// src/components/Table.jsx
import React, { useState } from 'react';

const Table = ({ headers, data, actions }) => {
  const [selectedRow, setSelectedRow] = useState(null); // Estado para almacenar la fila seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

  // Función para abrir el modal y mostrar los datos de la fila seleccionada
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        {/* Encabezado de la Tabla */}
        <thead>
          <tr className="bg-red-500 text-white">
            {/* Columna "No." */}
            <th className="py-2 px-4 text-left font-semibold">No.</th>
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4 text-left font-semibold">
                {header}
              </th>
            ))}
            <th className="py-2 px-4 text-left font-semibold">Acciones</th>
          </tr>
        </thead>

        {/* Cuerpo de la Tabla */}
        <tbody>
          {data.map((row, rowIndex) => {
            // Eliminamos el campo "id" del objeto row para no mostrarlo en la tabla
            const { id, ...rowData } = row;

            return (
              <tr
                key={rowIndex}
                className={`border-t hover:bg-gray-100 transition-colors duration-150 cursor-pointer ${
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
                onClick={() => handleRowClick(row)} // Abrir el modal al hacer clic en la fila
              >
                {/* Número de Fila */}
                <td className="py-2 px-4">{rowIndex + 1}</td>
                {Object.values(rowData).map((value, colIndex) => (
                  <td key={colIndex} className="py-2 px-4">
                    {value}
                  </td>
                ))}
                <td className="py-2 px-4">
                  {actions(row)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && selectedRow && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl relative">
            {/* Icono de Cerrar en la Esquina Superior Derecha */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Contenido del Modal */}
            <h3 className="text-xl font-bold mb-4">Información de la Persona</h3>
            <div className="space-y-2">
              {Object.entries(selectedRow).map(([key, value]) => (
                <div key={key}>
                  <span className="font-semibold">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                  <span>{value}</span>
                </div>
              ))}
            </div>

            {/* Botón de Cerrar en la Esquina Inferior Derecha */}
            <button
              className="absolute bottom-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;