import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import Perfil from './components/Perfil/Perfil';
import Ofertas from './components/Ofertas/Ofertas'; // Asegúrate de crear este componente
import Cursos from './components/Cursos/Cursos'; // Asegúrate de crear este componente
import Eventos from './components/Eventos/Eventos'; // Asegúrate de crear este componente
import Bibliografia from './components/Bibliografia/Bibliografia'; // Asegúrate de crear este componente
import NotFound from './components/NotFound';
import Administracion from './components/Administracion/Administracion';
import AdminLogin from './components/Administracion/AdminLogin';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [adminAuth, setAdminAuth] = useState(() => {
    const saved = localStorage.getItem('adminAuth');
    return saved ? JSON.parse(saved) : null;
  });

  const ProtectedRoute = ({ children }) => {
    if (!adminAuth) {
      return <Navigate to="/admin/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/bibliografia" element={<Bibliografia />} />
        <Route path="/admin/login" element={
          <AdminLogin setAdminAuth={setAdminAuth} />
        } />
        <Route path="/administracion/*" element={
          <ProtectedRoute>
            <Administracion adminAuth={adminAuth} />
          </ProtectedRoute>
        } />
        <Route path="*" element={< NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;