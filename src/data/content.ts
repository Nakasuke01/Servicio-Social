// Contenido principal del sitio web - Fácil de modificar
import { 
  Announcement, 
  School, 
  Guide, 
  Document, 
  UsefulSite, 
  FAQ, 
  ContactInfo, 
  SchoolContact 
} from '../types';

// DATOS DE LA PÁGINA DE INICIO
export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Convocatoria Servicio Social 2025-2',
    description: 'Apertura de registro para estudiantes de preparatoria y universidad',
    date: '2025-09-31',
    type: 'convocatoria',
    content: `
      <h3>Convocatoria para Servicio Social 2025-2</h3>
      <p>El Instituto Estatal de Educación para Adultos (IEEA) convoca a estudiantes de preparatoria y universidad a participar en nuestro programa de servicio social.</p>
      
      <h4>Objetivo</h4>
      <p>Contribuir a la educación básica de adultos mediante el proceso de reconocimiento de saberes, logrando que 3 adultos obtengan su certificación educativa.</p>
      
      <h4>Requisitos</h4>
      <ul>
        <li>Estar cursando preparatoria o universidad</li>
        <li>Tener disponibilidad de tiempo</li>
        <li>Compromiso con la educación de adultos</li>
        <li>Documentos personales completos</li>
      </ul>
      
      <h4>Beneficios</h4>
      <ul>
        <li>Experiencia en trabajo social</li>
        <li>Contribución a la comunidad</li>
        <li>Certificado de servicio social</li>
        <li>Desarrollo de habilidades interpersonales</li>
      </ul>
    `,
    images: [
      'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5427648/pexels-photo-5427648.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    downloadUrl: '#',
    internalLink: '/procesos'
  },
  {
    id: '2',
    title: 'Entrega de Certificados Septiembre',
    description: 'Ceremonia de entrega de certificados de educación básica',
    date: '2025-09-31',
    type: 'noticia',
    content: `
      <h3>Ceremonia de Entrega de Certificados</h3>
      <p>Nos complace invitarlos a la ceremonia de entrega de certificados de educación básica correspondiente al mes de enero.</p>
      
      <h4>Detalles del Evento</h4>
      <p><strong>Fecha:</strong> 30 de Septiembre, 2025<br>
      <strong>Hora:</strong> 11:30 AM<br>
      <strong>Lugar:</strong> Sala Don Rafael Piña</p>
      
      <h4>Certificados a Entregar</h4>
      <ul>
        <li> certificados de primaria</li>
        <li> certificados de secundaria</li>
      </ul>
      
      <h4>Programa del Evento</h4>
      <ul>
        <li>11:30 AM - Registro de asistentes</li>
        <li>12:00 AM - Ceremonia de apertura</li>
        <li>12:20 AM - Entrega de certificados</li>
        <li>12:35 AM - Entrega de Reconocimientos</li>
        <li>12:45 PM - Fotografía grupal</li>
        <li>12:55 PM - Refrigerio</li>
      </ul>
    `,
    images: [
      'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5427648/pexels-photo-5427648.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    internalLink: '/contacto'
  }
];

