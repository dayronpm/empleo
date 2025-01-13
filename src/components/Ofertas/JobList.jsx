import React from 'react';

const JobList = ({ jobs, onJobSelect }) => {
    return (
        <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
            {jobs.map((job) => (
                <div key={job.id} className="p-4 hover:bg-gray-100 cursor-pointer transition duration-200" onClick={() => onJobSelect(job)}>
                    {/* Título y tipo en una fila completa */}
                    <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                            <h2 className="text-lg font-bold text-blue-600">{job.title}</h2>
                            <span className={`ml-2 text-black font-semibold rounded-full px-2 py-1 ${job.type === 'Estatal' ? 'bg-green-200' : 'bg-red-200'}`}>
                                {job.type}
                            </span>
                        </div>
                    </div>
                    {/* Tabla de información */}
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-1 flex flex-col">
                            <p className="text-gray-700">{job.company}</p>
                            <p className="text-gray-500">{job.location}</p>
                        </div>
                        <div className="col-span-1 text-left">
                            <p className="text-gray-600 font-semibold">{job.salary}</p>
                            <p className="text-gray-400 text-sm">{job.date}</p>
                        </div>
                        {/* Descripción con límite de líneas */}
                        <div className="col-span-4 flex-grow">
                            <p className="text-gray-600 line-clamp-2">{job.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JobList;
