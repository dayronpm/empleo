// src/components/Table.jsx
import React, { useState } from 'react';
import TableHeader from './table/TableHeader';
import TableRow from './table/TableRow';
import DeleteConfirmationModal from './table/DeleteConfirmationModal';

const Table = ({ headers, data, actions, isMultiDeleteMode }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Función para abrir el modal principal y mostrar los datos de la fila seleccionada
  const handleRowClick = (row) => {
    if (!isMultiDeleteMode && actions.onInfo) {
      actions.onInfo(row);
    }
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
    setIsDeleteModalOpen(false); // Cerrar el modal de confirmación
  };

  return (
    <div className="overflow-x-auto">
      {/* Tabla */}
      <table className="min-w-full bg-white border border-gray-300">
        {/* Encabezado de la Tabla */}
        <TableHeader
          headers={headers}
          isMultiDeleteMode={isMultiDeleteMode}
          selectedRows={selectedRows}
          data={data}
          onSelectAll={handleSelectAll}
        />

        {/* Cuerpo de la Tabla */}
        <tbody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              row={row}
              rowIndex={rowIndex}
              isMultiDeleteMode={isMultiDeleteMode}
              isSelected={selectedRows.includes(row.id)}
              onClick={handleRowClick}
              onCheckboxChange={handleCheckboxChange}
              onEdit={actions.onEdit}
            />
          ))}
        </tbody>
      </table>

      {/* Modal de Confirmación de Eliminación */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDeleteSelected}
          selectedRowsCount={selectedRows.length}
        />
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