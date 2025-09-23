import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import Disclaimer from '../components/UI/Disclaimer';
import { ArrowLeft, Download, ExternalLink, Video } from 'lucide-react';
import { guides } from '../data/content';

/**
 * Página de Detalle de Guía - Muestra una guía específica con todo su contenido
 * Incluye texto, video, imágenes, enlaces y descargas
 */
const GuideDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const guide = guides.find(g => g.id === id);

  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card>
          <CardContent className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Guía no encontrada</h1>
            <p className="text-gray-300 mb-6">La guía que buscas no existe.</p>
            <Link to="/guias">
              <Button>Volver a Guías</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Disclaimer */}
        <Disclaimer />

        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            to="/guias" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Guías
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{guide.title}</h1>
          <p className="text-xl text-gray-300">{guide.description}</p>
        </div>

        {/* Video Section */}
        {guide.videoUrl && (
          <section className="mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Video className="h-5 w-5 text-green-400" />
                  <h2 className="text-xl font-semibold text-white">Video Instructivo</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-800">
                  <iframe
                    src={guide.videoUrl}
                    title={guide.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Content Section */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-white">Contenido de la Guía</h2>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-lg prose-invert max-w-none [&>h1]:text-white [&>h2]:text-white [&>h3]:text-white [&>h4]:text-white [&>h5]:text-white [&>h6]:text-white [&>p]:text-gray-300 [&>li]:text-gray-300 [&>strong]:text-white [&>em]:text-gray-200"
                dangerouslySetInnerHTML={{ __html: guide.content }}
              />
            </CardContent>
          </Card>
        </section>

        {/* Images Section */}
        {guide.images && guide.images.length > 0 && (
          <section className="mb-8">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold text-white">Imágenes de Apoyo</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {guide.images.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden bg-gray-800">
                      <img 
                        src={image} 
                        alt={`Imagen ${index + 1} de ${guide.title}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Related Links */}
        {guide.relatedLinks && guide.relatedLinks.length > 0 && (
          <section className="mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <ExternalLink className="h-5 w-5 text-orange-400" />
                  <h2 className="text-2xl font-semibold text-white">Enlaces Relacionados</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {guide.relatedLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white group-hover:text-blue-400 transition-colors">
                          {link.title}
                        </span>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Download Section */}
        {guide.downloadUrl && (
          <section className="mb-8">
            <Card>
              <CardContent>
                <div className="text-center">
                  <div className="mb-4">
                    <div className="bg-blue-600 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                      <Download className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Descargar Documento</h3>
                  <p className="text-gray-300 mb-6">
                    Descarga el documento completo de esta guía para tenerlo disponible offline.
                  </p>
                <div className="flex justify-center">
                  <a href={guide.downloadUrl} download className="inline-block w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto whitespace-nowrap">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar Guía
                    </Button>
                  </a>
                </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Navigation */}
        <div className="text-center">
          <Link to="/guias">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Todas las Guías
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuideDetail;