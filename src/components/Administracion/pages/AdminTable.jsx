import React from 'react';
import Table from '../components/Table';

const AdminTable = ({ admins, isMultiDeleteMode, onEdit }) => {
  const headers = ['Nombre Completo',"Nombre de usuario", 'Rol', ];

  const actions = {
    onEdit: onEdit, // Pasar la función de edición
    onDeleteMultiple: (ids) => console.log('Eliminar IDs:', ids),
  };

  return (
    <Table
      headers={headers}
      data={admins}
      actions={actions}
      isMultiDeleteMode={isMultiDeleteMode}
    />
  );
};

export default AdminTable;