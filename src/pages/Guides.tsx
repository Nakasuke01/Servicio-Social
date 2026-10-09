import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import Disclaimer from '../components/UI/Disclaimer';
import TagBadge from '../components/UI/TagBadge';
import { BookOpen, Video, Download, ExternalLink, Building2 } from 'lucide-react';
import { guides } from '../data/content';

const Guides: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('todas');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('todas');

  const guideTypes = ['todas', 'documentos', 'asesorias', 'procedimientos', 'evaluacion', 'registro', 'capacitacion'];

  const institutions = ['todas', 'Instituto Tecnológico', 'Universidad Estatal'];

  const getInstitutionDisplay = (guide: any) => {
    if (guide.institutions && guide.institutions.includes('todas')) {
      return 'Todas las instituciones';
    }
    if (guide.excludedInstitutions && guide.excludedInstitutions.length > 0) {
      return `Todas menos ${guide.excludedInstitutions.join(', ')}`;
    }
    if (guide.institutions && guide.institutions.length > 0) {
      return guide.institutions.join(', ');
    }
    return 'Todas las instituciones';
  };

  const filteredGuides = guides.filter(guide => {
    const matchesType = selectedType === 'todas' || guide.guideType === selectedType;

    let matchesInstitution = true;
    if (selectedInstitution !== 'todas') {
      if (guide.institutions && guide.institutions.includes('todas')) {
        matchesInstitution = true;
      } else if (guide.excludedInstitutions && guide.excludedInstitutions.includes(selectedInstitution)) {
        matchesInstitution = false;
      } else if (guide.institutions) {
        matchesInstitution = guide.institutions.includes(selectedInstitution);
      }
    }

    return matchesType && matchesInstitution;
  });

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <Disclaimer />

        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Guías Detalladas</h1>
          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Explora nuestras guías paso a paso con explicaciones detalladas, videos instructivos
            y recursos descargables para facilitar tu servicio social.
          </p>
        </div>

        <section className="mb-8">
          <Card>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de Guía
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="todas">Todas las guías</option>
                    <option value="documentos">Documentos</option>
                    <option value="asesorias">Asesorías</option>
                    <option value="procedimientos">Procedimientos</option>
                    <option value="evaluacion">Evaluación</option>
                    <option value="registro">Registro</option>
                    <option value="capacitacion">Capacitación</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Institución
                  </label>
                  <select
                    value={selectedInstitution}
                    onChange={(e) => setSelectedInstitution(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {institutions.map((inst) => (
                      <option key={inst} value={inst}>
                        {inst === 'todas' ? 'Todas las instituciones' : inst}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{guide.title}</h2>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {guide.guideType && (
                    <TagBadge text={guide.guideType} variant="guideType" />
                  )}
                </div>

                <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
                  <Building2 className="h-4 w-4" />
                  <span>{getInstitutionDisplay(guide)}</span>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* CAMBIO REALIZADO AQUÍ PARA SOPORTAR HTML Y LINKS */}
                <div 
                  className="text-gray-300 mb-6 flex-1 text-sm space-y-2 [&_a]:text-blue-400 [&_a]:underline [&_ul]:list-disc [&_ul]:ml-5 [&_h3]:text-white [&_h3]:font-bold [&_h3]:mt-4"
                  dangerouslySetInnerHTML={{ __html: guide.description }} 
                />

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

                <Link to={`/guias/${guide.id}`}>
                  <Button className="w-full">
                    Ver Guía Completa
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No se encontraron guías</h3>
              <p className="text-gray-400">
                Intenta cambiar los filtros para ver más resultados.
              </p>
            </CardContent>
          </Card>
        )}

        {/* ... resto del código igual ... */}
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