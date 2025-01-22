import React, { useState } from 'react';
import useEmpresaInfo from './getEmpresaInfo';
import JobOfferModal from '../Ofertas/JobOfferModal';
import JobList from '../Ofertas/JobList';

const EmpresaInfo = () => {
    const { empresa, jobOffers } = useEmpresaInfo();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = (formData) => {
        //De esto se encarga el modal
    };

    if (!empresa) {
        return <p>Cargando información de la empresa...</p>;
    }

    return (
        <div className="empresa-info p-4 border border-gray-300 rounded-lg mt-4 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">{empresa.nombre}</h2>
            <p className="text-gray-600 mb-2">
                <strong>Dirección:</strong> {empresa.provincia}, {empresa.municipio}
                <button className="ml-2 bg-yellow-500 text-white p-1 rounded">Editar</button>
            </p>
            <p className="text-gray-800 mb-2">
                <strong>Tipo:</strong> {empresa.tipo}
                <button className="ml-2 bg-yellow-500 text-white p-1 rounded">Editar</button>
            </p>
            <p className="text-gray-800">
                {empresa.descripcion}
                <button className="ml-2 bg-yellow-500 text-white p-1 rounded">Editar descripción</button>
            </p>
            <button onClick={handleOpenModal} className="mt-4 bg-blue-500 text-white p-2 rounded">Agregar Oferta de Trabajo</button>
            <JobOfferModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
            <h3 className="text-xl font-semibold mt-4">Ofertas de Trabajo</h3>
            <JobList jobs={jobOffers} />
        </div>
    );
};

export default EmpresaInfo;
