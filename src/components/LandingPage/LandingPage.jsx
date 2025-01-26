// src/components/LandingPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import RegisterModal from './RegisterModal';
import AuthWarningModal from './AuthWarningModal'; // Importa el nuevo modal
import { createSections } from './sections';
import useAuth from './useAuth';
import ProfileLink from './ProfileLink'; // Importa el nuevo componente

const LandingPage = () => {
    const {
        isLoginOpen,
        isRegisterOpen,
        isAuthenticated,
        username,
        openLogin,
        openRegister,
        handleLogout,
        handleLoginSuccess,
        setLoginOpen,
        setRegisterOpen
    } = useAuth();

    const [isWarningOpen, setWarningOpen] = useState(false); // Estado para el modal de advertencia

    // Crear secciones pasando los estados y funciones necesarias
    const sections = createSections(isAuthenticated, openLogin, openRegister, handleLogout);

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="flex justify-between items-center p-4 bg-white shadow-md">
                <div className="logo">
                    <a href="http://www.mtss.gob.cu">
                        <img src="assets/mtss.png" alt="Logo" className="h-auto w-auto max-h-[60px]" />
                    </a>
                </div>

                {/* Mensaje de bienvenida para usuario autenticado */}
                {isAuthenticated && (
                    <div className="text-lg font-semibold text-black-600 mx-4">
                        Bienvenido, {username}!
                    </div>
                )}

                <nav className="nav">
                    <ul className="flex space-x-4">
                        {sections.map(item => (
                            <li key={item.title} className="flex flex-col items-center">
                                {/* Usar ProfileLink solo para la sección "Perfil" */}
                                {item.title === 'Perfil' ? (
                                    <ProfileLink
                                        to={item.link}
                                        aria-label={item.title}
                                        isAuthenticated={isAuthenticated}
                                        setWarningOpen={setWarningOpen}
                                        className={`flex flex-col items-center text-gray-700 hover:text-red-500 transition-colors duration-200`}
                                    >
                                        <img 
                                            src={item.icon} 
                                            alt={item.title} 
                                            onError={(e) => { e.target.onerror = null; e.target.src = "path/to/default/icon.png"; }} 
                                            className="w-[40px] h-auto mb-1"
                                        />
                                        <span className="text-sm">{item.title}</span> {/* Cambia a un tamaño de texto más pequeño */}
                                    </ProfileLink>
                                ) : (
                                    <Link
                                        to={item.link}
                                        aria-label={item.title}
                                        className={`flex flex-col items-center text-gray-700 hover:text-red-500 transition-colors duration-200`}
                                    >
                                        <img 
                                            src={item.icon} 
                                            alt={item.title} 
                                            onError={(e) => { e.target.onerror = null; e.target.src = "path/to/default/icon.png"; }} 
                                            className="w-[40px] h-auto mb-1"
                                        />
                                        <span className="text-sm">{item.title}</span> {/* Cambia a un tamaño de texto más pequeño */}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <div className="content-container p-[32px]">
                <h1 className="text-center text-xl font-extrabold mb-[12px] p-[16px]">Plataforma de Acceso al Empleo y la Superación Profesional</h1>

                {sections.map((item, index) => (
                    <div key={item.title} className={`flex items-start my-[24px] p-[24px] bg-white rounded-lg shadow-md w-full ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                        <img src={item.icon} alt={item.title} onError={(e) => { e.target.onerror = null; e.target.src = "path/to/default/icon.png"; }} className={`w-[200px] h-auto`} />
                        <div className={`ml-${index % 2 === 0 ? 6 : 0} mr-${index % 2 === 0 ? 0 : 6} flex flex-col w-full`}>
                            {/* Usar ProfileLink solo para la sección "Perfil" */}
                            {item.title === 'Perfil' ? (
                                <ProfileLink
                                    to={item.link}
                                    isAuthenticated={isAuthenticated}
                                    setWarningOpen={setWarningOpen}
                                >
                                    <h2 className="text-lg font-semibold text-center">{item.title}</h2>
                                </ProfileLink>
                            ) : (
                                <Link to={item.link}><h2 className="text-lg font-semibold text-center">{item.title}</h2></Link>
                            )}
                            <p className="text-gray-600 text-center">{item.description}</p>
                            {item.buttons}
                        </div>
                    </div>
                ))}
            </div>

            {/* Renderiza los modales */}
            <AuthModal 
                isOpen={isLoginOpen} 
                onClose={() => setLoginOpen(false)} 
                openRegister={openRegister} 
                handleLoginSuccess={handleLoginSuccess}
            />
            <RegisterModal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)} openLogin={openLogin} handleLoginSuccess={handleLoginSuccess} />
            
            {/* Modal de advertencia */}
            <AuthWarningModal isOpen={isWarningOpen} onClose={() => setWarningOpen(false)} />
        </div>
    );
};

export default LandingPage;
