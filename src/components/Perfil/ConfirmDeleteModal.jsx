import React from 'react';

const ConfirmDeleteModal = ({ isOpen, job, onClose, onConfirm }) => {
    const [confirmationWord, setConfirmationWord] = React.useState('');

    const handleConfirm = () => {
        if (confirmationWord.toLowerCase() === job.titulo.split(' ')[0].toLowerCase()) {
            onConfirm(); // Confirmar eliminación si la palabra coincide
            onClose();
        } else {
            alert('La palabra no coincide con el título del trabajo.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Confirmar eliminación</h2>
                <p className="mb-4">
                    Por favor, ingrese la primera palabra del título "{job.titulo}" para confirmar.
                </p>
                <input 
                    type="text" 
                    value={confirmationWord} 
                    onChange={(e) => setConfirmationWord(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <div className="flex justify-end">
                    <button 
                        onClick={onClose} 
                        className="mr-2 bg-gray-400 text-white p-1 rounded hover:bg-gray-500"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={handleConfirm} 
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;