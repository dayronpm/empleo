import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa"; // Mantenemos el ícono de eliminar

import GenericModal from '../generics/GenericModal';
import { deleteAccountModalConfig } from '../helpers/ModalConfigurations';

const Header = () => {
    // Estado para controlar el modal de eliminación de cuenta
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    // Función para manejar la eliminación de la cuenta
    const handleDeleteAccount = async (password) => {
        const id = localStorage.getItem('id'); // Obtener el ID del usuario
        try {
            const response = await fetch('http://localhost:3001/borrarusuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, password }), // Enviar ID y contraseña
            });

            if (response.ok) {
                alert('Cuenta eliminada con éxito.');
                localStorage.clear(); // Limpiar localStorage
                window.location.href = '/'; // Redirigir al inicio
            } else {
                alert('Error al eliminar la cuenta. Verifica tu contraseña.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar la cuenta.');
        }
    };

    return (
          <div className="container mx-auto flex justify-between items-center bg-gray-900 text-white p-6">
            {/* Información del usuario */}
            <h1>Bienvenid@</h1>

            {/* Botón de eliminar cuenta */}
            <button onClick={() => setDeleteModalOpen(true)} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-full shadow-md">
              <FaTrashAlt className="text-white" /> Eliminar cuenta
            </button>

            {/* Modal de confirmación de eliminación */}
            <GenericModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onSubmit={(data) => handleDeleteAccount(data.password)}
                {...deleteAccountModalConfig}
                customStyles={{
                    overlay: "bg-black bg-opacity-70",
                    content: "w-[400px] text-black", // Asegurar que el texto dentro del modal sea negro
                }}
            />
            
          </div>
          
    );
};

export default Header;