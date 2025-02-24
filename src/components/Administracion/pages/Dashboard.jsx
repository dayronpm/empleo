// src/pages/Dashboard.jsx
const Dashboard = () => {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <h3 className="text-lg font-bold">Usuarios Totales</h3>
            <p className="text-gray-600">120</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <h3 className="text-lg font-bold">Empresas Registradas</h3>
            <p className="text-gray-600">30</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <h3 className="text-lg font-bold">Ofertas de Empleo</h3>
            <p className="text-gray-600">50</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;