// DATOS DE PROCESOS POR ESCUELA
export const schools: School[] = [
  {
    id: 'tecnologico',
    name: 'Instituto Tecnológico',
    processes: [
      {
        id: 1,
        title: 'Entrega de papelería personal y registro',
        description: 'Presentar documentos personales (Copias) y completar registro inicial',
        details: [
          'CURP actualizada (Certificada)',
          'Acta de Nacimiento',
          'INE',
          'Recibo de luz (no mayor a 3 meses)',
          'Fotografía (se toma en el momento con el celular)',
          'Constancia de estudios y Carta de presentación (original y 2 copias de cada uno) - <a href="https://forms.gle/AqT4D1yiCVb9Yrpr8" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">Solicitar aquí</a>',
          'Formato de registro lleno'
        ],
        relatedGuideId: null
      },
      {
        id: 2,
        title: 'Búsqueda de adultos interesados',
        description: 'Localizar adultos sin educación básica completa',
        details: [
          'Realizar encuestas en la comunidad',
          'Genera el RFE - <a href="http://168.255.120.53:8080/consultaRFE/" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">Genera aquí</a>',
          'Identificar nivel educativo actual',
          'Confirma que no se encuentre en la base de datos (Debes checar en cada estado si no salen registros puedes aplicar) - <a href="http://www.inea.gob.mx/servicios_en_linea/Consulta_avance_academico.html" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">Consulta aquí</a>',
          'Explicar beneficios del programa',
          'Obtener compromiso de participación'
        ],
        relatedGuideId: "generar-rfe"
        //relatedGuideId: ["generar-rfe","validar-adulto-sistema"]
        
      },
      {
        id: 3,
        title: 'Solicitar papelería de los adultos y llenar registros',
        description: 'Recopilar documentación (Copias) necesaria de cada adulto',
        details: [
          'CURP del adulto (Certificada)',
          'Acta de nacimiento',
          'INE',
          'Recibo de luz (no mayor a 3 meses)',
          'Fotografía (se toma en el momento con el celular)',
          'Formato de registro lleno',
          'Certificado de primaria (En caso de ser para Secundaria)',
          'Nota: Si aplicaste primaria y daras seguimiento a secundaria debes entregar todas las copias de nuevo'

        ],
        // Esta etiqueta sirve para poner un boton que redirija a una guia//
        // relatedGuideId: 'registro-adultos'//
      },
      {
        id: 4,
        title: 'Aplicacion de examen de Reconocimiento de Saberes',
        description: 'Ponerte de acuerdo con los adultos para programar hora,fecha y lugar de la aplicación',
        details: [
          'Recibir el examen y hoja de respuestas del personal del IEEA para la aplicación',
          'Acudir a la ubicacion acordada con el adulto para la aplicación',
          'Pedirle a un tercer que les tome una foto de evidencia donde salgas junto el adulto haciendo el examen',
          'Verifica que no falte ningun documento y todas las hojas esten llenas'
        ],
        //relatedGuideId: 'reconocimiento-saberes'
      },
      {
        id: 5,
        title: 'Subida de evidencias en Classroom',
        description: 'Registrar evidencias solicitadas por el TEC en la plataforma',
        details: [
          'Unete al grupo de Classroom para subir lo solicitado por el TEC, Clave de Acceso: <b>2iaiaqt</b> - <a href="https://classroom.google.com/c/Njg5NDA2ODk1MTAy?cjc=2iaiaqt" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">Unete aquí</a>',
          'Fotografías de la aplicación del examen',
          'Escaneo de registros del estudiante y adultos',
          'Escaneo de acuses firmados (Se te envian cuando un adulto pasa)',
          'Escaneo de constancia de estudios, carta de presentacion,carta de aceptación y carta de liberación'
        ],
        relatedGuideId: null
      },
      {
        id: 6,
        title: 'Entrega de papelería completa',
        description: 'Entregar documentación y aplicación de examenes al personal del IEEA',
        details: [
          'Papelería completa del adulto',
          'Examen aplicado',
          
        ],
        relatedGuideId: null
      },
      {
        id: 7,
        title: 'Firma de acuses',
        description: 'Firmar y entregar acuses en caso de que el adulto apruebe el examen (IEEA)',
        details: [
          'Recibir el acuse correspondiente por el personal del IEEA, si es de forma digital deberas imprimirlo',
          'Acordar una reunion con el adulto para que lo firme',
          'Escanear el Acuse',
          'Entregar fisicamente el acuse firmado al personal del IEEA'
          
        ],
        relatedGuideId: null
      },
      {
        id: 8,
        title: 'Informes y autoevaluaciones',
        description: 'Cumplir con la entrega de reportes bimestrales y evaluaciones personales (TEC)',
        details: [
          'Llenado de informes bimestrales',
          'Firma y sellado de informes',
          'Llenado de autoevaluaciones y evaluaciones',
          'Firma y sellado de evaluaciones'
          
        ],
        relatedGuideId: null
      },
    ]
  },
  {
    id: 'universidad',
    name: 'Universidad Estatal',
    processes: [
      {
        id: 1,
        title: 'Registro en sistema universitario',
        description: 'Completar registro inicial en plataforma universitaria',
        details: [
          'Crear cuenta en plataforma',
          'Subir documentos digitalizados',
          'Completar formulario inicial',
          'Agendar entrevista inicial'
        ],
        relatedGuideId: null
      },
      {
        id: 2,
        title: 'Capacitación en reconocimiento de saberes',
        description: 'Participar en taller de capacitación obligatorio',
        details: [
          'Asistir a taller presencial',
          'Estudiar metodología IEEA',
          'Practicar con casos reales',
          'Obtener certificación de capacitación'
        ],
        relatedGuideId: null
      },
      {
        id: 3,
        title: 'Identificación y registro de beneficiarios',
        description: 'Localizar y registrar adultos candidatos',
        details: [
          'Realizar trabajo de campo',
          'Aplicar encuestas socioeducativas',
          'Verificar documentación personal',
          'Registrar en sistema IEEA'
        ],
        relatedGuideId: 'registro-adultos'
      },
      {
        id: 4,
        title: 'Proceso de evaluación integral',
        description: 'Evaluación completa de competencias y saberes',
        details: [
          'Aplicar instrumentos de diagnóstico',
          'Documentar portafolio de evidencias',
          'Realizar entrevistas estructuradas',
          'Preparar expediente completo'
        ],
        relatedGuideId: 'reconocimiento-saberes'
      },
      {
        id: 5,
        title: 'Certificación y seguimiento',
        description: 'Proceso final de certificación y entrega',
        details: [
          'Coordinar exámenes finales',
          'Validar resultados obtenidos',
          'Gestionar emisión de certificados',
          'Realizar informe final de servicio'
        ],
        relatedGuideId: null
      }
    ]
  }
];

