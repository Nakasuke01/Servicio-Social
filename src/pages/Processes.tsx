import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import Disclaimer from '../components/UI/Disclaimer';
import { BookOpen, Target, Award, Users, CheckCircle, Flag } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <Disclaimer />

        {/* Header Principal */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Procesos del Servicio Social</h1>
          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Conoce los pasos detallados para completar exitosamente tu servicio social.
          </p>
        </div>

        {/* SECCIÓN RESTAURADA: OBJETIVO PRINCIPAL (Basada en image_2c53c4.png) */}
        <section className="mb-8 sm:mb-12">
          <Card className="bg-gray-800 border-gray-700" hover={false}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="text-blue-500 h-6 w-6" />
                <h2 className="text-xl sm:text-2xl font-bold">Objetivo Principal</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-900/30 border border-blue-800 rounded-xl p-4 sm:p-8">
                <p className="text-base sm:text-lg text-blue-100 mb-6 sm:mb-8 text-center leading-relaxed">
                  El objetivo principal de tu servicio social es lograr que con al menos <strong className="text-white text-xl">5 adultos</strong> ingresados (no es necesario que sean al mismo tiempo), apoyes a obtener <strong className="text-white text-xl">3 certificados</strong> de educación básica mediante el proceso de <strong className="text-white">Reconocimiento de Saberes</strong>.
                </p>
                
                {/* Stats del Objetivo */}
                <div className="grid grid-cols-3 gap-2 sm:gap-8 pt-2 sm:pt-4">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl font-bold text-blue-400">3</span>
                    <span className="text-gray-300 text-xs sm:text-base flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mt-2 text-center">
                      <Award className="h-4 w-4" /> Certificados
                    </span>
                  </div>
                  <div className="flex flex-col items-center border-x border-blue-800">
                    <span className="text-3xl sm:text-4xl font-bold text-green-400">100%</span>
                    <span className="text-gray-300 text-xs sm:text-base flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mt-2 text-center">
                      <CheckCircle className="h-4 w-4" /> Reconocimiento
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl font-bold text-orange-400">1</span>
                    <span className="text-gray-300 text-xs sm:text-base flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mt-2 text-center">
                      <Users className="h-4 w-4" /> Servicio Social
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Selector de Escuela */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-2xl font-bold mb-3">Elige tu escuela</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {schools.map((school) => (
              <Button
                key={school.id}
                size="sm"
                variant={selectedSchool === school.id ? 'primary' : 'outline'}
                onClick={() => setSelectedSchool(school.id)}
              >
                {school.name}
              </Button>
            ))}
          </div>
        </section>

        {/* Listado de Pasos */}
        {currentSchool && (
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Procesos para {currentSchool.name}</h2>
            <p className="text-gray-400 mb-4">
              Son {currentSchool.processes.length} pasos. Toca un número para ir directo a ese paso.
            </p>

            {/* Acceso rápido a cada paso */}
            <nav
              aria-label="Ir a un paso"
              className="sticky top-16 md:top-20 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 mb-6 bg-gray-900/95 backdrop-blur border-b border-gray-800 sm:border-0"
            >
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {(currentSchool.processes as ProcessStep[]).map((step) => (
                  <a
                    key={step.id}
                    href={`#paso-${step.id}`}
                    title={step.title}
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-800 border border-gray-700 text-gray-200 font-bold flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-colors"
                  >
                    {step.id}
                  </a>
                ))}
              </div>
            </nav>

            <ol className="space-y-5 sm:space-y-8">
              {(currentSchool.processes as ProcessStep[]).map((step, index) => {

                // Lógica para separar botones múltiples
                let listaGuias: string[] = [];
                const guiaData = step.relatedGuideIds || step.relatedGuideId;
                if (guiaData) {
                  listaGuias = Array.isArray(guiaData)
                    ? guiaData
                    : guiaData.split(',').map(s => s.trim()).filter(s => s !== '');
                }

                const isLast = index === currentSchool.processes.length - 1;

                return (
                  <li key={step.id} id={`paso-${step.id}`} className="relative scroll-mt-40">
                    {/* Línea vertical que une los pasos */}
                    {!isLast && (
                      <div className="absolute left-[19px] sm:left-6 top-10 sm:top-12 w-0.5 h-full bg-gradient-to-b from-blue-600/60 to-gray-700" aria-hidden="true"></div>
                    )}

                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Círculo con número */}
                      <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-10 shadow-lg ring-4 ring-gray-900 ${isLast ? 'bg-green-600' : 'bg-blue-600'}`}>
                        {isLast ? <Flag className="h-5 w-5" /> : <span className="font-bold sm:text-lg">{step.id}</span>}
                      </div>

                      {/* Tarjeta de contenido */}
                      <div className={`flex-1 min-w-0 bg-gray-800 p-4 sm:p-6 rounded-2xl border ${isLast ? 'border-green-700/70' : 'border-gray-700'}`}>
                        <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isLast ? 'text-green-400' : 'text-blue-400'}`}>
                          Paso {step.id} de {currentSchool.processes.length}{isLast && ' · Último paso'}
                        </p>
                        <h3 className="text-lg sm:text-xl font-bold mb-2 leading-snug">{step.title}</h3>
                        <p className="text-gray-400 mb-4 leading-relaxed">{step.description}</p>

                        {/* Detalles */}
                        {step.details && (
                          <ul className="space-y-3">
                            {step.details.map((detail, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2.5">
                                <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                <span className="rich-text text-gray-200 leading-relaxed min-w-0" dangerouslySetInnerHTML={{ __html: detail }} />
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Botones de guías relacionadas */}
                        {listaGuias.length > 0 && (
                          <div className="mt-5 pt-4 border-t border-gray-700 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3">
                            {listaGuias.map((gId) => {
                              const gInfo = guides.find(g => g.id === gId);
                              const textoBoton = gInfo ? gInfo.title : gId.replace(/-/g, ' ');

                              return (
                                <Link
                                  key={gId}
                                  to={`/guias/${gId}`}
                                  className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors"
                                >
                                  <BookOpen className="h-4 w-4 flex-shrink-0" />
                                  {textoBoton}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
};

export default Processes;