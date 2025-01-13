import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Perfil from './components/Perfil/Perfil';
import Ofertas from './components/Ofertas/Ofertas'; // Asegúrate de crear este componente
import Cursos from './components/Cursos/Cursos'; // Asegúrate de crear este componente
import Eventos from './components/Eventos/Eventos'; // Asegúrate de crear este componente
import Bibliografia from './components/Bibliografia/Bibliografia'; // Asegúrate de crear este componente
import NotFound from './components/NotFound';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/bibliografia" element={<Bibliografia />} />
        <Route path="*" element={< NotFound/>} /> 
      </Routes>
    </Router>
  );
}

export default App;