import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from './components/ToastNotification';
import ToastNotification from './components/ToastNotification';

const AdminLogin = ({ setAdminAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [changePasswordData, setChangePasswordData] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3001/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setError('Usuario o contraseña incorrectos');
        } else if (response.status === 404) {
          setError('Usuario no encontrado');
        } else {
          setError(data.error || 'Error en el inicio de sesión');
        }
        throw new Error(data.error || 'Error en el inicio de sesión');
      }

      // Verificar que la respuesta incluye toda la información necesaria
      if (!data.id || !data.username || !data.tipo || !data.token) {
        setError('Error en la respuesta del servidor');
        throw new Error('Respuesta del servidor incompleta');
      }

      localStorage.setItem('adminAuth', JSON.stringify(data));
      setAdminAuth(data);
      navigate('/administracion');
      
    } catch (error) {
      console.error('Error:', error);
      notifyError(error.message || 'Error en el inicio de sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!changePasswordData.username || !changePasswordData.currentPassword || !changePasswordData.newPassword || !changePasswordData.confirmPassword) {
      notifyError('Todos los campos son obligatorios');
      return;
    }

    if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
      notifyError('Las contraseñas nuevas no coinciden');
      return;
    }

    if (changePasswordData.newPassword.length < 6) {
      notifyError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/admin/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: changePasswordData.username,
          currentPassword: changePasswordData.currentPassword,
          newPassword: changePasswordData.newPassword
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al cambiar la contraseña');
      }

      notifySuccess('Contraseña actualizada correctamente');
      setShowChangePasswordModal(false);
      setChangePasswordData({
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      notifyError(error.message || 'Error al cambiar la contraseña');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Acceso Administrativo
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Usuario</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  error ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm`}
                placeholder="Usuario"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  error ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm`}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>

        {/* Botón para mostrar el modal de cambio de contraseña */}
        <button
          onClick={() => setShowChangePasswordModal(true)}
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cambiar Contraseña
        </button>
      </div>

      {/* Modal de cambio de contraseña */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Cambiar Contraseña</h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                <input
                  type="text"
                  value={changePasswordData.username}
                  onChange={(e) => setChangePasswordData({...changePasswordData, username: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña Actual</label>
                <input
                  type="password"
                  value={changePasswordData.currentPassword}
                  onChange={(e) => setChangePasswordData({...changePasswordData, currentPassword: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                <input
                  type="password"
                  value={changePasswordData.newPassword}
                  onChange={(e) => setChangePasswordData({...changePasswordData, newPassword: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  value={changePasswordData.confirmPassword}
                  onChange={(e) => setChangePasswordData({...changePasswordData, confirmPassword: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePasswordModal(false);
                    setChangePasswordData({
                      username: '',
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cambiar Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastNotification />
    </div>
  );
};

export default AdminLogin; 