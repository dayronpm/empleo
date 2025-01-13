import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal'; // Importa el modal de inicio de sesión
import RegisterModal from './RegisterModal'; // Importa el modal de registro

const LandingPage = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);

    const openLogin = () => {
        setLoginOpen(true);
        setRegisterOpen(false); // Cierra el modal de registro si está abierto
    };

    const openRegister = () => {
        setRegisterOpen(true);
        setLoginOpen(false); // Cierra el modal de inicio de sesión si está abierto
    };

    const sections = [
        { 
            title: 'Perfil', 
            description: 'Construye un perfil profesional que no solo resalte tus talentos y logros, sino que también cuente tu historia única. Atrae la atención de reclutadores y colegas al mostrar tus habilidades y experiencias de manera impactante.', 
            link: '/perfil', 
            icon: 'assets/perfil.png',
            buttons: (
                <div className="flex justify-center space-x-4 mt-4">
                    <button onClick={openLogin} aria-label="Iniciar Sesión" className="bg-gray-800 text-white py-2 px-4 rounded shadow hover:bg-gray-700">Iniciar Sesión</button>
                    <button onClick={openRegister} aria-label="Registro" className="bg-gray-800 text-white py-2 px-4 rounded shadow hover:bg-gray-700">Registro</button>
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
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="flex justify-between items-center p--10 bg-white shadow-md">
                <div className="logo">
                    <a href="http://www.mtss.gob.cu"><img src="assets/mtss.png" alt="Logo" className="h-auto w-auto max-h-[80px]" /></a>
                </div>
                <nav className="nav bg-transparent">
                    <ul className="flex space-x-6">
                        {sections.map(item => (
                            <li key={item.title} className="flex flex-col items-center">
                                <Link to={item.link} aria-label={item.title} className="flex flex-col items-center text-gray-700 hover:text-red-500">
                                    <img src={item.icon} alt={item.title} onError={(e) => { e.target.onerror = null; e.target.src = "path/to/default/icon.png"; }} className="w-[60px] h-auto mb-1" />
                                    <span className="text-lg">{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <div className="content-container p-[32px]">
                <h1 className="text-center text-xl font-extrabold mb-[12px] p-[16px]">Plataforma de Acceso al Empleo y la Superación Profesional</h1>

                {sections.map((item, index) => (
                    <div key={item.title} className={`flex items-start my-[24px] p-[24px] bg-white rounded-lg shadow-md w-full ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                        <img src={item.icon} alt={item.title} onError={(e) => { e.target.onerror = null; e.target.src = "path/to/default/icon.png"; }} className={`w-[200px] h-auto`} />
                        <div className={`ml-${index % 2 === 0 ? 6 : 0} mr-${index % 2 === 0 ? 0 : 6} flex flex-col w-full`}>
                            <Link to={item.link}><h2 className="text-lg font-semibold text-center">{item.title}</h2></Link>
                            <p className="text-gray-600 text-center">{item.description}</p>
                            {item.buttons}
                        </div>
                    </div>
                ))}
            </div>

            {/* Renderiza los modales */}
            <AuthModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} openRegister={openRegister} />
            <RegisterModal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)} openLogin={openLogin} />
        </div>
    );
};

export default LandingPage;
