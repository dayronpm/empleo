// src/components/TableRow.jsx
import React from 'react';
import { FaEdit } from 'react-icons/fa';

const TableRow = ({ row, rowIndex, isMultiDeleteMode, isSelected, onClick, onCheckboxChange, onEdit }) => {
  const { id, ...rowData } = row;

  return (
    <tr
      className={`border-t hover:bg-gray-100 transition-colors duration-150 cursor-pointer ${
        rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
      }`}
      onClick={() => onClick(row)}
    >
      {/* Checkbox para Seleccionar Fila */}
      {isMultiDeleteMode && (
        <td className="py-2 px-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onCheckboxChange(id)}
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
            onEdit(row);
          }}
        >
          <FaEdit size={18} />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;