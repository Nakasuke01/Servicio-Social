import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Accordion from '../components/UI/Accordion';
import Disclaimer from '../components/UI/Disclaimer';
import { Search, HelpCircle } from 'lucide-react';
import { faqs } from '../data/content';

/**
 * Página de Preguntas Frecuentes - FAQ con acordeones organizados por categoría
 * Incluye funcionalidad de búsqueda
 */
const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Obtener categorías únicas
  const categories = ['Todos', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  // Filtrar FAQs
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Convertir FAQs a formato de accordion
  const accordionItems = filteredFaqs.map(faq => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer
  }));

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Disclaimer */}
        <Disclaimer />

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-full">
              <HelpCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Preguntas Frecuentes</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre el servicio social en el IEEA. 
            Si no encuentras lo que buscas, no dudes en contactarnos.
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
                    placeholder="Buscar preguntas..."
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

        {/* Preguntas y respuestas */}
        <section className="mb-8">
          {filteredFaqs.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No se encontraron preguntas</h3>
                <p className="text-gray-400">
                  Intenta cambiar los términos de búsqueda o el filtro de categoría.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Accordion items={accordionItems} allowMultiple={true} />
          )}
        </section>

        {/* Estadísticas de categorías */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-white">Categorías de Preguntas</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {categories.filter(cat => cat !== 'Todos').map((category) => {
                  const count = faqs.filter(faq => faq.category === category).length;
                  return (
                    <div key={category} className="text-center p-4 bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">{count}</div>
                      <div className="text-sm text-gray-300">{category}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Información de contacto adicional */}
        <section>
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-white">¿No encontraste tu respuesta?</h2>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-gray-300 mb-6">
                  Si tu pregunta no está en esta lista, no dudes en contactarnos directamente. 
                  Nuestro equipo estará encantado de ayudarte.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">Contacto General</h3>
                    <p className="text-gray-300 text-sm mb-2">+52 481-145-4356</p>
                    <p className="text-gray-300 text-sm"></p>
                  </div>
                  
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">Horario de Atención</h3>
                    <p className="text-gray-300 text-sm mb-1">Lunes a Viernes</p>
                    <p className="text-gray-300 text-sm">8:00 AM - 3:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default FAQ;