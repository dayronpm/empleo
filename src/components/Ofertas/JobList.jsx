import React from 'react';

const JobList = ({ jobs, onJobSelect }) => {

    /*
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    };
    */

    return (
        <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
            {jobs.map((job) => (
                <div key={job.id} className="p-4 hover:bg-gray-100 cursor-pointer transition duration-200 border-b">
                    <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                            <h2 className="text-xl font-bold text-blue-600">{job.titulo}</h2>
                            <span className={`ml-2 text-black font-semibold rounded-full px-2 py-1 ${job.tipo === 'Estatal' ? 'bg-green-200' : 'bg-red-200'}`}>
                                {job.tipo}
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <p className="text-gray-700 font-semibold"><strong>Provincia:</strong> {job.provincia}</p>
                            <p className="text-black"><strong>Municipio:</strong> {job.municipio}</p>
                            <p className="text-gray-600 font-semibold"><strong>Salario:</strong> {job.salario}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-black text-sm"><strong>Fecha:</strong> {job.fecha}</p>
                            <p className="text-gray-600"><strong>Nivel de Experiencia:</strong> {job.experiencia}</p>
                            <p className="text-gray-600"><strong>Categoría:</strong> {job.categoria}</p>
                        </div>
                    </div>
                    <p className="text-gray-600 line-clamp-2"><strong>Descripción:</strong> {job.descripcion}</p>
                    <p className="text-gray-600 line-clamp-2"><strong>Requerimientos:</strong> {job.requerimientos}</p>
                    <p className="text-gray-600 line-clamp-2"><strong>Beneficios:</strong> {job.beneficios}</p>
                    <p className="text-gray-600 line-clamp-2"><strong>Proceso de Aplicación:</strong> {job.aplicacion}</p>
                </div>
            ))}
        </div>
    );
};

export default JobList;
