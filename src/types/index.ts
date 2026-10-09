// Tipos de datos principales para el sitio web del IEEA

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'convocatoria' | 'evento' | 'noticia' | 'informativo' | 'consejo';
  content?: string;
  images?: string[];
  videoUrl?: string;
  downloadUrl?: string;
  externalLink?: string;
  internalLink?: string;
  featured?: boolean;
  activeTooltip?: boolean;
  highlights?: string[];
  ctaLabel?: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  details?: string[];
  relatedGuideIds?: string[];
}

export interface School {
  id: string;
  name: string;
  processes: ProcessStep[];
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  images?: string[];
  relatedLinks?: { title: string; url: string }[];
  downloadUrl?: string;
  guideType?: 'documentos' | 'asesorias' | 'procedimientos' | 'evaluacion' | 'registro' | 'capacitacion';
  institutions?: string[];
  excludedInstitutions?: string[];
}

export interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  format: 'word' | 'pdf' | 'excel' | 'powerpoint' | 'sql' | 'access';
  downloadUrl: string;
  institutions?: string[];
  excludedInstitutions?: string[];
}

export interface UsefulSite {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactInfo {
  address: string;
  mapUrl: string;
  phone: string;
  email: string;
  schedule: string;
}

export interface SchoolContact {
  schoolName: string;
  whatsappGroup: string;
  ieea: {
    name: string;
    phone: string;
    email: string;
  };
  institution: {
    name: string;
    phone: string;
    email: string;
  };
}