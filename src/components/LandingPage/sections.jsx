import React from 'react';
import { Link } from 'react-router-dom';

export const createSections = (isAuthenticated, openLogin, openRegister, handleLogout) => {
    return [
        { 
            title: 'Perfil', 
            description: 'Construye un perfil profesional que no solo resalte tus talentos y logros, sino que también cuente tu historia única. Atrae la atención de reclutadores y colegas al mostrar tus habilidades y experiencias de manera impactante.', 
            link: '/perfil', 
            icon: 'assets/perfil.png',
            buttons: (
                <div className="flex justify-center space-x-4 mt-4">
                    {!isAuthenticated ? (
                        <>
                            <button onClick={openLogin} aria-label="Iniciar Sesión" className="bg-gray-800 text-white py-2 px-4 rounded shadow hover:bg-gray-700">Iniciar Sesión</button>
                            <button onClick={openRegister} aria-label="Registro" className="bg-gray-800 text-white py-2 px-4 rounded shadow hover:bg-gray-700">Registro</button>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600">Cerrar Sesión</button>
                    )}
                </div>
            )
        },
        { 
            title: 'Ofertas de Empleo', 
            description: 'Descubre un mundo de oportunidades laborales cuidadosamente seleccionadas, diseñadas para impulsar tu carrera hacia el éxito. Conéctate con empresas que valoran tu potencial y encuentra el puesto ideal que se alinee con tus aspiraciones profesionales.', 
            link: '/ofertas', 
            icon: 'assets/oferta.png',
            buttons: (
                <div className="flex justify-center mt-4">
                    <Link to="/consulta-rapida" aria-label="Consulta Rápida" className="bg-gray-800 text-white py-2 px-4 rounded shadow hover:bg-gray-700">Consulta Rápida</Link>
                </div>
            )
        },
        { 
            title: 'Cursos', 
            description: 'Enriquece tu saber con nuestros cursos innovadores, diseñados para expandir tus horizontes y potenciar tus habilidades. Desde formación técnica hasta desarrollo personal, cada curso está pensado para equiparte con las herramientas necesarias para sobresalir en un entorno competitivo.', 
            link: '/cursos', 
            icon: 'assets/cursos.png',
            buttons: (
                <div className="flex justify-center space-x-4 mt-4">
                    <Link to="/cursos-presenciales" aria-label="Cursos Presenciales" className="bg-gray-800 text-white py-2 px-4 rounded shadow hover:bg-gray-700">Presencial</Link>
                    <Link to="/cursos-online" aria-label="Cursos Online" className="bg-gray-800 text-white py-2 px-4 rounded shadow hover:bg-gray-700">Online</Link>
                </div>
            )
        },
        { 
            title: 'Eventos', 
            description: 'Conéctate y crece participando en eventos de interés que fomentan el aprendizaje y la colaboración profesional. Ya sea a través de conferencias, talleres o seminarios, tendrás la oportunidad de interactuar con expertos y ampliar tu red de contactos.', 
            link: '/eventos', 
            icon: 'assets/eventos.png',
            buttons: (
                <div className="flex justify-center space-x-4 mt-4">
                    <Link to="/eventos" aria-label="Eventos" className="bg-gray-800 text-white py-2 px-4 rounded shadow hover:bg-gray-700">Eventos</Link>
                    <Link to="/noticias" aria-label="Noticias" className="bg-gray-800 text-white py-2 px-4 rounded shadow hover:bg-gray-700">Noticias</Link>
                    <Link to="/ferias-de-empleo" aria-label="Ferias de Empleo" className="bg-gray-800 text-white py-2 px-4 rounded shadow hover:bg-gray-700">Ferias de Empleo</Link>
                </div>
            )
        },
        { 
            title: 'Bibliografía', 
            description: 'Accede a una selección curada de recursos bibliográficos que enriquecerán tu conocimiento y práctica profesional. Desde libros fundamentales hasta artículos de vanguardia, estos materiales te ayudarán a mantenerte a la vanguardia en tu campo.', 
            link: '/bibliografia', 
            icon: 'assets/bibliografia.png',
            buttons: (
                <div className="flex justify-center space-x-4 mt-4">
                    <Link to="/documentos" aria-label="Documentos" className="bg-gray-800 text-white py-2 px-4 rounded shadow hover:bg-gray-700">Documentos</Link>
                    <Link to="/videos" aria-label="Videos" className="bg-gray-800 text-white py-2 px-4 rounded shadow hover:bg-gray-700">Videos</Link>
                </div>
            )
        },
    ].map(section => ({
        ...section,
        link: section.title === 'Perfil' && !isAuthenticated ? '#' : section.link // Cambia el enlace a '#' si no está autenticado
    }));
};