// GUÍAS DETALLADAS
export const guides: Guide[] = [
  {
    id: 'generar-rfe',
    title: 'Como generar el RFE y crear el correo Institucional',
    description: 'Proceso detallado Generar el RFE y generar el correo institucional',
    content: `
      <h3><b>Creación de RFE</b></h3>
      <p>Ingresa al siguiente sitio: <b><a href="http://168.255.120.53:8080/consultaRFE/">Ingresa</a></b> </p>
      <p>El sitio es sencillo es como solicitar la curp, solo deben ingresar los datos del beneficiado y darle en consultar</p>
      <img src="https://i.postimg.cc/9FCV4kC7/RFE.png" alt="Documentos requeridos" style="width: 100%; max-width: 600px; height: auto; margin: 20px 0; border-radius: 8px;" />
      
      <h4><b>¿Cómo realizar el dato que era en el apartado del correo institucional de la hoja de registro?</b></h4>
      <p>Cabe aclarar que como tal no generan el correo, simplemente es el dato para colocarlo en
      la hoja de registro, el 24 siempre va que indicaría nuestra zona, seguiría el sexo del
      beneficiado H para hombre y M para mujer posteriormente el RFE y terminamos con el
      @inea.gob.mx</p>
      
      
      <img src="https://i.postimg.cc/sgBVyh36/correo.png" alt="Documentos requeridos" style="width: 100%; max-width: 600px; height: auto; margin: 20px 0; border-radius: 8px;" />
      
    `,
   // videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=1xEPvXESqz1-NHAUhDFb9gM3xjXu_Q5iY'
  },
  {
    id: 'validar-adulto-sistema',
    title: 'Como verificar si se le puede aplicar a un adulto',
    description: 'Proceso detallado sobre como checar si un adulto esta en el sistema del INEA',
    content: `
      <h3><b>Verificacion en el Sistema</b></h3>
      <p>Ingresa al siguiente sitio: <b><a href="http://www.inea.gob.mx/servicios_en_linea/Consulta_avance_academico.html">Ingresa</a></b> </p>
      <p>O en google escribe <b>Avance Academico INEA</b>, aveces por sobre saturacion cambian el link.</p> <br>
      <p>Te mandara al siguiente sitio,
         solo debes Seleccionar un estado y poner el RFE, el RFE es el mismo dato que
         el RFC, quiero aclarar que debes repetir este proceso con todos los estados,
         aunque estemos en SLP, existe la posibilidad de que haya conseguido el
         certificado en otro estado.</p>
      <img src="https://i.postimg.cc/BQfSs6j4/V1.png" alt="Documentos requeridos" style="width: 100%; max-width: 600px; height: auto; margin: 20px 0; border-radius: 8px;" />
      
    
      <p>Y como saber si puede ingresar? Existen 4 posibles resultados
         Si arroja lo mostrado en la imagen puede entrar, da igual el nivel (Primaria o
         Secundaria)</p>
      
      
      <img src="https://i.postimg.cc/wMfQXPyk/v2.png" alt="Documentos requeridos" style="width: 100%; max-width: 600px; height: auto; margin: 20px 0; border-radius: 8px;" />


      <p>La otra opción en general es que te arroje información. Si en por ejemplo en
      el área de Etapa, dice Avanzado y en situación sale que concluyo es que no le
      puedes aplicar ningún examen ya es solo solicitar el duplicado de secundaria.</p>
      <br>
      <p>Si la persona en el área de certificados o en etapa solo dice intermedio y que
      concluyo, entonces se le podría aplicar el de secundaria, la cuestión es que
      debes solicitar duplicado del examen de primaria.</p>
      <br>
      <p>Si la persona en situación sale que es Baja aquí es un volado, ya que se podría
      meter pero existe la posibilidad de que el sistema no permita aplicarle el
      examen y si esta en baja avanzada y sale que aquí hizo la primaria se debe
      solicitar duplicado.</p>
      
      <img src="https://i.postimg.cc/cJG4mB3q/v3.png" alt="Documentos requeridos" style="width: 100%; max-width: 600px; height: auto; margin: 20px 0; border-radius: 8px;" />
      
    `,
   // videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=14dysM6bd2JcliNSYSwNDvAFPXurUaJVY'
  },
  {
    id: 'llenar-acuse',
    title: 'Como llenar un acuse',
    description: 'Proceso detallado sobre como llenar un acuse de entrega de certificado',
    content: `
      <h3><b>Llenado del Acuse</b></h3>
      <p>Aunque aun no se te dara el certificado, si es necesario que los adultos te firmen los acuses</p>
      <p>Para ello es necesario que llenen solo esta area, obvio deberan imprimir todo el acuse, y cabe aclarar que el cuadro no se recorta</p>
      <img src="https://i.postimg.cc/tCrBWBLT/Guia-llenado-de-Acuses.png" alt="Documentos requeridos" style="width: 100%; max-width: 600px; height: auto; margin: 20px 0; border-radius: 8px;" />
      
      
    `,
   // videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=1bJ1l0YPD2PXvBZy8lCCSiRiA2R--3a9U'
  },
  {
    id: 'llenar-hres',
    title: 'Como llenar la hoja de respuestas',
    description: 'Proceso detallado sobre como llenar la hoja de respuestas',
    content: `
      <h3><b>Llenado de la hoja de respuestas</b></h3>
      <p>Nombres y firmas van con lapicero de tinta azul</p>
      <p>Todos los demas datos y el llenado de las respuestas es con lapiz</p>
      <img src="https://i.postimg.cc/cL2T5r1G/Guia-llenado-hoja-de-respuestas.jpg" alt="Documentos requeridos" style="width: 100%; max-width: 600px; height: auto; margin: 20px 0; border-radius: 8px;" />
      
      
    `,
   // videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=1fmLMTWOM-mPsEBTVm7YYRyXNyqJV7o_9'
  },
  {
    id: 'llenar-regMonae',
    title: 'Como llenar el registro de prestador del servicio',
    description: 'Proceso detallado sobre como llenar la hoja de registro de prestador de servicio',
    content: `
      <h3><b>Descargar abajo el pdf de un ejemplo de llenado de registro</b></h3>

      
      
    `,
   // videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=1caqkNe2giAtBDZ1ZL1OQZJnfXIs9V9No'
  },
  {
    id: 'llenar-regEdu',
    title: 'Como llenar el registro del Beneficiario (Adulto que quiere obtener su certificado)',
    description: 'Proceso detallado sobre como llenar la hoja de registro del Beneficiario',
    content: `
      <h3><b>Descargar abajo el pdf de un ejemplo de llenado de registro</b></h3>

      
      
    `,
   // videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=1foalWxDZJhpEcTWxTGSCTXLAjye107sz'
  },
  {
    id: 'sol-dupli',
    title: 'Como solicitar un duplicado de certificado',
    description: 'Proceso detallado sobre como solicitar un duplicado de certificado',
    content: `
    <p><b>Cabe aclarar que la solicitud de duplicados es para personas que lo obtuvieron antes del 2016</b></p>
      <p><b>Descargar abajo el pdf de un ejemplo de llenado de registro</b></p>

      
      
    `,
   // videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=1I-waeXPrdzWXNU4EGTB6fBxp4X7kkdhF'
  },
];

