import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/UI/Card';
import Disclaimer from '../components/UI/Disclaimer';
import { GraduationCap, Users, Award, BookOpen, Calendar, AlertCircle } from 'lucide-react';
import { announcements } from '../data/content';

/**
 * Página de Inicio - Información principal del IEEA
 * Incluye introducción, servicios, niveles educativos y anuncios
 */
const Home: React.FC = () => {
  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'convocatoria': return <AlertCircle className="h-5 w-5 text-blue-400" />;
      case 'evento': return <Calendar className="h-5 w-5 text-green-400" />;
      case 'noticia': return <BookOpen className="h-5 w-5 text-orange-400" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 p-4 rounded-full">
                <GraduationCap className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Instituto Estatal de Educación para Adultos
            </h1>
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Únete a nuestro programa de servicio social y contribuye a la educación 
              de adultos mediante el reconocimiento de saberes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://chat.whatsapp.com/Iq83Y7HZNKqHsUxeevohmk?mode=ems_copy_t" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                Comenzar Servicio Social
              </a>
              <Link to="/procesos"
              className="border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors text-center"
              >
              Conocer Más
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Disclaimer */}
        <Disclaimer />

        {/* Introducción */}
        <section className="mb-16">
          <Card>
            <CardContent>
              <h2 className="text-3xl font-bold text-white mb-6">¿Qué es el IEEA?</h2>
              <div className="prose prose-lg prose-invert">
                <p className="text-gray-300 leading-relaxed mb-4">
                  El <strong>IEEA (Instituto Estatal de Educación para Adultos)</strong> es 
                  una institución que ofrece a jóvenes 
                  y adultos mayores de 15 años la oportunidad de aprender 
                  a leer y escribir, así como concluir la primaria o la secundaria. 
                  Lo más importante es que <strong>todos sus servicios son totalmente gratuitos</strong>, 
                  lo que permite que más personas puedan continuar sus estudios sin importar 
                  su situación económica.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Además, el IEEA es una excelente opción para que estudiantes de 
                  preparatorias y universidades realicen su <strong>servicio social</strong>, 
                  ya que les brinda la posibilidad de apoyar directamente a 
                  la comunidad, acompañando a las personas en su aprendizaje 
                  y contribuyendo a mejorar su calidad de vida.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Servicios */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="text-center">
                <div className="bg-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Asesorías Personalizadas</h3>
                <p className="text-gray-300">
                  Brindamos asesoría directa y personalizada para que los adultos certifiquen 
                  su educación básica. Los estudiantes eligen los días que pueden asistir, 
                  adaptándonos a sus horarios y necesidades.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center">
                <div className="bg-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Reconocimiento de Saberes</h3>
                <p className="text-gray-300">
                  <strong>Certifica tus conocimientos en un solo día</strong>. Presenta un examen y, 
                  si lo acreditas, recibe de inmediato tu certificado de primaria o 
                  secundaria. Es la manera más rápida de validar todo lo que has 
                  aprendido en la vida.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center">
                <div className="bg-orange-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Alfabetización</h3>
                <p className="text-gray-300">
                  Ofrecemos un programa especial para que los adultos aprendan a leer 
                  y escribir desde cero. Nuestras asesorías personalizadas te 
                  preparan para que, cuando estés listo, puedas continuar y 
                  acreditar tu primaria y secundaria.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Niveles Educativos */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Niveles Educativos</h2>
          <div className="space-y-6">
            {/* Alfabetización */}
            <Card>
              <CardContent>
                <h3 className="text-2xl font-semibold text-white mb-4">Alfabetización</h3>
                <p className="text-gray-300 mb-4">
                  Programa dirigido a personas que no saben leer ni escribir.
                </p>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-medium text-white mb-2">Requisitos (Copias):</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Ser mayor de 15 años</li>
                    <li>• CURP</li>
                    <li>• Acta de nacimiento</li>
                    <li>• Recibo de Luz (No mayor a 3 meses)</li>
                    <li>• Foto (La puedes tomar con tu celular)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Primaria */}
            <Card>
              <CardContent>
                <h3 className="text-2xl font-semibold text-white mb-4">Primaria</h3>
                <p className="text-gray-300 mb-4">
                  Para personas que saben leer y escribir pero no han terminado la primaria.
                </p>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-medium text-white mb-2">Requisitos (Copias):</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Ser mayor de 18 años</li>
                    <li>• Saber leer y escribir</li>
                    <li>• CURP</li>
                    <li>• Acta de nacimiento</li>
                    <li>• Recibo de Luz (No mayor a 3 meses)</li>
                    <li>• INE</li>
                    <li>• Foto (La puedes tomar con tu celular)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Secundaria */}
            <Card>
              <CardContent>
                <h3 className="text-2xl font-semibold text-white mb-4">Secundaria</h3>
                <p className="text-gray-300 mb-4">
                  Para personas que tienen primaria completa pero no han terminado la secundaria.
                </p>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-medium text-white mb-2">Requisitos (Copias):</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Ser mayor de 18 años</li>
                    <li>• Certificado de primaria</li>
                    <li>• CURP</li>
                    <li>• Acta de nacimiento</li>
                    <li>• Recibo de Luz (No mayor a 3 meses)</li>
                    <li>• INE</li>
                    <li>• Foto (La puedes tomar con tu celular)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tabla de Anuncios */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Anuncios y Convocatorias</h2>
          <Card>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <Link
                    to={`/anuncios/${announcement.id}`}
                    to={`/anuncios/${announcement.id}`}
                    key={announcement.id} 
                    className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getAnnouncementIcon(announcement.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {announcement.title}
                      </h3>
                      <p className="text-gray-300 mb-2">{announcement.description}</p>
                      <p className="text-sm text-gray-400">{formatDate(announcement.date)}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        announcement.type === 'convocatoria' ? 'bg-blue-600 text-white' :
                        announcement.type === 'evento' ? 'bg-green-600 text-white' :
                        'bg-orange-600 text-white'
                      }`}>
                        {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Home;