import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001'; // Change this if your server is at a different URL

const useEmpresaInfoLogic = () => {
    const [empresa, setEmpresa] = useState(null);
    const [jobOffers, setJobOffers] = useState([]); // State for job offers
    const id = localStorage.getItem('id'); // Get the user ID

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

    const reloadEmpresaInfo = () => {
        fetchEmpresaData(); // Call fetchEmpresaData to reload the data
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditingName, setEditingName] = useState(false);
    const [isEditingAddress, setEditingAddress] = useState(false);
    const [isEditingType, setEditingType] = useState(false);
    const [isEditingDescription, setEditingDescription] = useState(false);
    
    const [editedName, setEditedName] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [editedProvince, setEditedProvince] = useState('');
    const [editedMunicipality, setEditedMunicipality] = useState('');
    const [editedType, setEditedType] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    useEffect(() => {
        if (empresa) {
            setEditedName(empresa.nombre || '');
            setEditedAddress(`${empresa.provincia || ''}, ${empresa.municipio || ''}`);
            setEditedProvince(empresa.provincia || '');
            setEditedMunicipality(empresa.municipio || '');
            setEditedType(empresa.tipo || '');
            setEditedDescription(empresa.descripcion || '');
        }
    }, [empresa]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = async (id, API_URL) => {
        try {
            const response = await fetch(`${API_URL}/updateempresa`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    nombre: editedName,
                    tipo: editedType,
                    descripcion: editedDescription,
                    provincia: editedProvince,
                    municipio: editedMunicipality,
                }),
            });

            if (!response.ok) {
                throw new Error('Error updating company information');
            }

            const result = await response.text();
            console.log(result); // Log the response from the server

            // Reload useEmpresaInfo to get updated data
            reloadEmpresaInfo(); // Ensure this function is available to get updated information

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return {
        empresa,
        jobOffers,
        isModalOpen,
        setModalOpen,
        isEditingName,
        setEditingName,
        isEditingAddress,
        setEditingAddress,
        isEditingType,
        setEditingType,
        isEditingDescription,
        setEditingDescription,
        editedName,
        setEditedName,
        editedAddress,
        setEditedAddress,
        editedProvince,
        setEditedProvince,
        editedMunicipality,
        setEditedMunicipality,
        editedType,
        setEditedType,
        editedDescription,
        setEditedDescription,
        handleOpenModal,
        handleCloseModal,
        handleSubmit,
        reloadEmpresaInfo,
    };
};

export default useEmpresaInfoLogic;
