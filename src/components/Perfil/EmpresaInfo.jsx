import React from 'react';
import useEmpresaInfoLogic from './useEmpresaInfoLogic';
import JobOfferModal from '../Ofertas/JobOfferModal';
import JobList from '../Ofertas/JobList';
import { provincesAndMunicipalities } from './data';
import DeleteAccountModal from './DeleteAccountModal'; // Import the DeleteAccountModal

const EmpresaInfo = () => {
    const {
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
        handleDeleteAccount, // Use the existing delete account logic
        isDeleteModalOpen, // Use the existing delete modal state
        setDeleteModalOpen, // Use the existing delete modal state setter
    } = useEmpresaInfoLogic();

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
                        <button onClick={() => { setEditingName(false); handleSubmit(localStorage.getItem('id'), 'http://localhost:3001'); }} className="ml-2 bg-yellow-500 text-white p-1 rounded">
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
                        <button onClick={() => { setEditingAddress(false); handleSubmit(localStorage.getItem('id'), 'http://localhost:3001'); }} className="ml-2 bg-yellow-500 text-white p-1 rounded">
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
                        <button onClick={() => { setEditingType(false); handleSubmit(localStorage.getItem('id'), 'http://localhost:3001'); }} className="ml-2 bg-yellow-500 text-white p-1 rounded">
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
                    <button onClick={() => { setEditingDescription(false); handleSubmit(localStorage.getItem('id'), 'http://localhost:3001'); }} className="ml-2 bg-yellow-500 text-white p-1 rounded">
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

            {/* Add the delete account button */}
            <button onClick={() => setDeleteModalOpen(true)} className="mt-4 bg-red-500 text-white p-2 rounded">
                Eliminar Cuenta
            </button>

            {/* Render the DeleteAccountModal */}
            <DeleteAccountModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setDeleteModalOpen(false)} 
                onDelete={handleDeleteAccount} 
            />
        </div>
    );
};

export default EmpresaInfo;
