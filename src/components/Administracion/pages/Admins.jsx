import React, { useState, useEffect } from 'react';
import { notifySuccess, notifyError } from '../components/ToastNotification';
import { FaPlus } from 'react-icons/fa';
import AdminTable from '../components/AdminTable';

const Admins = ({ adminAuth }) => {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const fetchAdmins = async () => {
    if (!adminAuth || !adminAuth.token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/admin/getall', {
        headers: {
          'Authorization': `Bearer ${adminAuth.token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener administradores');
      }

      const data = await response.json();
      setAdmins(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      notifyError('Error al cargar administradores');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (adminAuth?.tipo === 'principal') {
      fetchAdmins();
    } else {
      setIsLoading(false);
    }
  }, [adminAuth]);

  const handleAddAdmin = async (formData) => {
    try {
      const response = await fetch('http://localhost:3001/admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminAuth.token}`
        },
        body: JSON.stringify({
          username: formData.get('username'),
          password: formData.get('password'),
          tipo: formData.get('tipo')
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al crear administrador');
      }

      notifySuccess('Administrador creado exitosamente');
      fetchAdmins();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
      notifyError(error.message);
    }
  };

  const handleEditAdmin = async (formData) => {
    try {
      const newTipo = formData.get('tipo');
      
      // Si se está cambiando de principal a secundario, verificar que no sea el último
      if (selectedAdmin.tipo === 'principal' && newTipo === 'secundario') {
        const remainingPrincipalAdmins = admins.filter(
          admin => admin.tipo === 'principal' && admin.id !== selectedAdmin.id
        ).length;

        if (remainingPrincipalAdmins === 0) {
          notifyError('No se puede cambiar el tipo del último administrador principal');
          return;
        }
      }

      const response = await fetch(`http://localhost:3001/admin/update/${selectedAdmin.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminAuth.token}`
        },
        body: JSON.stringify({
          username: formData.get('username'),
          password: formData.get('password'),
          tipo: newTipo
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al actualizar administrador');
      }

      notifySuccess('Administrador actualizado exitosamente');
      fetchAdmins();
      setIsEditModalOpen(false);
      setSelectedAdmin(null);
    } catch (error) {
      console.error('Error:', error);
      notifyError(error.message);
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      // Primero verificamos si es el último admin principal
      const adminToDelete = admins.find(admin => admin.id === id);
      const remainingPrincipalAdmins = admins.filter(
        admin => admin.tipo === 'principal' && admin.id !== id
      ).length;

      if (adminToDelete.tipo === 'principal' && remainingPrincipalAdmins === 0) {
        notifyError('No se puede eliminar el último administrador principal');
        return;
      }

      // Si no es el último admin principal, procedemos con la eliminación
      const response = await fetch(`http://localhost:3001/admin/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminAuth.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar administrador');
      }

      notifySuccess('Administrador eliminado exitosamente');
      fetchAdmins();
    } catch (error) {
      console.error('Error:', error);
      notifyError('Error al eliminar administrador');
    }
  };

  if (!adminAuth) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error de Autenticación</h2>
          <p>Por favor, inicie sesión nuevamente.</p>
        </div>
      </div>
    );
  }

  if (adminAuth.tipo !== 'principal') {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Acceso Restringido</h2>
          <p>No tienes permisos para acceder a esta sección.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Cargando...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Administradores</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center gap-2"
        >
          <FaPlus /> Agregar Administrador
        </button>
      </div>

      <AdminTable
        admins={admins}
        onEdit={(id) => {
          const admin = admins.find(a => a.id === id);
          setSelectedAdmin(admin);
          setIsEditModalOpen(true);
        }}
        onDelete={handleDeleteAdmin}
      />

      {/* Modal de Agregar Administrador */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Agregar Administrador</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddAdmin(new FormData(e.target));
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Usuario</label>
                  <input
                    type="text"
                    name="username"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo</label>
                  <select
                    name="tipo"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="principal">Principal</option>
                    <option value="secundario">Secundario</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Editar Administrador */}
      {isEditModalOpen && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Editar Administrador</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleEditAdmin(new FormData(e.target));
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Usuario</label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={selectedAdmin.username}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nueva Contraseña (opcional)</label>
                  <input
                    type="password"
                    name="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo</label>
                  <select
                    name="tipo"
                    defaultValue={selectedAdmin.tipo}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="principal">Principal</option>
                    <option value="secundario">Secundario</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedAdmin(null);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admins;