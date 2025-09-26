import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

/**
 * Componente Footer - Pie de página con información institucional
 * Incluye links rápidos, información de contacto y créditos
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">IEEA</h3>
                <p className="text-sm text-gray-400">Instituto Estatal de Educación para Adultos</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Promoviendo la educación básica para adultos a través del reconocimiento de saberes 
              y la participación estudiantil en servicio social.
            </p>
          </div>

          {/* Links rápidos */}
          <div className="md:col-span-1">
            <h4 className="text-white font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/procesos" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Procesos
                </Link>
              </li>
              <li>
                <Link to="/guias" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Guías
                </Link>
              </li>
              <li>
                <Link to="/documentos" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Documentos
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div className="md:col-span-1">
            <h4 className="text-white font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/sitios" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Sitios Web
                </Link>
              </li>
              <li>
                <Link to="/preguntas" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link to="/documentos" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Documentos
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-1">
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/aviso-legal" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link to="/aviso-legal/privacidad" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/aviso-legal/terminos" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Términos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  Calle Zaragoza #703<br />
                  Zona Centro, Ciudad Valles, S.L.P.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <p className="text-gray-400 text-sm">+52 (481) 382-2540</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <p className="text-gray-400 text-sm">czvalles@inea.gob.mx</p>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria y créditos */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Desarrollado por César Emmanuel Medina Toledo. Todos los derechos reservados sobre el diseño y desarrollo de este sitio.
          </p>
          <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-gray-300 text-sm font-medium mb-2">
              ¿Te gusta este sitio web?
            </p>
            <p className="text-gray-400 text-xs mb-3">
              Si necesitas un sitio web profesional como este para tu institución o proyecto, 
              contáctame para crear una solución personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
              <a 
                href="mailto:toledoemcesar@gmail.com" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contactar Desarrollador
              </a>
              <a 
                href="https://wa.me/524811454356" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
