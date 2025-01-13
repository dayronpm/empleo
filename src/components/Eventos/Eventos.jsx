import React, { useState } from 'react';
import eventosData from './eventosData';
import Noticias from './Noticias';
import Calendario from './Calendario';
import EventosList from './EventosList'; // Importación del componente EventosList
import NavBar from './NavBar'; // Importación del nuevo componente NavBar

const Eventos = () => {
    const [activeTab, setActiveTab] = useState('eventos');

    const renderContent = () => {
        switch (activeTab) {
            case 'eventos':
                return <EventosList eventosData={eventosData} />; // Renderizar el componente EventosList
            case 'noticias':
                return <Noticias />;
            case 'calendario':
                return <Calendario />;
            default:
                return null;
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-black mb-8">Eventos y Noticias y más</h1>

            {/* Barra de Navegación */}
            <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Contenido según la pestaña activa */}
            {renderContent()}
        </div>
    );
};

export default Eventos;
