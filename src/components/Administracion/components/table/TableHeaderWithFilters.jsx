import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

const TableHeaderWithFilters = ({ headers, isMultiDeleteMode, selectedRows, data, onSelectAll, onFilter }) => {
  const [openFilterIndex, setOpenFilterIndex] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  
  // Función para obtener valores únicos de una columna
  const getUniqueValues = (columnIndex) => {
    const uniqueValues = new Set();
    data.forEach(row => {
      const hasVisibleData = row.hasOwnProperty('visibleData');
      const displayData = hasVisibleData 
        ? Object.values(row.visibleData)
        : Object.values(row).filter(value => value !== row.id);
      
      if (displayData[columnIndex] !== undefined) {
        uniqueValues.add(displayData[columnIndex].toString());
      }
    });
    return Array.from(uniqueValues).sort();
  };

  // Función para manejar el clic en el encabezado
  const handleHeaderClick = (index, e) => {
    e.stopPropagation();
    setOpenFilterIndex(openFilterIndex === index ? null : index);
  };

  // Función para aplicar el filtro
  const applyFilter = (columnIndex, value) => {
    const newFilters = { ...activeFilters };
    
    if (value === null) {
      // Si el valor es null, eliminar el filtro
      delete newFilters[headers[columnIndex]];
    } else {
      // Agregar o actualizar el filtro
      newFilters[headers[columnIndex]] = value;
    }
    
    setActiveFilters(newFilters);
    onFilter(headers[columnIndex], value);
    setOpenFilterIndex(null);
  };

  // Verificar si una columna tiene un filtro activo
  const hasActiveFilter = (header) => {
    return activeFilters.hasOwnProperty(header);
  };

  return (
    <thead>
      <tr className="bg-gray-400 text-white">
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
          <th 
            key={index} 
            className={`py-2 px-4 text-left font-semibold cursor-pointer hover:bg-gray-500 ${hasActiveFilter(header) ? 'bg-gray-500' : ''}`}
            onClick={(e) => handleHeaderClick(index, e)}
          >
            <div className="flex items-center justify-between">
              <span>{header}</span>
              <FaCaretDown className="ml-1" size={14} />
            </div>
            
            {/* Menú desplegable de filtro */}
            {openFilterIndex === index && (
              <div className="absolute mt-1 bg-white border border-gray-300 shadow-lg rounded-md z-10 max-h-60 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-2">
                  <input 
                    type="text" 
                    placeholder="Buscar..." 
                    className="w-full p-1 border border-gray-300 rounded mb-2"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex flex-col max-h-40 overflow-y-auto">
                    <label className="flex items-center text-gray-700 mb-1">
                      <input 
                        type="checkbox" 
                        className="mr-2"
                        checked={!hasActiveFilter(header)}
                        onChange={(e) => {
                          e.stopPropagation();
                          applyFilter(index, null); // Eliminar filtro
                        }}
                      />
                      (Mostrar todo)
                    </label>
                    {getUniqueValues(index).map((value, i) => (
                      <label key={i} className="flex items-center text-gray-700 mb-1">
                        <input 
                          type="checkbox" 
                          className="mr-2"
                          checked={activeFilters[header] === value}
                          onChange={(e) => {
                            e.stopPropagation();
                            applyFilter(index, value);
                          }}
                        />
                        {value}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </th>
        ))}
        <th className="py-2 px-4 text-left font-semibold">Acciones</th>
      </tr>
    </thead>
  );
};

export default TableHeaderWithFilters; 