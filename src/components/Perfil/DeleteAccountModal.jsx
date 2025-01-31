import React, { useState } from 'react';

const DeleteAccountModal = ({ isOpen, onClose, onDelete }) => {
    const [password, setPassword] = useState('');

    const handleDelete = () => {
        onDelete(password);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Eliminar Cuenta</h2>
                <p>Por favor, ingresa tu contraseña para confirmar:</p>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full mb-4"
                    placeholder="Contraseña"
                />
                <div className="flex justify-end">
                    <button onClick={onClose} className="mr-2 bg-gray-300 p-2 rounded">Cancelar</button>
                    <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Eliminar</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
