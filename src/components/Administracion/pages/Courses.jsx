// src/pages/Courses.jsx
import Table from '../components/Table';

const Courses = () => {
  const courses = [
    { id: 1, nombre: 'Introducción a Python', empresa: 'Tech Solutions', duracion: '4 semanas', fechaInicio: '2023-10-01' },
  ];

  const headers = ['Nombre', 'Empresa', 'Duración', 'Fecha de Inicio'];
  const actions = (course) => (
    <>
      <button className="text-blue-500 mr-2">Editar</button>
      <button className="text-red-500">Eliminar</button>
    </>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cursos</h2>
      <Table headers={headers} data={courses} actions={actions} />
    </div>
  );
};

export default Courses;