import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import Disclaimer from '../components/UI/Disclaimer';
import { Download, FileText, Search } from 'lucide-react';
import { documents } from '../data/content';

/**
 * Página de Documentos - Lista de documentos descargables organizados por categoría
 * Incluye funcionalidad de búsqueda y filtrado
 */
const Documents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Obtener categorías únicas
  const categories = ['Todos', ...Array.from(new Set(documents.map(doc => doc.category)))];

  // Filtrar documentos
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFormatIcon = (format: string) => {
    return <FileText className={`h-5 w-5 ${
      format === 'word' ? 'text-blue-400' : 'text-red-400'
    }`} />;
  };

  const getFormatColor = (format: string) => {
    return format === 'word' ? 'bg-blue-900 text-blue-200' : 'bg-red-900 text-red-200';
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Disclaimer */}
        <Disclaimer />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Documentos y Formatos</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descarga todos los formatos necesarios para tu servicio social. 
            Documentos oficiales en Word y PDF listos para usar.
          </p>
        </div>

        {/* Controles de búsqueda y filtro */}
        <section className="mb-8">
          <Card>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Barra de búsqueda */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar documentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Filtro por categoría */}
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
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Lista de documentos */}
        <section>
          {filteredDocuments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No se encontraron documentos</h3>
                <p className="text-gray-400">
                  Intenta cambiar los términos de búsqueda o el filtro de categoría.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDocuments.map((document) => (
                <Card key={document.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {getFormatIcon(document.format)}
                        <div>
                          <h3 className="text-lg font-semibold text-white">{document.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getFormatColor(document.format)}`}>
                            {document.category}
                          </span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        document.format === 'word' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'
                      }`}>
                        {document.format.toUpperCase()}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-300 mb-6">{document.description}</p>
                    
                    {/* Información del documento */}
                    <div className="bg-gray-800 p-4 rounded-lg mb-6">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Formato:</span>
                          <span className="text-white ml-2">
                            {document.format === 'word' ? 'Microsoft Word' : 'PDF'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Categoría:</span>
                          <span className="text-white ml-2">{document.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Botón de descarga */}
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

        {/* Información adicional */}
        <section className="mt-16">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-white">Información Importante</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Documentos Word</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Editables y personalizables</li>
                    <li>• Perfectos para llenar información</li>
                    <li>• Compatible con Microsoft Word</li>
                    <li>• Se pueden convertir a PDF</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Documentos PDF</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Formato estándar para impresión</li>
                    <li>• Mantienen el formato original</li>
                    <li>• Fáciles de compartir</li>
                    <li>• Universalmente compatibles</li>
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