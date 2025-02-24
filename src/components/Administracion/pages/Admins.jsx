// src/pages/Admins.jsx
import Table from '../components/Table';

const Admins = () => {
  const admins = [
    { id: 1, nombre: 'Admin 1', rol: 'Superadministrador', fechaRegistro: '2023-01-01' },
  ];

  const headers = ['Nombre', 'Rol', 'Fecha de Registro'];
  const actions = (admin) => (
    <>
      <button className="text-blue-500 mr-2">Editar</button>
      <button className="text-red-500">Eliminar</button>
    </>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Administradores</h2>
      <Table headers={headers} data={admins} actions={actions} />
    </div>
  );
};

export default Admins;