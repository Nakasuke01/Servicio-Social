import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Importar páginas
import Home from './pages/Home';
import Processes from './pages/Processes';
import Guides from './pages/Guides';
import GuideDetail from './pages/GuideDetail';
import Documents from './pages/Documents';
import Sites from './pages/Sites';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import AnnouncementDetail from './pages/AnnouncementDetail';

/**
 * Componente principal de la aplicación
 * Maneja el enrutamiento y la estructura general del sitio
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        {/* Header con navegación */}
        <Header />
        
        {/* Contenido principal */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/procesos" element={<Processes />} />
            <Route path="/guias" element={<Guides />} />
            <Route path="/guias/:id" element={<GuideDetail />} />
            <Route path="/documentos" element={<Documents />} />
            <Route path="/sitios" element={<Sites />} />
            <Route path="/preguntas" element={<FAQ />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/aviso-legal" element={<Legal />} />
            <Route path="/aviso-legal/:section" element={<Legal />} />
            <Route path="/anuncios/:id" element={<AnnouncementDetail />} />
            <Route path="/anuncios/:id" element={<AnnouncementDetail />} />
            
            {/* Ruta 404 */}
            <Route path="*" element={
              <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-white mb-4">404</h1>
                  <p className="text-gray-300 mb-6">Página no encontrada</p>
                  <a href="/" className="text-blue-400 hover:text-blue-300">
                    Volver al inicio
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;