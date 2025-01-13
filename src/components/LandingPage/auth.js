// auth.js
const API_URL = 'http://localhost:3001'; // Cambia esto si tu servidor está en otra URL

export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Error en la autenticación');
        }

        const data = await response.json();
        return data.token; // Retorna el token
    } catch (error) {
        throw error; // Propaga el error para manejarlo en el componente
    }
};
