import React, { useState } from 'react';

const Perfil = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('Persona');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === 'test' && password === 'password') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setName('');
    setUserType('Persona');
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen" 
      style={{ 
        backgroundImage: 'url("/ruta/a/tu/imagen.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {isAuthenticated ? (
          <div>
            <h1 className="text-3xl font-semibold text-center mb-4">Perfil</h1>
            <p><strong>Nombre:</strong> {name}</p>
            <p><strong>Nombre de Usuario:</strong> {username}</p>
            <p><strong>Tipo de Usuario:</strong> {userType}</p>
            <button 
              onClick={handleLogout} 
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-semibold text-center mb-4">{isRegistering ? 'Registro' : 'Iniciar Sesión'}</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {isRegistering ? (
              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Tipo de Usuario</label>
                  <select 
                    value={userType} 
                    onChange={(e) => setUserType(e.target.value)} 
                    className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Empresa">Empresa</option>
                    <option value="Persona">Persona</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Nombre</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Nombre de Usuario</label>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Contraseña</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">Registrar</button>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Nombre de Usuario</label>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Contraseña</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">Iniciar Sesión</button>
              </form>
            )}
            {/* Botón para cambiar entre Login y Registro */}
            <p className="mt-4 text-center">
              {isRegistering ? (
                <>¿Ya tienes cuenta? <button onClick={() => setIsRegistering(false)} className="text-blue-500 underline">Iniciar Sesión</button></>
              ) : (
                <>¿No tienes cuenta? <button onClick={() => setIsRegistering(true)} className="text-blue-500 underline">Registrarse</button></>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Perfil;
