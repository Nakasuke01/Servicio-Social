import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import Disclaimer from '../components/UI/Disclaimer';
import { ChevronRight, BookOpen, Target, Award, Users, CheckCircle } from 'lucide-react';
import { schools, guides } from '../data/content';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  details?: string[];
  relatedGuideId?: string;
  relatedGuideIds?: string | string[];
}

const Processes: React.FC = () => {
  const [selectedSchool, setSelectedSchool] = useState(schools[0].id);
  const currentSchool = schools.find(school => school.id === selectedSchool);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Disclaimer />

        {/* Header Principal */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Procesos del Servicio Social</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conoce los pasos detallados para completar exitosamente tu servicio social.
          </p>
        </div>

        {/* SECCIÓN RESTAURADA: OBJETIVO PRINCIPAL (Basada en image_2c53c4.png) */}
        <section className="mb-12">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="text-blue-500 h-6 w-6" />
                <h2 className="text-2xl font-bold">Objetivo Principal</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-900/30 border border-blue-800 rounded-xl p-8">
                <p className="text-lg text-blue-100 mb-8 text-center">
                  El objetivo principal de tu servicio social es lograr que con al menos <strong className="text-white text-xl">5 adultos</strong> ingresados (no es necesario que sean al mismo tiempo), apoyes a obtener <strong className="text-white text-xl">3 certificados</strong> de educación básica mediante el proceso de <strong className="text-white">Reconocimiento de Saberes</strong>.
                </p>
                
                {/* Stats del Objetivo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-blue-400">3</span>
                    <span className="text-gray-300 flex items-center gap-2 mt-2">
                      <Award className="h-4 w-4" /> Certificados
                    </span>
                  </div>
                  <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-blue-800 py-4 md:py-0">
                    <span className="text-4xl font-bold text-green-400">100%</span>
                    <span className="text-gray-300 flex items-center gap-2 mt-2">
                      <CheckCircle className="h-4 w-4" /> Reconocimiento
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-orange-400">1</span>
                    <span className="text-gray-300 flex items-center gap-2 mt-2">
                      <Users className="h-4 w-4" /> Servicio Social
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Selector de Escuela */}
        <section className="mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <h2 className="text-2xl font-bold mb-4">Procesos por Escuela</h2>
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
            </CardHeader>
          </Card>
        </section>

        {/* Listado de Pasos */}
        {currentSchool && (
          <section>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <h2 className="text-2xl font-bold">Procesos para {currentSchool.name}</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {(currentSchool.processes as ProcessStep[]).map((step, index) => {
                    
                    // Lógica para separar botones múltiples
                    let listaGuias: string[] = [];
                    const guiaData = step.relatedGuideIds || step.relatedGuideId;
                    if (guiaData) {
                      listaGuias = Array.isArray(guiaData) 
                        ? guiaData 
                        : guiaData.split(',').map(s => s.trim()).filter(s => s !== '');
                    }

                    return (
                      <div key={step.id} className="relative">
                        {/* Línea vertical (Diseño original) */}
                        {index < currentSchool.processes.length - 1 && (
                          <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-700"></div>
                        )}
                        
                        <div className="flex items-start space-x-4">
                          {/* Círculo con número */}
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center z-10 shadow-lg">
                            <span className="font-bold">{step.id}</span>
                          </div>
                          
                          {/* Tarjeta de Contenido (El segundo rectángulo) */}
                          <div className="flex-1 bg-gray-900/50 p-6 rounded-xl border border-gray-700 mb-4">
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-400 mb-4">{step.description}</p>
                            
                            {/* Detalles con Chevron */}
                            {step.details && (
                              <ul className="space-y-2 mb-6">
                                {step.details.map((detail, dIdx) => (
                                  <li key={dIdx} className="flex items-start">
                                    <ChevronRight className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-gray-300" dangerouslySetInnerHTML={{ __html: detail }} />
                                  </li>
                                ))}
                              </ul>
                            )}
                            
                            {/* BOTONES MULTIPLES */}
                            {listaGuias.length > 0 && (
                              <div className="mt-6 pt-4 border-t border-gray-800 flex flex-wrap gap-3">
                                {listaGuias.map((gId) => {
                                  const gInfo = guides.find(g => g.id === gId);
                                  const textoBoton = gInfo ? gInfo.title : gId.replace(/-/g, ' ');

                                  return (
                                    <Link key={gId} to={`/guias/${gId}`}>
                                      <Button variant="secondary" size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                        <BookOpen className="h-4 w-4 mr-2" />
                                        {textoBoton}
                                      </Button>
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
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