// DOCUMENTOS DESCARGABLES
export const documents: Document[] = [
  {
    id: 'formato-registro-ss',
    title: 'Formato de Registro de Prestador de Servicio Social',
    description: 'Formato oficial para el registro del prestador del servicio social',
    category: 'Registros',
    format: 'pdf',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=14wumThLzXKvqR7sipEMdjE1k4DzAlseb'
  },
  {
    id: 'formato-registro',
    title: 'Formato de Registro de Beneficiario',
    description: 'Formato oficial para el registro de nuevos adultos en el programa',
    category: 'Registros',
    format: 'pdf',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1_-9ILRyeoL_1j4TM9-tGonVRR6a9uUTq'
  },
  {
    id: 'hoja-respuestas',
    title: 'Hoja de Respuestas para examen',
    description: 'Formato para responder cualquier examen de primaria y secundaria',
    category: 'Administrativos',
    format: 'pdf',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1m9TfBBUx3qG4CGTU3opNBQq2If3_TDd9'
  },
  {
    id: 'informe-alta',
    title: 'Formato de Informe de altas',
    description: 'Formato para seguimiento de altas',
    category: 'Informes',
    format: 'pdf',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1EcYSn74rhnlzSxXKB4ZkSlufoqz9O9dd'
  },
  {
    id: 'reportes-bimestrales',
    title: 'Formato de Reportes Bimestrales',
    description: 'Formato oficial para registrar las actividades bimestrales de los prestadores que realizan el servicio social de manera anticipada.',
    category: 'Informes',
    format: 'word',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1jYeAvM6j6GahtSYFefjVTr6hSzi3oClR'
  },
  
];

