// src/pages/Companies.jsx
import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { notifySuccess, notifyError } from '../components/ToastNotification';
import { provincesAndMunicipalities } from '../../Perfil/data';
import InfoModal from '../components/table/InfoModal';
import SearchBar from './SearchBar';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProvincia, setSelectedProvincia] = useState('');
  const [municipios, setMunicipios] = useState([]);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedCompanyForInfo, setSelectedCompanyForInfo] = useState(null);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  // Cargar empresas al montar el componente
  useEffect(() => {
    fetchCompanies();
  }, []);

  // Inicializar las empresas filtradas cuando se cargan las empresas
  useEffect(() => {
    setFilteredCompanies(companies);
  }, [companies]);

  // Función para preparar los datos de las empresas para la tabla
  const prepareCompaniesData = (companiesData) => {
    return companiesData.map(company => ({
      id: company.id,
      visibleData: {
        nombre_completo: company.nombre_completo,
        username: company.username,
        password: '********',
        total_cursos: company.total_cursos || 0,
        total_ofertas: company.total_ofertas || 0
      },
      tipo: company.tipo,
      descripcion: company.descripcion,
      provincia: company.provincia,
      municipio: company.municipio
    }));
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:3001/getcompaniesinfo');
      const data = await response.json();
      setCompanies(data);
      setFilteredCompanies(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al cargar empresas:', error);
      notifyError('Error al cargar las empresas');
      setIsLoading(false);
    }
  };

  const headers = ['Nombre', 'Usuario', 'Contraseña', 'Cursos', 'Ofertas'];

  const handleAddCompany = async (companyData) => {
    try {
      // Primero registramos la empresa con los datos básicos
      const registerResponse = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: companyData.nombreUsuario,
          password: companyData.contraseña,
          userType: 'empresa',
          name: companyData.nombreCompleto
        }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        notifyError(registerData.error || 'Error al agregar la empresa');
        return;
      }

      // Si hay datos adicionales, verificamos que la empresa se haya registrado
      if (companyData.tipo || companyData.descripcion || companyData.provincia || companyData.municipio) {
        // Función para verificar si la empresa existe
        const checkCompanyExists = async (username) => {
          const response = await fetch(`http://localhost:3001/checkcompany/${username}`);
          const data = await response.json();
          return { exists: data.exists, id: data.id };
        };

        // Intentar verificar la existencia de la empresa con timeout
        const startTime = Date.now();
        const timeout = 60000; // 60 segundos
        let companyInfo = { exists: false, id: null };

        while (!companyInfo.exists && (Date.now() - startTime) < timeout) {
          companyInfo = await checkCompanyExists(companyData.nombreUsuario);
          if (!companyInfo.exists) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }

        if (!companyInfo.exists) {
          notifyError('Timeout: No se pudo verificar el registro de la empresa. Los datos adicionales no se guardarán.');
          return;
        }

        // Si la verificación es exitosa, procedemos con el update usando el id obtenido
        const updateResponse = await fetch(`http://localhost:3001/api/empresas/${companyInfo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombreCompleto: companyData.nombreCompleto,
            nombreUsuario: companyData.nombreUsuario,
            tipo: companyData.tipo,
            descripcion: companyData.descripcion,
            provincia: companyData.provincia,
            municipio: companyData.municipio
          }),
        });

        if (!updateResponse.ok) {
          const updateData = await updateResponse.json();
          notifyError(updateData.error || 'Error al actualizar los datos adicionales');
          // La empresa ya está creada, así que continuamos a pesar del error en datos adicionales
        }
      }

      notifySuccess('Empresa agregada exitosamente');
      fetchCompanies();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
      notifyError('Error al agregar la empresa');
    }
  };

  const handleEditCompany = async (companyData) => {
    try {
      const response = await fetch(`http://localhost:3001/api/empresas/${companyData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreCompleto: companyData.nombreCompleto || companyData.nombre_completo,
          nombreUsuario: companyData.username,
          contraseña: companyData.password,
          tipo: companyData.tipo,
          descripcion: companyData.descripcion,
          provincia: companyData.provincia,
          municipio: companyData.municipio
        }),
      });

      const data = await response.json();

      if (response.ok) {
        notifySuccess(data.message || 'Empresa actualizada exitosamente');
        fetchCompanies();
        setIsEditModalOpen(false);
        setSelectedCompany(null);
      } else {
        notifyError(data.error || 'Error al actualizar la empresa');
      }
    } catch (error) {
      console.error('Error:', error);
      notifyError('Error al actualizar la empresa');
    }
  };

  const handleDeleteCompanies = async (ids) => {
    try {
      const deletePromises = ids.map(id => {
        const company = companies.find(c => c.id === id);
        if (!company) throw new Error('Empresa no encontrada');

        return fetch(`http://localhost:3001/api/usuarios/${id}`, {
          method: 'DELETE',
          headers: {
            'x-password': company.password
          }
        }).then(response => {
          if (!response.ok) {
            return response.json().then(data => {
              throw new Error(data.error || 'Error al eliminar la empresa');
            });
          }
          return response;
        });
      });

      await Promise.all(deletePromises);
      notifySuccess('Empresas eliminadas exitosamente');
      fetchCompanies();
      setIsMultiDeleteMode(false);
    } catch (error) {
      console.error('Error:', error);
      notifyError(error.message || 'Error al eliminar las empresas');
    }
  };

  const infoFields = [
    { label: 'Nombre Completo', key: 'nombre_completo' },
    { label: 'Usuario', key: 'username' },
    { label: 'Tipo', key: 'tipo' },
    { label: 'Descripción', key: 'descripcion', type: 'textarea' },
    { label: 'Provincia', key: 'provincia' },
    { label: 'Municipio', key: 'municipio' },
    { label: 'Total de Cursos', key: 'total_cursos' },
    { label: 'Total de Ofertas', key: 'total_ofertas' }
  ];

  const actions = {
    onEdit: (company) => {
      const companyData = {
        id: company.id,
        nombre_completo: company.visibleData.nombre_completo,
        username: company.visibleData.username,
        tipo: company.tipo,
        descripcion: company.descripcion,
        provincia: company.provincia,
        municipio: company.municipio
      };
      
      setSelectedCompany(companyData);
      
      // Establecemos la provincia y los municipios inmediatamente
      if (companyData.provincia) {
        setSelectedProvincia(companyData.provincia);
        setMunicipios(provincesAndMunicipalities[companyData.provincia] || []);
      }
      
      setIsEditModalOpen(true);
    },
    onDeleteMultiple: handleDeleteCompanies,
    onAdd: () => setIsAddModalOpen(true),
    onInfo: (company) => {
      setSelectedCompanyForInfo({
        nombre_completo: company.visibleData.nombre_completo,
        username: company.visibleData.username,
        total_cursos: company.visibleData.total_cursos,
        total_ofertas: company.visibleData.total_ofertas,
        tipo: company.tipo,
        descripcion: company.descripcion,
        provincia: company.provincia,
        municipio: company.municipio
      });
      setIsInfoModalOpen(true);
    }
  };

  // Función para actualizar municipios
  const handleProvinciaChange = (e) => {
    const provincia = e.target.value;
    setSelectedProvincia(provincia);
    if (provincia) {
      setMunicipios(provincesAndMunicipalities[provincia]);
    } else {
      setMunicipios([]);
    }
  };

  // Similar para el modal de editar, pero inicializando con los valores existentes
  useEffect(() => {
    if (selectedCompany?.provincia) {
      setSelectedProvincia(selectedCompany.provincia);
      setMunicipios(provincesAndMunicipalities[selectedCompany.provincia] || []);
    }
  }, [selectedCompany]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Empresas</h2>
        <div className="flex space-x-4">
          <SearchBar
            data={companies}
            setSearchResults={setFilteredCompanies}
          />

          <button
            className="flex items-center text-green-500 hover:text-green-700 transition-colors"
            onClick={actions.onAdd}
          >
            <FaPlus size={16} className="mr-1" />
            Agregar
          </button>

          <button
            className={`flex items-center ${
              isMultiDeleteMode ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            } transition-colors`}
            onClick={() => setIsMultiDeleteMode(!isMultiDeleteMode)}
          >
            <FaTrash size={16} className="mr-1" />
            Eliminar
          </button>
        </div>
      </div>

      <Table
        headers={headers}
        data={prepareCompaniesData(filteredCompanies)}
        actions={actions}
        isMultiDeleteMode={isMultiDeleteMode}
      />

      {/* Modal de Agregar Empresa */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
              onClick={() => setIsAddModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-bold mb-4">Agregar Empresa</h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const contraseña = formData.get('contraseña');
                const confirmarContraseña = formData.get('confirmarContraseña');

                if (contraseña !== confirmarContraseña) {
                notifyError('Las contraseñas no coinciden');
                  return;
                }

              handleAddCompany({
                  nombreCompleto: formData.get('nombreCompleto'),
                  nombreUsuario: formData.get('nombreUsuario'),
                  contraseña,
                tipo: formData.get('tipo'),
                descripcion: formData.get('descripcion'),
                provincia: formData.get('provincia'),
                municipio: formData.get('municipio')
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                  <input
                    type="text"
                    name="nombreCompleto"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                  <input
                    type="text"
                    name="nombreUsuario"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <input
                    type="password"
                    name="contraseña"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                  <input
                    type="password"
                    name="confirmarContraseña"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                {/* Tipo de Empresa */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Empresa</label>
                  <select
                    name="tipo"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Seleccione un tipo</option>
                    <option value="Estatal">Estatal</option>
                    <option value="No estatal">No estatal</option>
                  </select>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea
                    name="descripcion"
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ></textarea>
                </div>

                {/* Provincia */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Provincia</label>
                  <select
                    name="provincia"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={handleProvinciaChange}
                  >
                    <option value="">Seleccione una provincia</option>
                    {Object.keys(provincesAndMunicipalities).map(provincia => (
                      <option key={provincia} value={provincia}>{provincia}</option>
                    ))}
                  </select>
                </div>

                {/* Municipio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Municipio</label>
                  <select
                    name="municipio"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Seleccione un municipio</option>
                    {municipios.map(municipio => (
                      <option key={municipio} value={municipio}>{municipio}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Editar Empresa */}
      {isEditModalOpen && selectedCompany && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedCompany(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-bold mb-4">Editar Empresa</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const contraseña = formData.get('contraseña');
              const confirmarContraseña = formData.get('confirmarContraseña');

              if (contraseña && contraseña !== confirmarContraseña) {
                notifyError('Las contraseñas no coinciden');
                return;
              }

              handleEditCompany({
                id: selectedCompany.id,
                nombreCompleto: formData.get('nombreCompleto'),
                username: formData.get('nombreUsuario'),
                contraseña: contraseña || undefined,
                tipo: formData.get('tipo'),
                descripcion: formData.get('descripcion'),
                provincia: formData.get('provincia'),
                municipio: formData.get('municipio')
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                  <input
                    type="text"
                    name="nombreCompleto"
                    defaultValue={selectedCompany.nombre_completo}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                  <input
                    type="text"
                    name="nombreUsuario"
                    defaultValue={selectedCompany.username}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Nueva Contraseña (opcional)</label>
                  <input
                    type="password"
                    name="contraseña"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirmar Nueva Contraseña</label>
                  <input
                    type="password"
                    name="confirmarContraseña"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Tipo de Empresa */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Empresa</label>
                  <select
                    name="tipo"
                    defaultValue={selectedCompany.tipo}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">Seleccione un tipo</option>
                    <option value="Estatal">Estatal</option>
                    <option value="No estatal">No estatal</option>
                  </select>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea
                    name="descripcion"
                    rows="3"
                    defaultValue={selectedCompany.descripcion}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  ></textarea>
                </div>

                {/* Provincia */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Provincia</label>
                  <select
                    name="provincia"
                    defaultValue={selectedCompany.provincia}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                    onChange={handleProvinciaChange}
                  >
                    <option value="">Seleccione una provincia</option>
                    {Object.keys(provincesAndMunicipalities).map(provincia => (
                      <option key={provincia} value={provincia}>{provincia}</option>
                    ))}
                  </select>
                </div>

                {/* Municipio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Municipio</label>
                  <select
                    name="municipio"
                    defaultValue={selectedCompany.municipio}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Seleccione un municipio</option>
                    {municipios.map(municipio => (
                      <option key={municipio} value={municipio}>{municipio}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedCompany(null);
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Información */}
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => {
          setIsInfoModalOpen(false);
          setSelectedCompanyForInfo(null);
        }}
        data={selectedCompanyForInfo}
        fields={infoFields}
      />
    </div>
  );
};

export default Companies;