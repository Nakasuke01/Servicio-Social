import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import Disclaimer from '../components/UI/Disclaimer';
import ImageCarousel from '../components/UI/ImageCarousel';
import { ArrowLeft, Download, ExternalLink, Video, Calendar, Tag } from 'lucide-react';
import { announcements } from '../data/content';

const AnnouncementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const announcement = announcements.find(a => a.id === id);

  if (!announcement) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card><CardContent className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Anuncio no encontrado</h1>
          <Link to="/"><Button>Volver al Inicio</Button></Link>
        </CardContent></Card>
      </div>
    );
  }

  // FUNCIÓN PARA LIMPIAR COMAS Y RENDERIZAR HTML
  const renderCleanContent = (content: string | string[]) => {
    const htmlString = Array.isArray(content) ? content.join('') : content;
    return (
      <div 
        className="text-white space-y-4"
        style={{ color: 'white' }}
        dangerouslySetInnerHTML={{ __html: htmlString }} 
      />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Disclaimer />
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300">
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver al Inicio
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-6 w-6 text-gray-400" />
            <span className="text-gray-300">{formatDate(announcement.date)}</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{announcement.title}</h1>
        </div>

        {/* CONTENIDO DETALLADO */}
        {announcement.content && (
          <section className="mb-8">
            <Card>
              <CardHeader><h2 className="text-2xl font-semibold text-white">Información Detallada</h2></CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none 
                  [&_h3]:text-3xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-4
                  [&_h4]:text-2xl [&_h4]:font-bold [&_h4]:text-white [&_h4]:mt-4
                  [&_p]:text-white [&_p]:text-lg
                  [&_ul]:list-disc [&_ul]:ml-6 [&_li]:text-white">
                  {renderCleanContent(announcement.content)}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* GALERÍA */}
        {announcement.images && announcement.images.length > 0 && (
          <section className="mb-8">
            <Card>
              <CardHeader><h2 className="text-2xl font-semibold text-white">Galería</h2></CardHeader>
              <CardContent>
                <ImageCarousel images={announcement.images} title={announcement.title} />
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
};

export default AnnouncementDetail;