import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import Disclaimer from '../components/UI/Disclaimer';
import { ExternalLink, Search, Globe } from 'lucide-react';
import { usefulSites } from '../data/content';

/**
 * Página de Sitios Web Útiles - Lista de sitios organizados por categoría
 * Incluye funcionalidad de búsqueda y acceso directo a los sitios
 */
const Sites: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Obtener categorías únicas
  const categories = ['Todos', ...Array.from(new Set(usefulSites.map(site => site.category)))];

  // Filtrar sitios
  const filteredSites = usefulSites.filter(site => {
    const matchesSearch = site.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || site.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Oficial': 'bg-blue-900 text-blue-200',
      'Educativo': 'bg-green-900 text-green-200',
      'Documentos': 'bg-orange-900 text-orange-200'
    };
    return colors[category] || 'bg-gray-900 text-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Disclaimer */}
        <Disclaimer />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Sitios Web Útiles</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Accede rápidamente a las plataformas y sitios web que necesitarás durante tu servicio social. 
            Todos los enlaces importantes organizados por categoría.
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
                    placeholder="Buscar sitios web..."
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

        {/* Lista de sitios */}
        <section>
          {filteredSites.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Globe className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No se encontraron sitios</h3>
                <p className="text-gray-400">
                  Intenta cambiar los términos de búsqueda o el filtro de categoría.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSites.map((site) => (
                <Card key={site.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                          <Globe className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{site.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(site.category)}`}>
                            {site.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-300 mb-6">{site.description}</p>
                    
                    {/* URL del sitio */}
                    <div className="bg-gray-800 p-4 rounded-lg mb-6">
                      <p className="text-sm text-gray-400 mb-1">URL:</p>
                      <p className="text-blue-400 text-sm break-all">{site.url}</p>
                    </div>
                    
                    {/* Botón para visitar sitio */}
                    <a 
                      href={site.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full" variant="primary">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visitar Sitio Web
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Información por categorías */}
        <section className="mt-16">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-white">Categorías de Sitios</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-white">Sitios Oficiales</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Plataformas gubernamentales</li>
                    <li>• Sistemas del IEEA</li>
                    <li>• Portales de la SEP</li>
                    <li>• Verificación de documentos</li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-white">Plataformas Educativas</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Google Classroom</li>
                    <li>• Aulas virtuales</li>
                    <li>• Recursos educativos</li>
                    <li>• Herramientas de aprendizaje</li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-white">Documentación</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Consulta de CURP</li>
                    <li>• Trámites en línea</li>
                    <li>• Verificación de datos</li>
                    <li>• Formatos digitales</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-green-900 border border-green-700 rounded-lg">
                <h4 className="font-semibold text-green-200 mb-2">Consejo de Seguridad</h4>
                <p className="text-green-100 text-sm">
                  Siempre verifica que estés en el sitio oficial antes de ingresar datos personales. 
                  Revisa la URL y busca el ícono de seguridad (candado) en tu navegador.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Enlaces rápidos */}
        <section className="mt-8">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-white">Acceso Rápido</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {usefulSites.slice(0, 4).map((site) => (
                  <a
                    key={site.id}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group text-center"
                  >
                    <Globe className="h-8 w-8 text-gray-400 group-hover:text-blue-400 mx-auto mb-2 transition-colors" />
                    <p className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">
                      {site.title}
                    </p>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Sites;