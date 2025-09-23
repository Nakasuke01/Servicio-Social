import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import Disclaimer from '../components/UI/Disclaimer';
import { ArrowLeft, Download, ExternalLink, Video, Calendar, Tag } from 'lucide-react';
import { announcements } from '../data/content';

/**
 * Página de Detalle de Anuncio - Muestra un anuncio específico con todo su contenido
 * Incluye texto, video, imágenes, enlaces y descargas
 */
const AnnouncementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const announcement = announcements.find(a => a.id === id);

  if (!announcement) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card>
          <CardContent className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Anuncio no encontrado</h1>
            <p className="text-gray-300 mb-6">El anuncio que buscas no existe.</p>
            <Link to="/">
              <Button>Volver al Inicio</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'convocatoria': return 'bg-blue-600 text-white';
      case 'evento': return 'bg-green-600 text-white';
      case 'noticia': return 'bg-orange-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Disclaimer */}
        <Disclaimer />

        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Inicio
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <Calendar className="h-6 w-6 text-gray-400" />
              <span className="text-gray-300">{formatDate(announcement.date)}</span>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(announcement.type)}`}>
              {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">{announcement.title}</h1>
          <p className="text-xl text-gray-300">{announcement.description}</p>
        </div>

        {/* Video Section */}
        {announcement.videoUrl && (
          <section className="mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Video className="h-5 w-5 text-green-400" />
                  <h2 className="text-xl font-semibold text-white">Video Informativo</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-800">
                  <iframe
                    src={announcement.videoUrl}
                    title={announcement.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Content Section */}
        {announcement.content && (
          <section className="mb-8">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold text-white">Información Detallada</h2>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose prose-lg prose-invert max-w-none [&>h1]:text-white [&>h2]:text-white [&>h3]:text-white [&>h4]:text-white [&>h5]:text-white [&>h6]:text-white [&>p]:text-gray-300 [&>li]:text-gray-300 [&>strong]:text-white [&>em]:text-gray-200"
                  dangerouslySetInnerHTML={{ __html: announcement.content }}
                />
              </CardContent>
            </Card>
          </section>
        )}

        {/* Images Section */}
        {announcement.images && announcement.images.length > 0 && (
          <section className="mb-8">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold text-white">Imágenes</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {announcement.images.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden bg-gray-800">
                      <img 
                        src={image} 
                        alt={`Imagen ${index + 1} de ${announcement.title}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Actions Section */}
        <section className="mb-8">
          <Card>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Download Button */}
                {announcement.downloadUrl && (
                  <a 
                    href={announcement.downloadUrl} 
                    download
                    className="flex-1"
                  >
                    <Button className="w-full" variant="primary">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar Documento
                    </Button>
                  </a>
                )}

                {/* External Link Button */}
                {announcement.externalLink && (
                  <a 
                    href={announcement.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full" variant="secondary">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Sitio Web Oficial
                    </Button>
                  </a>
                )}

                {/* Internal Link Button */}
                {announcement.internalLink && (
                  <Link to={announcement.internalLink} className="flex-1">
                    <Button className="w-full" variant="outline">
                      <Tag className="h-4 w-4 mr-2" />
                      Ver Más Información
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Navigation */}
        <div className="text-center">
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;