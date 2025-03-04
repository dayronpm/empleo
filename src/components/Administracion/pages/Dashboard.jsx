// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { FaUsers, FaBuilding, FaBriefcase, FaBook, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalEmpresas: 0,
    totalOfertas: 0,
    totalCursos: 0,
    empresasConOfertas: 0,
    empresasConCursos: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Obtener empresas y sus estadísticas
        const empresasResponse = await fetch('http://localhost:3001/getcompaniesinfo');
        const empresasData = await empresasResponse.json();
        
        // Obtener todas las ofertas
        const ofertasResponse = await fetch('http://localhost:3001/getalloferta');
        const ofertasData = await ofertasResponse.json();
        
        // Obtener todos los cursos
        const cursosResponse = await fetch('http://localhost:3001/getallcourses');
        const cursosData = await cursosResponse.json();

        // Calcular estadísticas
        const empresasConOfertas = empresasData.filter(empresa => empresa.total_ofertas > 0).length;
        const empresasConCursos = empresasData.filter(empresa => empresa.total_cursos > 0).length;

        setStats({
          totalUsuarios: empresasData.length, // Por ahora solo contamos empresas
          totalEmpresas: empresasData.length,
          totalOfertas: ofertasData.length,
          totalCursos: cursosData.length,
          empresasConOfertas,
          empresasConCursos
        });

        setLoading(false);
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
        setError('Error al cargar las estadísticas');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Cargando estadísticas...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-red-600">{error}</h2>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Usuarios Totales',
      value: stats.totalUsuarios,
      icon: FaUsers,
      color: 'blue'
    },
    {
      title: 'Empresas Registradas',
      value: stats.totalEmpresas,
      icon: FaBuilding,
      color: 'green'
    },
    {
      title: 'Empresas con Ofertas',
      value: stats.empresasConOfertas,
      description: 'Empresas que tienen ofertas de empleo publicadas',
      icon: FaBriefcase,
      color: 'yellow'
    },
    {
      title: 'Empresas con Cursos',
      value: stats.empresasConCursos,
      description: 'Empresas que tienen cursos publicados',
      icon: FaChalkboardTeacher,
      color: 'purple'
    },
    {
      title: 'Ofertas de Empleo',
      value: stats.totalOfertas,
      icon: FaBriefcase,
      color: 'orange'
    },
    {
      title: 'Total de Cursos',
      value: stats.totalCursos,
      icon: FaBook,
      color: 'indigo'
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Panel de Control</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-200 border-t-4 border-${stat.color}-500`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`text-${stat.color}-500 text-2xl`} />
                </div>
              </div>
              {stat.description && (
                <p className="text-sm text-gray-500 mt-2">{stat.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;