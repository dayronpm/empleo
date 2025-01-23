import React, { useState, useEffect } from 'react';
import useEmpresaInfo from './getEmpresaInfo';
import JobOfferModal from '../Ofertas/JobOfferModal';
import JobList from '../Ofertas/JobList';
import { provincesAndMunicipalities } from './data';


const id = localStorage.getItem('id'); // Obtener el ID del usuario
const API_URL = 'http://localhost:3001'; // Cambia esto si tu servidor está en otra URL

const EmpresaInfo = () => {
    const { empresa, jobOffers } = useEmpresaInfo();
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

    const handleSubmit = async () => {
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
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSaveName = () => {
        setEditingName(false);
        handleSubmit(); // Call the submit function
    };

    const handleSaveAddress = () => {
        setEditedAddress(`${editedProvince}, ${editedMunicipality}`);
        setEditingAddress(false);
        handleSubmit(); // Call the submit function
    };

    const handleSaveType = () => {
        setEditingType(false);
        handleSubmit(); // Call the submit function
    };

    const handleSaveDescription = () => {
        setEditingDescription(false);
        handleSubmit(); // Call the submit function
    };

    if (!empresa) {
        return <p>Cargando información de la empresa...</p>;
    }

    return (
        <div className="empresa-info bg-white p-6 border border-gray-300 rounded-lg mt-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                {isEditingName ? (
                    <div className="flex items-center">
                        <input 
                            className="text-lg" 
                            value={editedName} 
                            onChange={(e) => setEditedName(e.target.value)} 
                        />
                        <button onClick={handleSaveName} className="ml-2 bg-yellow-500 text-white p-1 rounded">
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <h2 className="text-2xl font-semibold mb-2">{editedName}</h2>
                        <button onClick={() => setEditingName(true)} className="ml-2 bg-yellow-500 text-white p-1 rounded">
                            Edit
                        </button>
                    </div>
                )}

                {isEditingAddress ? (
                    <div className="flex items-center">
                        <label className="text-lg font-semibold">Dirección:</label>
                        <select 
                            className="text-lg" 
                            value={editedProvince} 
                            onChange={(e) => {
                                setEditedProvince(e.target.value);
                                setEditedMunicipality(''); 
                            }}
                        >
                            {Object.keys(provincesAndMunicipalities).map((province) => (
                                <option key={province} value={province}>{province}</option>
                            ))}
                        </select>
                        <select 
                            className="text-lg ml-2" 
                            value={editedMunicipality} 
                            onChange={(e) => setEditedMunicipality(e.target.value)} 
                        >
                            {provincesAndMunicipalities[editedProvince]?.map((municipality) => (
                                <option key={municipality} value={municipality}>{municipality}</option>
                            ))}
                        </select>
                        <button onClick={handleSaveAddress} className="ml-2 bg-yellow-500 text-white p-1 rounded">
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <p className="text-gray-600 mb-2">
                            <strong>Dirección:</strong> {editedAddress}
                        </p>
                        <button onClick={() => setEditingAddress(true)} className="ml-2 bg-yellow-500 text-white p-1 rounded">
                            Edit
                        </button>
                    </div>
                )}

                {isEditingType ? (
                    <div className="flex items-center">
                        <label className="text-lg font-semibold">Tipo:</label>
                        <select 
                            className="text-lg" 
                            value={editedType} 
                            onChange={(e) => setEditedType(e.target.value)} 
                        >
                            <option value="Estatal">Estatal</option>
                            <option value="No estatal">No estatal</option>
                        </select>
                        <button onClick={handleSaveType} className="ml-2 bg-yellow-500 text-white p-1 rounded">
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <p className={`text-gray-800 mb-2 ${editedType === "Estatal" ? "bg-green-200" : editedType === "No estatal" ? "bg-red-200" : ""}`}>
                            <strong>Tipo:</strong> {editedType}
                        </p>
                        <button onClick={() => setEditingType(true)} className="ml-2 bg-yellow-500 text-white p-1 rounded">
                            Edit
                        </button>
                    </div>
                )}
            </div>

            <div className="flex items-center">
                <label className="text-lg font-semibold">Descripción:</label>
                {isEditingDescription ? null : (
                    <button onClick={() => setEditingDescription(true)} className="ml-2 bg-yellow-500 text-white p-1 rounded">
                        Edit
                    </button>
                )}
            </div>
            {isEditingDescription ? (
                <div className="flex items-center">
                    <textarea 
                        className="text-lg w-full" 
                        value={editedDescription} 
                        onChange={(e) => setEditedDescription(e.target.value)} 
                    />
                    <button onClick={handleSaveDescription} className="ml-2 bg-yellow-500 text-white p-1 rounded">
                        Save
                    </button>
                </div>
            ) : (
                <div className="flex items-center">
                    <p className="text-gray-800 mb-2">{editedDescription}</p>
                </div>
            )}

            <h3 className="text-xl font-semibold mt-4">Ofertas de Trabajo</h3>
            <button onClick={handleOpenModal} className="mt-4 mb-4 bg-blue-500 text-white p-2 rounded">Agregar Oferta de Trabajo</button>
            <JobOfferModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <JobList jobs={jobOffers} />
        </div>
    );
};

export default EmpresaInfo;
