import { useState, useEffect } from 'react';
import useEmpresaInfo from './getEmpresaInfo';

const useEmpresaInfoLogic = () => {
    const { empresa, jobOffers, reloadEmpresaInfo } = useEmpresaInfo(); // Asegúrate de que reloadEmpresaInfo esté disponible
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

            // Volver a cargar useEmpresaInfo para obtener los datos actualizados
            reloadEmpresaInfo(); // Asegúrate de que esta función esté disponible para obtener la información actualizada

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
    };
};

export default useEmpresaInfoLogic;
