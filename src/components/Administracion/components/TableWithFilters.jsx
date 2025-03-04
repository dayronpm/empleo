import React, { useState, useEffect } from 'react';
import TableHeaderWithFilters from './table/TableHeaderWithFilters';
import TableRow from './table/TableRow';
import DeleteConfirmationModal from './table/DeleteConfirmationModal';

const TableWithFilters = ({ headers, data, actions, isMultiDeleteMode }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [activeFilters, setActiveFilters] = useState({});

  // Actualizar los datos filtrados cuando cambian los datos originales
  useEffect(() => {
    applyFilters();
  }, [data, activeFilters]);

  // Función para aplicar todos los filtros activos
  const applyFilters = () => {
    let result = [...data];
    
    // Aplicar cada filtro activo
    Object.entries(activeFilters).forEach(([header, value]) => {
      if (value !== null) {
        const headerIndex = headers.indexOf(header);
        if (headerIndex !== -1) {
          result = result.filter(row => {
            const hasVisibleData = row.hasOwnProperty('visibleData');
            const displayData = hasVisibleData 
              ? Object.values(row.visibleData)
              : Object.values(row).filter(val => val !== row.id);
            
            return displayData[headerIndex] && displayData[headerIndex].toString() === value;
          });
        }
      }
    });
    
    setFilteredData(result);
  };

  // Función para manejar el filtrado
  const handleFilter = (header, value) => {
    const newFilters = { ...activeFilters };
    
    if (value === null) {
      // Si el valor es null, eliminar el filtro
      delete newFilters[header];
    } else {
      // Agregar o actualizar el filtro
      newFilters[header] = value;
    }
    
    setActiveFilters(newFilters);
  };

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
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]); // Deseleccionar todas
    } else {
      setSelectedRows(filteredData.map((row) => row.id)); // Seleccionar todas
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
      {/* Filtros activos */}
      {Object.keys(activeFilters).length > 0 && (
        <div className="mb-4 p-2 bg-gray-100 rounded flex flex-wrap gap-2">
          <span className="font-semibold">Filtros activos:</span>
          {Object.entries(activeFilters).map(([header, value], index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
              {header}: {value}
              <button 
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => handleFilter(header, null)}
              >
                ×
              </button>
            </span>
          ))}
          <button 
            className="text-blue-600 hover:text-blue-800 ml-auto"
            onClick={() => setActiveFilters({})}
          >
            Limpiar todos
          </button>
        </div>
      )}

      {/* Tabla */}
      <table className="min-w-full bg-white border border-gray-300">
        {/* Encabezado de la Tabla */}
        <TableHeaderWithFilters
          headers={headers}
          isMultiDeleteMode={isMultiDeleteMode}
          selectedRows={selectedRows}
          data={filteredData}
          onSelectAll={handleSelectAll}
          onFilter={handleFilter}
        />

        {/* Cuerpo de la Tabla */}
        <tbody>
          {filteredData.map((row, rowIndex) => (
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

      {/* Mensaje cuando no hay datos */}
      {filteredData.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No se encontraron resultados con los filtros aplicados.
        </div>
      )}

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

export default TableWithFilters; 