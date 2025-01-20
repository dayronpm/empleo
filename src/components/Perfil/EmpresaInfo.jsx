import React from 'react';

const EmpresaInfo = () => {
    // Datos de prueba
    const empresa = {
        nombre: "Tech Solutions S.A.",
        direccion: "Av. Innovación 123, Ciudad Tech",
        descripcion: "Tech Solutions S.A. es una empresa líder en soluciones tecnológicas, ofreciendo servicios de desarrollo de software y consultoría para empresas de todos los tamaños."
    };

    return (
        <div className="empresa-info p-4 border border-gray-300 rounded-lg mt-4 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">{empresa.nombre}</h2>
            <p className="text-gray-600 mb-2"><strong>Dirección:</strong> {empresa.direccion}</p>
            <p className="text-gray-800">{empresa.descripcion}</p>
        </div>
    );
};

export default EmpresaInfo;
