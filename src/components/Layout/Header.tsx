import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Home, ListChecks, BookOpen, FileText, MoreHorizontal } from 'lucide-react';

/**
 * Componente Header - Navegación principal del sitio
 * Incluye logo, menú de navegación, menú desplegable y barra inferior para celular
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Procesos', path: '/procesos' },
    { name: 'Guías', path: '/guias' },
    { name: 'Documentos', path: '/documentos' },
    { name: 'Sitios', path: '/sitios' },
    { name: 'Preguntas', path: '/preguntas' },
    { name: 'Contáctanos', path: '/contacto' }
  ];

  // Accesos principales en la barra inferior (solo celular)
  const bottomItems = [
    { name: 'Inicio', path: '/', icon: Home },
    { name: 'Procesos', path: '/procesos', icon: ListChecks },
    { name: 'Guías', path: '/guias', icon: BookOpen },
    { name: 'Formatos', path: '/documentos', icon: FileText }
  ];

  // Cierra el menú al cambiar de página
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActiveLink = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      <header className="bg-gray-900/95 backdrop-blur border-b border-gray-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo y título */}
            <Link
              to="/"
              className="flex items-center space-x-3 group transition-all duration-300"
            >
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <div className="leading-tight">
                <p className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  IEEA
                </p>
                <p className="text-xs md:text-sm text-gray-400">Servicio Social</p>
              </div>
            </Link>

            {/* Navegación desktop */}
            <nav className="hidden md:flex space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActiveLink(item.path)
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Botón menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>

          {/* Menú móvil */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-800 py-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <nav className="grid grid-cols-2 gap-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                      isActiveLink(item.path)
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Barra de navegación inferior (solo celular) */}
      <nav
        aria-label="Navegación principal"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-gray-900/95 backdrop-blur border-t border-gray-800 pb-[env(safe-area-inset-bottom)]"
      >
        <div className="grid grid-cols-5">
          {bottomItems.map(({ name, path, icon: Icon }) => {
            const active = isActiveLink(path);
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition-colors ${
                  active ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="h-6 w-6" />
                {name}
              </Link>
            );
          })}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`flex flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition-colors ${
              isMenuOpen ? 'text-blue-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <MoreHorizontal className="h-6 w-6" />
            Más
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
