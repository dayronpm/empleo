import React from 'react';

const Pagination = ({ currentPage, totalJobs, jobsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalJobs / jobsPerPage);

    return (
        <div className="flex justify-between mt-6">
            <button 
                onClick={() => onPageChange(currentPage - 1)} 
                className={`bg-blue-600 text-black rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} 
                disabled={currentPage === 1}
            >
                Anterior
            </button>

            <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button 
                        key={i} 
                        onClick={() => onPageChange(i + 1)} 
                        className={`rounded-lg px-4 py-2 transition duration-200 ${
                            currentPage === i + 1 
                                ? 'bg-black text-white hover:bg-black' // Fondo negro y texto blanco para la página seleccionada con efecto hover
                                : 'bg-blue-600 text-black hover:bg-blue-500' // Fondo azul y efecto hover más oscuro
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            <button 
                onClick={() => onPageChange(currentPage + 1)} 
                className={`bg-blue-600 text-black rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`} 
                disabled={currentPage === totalPages}
            >
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;
