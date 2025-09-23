import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import Disclaimer from '../components/UI/Disclaimer';
import { Scale, Shield, FileText, AlertTriangle } from 'lucide-react';

/**
 * Página de Aviso Legal con submenús
 * Incluye Aviso Legal, Política de Privacidad y Términos de Uso
 */
const Legal: React.FC = () => {
  const { section } = useParams<{ section?: string }>();
  const [activeSection, setActiveSection] = useState(section || 'aviso');

  const sections = [
    { id: 'aviso', name: 'Aviso Legal', icon: Scale },
    { id: 'privacidad', name: 'Política de Privacidad', icon: Shield },
    { id: 'terminos', name: 'Términos de Uso', icon: FileText }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'aviso':
        return (
          <div className="prose prose-lg prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">Aviso Legal</h2>
            
            <div className="space-y-6 text-gray-300">
              <section>
                <h3 className="text-xl font-semibold text-white mb-3">1. Información General</h3>
                <p className="leading-relaxed">
                  Este sitio web es un <strong>proyecto personal independiente</strong> creado con fines 
                  informativos y educativos. No tiene afiliación oficial con el Instituto Estatal de 
                  Educación para Adultos (IEEA), el Tecnológico Nacional de México (TecNM), ni con 
                  cualquier otra institución educativa gubernamental.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">2. Naturaleza del Proyecto</h3>
                <p className="leading-relaxed mb-3">
                  Este portal web fue desarrollado como una herramienta de apoyo para estudiantes que 
                  realizan servicio social en programas de educación para adultos. La información 
                  contenida se basa en:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Experiencias personales en programas de servicio social</li>
                  <li>Información pública disponible en portales oficiales</li>
                  <li>Documentación y procesos generales del sector educativo</li>
                  <li>Mejores prácticas en programas de reconocimiento de saberes</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">3. Limitación de Responsabilidad</h3>
                <p className="leading-relaxed mb-3">
                  El creador de este sitio web <strong>no se hace responsable</strong> por:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>La exactitud, actualidad o completitud de la información presentada</li>
                  <li>Cambios en procesos, requisitos o normativas institucionales</li>
                  <li>Decisiones tomadas basándose únicamente en la información de este sitio</li>
                  <li>Problemas derivados del uso inadecuado de la información proporcionada</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">4. Recomendaciones de Uso</h3>
                <div className="bg-orange-900 border border-orange-700 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-orange-100 font-medium mb-2">Verificación Obligatoria</p>
                      <p className="text-orange-200 text-sm leading-relaxed">
                        <strong>SIEMPRE</strong> verifique la información en los portales oficiales 
                        de las instituciones correspondientes antes de tomar cualquier decisión o 
                        realizar trámites oficiales.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">5. Propiedad Intelectual</h3>
                <p className="leading-relaxed">
                  El diseño, estructura y contenido original de este sitio web son propiedad del 
                  desarrollador. Las marcas, logotipos y nombres de instituciones mencionadas 
                  pertenecen a sus respectivos propietarios y se utilizan únicamente con fines 
                  informativos y de referencia.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">6. Contacto</h3>
                <p className="leading-relaxed">
                  Para consultas sobre este aviso legal o el sitio web, puede contactar al 
                  desarrollador a través de los medios proporcionados en la sección de contacto.
                </p>
              </section>
            </div>
          </div>
        );

      case 'privacidad':
        return (
          <div className="prose prose-lg prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">Política de Privacidad</h2>
            
            <div className="space-y-6 text-gray-300">
              <section>
                <h3 className="text-xl font-semibold text-white mb-3">1. Recopilación de Información</h3>
                <p className="leading-relaxed">
                  Este sitio web <strong>NO recopila información personal</strong> de los usuarios. 
                  No utilizamos formularios de registro, cookies de seguimiento, ni sistemas de 
                  análisis que almacenen datos personales.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">2. Información Técnica</h3>
                <p className="leading-relaxed mb-3">
                  Como cualquier sitio web, nuestro servidor puede registrar automáticamente 
                  información técnica básica como:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Dirección IP del visitante</li>
                  <li>Tipo de navegador utilizado</li>
                  <li>Páginas visitadas dentro del sitio</li>
                  <li>Fecha y hora de acceso</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  Esta información se utiliza únicamente para el funcionamiento técnico del sitio 
                  y no se asocia con identidades personales.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">3. Enlaces Externos</h3>
                <p className="leading-relaxed">
                  Este sitio contiene enlaces a sitios web externos (portales oficiales, 
                  plataformas educativas, etc.). No somos responsables de las políticas de 
                  privacidad de estos sitios externos. Recomendamos revisar sus políticas 
                  antes de proporcionar información personal.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">4. Seguridad</h3>
                <p className="leading-relaxed">
                  Aunque no recopilamos información personal, implementamos medidas de seguridad 
                  estándar para proteger la integridad del sitio web y prevenir accesos no 
                  autorizados o modificaciones maliciosas.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">5. Cambios en la Política</h3>
                <p className="leading-relaxed">
                  Esta política de privacidad puede actualizarse ocasionalmente. Los cambios 
                  significativos se reflejarán en esta página con la fecha de última modificación.
                </p>
              </section>
            </div>
          </div>
        );

      case 'terminos':
        return (
          <div className="prose prose-lg prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">Términos de Uso</h2>
            
            <div className="space-y-6 text-gray-300">
              <section>
                <h3 className="text-xl font-semibold text-white mb-3">1. Aceptación de Términos</h3>
                <p className="leading-relaxed">
                  Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos 
                  términos de uso. Si no está de acuerdo con alguno de estos términos, 
                  no debe utilizar este sitio.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">2. Uso Permitido</h3>
                <p className="leading-relaxed mb-3">
                  Este sitio web está destinado para:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Consulta de información sobre servicio social en educación para adultos</li>
                  <li>Acceso a guías y documentos de apoyo</li>
                  <li>Referencia a procesos y procedimientos generales</li>
                  <li>Uso educativo y de consulta personal</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">3. Uso Prohibido</h3>
                <p className="leading-relaxed mb-3">
                  Está prohibido utilizar este sitio para:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Actividades ilegales o no autorizadas</li>
                  <li>Distribución de malware o contenido malicioso</li>
                  <li>Intentos de acceso no autorizado a sistemas</li>
                  <li>Reproducción no autorizada del contenido con fines comerciales</li>
                  <li>Suplantación de identidad o representación oficial falsa</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">4. Descargo de Responsabilidad</h3>
                <div className="bg-red-900 border border-red-700 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-red-100 font-medium mb-2">Importante</p>
                      <p className="text-red-200 text-sm leading-relaxed">
                        La información en este sitio se proporciona "tal como está" sin garantías 
                        de ningún tipo. El uso de la información es bajo su propio riesgo y 
                        responsabilidad.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">5. Modificaciones</h3>
                <p className="leading-relaxed">
                  Nos reservamos el derecho de modificar estos términos de uso en cualquier 
                  momento. Los cambios entrarán en vigor inmediatamente después de su 
                  publicación en esta página.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">6. Jurisdicción</h3>
                <p className="leading-relaxed">
                  Estos términos se rigen por las leyes aplicables en México. Cualquier 
                  disputa se resolverá en los tribunales competentes correspondientes.
                </p>
              </section>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Disclaimer */}
        <Disclaimer />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Información Legal</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Información legal completa sobre este proyecto independiente, 
            políticas de privacidad y términos de uso del sitio web.
          </p>
        </div>

        {/* Selector de Sección */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-white mb-4">Secciones Legales</h2>
              <p className="text-gray-300">
                Selecciona la sección que deseas consultar:
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? 'primary' : 'outline'}
                      onClick={() => setActiveSection(section.id)}
                      className="flex items-center space-x-2"
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{section.name}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contenido de la Sección */}
        <section>
          <Card>
            <CardContent className="py-8">
              {renderContent()}
            </CardContent>
          </Card>
        </section>

        {/* Información adicional */}
        <section className="mt-8">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-white">Información de Contacto Legal</h2>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-900 border border-blue-700 p-6 rounded-lg">
                <p className="text-blue-200 mb-4">
                  Para consultas legales específicas sobre este sitio web o para reportar 
                  problemas relacionados con el contenido, puede contactar al desarrollador.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="mailto:tu-email@ejemplo.com" 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Contacto Legal
                  </a>
                  <a 
                    href="/contacto"
                    className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Información General
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Legal;