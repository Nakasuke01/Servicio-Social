import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import Disclaimer from '../components/UI/Disclaimer';
import { BookOpen, Video, Download, ExternalLink } from 'lucide-react';
import { guides } from '../data/content';

/**
 * Página de Guías - Lista de guías disponibles
 * Cada guía tiene su propia página detallada
 */
const Guides: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Disclaimer */}
        <Disclaimer />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Guías Detalladas</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explora nuestras guías paso a paso con explicaciones detalladas, videos instructivos 
            y recursos descargables para facilitar tu servicio social.
          </p>
        </div>

        {/* Grid de Guías */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {guides.map((guide) => (
            <Card key={guide.id} className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{guide.title}</h2>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <p className="text-gray-300 mb-6 flex-1">{guide.description}</p>
                
                {/* Recursos disponibles */}
                <div className="space-y-3 mb-6">
                  {guide.videoUrl && (
                    <div className="flex items-center space-x-2 text-green-400">
                      <Video className="h-4 w-4" />
                      <span className="text-sm">Video instructivo disponible</span>
                    </div>
                  )}
                  
                  {guide.downloadUrl && (
                    <div className="flex items-center space-x-2 text-blue-400">
                      <Download className="h-4 w-4" />
                      <span className="text-sm">Documento descargable</span>
                    </div>
                  )}
                  
                  {guide.relatedLinks && guide.relatedLinks.length > 0 && (
                    <div className="flex items-center space-x-2 text-orange-400">
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-sm">Enlaces relacionados</span>
                    </div>
                  )}
                </div>
                
                {/* Botón para ver guía completa */}
                <Link to={`/guias/${guide.id}`}>
                  <Button className="w-full">
                    Ver Guía Completa
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Información adicional */}
        <section className="mt-16">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-white">¿Cómo usar las guías?</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-600 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Lee la guía</h3>
                  <p className="text-gray-300 text-sm">
                    Revisa cuidadosamente todo el contenido explicativo antes de comenzar.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-600 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Ve los videos</h3>
                  <p className="text-gray-300 text-sm">
                    Observa los videos instructivos para una mejor comprensión visual.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-orange-600 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Descarga recursos</h3>
                  <p className="text-gray-300 text-sm">
                    Utiliza los documentos y formatos para aplicar lo aprendido.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Guides;