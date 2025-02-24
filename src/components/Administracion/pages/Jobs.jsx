// src/pages/Jobs.jsx
import Table from '../components/Table';

const Jobs = () => {
  const jobs = [
    { id: 1, titulo: 'Desarrollador Frontend', empresa: 'Tech Solutions', ubicacion: 'Barcelona', fechaPublicacion: '2023-09-01' },
  ];

  const headers = ['Título', 'Empresa', 'Ubicación', 'Fecha de Publicación'];
  const actions = (job) => (
    <>
      <button className="text-blue-500 mr-2">Editar</button>
      <button className="text-red-500">Eliminar</button>
    </>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Ofertas de Empleo</h2>
      <Table headers={headers} data={jobs} actions={actions} />
    </div>
  );
};

export default Jobs;