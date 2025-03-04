import React from 'react';

const JobDetails = ({ job, onClose }) => {

    job.fecha = new Date(job.fecha).toISOString().split('T')[0];

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50`}>
            <div className={`bg-white rounded-lg p-6 w-full max-w-4xl overflow-y-auto`} style={{ maxHeight: '90vh' }}>
                <h2 className={`text-xl font-bold mb-4 flex justify-between`}>
                    {job.titulo}
                    <span className={`ml-2 text-black font-semibold rounded-full px-2 py-1 ${job.tipo === 'Estatal' ? 'bg-green-200' : 'bg-red-200'}`}>
                        {job.tipo}
                    </span>
                </h2>

                {/* Tabla para Empresa, Ubicación, Salario y Fecha */}
                <div className="mb-4">
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className=" px-4 py-2"><strong>Empresa:</strong> {job.company}</td>

                                <td className=" px-4 py-2"><strong>Provincia:</strong> {job.provincia}</td>
                                <td className=" px-4 py-2"><strong>Municipio:</strong> {job.municipio}</td>
                            </tr>
                            <tr>
                                <td className=" px-4 py-2"><strong>Salario:</strong> {job.salario}</td>
                                <td className=" px-4 py-2"><strong>Fecha:</strong> {job.fecha}</td>
                                <td className=" px-4 py-2"><strong>Nivel de experiencia:</strong> {job.experiencia}</td>
                                <td className=" px-4 py-2"><strong>Categoría:</strong> {job.categoria}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Otros Detalles */}
                <p><strong>Requisitos:</strong></p> 
                <p>{job.requerimientos}</p>
                <p><strong>Beneficios:</strong></p>
                <p>{job.beneficios}</p>
                <p><strong>Descripción:</strong></p>
                <p>{job.descripcion}</p>
                <p><strong>Proceso de aplicación:</strong></p>
                <p>{job.aplicacion}</p>


                {/* Botón para cerrar el pop-up */}
                <button onClick={onClose} className={`mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700`}>
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default JobDetails;
