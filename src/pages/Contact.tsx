import React from 'react';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import Disclaimer from '../components/UI/Disclaimer';
import { MapPin, Phone, Mail, Clock, Building, User, MessageCircle } from 'lucide-react';
import { contactInfo, schoolContacts } from '../data/content';

/**
 * Página de Contacto - Información de contacto general y por escuela
 * Incluye mapa, datos de contacto y enlaces por institución
 */
const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Disclaimer */}
        <Disclaimer />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contáctanos</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estamos aquí para apoyarte durante tu servicio social. 
            Encuentra toda la información de contacto organizada por institución.
          </p>
        </div>

        {/* Información general del instituto */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-white">Instituto Estatal de Educación para Adultos</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Información de contacto */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Dirección</h3>
                      <p className="text-gray-300">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Teléfono</h3>
                      <a 
                        href={`tel:${contactInfo.phone}`}
                        className="text-green-400 hover:text-green-300 transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-6 w-6 text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Correo Electrónico</h3>
                      <a 
                        href={`mailto:${contactInfo.email}`}
                        className="text-orange-400 hover:text-orange-300 transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-6 w-6 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Horario de Atención</h3>
                      <p className="text-gray-300">{contactInfo.schedule}</p>
                    </div>
                  </div>
                </div>

                {/* Mapa */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Ubicación</h3>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src={contactInfo.mapUrl}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación del IEEA"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contactos por escuela */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Contactos por Institución Educativa</h2>
            <p className="text-gray-300 text-center max-w-3xl mx-auto">
              Información de contacto específica según tu institución educativa. 
              Incluye tanto los enlaces del IEEA como de tu escuela.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {schoolContacts.map((contact, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Building className="h-6 w-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">{contact.schoolName}</h3>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Contacto IEEA */}
                  <div className="bg-blue-900 border border-blue-700 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <User className="h-5 w-5 text-blue-400" />
                      <h4 className="text-lg font-semibold text-blue-200">Coordinación IEEA</h4>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-blue-100 font-medium">{contact.ieea.name}</p>
                      
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-blue-400" />
                        <a 
                          href={`tel:${contact.ieea.phone}`}
                          className="text-blue-300 hover:text-blue-200 transition-colors text-sm"
                        >
                          {contact.ieea.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-blue-400" />
                        <a 
                          href={`mailto:${contact.ieea.email}`}
                          className="text-blue-300 hover:text-blue-200 transition-colors text-sm break-all"
                        >
                          {contact.ieea.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Contacto Institución */}
                  <div className="bg-green-900 border border-green-700 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Building className="h-5 w-5 text-green-400" />
                      <h4 className="text-lg font-semibold text-green-200">Institución Educativa</h4>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-green-100 font-medium">{contact.institution.name}</p>
                      
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-green-400" />
                        <a 
                          href={`tel:${contact.institution.phone}`}
                          className="text-green-300 hover:text-green-200 transition-colors text-sm"
                        >
                          {contact.institution.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-green-400" />
                        <a 
                          href={`mailto:${contact.institution.email}`}
                          className="text-green-300 hover:text-green-200 transition-colors text-sm break-all"
                        >
                          {contact.institution.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Botón de WhatsApp */}
                  <div className="mt-6">
                    <a 
                      href={contact.whatsappGroup}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Unirse al Grupo de WhatsApp
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                  <h3 className="text-lg font-semibold text-white mb-3">Horarios de Atención</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong>IEEA:</strong> Lunes a Viernes, 8:00 AM - 6:00 PM</li>
                    <li>• <strong>Instituciones:</strong> Según horarios escolares</li>
                    <li>• <strong>Emergencias:</strong> Contactar por correo electrónico</li>
                    <li>• <strong>Vacaciones:</strong> Atención reducida</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Recomendaciones</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Siempre menciona tu institución educativa</li>
                    <li>• Ten a la mano tu número de matrícula</li>
                    <li>• Prepara tus preguntas específicas</li>
                    <li>• Utiliza correo para consultas detalladas</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-orange-900 border border-orange-700 rounded-lg">
                <h4 className="font-semibold text-orange-200 mb-2">Respuesta Rápida</h4>
                <p className="text-orange-100 text-sm">
                  Para obtener respuestas más rápidas, utiliza el correo electrónico específico de tu institución. 
                  Incluye siempre tu nombre completo, escuela y una descripción clara de tu consulta.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;