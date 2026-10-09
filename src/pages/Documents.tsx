import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import Disclaimer from '../components/UI/Disclaimer';
import TagBadge from '../components/UI/TagBadge';
import { Download, FileText, Search, Building2 } from 'lucide-react';
import { documents } from '../data/content';

const Documents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedFormat, setSelectedFormat] = useState('todos');
  const [selectedInstitution, setSelectedInstitution] = useState('todas');

  const categories = ['Todos', ...Array.from(new Set(documents.map(doc => doc.category)))];
  const formats = ['todos', 'word', 'pdf', 'excel', 'powerpoint', 'sql', 'access'];
  const institutions = ['todas', 'IEEA', 'Instituto Tecnológico', 'Universidad Estatal'];

  const getInstitutionDisplay = (doc: any) => {
    if (doc.institutions && doc.institutions.includes('todas')) {
      return 'Todas las instituciones';
    }
    if (doc.excludedInstitutions && doc.excludedInstitutions.length > 0) {
      return `Todas menos ${doc.excludedInstitutions.join(', ')}`;
    }
    if (doc.institutions && doc.institutions.length > 0) {
      return doc.institutions.join(', ');
    }
    return 'Todas las instituciones';
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || doc.category === selectedCategory;
    const matchesFormat = selectedFormat === 'todos' || doc.format === selectedFormat;

    let matchesInstitution = true;
    if (selectedInstitution !== 'todas') {
      if (doc.institutions && doc.institutions.includes('todas')) {
        matchesInstitution = true;
      } else if (doc.excludedInstitutions && doc.excludedInstitutions.includes(selectedInstitution)) {
        matchesInstitution = false;
      } else if (doc.institutions) {
        matchesInstitution = doc.institutions.includes(selectedInstitution);
      }
    }

    return matchesSearch && matchesCategory && matchesFormat && matchesInstitution;
  });

  const getFormatIcon = (format: string) => {
    return <FileText className="h-5 w-5 text-gray-400" />;
  };

  const getFormatLabel = (format: string) => {
    const labels: Record<string, string> = {
      'word': 'Microsoft Word',
      'pdf': 'PDF',
      'excel': 'Microsoft Excel',
      'powerpoint': 'Microsoft PowerPoint',
      'sql': 'SQL Script',
      'access': 'Microsoft Access'
    };
    return labels[format] || format.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <Disclaimer />

        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Documentos y Formatos</h1>
          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Descarga todos los formatos necesarios para tu servicio social.
            Documentos oficiales en múltiples formatos listos para usar.
          </p>
        </div>

        <section className="mb-8">
          <Card>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar documentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos los formatos</option>
                  {formats.slice(1).map((format) => (
                    <option key={format} value={format}>
                      {format.toUpperCase()}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedInstitution}
                  onChange={(e) => setSelectedInstitution(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {institutions.map((inst) => (
                    <option key={inst} value={inst}>
                      {inst === 'todas' ? 'Todas las instituciones' : inst}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          {filteredDocuments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No se encontraron documentos</h3>
                <p className="text-gray-400">
                  Intenta cambiar los términos de búsqueda o los filtros.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDocuments.map((document) => (
                <Card key={document.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getFormatIcon(document.format)}
                        <div>
                          <h3 className="text-lg font-semibold text-white">{document.title}</h3>
                        </div>
                      </div>
                      <TagBadge text={document.format} variant="format" />
                    </div>

                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
                      <Building2 className="h-4 w-4" />
                      <span>{getInstitutionDisplay(document)}</span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-300 mb-6">{document.description}</p>

                    <div className="bg-gray-800 p-4 rounded-lg mb-6">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="min-w-0">
                          <span className="block text-gray-400">Formato:</span>
                          <span className="block text-white break-words">
                            {getFormatLabel(document.format)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <span className="block text-gray-400">Categoría:</span>
                          <span className="block text-white break-words">{document.category}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={document.downloadUrl}
                      download
                      className="block"
                    >
                      <Button className="w-full" variant="primary">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar Documento
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        <section className="mt-16">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-white">Tipos de Documentos</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Documentos Editables</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• <strong>Word:</strong> Formatos editables</li>
                    <li>• <strong>Excel:</strong> Hojas de cálculo</li>
                    <li>• <strong>PowerPoint:</strong> Presentaciones</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Documentos de Lectura</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• <strong>PDF:</strong> Formato estándar</li>
                    <li>• <strong>Mantiene formato original</strong></li>
                    <li>• <strong>Fácil de compartir</strong></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Archivos Técnicos</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• <strong>SQL:</strong> Scripts de base de datos</li>
                    <li>• <strong>Access:</strong> Bases de datos</li>
                    <li>• <strong>Para uso especializado</strong></li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-900 border border-blue-700 rounded-lg">
                <h4 className="font-semibold text-blue-200 mb-2">Recomendación</h4>
                <p className="text-blue-100">
                  Descarga todos los documentos al inicio de tu servicio social para tenerlos
                  disponibles cuando los necesites. Guárdalos en una carpeta organizada.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Documents;
