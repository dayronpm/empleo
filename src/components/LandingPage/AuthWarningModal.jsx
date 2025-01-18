// src/components/AuthWarningModal.jsx

import React from 'react';

const AuthWarningModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold">Acceso Denegado</h2>
                <p className="mt-2">Debes iniciar sesión para acceder a tu perfil.</p>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthWarningModal;
