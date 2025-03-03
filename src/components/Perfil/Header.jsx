import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa"; // Mantenemos el ícono de eliminar

import GenericModal from '../generics/GenericModal';
import { deleteAccountModalConfig } from '../helpers/ModalConfigurations';
import { notifySuccess, notifyError } from '../Administracion/components/ToastNotification';
import ToastNotification from '../Administracion/components/ToastNotification';

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
                notifySuccess('Cuenta eliminada con éxito');
                setTimeout(() => {
                    localStorage.clear(); // Limpiar localStorage
                    window.location.href = '/'; // Redirigir al inicio
                }, 2000); // Esperar 2 segundos para que el usuario vea la notificación
            } else {
                notifyError('Error al eliminar la cuenta. Verifica tu contraseña');
            }
        } catch (error) {
            console.error('Error:', error);
            notifyError('Error al eliminar la cuenta. Intente más tarde');
        }
    };

    return (
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center bg-gray-900 text-white p-6 w-full">
                {/* Información del usuario */}
                <h1 className="text-xl font-semibold">Bienvenid@</h1>

                {/* Botón de eliminar cuenta */}
                <button onClick={() => setDeleteModalOpen(true)} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-full shadow-md ml-auto">
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
                        content: "w-[400px] text-black",
                    }}
                />
                
                <ToastNotification />
            </div>
          </div>
          
    );
};

export default Header;