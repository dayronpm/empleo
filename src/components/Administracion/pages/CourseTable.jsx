import React from 'react';
import Table from '../components/Table';

const CourseTable = ({ courses, isMultiDeleteMode, onEdit }) => {
  const headers = ['Nombre del Curso', 'Modalidad', 'Nivel', 'Precio'];

  const actions = {
    onEdit: onEdit, // Pasar la función de edición
    onDeleteMultiple: (ids) => console.log('Eliminar IDs:', ids),
  };

  return (
    <Table
      headers={headers}
      data={courses}
      actions={actions}
      isMultiDeleteMode={isMultiDeleteMode}
    />
  );
};

export default CourseTable;