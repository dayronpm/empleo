import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_URL = 'http://localhost:3001'; // Change this if your server is at a different URL

const usePersonalInfo = () => {

    // Hook para manejar la navegación entre rutas en la aplicación
    const navigate = useNavigate();
    
    // Estado para almacenar la información del usuario. Inicialmente es null.
    const [usuario, setUsuario] = useState(null);

    // Obtiene el ID del usuario almacenado en localStorage.
    const id = localStorage.getItem('id');

    //Cargar datos del usuario
    const fetchUserData = async () => {
        try {
            const response = await fetch(`${API_URL}/usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Send user ID in the body
            });
            if (!response.ok) {
                throw new Error('Error al cargar la información del usuario');
            }
            const data = await response.json();
            setUsuario(data);
        } catch (error) {
            console.error(error);
        }
    };

    //Llamar a la función para cargar datos del usuario
    useEffect(() => {
        fetchUserData();
    }, []);

    return {
        usuario,
        setUsuario
    }

}

export default usePersonalInfo