import React from 'react';
import Curriculum from './Curriculum'; // Importar el componente Curriculum
import EmpresaInfo from './EmpresaInfo'; // Update to import the logic instead

const Perfil = () => {
    // Obtener el tipo de usuario del localStorage
    const userType = localStorage.getItem('tipo');

    return (
        <div className="perfil-container">
            <h1 className="text-3xl text-center font-bold mb-6">Mi Perfil</h1>
            {/* Verificar si el tipo de usuario es 'persona' */}
            {userType === 'persona' ? (
                <Curriculum  /> // Renderizar Curriculum si es tipo 'persona'
            ) : userType === 'empresa' ? (
                <EmpresaInfo /> // Renderizar EmpresaInfo si es tipo 'empresa'
            ) : (
                <p className="text-red-500">Acceso denegado: solo los usuarios de tipo "persona" o "empresa" pueden ver este contenido.</p>
            )}
        </div>
    );
};

export default Perfil;
