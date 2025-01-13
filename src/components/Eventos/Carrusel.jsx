import React, { useState, useEffect } from 'react';

const Carrusel = ({ noticias }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % noticias.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + noticias.length) % noticias.length);
    };

    // Navegación automática
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // Cambia de slide cada 5 segundos
        return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }, []);

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-4">
                <button 
                    onClick={prevSlide} 
                    className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none"
                    aria-label="Previous Slide"
                >
                    &lt;
                </button>
                <h2 className="text-2xl font-bold">Carrusel de Noticias</h2>
                <button 
                    onClick={nextSlide} 
                    className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none"
                    aria-label="Next Slide"
                >
                    &gt;
                </button>
            </div>

            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-700 ease-in-out" // Animación más suave
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {noticias.map((noticia, index) => (
                        <div key={index} className="min-w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 flex flex-col md:flex-row">
                            <img 
                                src={noticia.imagen} 
                                alt={noticia.titulo} 
                                className="w-full md:w-32 h-auto rounded mb-4 md:mb-0 md:mr-4" // Responsive image
                            />
                            <div className="flex flex-col justify-between">
                                <h3 className="text-xl font-semibold text-black">{noticia.titulo}</h3>
                                <p className="text-gray-500 italic">{noticia.fecha} | {noticia.categoria}</p>
                                <p className="text-gray-700 mt-2 line-clamp-2">{noticia.descripcion}</p> {/* Aplicar line clamp */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Indicador de posición */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {noticias.map((_, index) => (
                    <span 
                        key={index} 
                        className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carrusel;
