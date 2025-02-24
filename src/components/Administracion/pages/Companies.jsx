// src/pages/Companies.jsx
import Table from '../components/Table';

const Companies = () => {
  const companies = [
    { id: 1, nombre: 'Tech Solutions', ubicacion: 'Barcelona', sector: 'Tecnología', cursosActivos: 3, ofertasEmpleo: 5 },
  ];

  const headers = ['Nombre', 'Ubicación', 'Sector', 'Cursos Activos', 'Ofertas de Empleo'];
  const actions = (company) => (
    <>
      <button className="text-blue-500 mr-2">Editar</button>
      <button className="text-red-500">Eliminar</button>
    </>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Empresas</h2>
      <Table headers={headers} data={companies} actions={actions} />
    </div>
  );
};

export default Companies;