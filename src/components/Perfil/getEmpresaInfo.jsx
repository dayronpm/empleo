import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3001'; // Cambia esto si tu servidor está en otra URL

const useEmpresaInfo = () => {
    const [empresa, setEmpresa] = useState(null);
    const [jobOffers, setJobOffers] = useState([]); // State for job offers
    const id = localStorage.getItem('id'); // Obtener el ID del usuario

    const fetchEmpresaData = async () => {
        try {
            const response = await fetch(`${API_URL}/empresa`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Send user ID in the body
            });
            if (!response.ok) {
                throw new Error('Error al cargar la información de la empresa');
            }
            const data = await response.json();
            setEmpresa(data);

            // Fetch job offers
            const offersResponse = await fetch(`${API_URL}/getoferta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Send user ID in the body
            });
            if (!offersResponse.ok) {
                throw new Error('Error al cargar las ofertas de trabajo');
            }
            const offersData = await offersResponse.json();
            setJobOffers(offersData); // Set job offers in state
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEmpresaData();
    }, []);

    return { empresa, jobOffers }; // Return both empresa and jobOffers
};

export default useEmpresaInfo;
