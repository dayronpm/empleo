import React, { useEffect, useState } from 'react';
import { loginUser } from './auth'; // Importa la función de autenticación

const API_URL = 'http://localhost:3001'; // Cambia esto si tu servidor está en otra URL

const RegisterModal = ({ isOpen, onClose, openLogin, handleLoginSuccess }) => {
    const [userType, setUserType] = useState('persona'); // Estado para tipo: Empresa o Persona
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPasswords, setShowPasswords] = useState(false); // Estado para mostrar/ocultar contraseñas

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !username || !password || !confirmPassword) {
            setError('Todos los campos son obligatorios');
            return;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, userType, name }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                setError(errorMessage);
                return;
            }

            // Clear the form and close the modal on successful registration
            setName('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setError('');
            onClose(); // Close the modal


            //Login user automaticamente tras el registro
            const data = await loginUser(username, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', username); // Guardar nombre de usuario
            localStorage.setItem('tipo', data.tipo); //Guardar tipo de usuario
            localStorage.setItem('id', data.id);
            console.log('Id:', data.id);
            console.log('Tipo:', data.tipo);
            console.log('Token:', data.token);
                        
                        handleLoginSuccess(username);
        } catch (error) {
            setError('Error al registrar el usuario. Inténtalo de nuevo.');
        }
    };

    // Efecto para manejar el cierre del modal con la tecla Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        // Solo agregar el evento si el modal está abierto
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        // Limpiar el evento al desmontar o cerrar el modal
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg h-auto overflow-y-auto max-h-[90vh]" role="dialog" aria-labelledby="register-title" aria-modal="true">
                <div className="flex justify-between items-center mb-4">
                    <h1 id="register-title" className="text-xl font-bold text-black">Registro</h1>
                    <button 
                        onClick={onClose} 
                        className="bg-gray-200 text-black rounded-full p-1 hover:bg-gray-300" 
                        aria-label="Cerrar modal"
                    >
                        <span className="font-bold">X</span>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="userType" className="block text-lg font-medium text-gray-700 mb-1">Tipo</label>
                        <select 
                            id="userType" 
                            value={userType} 
                            onChange={(e) => setUserType(e.target.value)} 
                            className="border border-gray-300 p-2 rounded w-full"
                        >
                            <option value="persona">Persona</option>
                            <option value="empresa">Empresa</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-1">Nombre completo</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="border border-gray-300 p-2 rounded w-full"
                            aria-label="Nombre"
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-1">Nombre de usuario</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="border border-gray-300 p-2 rounded w-full"
                            aria-label="Nombre de usuario"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-1">Contraseña</label>
                        <input
                            id="password"
                            type={showPasswords ? 'text' : 'password'} // Cambia entre texto y contraseña
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border border-gray-300 p-2 rounded w-full"
                            aria-label="Contraseña"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-1">Verificar contraseña</label>
                        <input
                            id="confirmPassword"
                            type={showPasswords ? 'text' : 'password'} // Cambia entre texto y contraseña
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="border border-gray-300 p-2 rounded w-full"
                            aria-label="Verificar contraseña"
                        />
                    </div>

                    {/* Checkbox para mostrar/ocultar contraseñas */}
                    <div className="flex items-center mb-4">
                        <input 
                            type="checkbox" 
                            id="show-passwords" 
                            checked={showPasswords} 
                            onChange={() => setShowPasswords(!showPasswords)} 
                            className="mr-2"
                        />
                        <label htmlFor="show-passwords" className="text-sm text-gray-700">Mostrar contraseñas</label>
                    </div>

                    {/* Botón para registrar */}
                    <button type="submit" className="bg-gray-200 text-black py-2 px-4 rounded w-full hover:bg-gray-300 transition-colors duration-200 mt-4">Registrar</button>
                </form>

                {/* Mensajes de error debajo del botón de registrar */}
                {error && (
                    <p className="text-red-500 mt-2">{error}</p>
                )}

                {/* Botón para volver al modal de inicio de sesión */}
                <button onClick={() => { onClose(); openLogin(); }} className="mt-4 bg-blue-400 text-black py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors duration-200">¿Ya tienes cuenta? Iniciar sesión</button>
            </div>
        </div>
    );
};

export default RegisterModal;
