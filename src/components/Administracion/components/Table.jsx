// src/components/Table.jsx
import React, { useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'; // Importamos íconos de react-icons

const Table = ({ headers, data, actions }) => {
  const [selectedRow, setSelectedRow] = useState(null); // Estado para almacenar la fila seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal principal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para controlar la visibilidad del modal de confirmación
  const [selectedRows, setSelectedRows] = useState([]); // Estado para almacenar las filas seleccionadas
  const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false); // Estado para activar el modo de eliminación múltiple

  // Función para abrir el modal principal y mostrar los datos de la fila seleccionada
  const handleRowClick = (row) => {
    if (!isMultiDeleteMode) {
      setSelectedRow(row);
      setIsModalOpen(true);
    }
  };

  // Función para cerrar el modal principal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  // Función para manejar la selección/deselección de una fila
  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id)); // Deseleccionar
    } else {
      setSelectedRows([...selectedRows, id]); // Seleccionar
    }
  };

  // Función para manejar la selección/deselección de todas las filas
  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]); // Deseleccionar todas
    } else {
      setSelectedRows(data.map((row) => row.id)); // Seleccionar todas
    }
  };

  // Función para confirmar la eliminación de las filas seleccionadas
  const confirmDeleteSelected = () => {
    actions.onDeleteMultiple(selectedRows); // Eliminar las filas seleccionadas
    setSelectedRows([]); // Limpiar la selección
    setIsMultiDeleteMode(false); // Desactivar el modo de eliminación múltiple
    setIsDeleteModalOpen(false); // Cerrar el modal de confirmación
  };

  // Función para cancelar la eliminación
  const cancelDelete = () => {
    setIsDeleteModalOpen(false); // Cerrar el modal de confirmación
  };

  return (
    <div className="overflow-x-auto">
      {/* Encabezado con Botones Agregar y Eliminar */}
      <div className="flex justify-end mb-4 space-x-4">
        {/* Botón Agregar Persona */}
        <button
          title="Agregar Persona"
          className="flex items-center text-green-500 hover:text-green-700 transition-colors"
          onClick={() => actions.onAdd()}
        >
          <FaPlus size={16} className="mr-1" />
          Agregar
        </button>

        {/* Botón Eliminar Múltiples Personas */}
        <button
          title="Eliminar Múltiples Personas"
          className={`flex items-center ${
            isMultiDeleteMode ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          } transition-colors`}
          onClick={() => setIsMultiDeleteMode(!isMultiDeleteMode)}
        >
          <FaTrash size={16} className="mr-1" />
          Eliminar
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        {/* Encabezado de la Tabla */}
        <thead>
          <tr className="bg-red-500 text-white">
            {/* Checkbox "Seleccionar Todos" */}
            {isMultiDeleteMode && (
              <th className="py-2 px-4 text-left font-semibold">
                <input
                  type="checkbox"
                  checked={selectedRows.length === data.length && data.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                />
              </th>
            )}
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
                {/* Checkbox para Seleccionar Fila */}
                {isMultiDeleteMode && (
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(id)}
                      onChange={() => handleCheckboxChange(id)}
                      className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                  </td>
                )}
                {/* Número de Fila */}
                <td className="py-2 px-4">{rowIndex + 1}</td>
                {Object.values(rowData).map((value, colIndex) => (
                  <td key={colIndex} className="py-2 px-4">
                    {value}
                  </td>
                ))}
                <td className="py-2 px-4 flex gap-2">
                  {/* Icono de Editar con Tooltip */}
                  <button
                    title="Editar"
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation(); // Evitar que se abra el modal al hacer clic en el botón
                      actions.onEdit(row);
                    }}
                  >
                    <FaEdit size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal Principal */}
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

      {/* Modal de Confirmación de Eliminación */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {/* Título del Modal */}
            <h3 className="text-lg font-bold mb-4">Confirmar Eliminación</h3>
            <p className="mb-4">
              ¿Está seguro de que desea eliminar las {selectedRows.length} personas seleccionadas? Esta acción no se puede deshacer.
            </p>
            {/* Botones de Acción Centrados */}
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                onClick={cancelDelete}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                onClick={confirmDeleteSelected}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón de Eliminar Seleccionados */}
      {isMultiDeleteMode && selectedRows.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Eliminar Seleccionados ({selectedRows.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;