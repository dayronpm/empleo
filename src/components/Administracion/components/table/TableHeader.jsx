// src/components/TableHeader.jsx
import React from 'react';

const TableHeader = ({ headers, isMultiDeleteMode, selectedRows, data, onSelectAll }) => {
  return (
    <thead>
      <tr className="bg-gray-400 text-white"> {/* Cambiamos el color de fondo a gris oscuro */}
        {/* Checkbox "Seleccionar Todos" */}
        {isMultiDeleteMode && (
          <th className="py-2 px-4 text-left font-semibold">
            <input
              type="checkbox"
              checked={selectedRows.length === data.length && data.length > 0}
              onChange={onSelectAll}
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
  );
};

export default TableHeader;