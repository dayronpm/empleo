// Articulo.jsx
import React from 'react';

const Articulo = ({ noticia }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 flex flex-col justify-between h-full">
            <div className="flex flex-col flex-grow justify-between">
                {/* Contenedor para el título */}
                <div>
                    <h3 className="text-xl font-semibold text-black">{noticia.titulo}</h3>
                </div>

                {/* Contenedor para la fecha y categoría */}
                <div>
                    <p className="text-gray-500 italic">{noticia.fecha} | {noticia.categoria}</p>
                </div>

                {/* Contenedor para la imagen */}
                <div className="mb-4 mt-4">
                    <img src={noticia.imagen} alt={noticia.titulo} className="w-full h-auto max-w-[500px]" />
                </div>
            </div>

            {/* Descripción fuera del contenedor principal */}
            <p className="text-gray-700 mt-4">{noticia.descripcion}</p>
        </div>
    );
};

export default Articulo;