// SITIOS WEB ÚTILES
export const usefulSites: UsefulSite[] = [
  {
    id: 'ieea-estatal',
    title: 'Sistema IEEA Estatal',
    description: 'Plataforma principal del Instituto Estatal de Educación para Adultos de S.L.P.',
    url: 'http://ieeaslp.inea.gob.mx/',
    category: 'Oficial'
  },
  {
    id: 'classroom',
    title: 'Google Classroom',
    description: 'Aula virtual para entrega de documentos y actividades',
    url: 'https://classroom.google.com',
    category: 'Educativo'
  },
  {
    id: 'ieea-rfe',
    title: 'Generador de RFE',
    description: 'Plataforma para generar el RFE de los Adultos',
    url: 'http://168.255.120.53:8080/consultaRFE/',
    category: 'Oficial'
  },
  {
    id: 'avance-academico-ieea',
    title: 'Consulta el avance academico',
    description: 'Verificación de registro de avance academico en el INEA',
    url: 'http://www.inea.gob.mx/servicios_en_linea/Consulta_avance_academico.html',
    category: 'Oficial'
  },
  {
    id: 'curp-gob',
    title: 'Consulta CURP',
    description: 'Página oficial para consultar y actualizar CURP',
    url: 'https://www.gob.mx/curp',
    category: 'Documentos'
  }
];

