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
    
    // Estados para errores específicos de cada campo
    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    
    // Estado para indicar si el formulario ha sido enviado
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Función para validar el nombre
    const validateName = (value) => {
        if (!value.trim()) {
            setNameError('El nombre es obligatorio');
            return false;
        }
        setNameError('');
        return true;
    };

    // Función para validar el nombre de usuario
    const validateUsername = (value) => {
        if (!value.trim()) {
            setUsernameError('El nombre de usuario es obligatorio');
            return false;
        }
        if (value.length < 4) {
            setUsernameError('El nombre de usuario debe tener al menos 4 caracteres');
            return false;
        }
        setUsernameError('');
        return true;
    };

    // Función para validar la contraseña
    const validatePassword = (value) => {
        if (!value) {
            setPasswordError('La contraseña es obligatoria');
            return false;
        }
        if (value.length < 6) {
            setPasswordError('La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        setPasswordError('');
        return true;
    };

    // Función para validar la confirmación de contraseña
    const validateConfirmPassword = (value) => {
        if (!value) {
            setConfirmPasswordError('Debe confirmar la contraseña');
            return false;
        }
        if (value !== password) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            return false;
        }
        setConfirmPasswordError('');
        return true;
    };

    // Función para validar todos los campos
    const validateForm = () => {
        const isNameValid = validateName(name);
        const isUsernameValid = validateUsername(username);
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
        
        return isNameValid && isUsernameValid && isPasswordValid && isConfirmPasswordValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        
        // Validar todos los campos antes de enviar
        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }
        
        try {
            console.log('Enviando datos al servidor:', { username, password, userType, name });
            
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, userType, name }),
            });
            
            console.log('Respuesta del servidor:', response.status);
            
            const data = await response.json();
            console.log('Datos de respuesta:', data);
            
            if (!response.ok) {
                if (data.error === "Nombre de usuario ya en uso") {
                    setUsernameError(data.error);
                } else {
                    setError(data.error || 'Error al registrar usuario');
                }
                setIsSubmitting(false);
                return;
            }

            // Si llegamos aquí, el registro fue exitoso
            setName('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setError('');
            setNameError('');
            setUsernameError('');
            setPasswordError('');
            setConfirmPasswordError('');

            // Login automático tras el registro
            try {
                const loginData = await loginUser(username, password);
                localStorage.setItem('token', loginData.token);
                localStorage.setItem('username', username);
                localStorage.setItem('tipo', loginData.tipo);
                localStorage.setItem('id', loginData.id);
                localStorage.setItem('password', password);
                handleLoginSuccess(username);
                onClose();
            } catch (loginError) {
                console.error('Error en login:', loginError);
                setError('Error al iniciar sesión automáticamente. Por favor, inicie sesión manualmente.');
            }
        } catch (error) {
            setError(`Error de conexión. Por favor, inténtelo de nuevo.`);
        } finally {
            setIsSubmitting(false);
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

    // Limpiar errores al abrir/cerrar el modal
    useEffect(() => {
        if (isOpen) {
            setError('');
            setNameError('');
            setUsernameError('');
            setPasswordError('');
            setConfirmPasswordError('');
        }
    }, [isOpen]);

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
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-1">
                            Nombre completo <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (nameError) validateName(e.target.value);
                            }}
                            onBlur={(e) => validateName(e.target.value)}
                            required
                            className={`border ${nameError ? 'border-red-500' : 'border-gray-300'} p-2 rounded w-full`}
                            aria-label="Nombre"
                            aria-invalid={!!nameError}
                            aria-describedby={nameError ? "name-error" : undefined}
                        />
                        {nameError && (
                            <p id="name-error" className="text-red-500 text-sm mt-1">{nameError}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-1">
                            Nombre de usuario <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                if (usernameError) validateUsername(e.target.value);
                            }}
                            onBlur={(e) => validateUsername(e.target.value)}
                            required
                            className={`border ${usernameError ? 'border-red-500' : 'border-gray-300'} p-2 rounded w-full`}
                            aria-label="Nombre de usuario"
                            aria-invalid={!!usernameError}
                            aria-describedby={usernameError ? "username-error" : undefined}
                        />
                        {usernameError && (
                            <p id="username-error" className="text-red-500 text-sm mt-1">{usernameError}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-1">
                            Contraseña <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="password"
                            type={showPasswords ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (passwordError) validatePassword(e.target.value);
                                if (confirmPassword) validateConfirmPassword(confirmPassword);
                            }}
                            onBlur={(e) => validatePassword(e.target.value)}
                            required
                            className={`border ${passwordError ? 'border-red-500' : 'border-gray-300'} p-2 rounded w-full`}
                            aria-label="Contraseña"
                            aria-invalid={!!passwordError}
                            aria-describedby={passwordError ? "password-error" : undefined}
                        />
                        {passwordError && (
                            <p id="password-error" className="text-red-500 text-sm mt-1">{passwordError}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-1">
                            Verificar contraseña <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="confirmPassword"
                            type={showPasswords ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                if (confirmPasswordError) validateConfirmPassword(e.target.value);
                            }}
                            onBlur={(e) => validateConfirmPassword(e.target.value)}
                            required
                            className={`border ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'} p-2 rounded w-full`}
                            aria-label="Verificar contraseña"
                            aria-invalid={!!confirmPasswordError}
                            aria-describedby={confirmPasswordError ? "confirm-password-error" : undefined}
                        />
                        {confirmPasswordError && (
                            <p id="confirm-password-error" className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
                        )}
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

                    {/* Mensaje de campos obligatorios */}
                    <p className="text-sm text-gray-500">
                        <span className="text-red-500">*</span> Campos obligatorios
                    </p>

                    {/* Botón para registrar */}
                    <button
                        type="submit"
                        className={`${
                            isSubmitting 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-gray-200 hover:bg-gray-300'
                        } text-black py-2 px-4 rounded w-full transition-colors duration-200 mt-4`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Registrando...' : 'Registrar'}
                    </button>
                </form>

                {/* Mensajes de error debajo del botón de registrar */}
                {error && (
                    <p className="text-red-500 mt-2 text-center">{error}</p>
                )}

                {/* Botón para volver al modal de inicio de sesión */}
                <button 
                    onClick={() => { onClose(); openLogin(); }} 
                    className="mt-4 bg-blue-400 text-black py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors duration-200"
                    disabled={isSubmitting}
                >
                    ¿Ya tienes cuenta? Iniciar sesión
                </button>
            </div>
        </div>
    );
};

export default RegisterModal;
