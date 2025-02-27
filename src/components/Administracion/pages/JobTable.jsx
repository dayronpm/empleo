import React from 'react';
import Table from '../components/Table';

const JobTable = ({ jobs, isMultiDeleteMode, onEdit }) => {
  const headers = ['Título', 'Empresa', 'Ubicación', 'Fecha de Publicación'];

  const actions = {
    onEdit: onEdit, // Pasar la función de edición
    onDeleteMultiple: (ids) => console.log('Eliminar IDs:', ids),
  };

  return (
    <Table
      headers={headers}
      data={jobs}
      actions={actions}
      isMultiDeleteMode={isMultiDeleteMode}
    />
  );
};

export default JobTable;