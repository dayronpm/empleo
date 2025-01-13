import React from 'react';

const NavBar = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="flex justify-center mb-6">
            <button
                onClick={() => setActiveTab('eventos')}
                className={`px-4 py-2 ${activeTab === 'eventos' ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-l-lg border border-gray-800`}
            >
                Eventos
            </button>
            <button
                onClick={() => setActiveTab('noticias')}
                className={`px-4 py-2 ${activeTab === 'noticias' ? 'bg-gray-800 text-white' : 'bg-white text-black'} border-t border-b border-gray-800`}
            >
                Noticias
            </button>
            <button
                onClick={() => setActiveTab('calendario')}
                className={`px-4 py-2 ${activeTab === 'calendario' ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-r-lg border border-gray-800`}
            >
                Calendario
            </button>
        </nav>
    );
};

export default NavBar;
