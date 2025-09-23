import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import Disclaimer from '../components/UI/Disclaimer';
import { CheckCircle, Circle, ChevronRight, BookOpen } from 'lucide-react';
import { schools } from '../data/content';

/**
 * Página de Procesos - Información detallada sobre procesos por escuela
 * Incluye objetivo general y procesos específicos por institución
 */
const Processes: React.FC = () => {
  const [selectedSchool, setSelectedSchool] = useState(schools[0].id);
  
  const currentSchool = schools.find(school => school.id === selectedSchool);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Disclaimer */}
        <Disclaimer />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Procesos del Servicio Social</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conoce los pasos detallados para completar exitosamente tu servicio social 
            y ayudar a los adultos a obtener su certificación educativa.
          </p>
        </div>

        {/* Objetivo General */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-white">Objetivo Principal</h2>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-900 p-6 rounded-lg border border-blue-700">
                <p className="text-blue-200 text-lg mb-4">
                  El objetivo principal de tu servicio social es lograr que <strong> con X numero de adultos</strong>, 
                  apoyes a obtener <strong>3 certificados</strong>  de educación básica 
                  mediante el proceso de <strong>Reconocimiento de Saberes</strong>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">3</div>
                    <div className="text-blue-200">Certificados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">100%</div>
                    <div className="text-blue-200">Reconocimiento</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">1</div>
                    <div className="text-blue-200">Servicio Social</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Selector de Escuela */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-white mb-4">Procesos por Escuela</h2>
              <p className="text-gray-300">
                Selecciona tu institución educativa para ver los procesos específicos:
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {schools.map((school) => (
                  <Button
                    key={school.id}
                    variant={selectedSchool === school.id ? 'primary' : 'outline'}
                    onClick={() => setSelectedSchool(school.id)}
                  >
                    {school.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Procesos Detallados */}
        {currentSchool && (
          <section>
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-white">
                  Procesos para {currentSchool.name}
                </h2>
                <p className="text-gray-300">
                  Sigue estos pasos en orden para completar exitosamente tu servicio social:
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentSchool.processes.map((step, index) => (
                    <div key={step.id} className="relative">
                      {/* Línea conectora */}
                      {index < currentSchool.processes.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-700"></div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        {/* Número del paso */}
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{step.id}</span>
                        </div>
                        
                        {/* Contenido del paso */}
                        <div className="flex-1 bg-gray-800 p-6 rounded-lg border border-gray-700">
                          <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                          <p className="text-gray-300 mb-4">{step.description}</p>
                          
                          {/* Detalles adicionales si existen */}
                          {step.details && step.details.length > 0 && (
                            <div className="mt-4">
                              <h4 className="text-lg font-medium text-white mb-2">Detalles:</h4>
                              <ul className="space-y-2">
                                {step.details.map((detail, detailIndex) => (
                                  <li key={detailIndex} className="flex items-start space-x-2">
                                    <ChevronRight className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span 
                                      className="text-gray-300" 
                                      dangerouslySetInnerHTML={{ __html: detail }}
                                    />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {/* Botón para guía relacionada */}
                          {step.relatedGuideId && (
                            <div className="mt-6 pt-4 border-t border-gray-700">
                              <Link to={`/guias/${step.relatedGuideId}`}>
                                <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                                  <BookOpen className="h-4 w-4 mr-2" />
                                  Ver Guía Detallada
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pasos adicionales generales */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-6">Pasos Complementarios</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Verificación en Sistema</h4>
                      <p className="text-gray-300 text-sm">
                        Verificar que todos los datos estén correctos en el sistema IEEA 
                        antes de proceder con los exámenes.
                      </p>
                    </div>
                    
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Documentación Fotográfica</h4>
                      <p className="text-gray-300 text-sm">
                        Tomar fotografías de todos los registros y evidencias para 
                        respaldo y documentación.
                      </p>
                    </div>
                    
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Seguimiento de Exámenes</h4>
                      <p className="text-gray-300 text-sm">
                        Acompañar a los adultos durante el proceso de evaluación y 
                        firmar evidencias solo si aprueban.
                      </p>
                    </div>
                    
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Informes y Entrega</h4>
                      <p className="text-gray-300 text-sm">
                        Realizar informes bimestrales y entregar toda la papelería 
                        tanto física como digital.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recordatorio importante */}
                <div className="mt-8 bg-orange-900 border border-orange-700 p-6 rounded-lg">
                  <h4 className="font-semibold text-orange-200 mb-2">Recordatorio Importante</h4>
                  <p className="text-orange-100">
                    Recuerda subir todos los documentos digitales a la plataforma Google Classroom 
                    asignada para tu escuela y mantener comunicación constante con los voluntarios del IEEA.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
};

export default Processes;