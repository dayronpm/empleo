import React, { useState, useEffect } from 'react';
import { loginUser } from './auth'; // Importa la función de autenticación

const AuthModal = ({ isOpen, onClose, openRegister, handleLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(true); // Estado para mostrar/ocultar contraseña

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Todos los campos son obligatorios');
            return;
        }

        setError('');

        try {
            const token = await loginUser(username, password);
            console.log('Token recibido:', token);
            localStorage.setItem('token', token);
            localStorage.setItem('username', username); // Guardar nombre de usuario
            
            handleLoginSuccess(username); // Llama a la función para actualizar el estado en LandingPage
            onClose(); // Cierra el modal al iniciar sesión exitosamente

        } catch (error) {
            setError('Usuario o contraseña incorrectos.');
        }
    };

    // Cerrar el modal al presionar Esc
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                resetForm(); // Reinicia el formulario al cerrar
                onClose();
            }
        };
        
        window.addEventListener('keydown', handleEsc);
        
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    // Reinicia los campos del formulario
    const resetForm = () => {
        setUsername('');
        setPassword('');
        setError('');
        setShowPassword(true); // Opcional: reiniciar el estado de mostrar/ocultar contraseña
    };

    // Reinicia el formulario cuando se cierra el modal
    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    if (!isOpen) return null; // Si no está abierto, no renderiza nada

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm" role="dialog" aria-labelledby="modal-title" aria-modal="true">
                <div className="flex justify-between items-center mb-4">
                    <h1 id="modal-title" className="text-xl font-bold text-black">Bienvenido</h1>
                    <button 
                        onClick={() => { resetForm(); onClose(); }} 
                        className="bg-gray-200 text-black rounded-full p-1 hover:bg-gray-300" 
                        aria-label="Cerrar modal"
                    >
                        <span className="font-bold">X</span>
                    </button>
                </div>
                
                {/* Mensaje de error si existe */}
                {error && <p className="text-red-500">{error}</p>}
                
                {/* Formulario de inicio de sesión */}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-1">Nombre de usuario</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="border border-gray-300 p-2 rounded w-full mb-4"
                        aria-label="Nombre de usuario"
                    />
                    
                    <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-1">Contraseña</label>
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'} // Cambia entre texto y contraseña
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border border-gray-300 p-2 rounded w-full mb-2"
                        aria-label="Contraseña"
                    />
                    
                    {/* Checkbox para mostrar/ocultar la contraseña */}
                    <div className="flex items-center mb-4">
                        <input 
                            type="checkbox" 
                            id="show-password" 
                            checked={showPassword} 
                            onChange={() => setShowPassword(!showPassword)} 
                            className="mr-2"
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        />
                        <label htmlFor="show-password" className="text-sm text-gray-700">Mostrar contraseña</label>
                    </div>

                    {/* Botón para iniciar sesión */}
                    <button type="submit" className="bg-gray-200 text-black py-2 px-4 rounded w-full hover:bg-gray-300 transition-colors duration-200">Iniciar Sesión</button>
                </form>

                {/* Botón para abrir el modal de registro */}
                <button onClick={() => { resetForm(); onClose(); openRegister(); }} className="mt-4 bg-blue-400 text-black py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors duration-200">Crear nueva cuenta</button>

                {/* Enlace para recuperar contraseña */}
                <div className="mt-4 text-center">
                    <a href="/recuperar-contraseña" className="text-black hover:text-gray-700">¿Olvidaste tu contraseña?</a>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