// PREGUNTAS FRECUENTES
export const faqs: FAQ[] = [
  {
    id: '1',
    question: '¿Cuántos certificados debo lograr durante mi servicio social?',
    answer: 'El objetivo es lograr 3 certificados mediante el proceso de reconocimiento de saberes. Estos certificados corresponden a la educación básica: alfabetización, primaria y secundaria.',
    category: 'General'
  },
  {
    id: '2',
    question: '¿Qué documentos necesito para registrar a un adulto?',
    answer: 'Los documentos necesarios son: CURP actualizada, acta de nacimiento, comprobante de domicilio reciente y fotografía digital. También se requiere completar el formato de registro oficial.',
    category: 'Registro'
  },
  {
    id: '3',
    question: '¿Con qué frecuencia debo entregar informes?',
    answer: 'Los informes deben ser presentados de manera bimestral (cada 2 meses). Estos informes incluyen el progreso de los beneficiarios y las actividades realizadas.',
    category: 'Informes'
  },
  {
    id: '4',
    question: '¿Dónde subo los documentos digitales?',
    answer: 'Los documentos digitales se suben a la plataforma Google Classroom designada para tu escuela. También debes entregar copias físicas a los voluntarios del IEEA.<br><br><a href="https://classroom.google.com/c/Njg5NDA2ODk1MTAy?cjc=2iaiaqt" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors mt-3"><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>Ir a Google Classroom</a>',
    category: 'Documentos'
  },
  {
    id: '5',
    question: 'Si un adulto me aparece como dado de baja al buscarlo en el sistema, ¿le puedo aplicar el Reconocimiento de Saberes?',
    answer: 'Lo más probable es que se le pueda aplicar un examen llamado Diagnóstico. En este deberá obtener una calificación mínima de 9 para poder recibir su certificado. Tendrias que solicitar un diagnostico y una vez entregado se podria ver si les permitio subirlo al sistema o no, si no les permitio no se calificara.',
    category: 'Registro'
  },
  {
    id: '6',
    question: 'Si un adulto me aparece con Secundaria (Nivel Avanzado) concluida en el sistema, ¿le puedo aplicar el Reconocimiento de Saberes?',
    answer: 'No, y no se te puede contar para el servicio. Si solo tiene concluida la primaria, sí le podrías aplicar el de Secundaria; pero si no cuenta con el certificado de primaria, primero se tendría que solicitar un duplicado.',
    category: 'Registro'
  },
  {
    id: '7',
    question: 'Tengo jóvenes menores de 18 años, ¿puedo aplicarles el Reconocimiento de Saberes?',
    answer: 'No, pero puedes aplicarles el examen Diagnóstico a los jóvenes de 15 años o más. Si obtienen una calificación de 9, lo aprueban y ese certificado puede contarse para tu servicio social.',
    category: 'Registro'
  },
  {
    id: '8',
    question: 'En el caso de que un adulto no cuente con los servicios básicos (luz, agua o teléfono) en su domicilio y, por lo tanto, carezca de los recibos correspondientes, ¿Cuál es el procedimiento para comprobar su residencia?',
    answer: 'Cuando se comprueba la ausencia de servicios y la consecuente falta de recibos, se aplica una excepción. El solicitante deberá presentar únicamente: copia de su INE, CURP, Acta de Nacimiento y su respectiva Hoja de Registro. Si el trámite es para ingreso a secundaria, también deberá anexar el Certificado de Primaria.',
    category: 'Registro'
  },
  {
    id: '9',
    question: 'Si el adulto vive en EE. UU. o en el extranjero desde hace mucho tiempo, ¿cómo comprobamos su domicilio en México? ',
    answer: 'Se aplica un plan especial: si el adulto va a visitar su casa en México, o si usted lo visitará en EE. UU., puede usar este método. Debe entregar: CURP, Acta de Nacimiento y la Hoja de Registro. En lugar de su recibo, puede usar un recibo de luz, agua o teléfono de la persona que lo recibirá o visitará (es decir, su recibo).',
    category: 'Registro'
  },
  //{
   // id: '5',
   // question: '¿Qué pasa si un adulto no aprueba el examen?',
   // answer: 'Si un adulto no aprueba el examen, se debe brindar apoyo adicional y preparación para una nueva oportunidad. No se firman las evidencias hasta que haya aprobado satisfactoriamente.',
   // category: 'Evaluaciones'
  //}
];

// INFORMACIÓN DE CONTACTO
export const contactInfo: ContactInfo = {
  address: 'Calle Zaragoza #703 Zona Centro, Ciudad Valles, S.L.P.',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2273.151714598561!2d-99.01414992519302!3d21.991153590586308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d60d625e1a9e13%3A0x48dc951619b7611!2sInstituto%20Estatal%20de%20Educaci%C3%B3n%20para%20Adultos%20CZ2406!5e0!3m2!1ses-419!2smx!4v1758591151641!5m2!1ses-419!2smx" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
  phone: '+52 (481) 382-2540',
  email: 'czvalles@inea.gob.mx',
  schedule: 'Lunes a Viernes: 8:00 AM - 3:00 PM'
};

// CONTACTOS POR ESCUELA
export const schoolContacts: SchoolContact[] = [
  {
    schoolName: 'Instituto Tecnológico',
    whatsappGroup: 'https://chat.whatsapp.com/Iq83Y7HZNKqHsUxeevohmk?mode=ems_copy_t',
    ieea: {
      name: 'Coordinación IEEA Tecnológico',
      phone: '+52 (481) 145-4356',
      email: null
    },
    institution: {
      name: 'Departamento de Servicio Social',
      phone: '+52 ',
      email: ''
    }
  },
  {
    schoolName: 'Universidad Estatal',
    whatsappGroup: 'https://chat.whatsapp.com/grupo-universidad',
    ieea: {
      name: 'Coordinación IEEA Universidad',
      phone: '+52 (55) 3333-3333',
      email: 'uni@ieea-estado.gob.mx'
    },
    institution: {
      name: 'Coordinación de Vinculación',
      phone: '+52 (55) 4444-4444',
      email: 'vinculacion@universidad.edu.mx'
    }
  }
];