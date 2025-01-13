// Noticias.jsx
import React, { useState, useEffect, useRef } from 'react';
import Carrusel from './Carrusel';
import noticiasData from './noticiasData';
import Articulo from './Articulo'; // Importar el nuevo componente

const Noticias = () => {
    const [columnas, setColumnas] = useState([[], []]);
    const articleRefs = useRef([]);

    useEffect(() => {
        prerenderizarYDistribuirArticulos(noticiasData);
    }, []);

    const prerenderizarYDistribuirArticulos = (noticias) => {
        const nuevaColumnas = [[], []];
        const alturasSimuladas = [];
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.visibility = 'hidden';
        document.body.appendChild(tempDiv);

        noticias.forEach((noticia) => {
            tempDiv.innerHTML = `
                <h3 style="font-size: 1.25rem; font-weight: bold;">${noticia.titulo}</h3>
                <p style="margin: 0;">${noticia.descripcion}</p>
            `;
            const height = tempDiv.offsetHeight;
            alturasSimuladas.push(height);
        });

        document.body.removeChild(tempDiv);

        let totalAlturaColumna1 = 0;
        let totalAlturaColumna2 = 0;

        noticias.forEach((noticia, index) => {
            if (totalAlturaColumna1 <= totalAlturaColumna2) {
                nuevaColumnas[0].push(noticia);
                totalAlturaColumna1 += alturasSimuladas[index];
            } else {
                nuevaColumnas[1].push(noticia);
                totalAlturaColumna2 += alturasSimuladas[index];
            }
        });

        setColumnas(nuevaColumnas);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Carrusel noticias={noticiasData} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Columna Izquierda */}
                <div className="grid gap-6">
                    {columnas[0].map((noticia, index) => (
                        <Articulo key={index} noticia={noticia} ref={el => articleRefs.current[index] = el} />
                    ))}
                </div>

                {/* Columna Derecha */}
                <div className="grid gap-6">
                    {columnas[1].map((noticia, index) => (
                        <Articulo key={index} noticia={noticia} ref={el => articleRefs.current[index + columnas[0].length] = el} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Noticias;
