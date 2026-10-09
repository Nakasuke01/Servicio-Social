import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/UI/Card';
import Disclaimer from '../components/UI/Disclaimer';
import FeaturedCarousel from '../components/UI/FeaturedCarousel';
import { GraduationCap, Users, Award, BookOpen, Calendar, AlertCircle, ListChecks, FileText, HelpCircle, ArrowRight, CheckCircle } from 'lucide-react';
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
      case 'noticia': return <BookOpen className="h-5 w-5 text-purple-400" />;
      case 'consejo': return <Award className="h-5 w-5 text-orange-400" />;
      case 'informativo': return <Users className="h-5 w-5 text-teal-400" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(`${dateString}T00:00:00`).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-5 sm:mb-6">
              <div className="bg-blue-600 p-3 sm:p-4 rounded-full ring-8 ring-blue-500/20">
                <GraduationCap className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
              Instituto Estatal de Educación para Adultos
            </h1>
            <p className="text-base sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Únete a nuestro programa de servicio social y contribuye a la educación 
              de adultos mediante el reconocimiento de saberes
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
              <a
                href="https://chat.whatsapp.com/HKS5lAhhE6O4q9QMBCqQ87"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Unirme al grupo de WhatsApp
              </a>
              <Link
                to="/procesos"
                className="inline-flex items-center justify-center border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-800 transition-all duration-200 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Ver los pasos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Disclaimer */}
        <Disclaimer />

        {/* Accesos rápidos */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">¿Qué necesitas?</h2>
          <p className="text-gray-400 mb-5">Ve directo a lo que buscas.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { to: '/procesos', title: 'Pasos del servicio', text: 'Qué hacer, en orden', icon: ListChecks, color: 'bg-blue-600' },
              { to: '/guias', title: 'Guías', text: 'Cómo llenar cada formato', icon: BookOpen, color: 'bg-green-600' },
              { to: '/documentos', title: 'Formatos', text: 'Descarga lo que necesitas', icon: FileText, color: 'bg-orange-600' },
              { to: '/preguntas', title: 'Dudas', text: 'Preguntas frecuentes', icon: HelpCircle, color: 'bg-purple-600' }
            ].map(({ to, title, text, icon: Icon, color }) => (
              <Link
                key={to}
                to={to}
                className="group flex flex-col gap-3 p-4 sm:p-5 bg-gray-800 border border-gray-700 rounded-2xl hover:border-gray-500 hover:bg-gray-700/60 transition-colors"
              >
                <div className={`${color} w-11 h-11 rounded-xl flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white leading-snug flex items-center gap-1">
                    {title}
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-sm text-gray-400 leading-snug mt-0.5">{text}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Announcements Carousel */}
        <FeaturedCarousel announcements={announcements} />

        {/* Introducción */}
        <section className="mb-12 sm:mb-16">
          <Card>
            <CardContent>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">¿Qué es el IEEA?</h2>
              <div className="prose prose-lg prose-invert">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                  El <strong>IEEA (Instituto Estatal de Educación para Adultos)</strong> es 
                  una institución que ofrece a jóvenes 
                  y adultos mayores de 15 años la oportunidad de aprender 
                  a leer y escribir, así como concluir la primaria o la secundaria. 
                  Lo más importante es que <strong>todos sus servicios son totalmente gratuitos</strong>, 
                  lo que permite que más personas puedan continuar sus estudios sin importar 
                  su situación económica.
                </p>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
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
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="flex sm:block gap-4 sm:text-center">
                <div className="bg-blue-600 p-4 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 sm:mx-auto sm:mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Asesorías Personalizadas</h3>
                <p className="text-gray-300 leading-relaxed">
                  Brindamos asesoría directa y personalizada para que los adultos certifiquen 
                  su educación básica. Los estudiantes eligen los días que pueden asistir, 
                  adaptándonos a sus horarios y necesidades.
                </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex sm:block gap-4 sm:text-center">
                <div className="bg-green-600 p-4 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 sm:mx-auto sm:mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Reconocimiento de Saberes</h3>
                <p className="text-gray-300 leading-relaxed">
                  <strong>Certifica tus conocimientos en un solo día</strong>. Presenta un examen y, 
                  si lo acreditas, recibe de inmediato tu certificado de primaria o 
                  secundaria. Es la manera más rápida de validar todo lo que has 
                  aprendido en la vida. <strong>Solo para mayores de 18.</strong>
                </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex sm:block gap-4 sm:text-center">
                <div className="bg-orange-600 p-4 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 sm:mx-auto sm:mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Alfabetización Oficial</h3>
                <p className="text-gray-300 leading-relaxed">
                  Ofrecemos un programa especial para que los adultos aprendan a leer 
                  y escribir desde cero. Nuestras asesorías personalizadas te 
                  preparan para que, cuando estés listo, puedas continuar y 
                  acreditar tu primaria y secundaria.
                </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Niveles Educativos */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Niveles Educativos</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Alfabetización */}
            <Card>
              <CardContent>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Alfabetización</h3>
                <p className="text-gray-300 mb-4">
                  Programa dirigido a personas que no saben leer ni escribir.
                </p>
                <div className="bg-gray-900/60 border border-gray-700 p-4 rounded-xl">
                  <h4 className="text-lg font-medium text-white mb-2">Requisitos:</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>Ser mayor de 15 años</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>CURP (Certificada)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>Acta de nacimiento</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>Recibo de Luz (No mayor a 3 meses)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>Foto (La puedes tomar con tu celular con fondo de un solo color)</span></li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Primaria */}
            <Card>
              <CardContent>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Primaria</h3>
                <p className="text-gray-300 mb-4">
                  Para personas que saben leer y escribir pero no han terminado la primaria.
                </p>
                <div className="bg-gray-900/60 border border-gray-700 p-4 rounded-xl">
                  <h4 className="text-lg font-medium text-white mb-2">Requisitos:</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>Ser mayor de 18 años</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>Saber leer y escribir</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>CURP (Certificada)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>Acta de nacimiento</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>Recibo de Luz (No mayor a 3 meses)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>INE</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>Foto (La puedes tomar con tu celular con fondo de un solo color)</span></li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Secundaria */}
            <Card>
              <CardContent>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Secundaria</h3>
                <p className="text-gray-300 mb-4">
                  Para personas que tienen primaria completa pero no han terminado la secundaria.
                </p>
                <div className="bg-gray-900/60 border border-gray-700 p-4 rounded-xl">
                  <h4 className="text-lg font-medium text-white mb-2">Requisitos:</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>Ser mayor de 18 años</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>Certificado de primaria</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>CURP (Certificada)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>Acta de nacimiento</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>Recibo de Luz (No mayor a 3 meses)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>INE</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" /><span>Foto (La puedes tomar con tu celular con fondo de un solo color)</span></li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tabla de Anuncios */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Anuncios y Convocatorias</h2>
          <Card>
            <CardContent>
              <div className="space-y-4">
                {announcements
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 5)
                  .map((announcement) => (
                  <Link
                    to={`/anuncios/${announcement.id}`}
                    key={announcement.id}
                    className="flex items-start gap-3 sm:gap-4 p-4 bg-gray-700/60 rounded-xl hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getAnnouncementIcon(announcement.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1 leading-snug">
                        {announcement.title}
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base mb-2 line-clamp-3">{announcement.description}</p>
                      <p className="text-sm text-gray-400">{formatDate(announcement.date)}</p>
                    </div>
                    <div className="flex-shrink-0 hidden sm:block">
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
              <Link
                to="/anuncios"
                className="mt-6 inline-block w-full"
              >
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 ">
                  Ver Todos los Anuncios
                </button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Home;