import React, { useState, useEffect, useCallback } from 'react';
import { X, ArrowRight, Check, Users, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Announcement } from '../../types';

interface AnnouncementTooltipProps {
  announcements: Announcement[];
}

// Tiempo de lectura de cada aviso: ~180 palabras por minuto (lectura cómoda en
// pantalla) más 2 s para ubicar el aviso, entre 8 y 16 segundos.
const WORDS_PER_SECOND = 3;
const MIN_MS = 8000;
const MAX_MS = 16000;

const getReadingTimeMs = (a: Announcement) => {
  const text = [a.title, a.description, ...(a.highlights ?? [])].join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  const ms = (words / WORDS_PER_SECOND) * 1000 + 2000;
  return Math.min(MAX_MS, Math.max(MIN_MS, Math.round(ms)));
};

// Cada visita empieza con un aviso distinto (se recuerda en el navegador)
const START_INDEX_KEY = 'announcementTooltipNextIndex';

// Logo de WhatsApp (lucide-react no incluye marcas)
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

type Variant = 'whatsapp' | 'form' | 'default';

const getVariant = (announcement: Announcement): Variant => {
  const link = announcement.externalLink ?? '';
  if (link.includes('chat.whatsapp.com')) return 'whatsapp';
  if (link.includes('docs.google.com/forms') || link.includes('forms.gle')) return 'form';
  return 'default';
};

const VARIANTS: Record<Variant, { header: string; button: string; check: string; cta: string }> = {
  whatsapp: {
    header: 'from-emerald-600 via-green-600 to-teal-700',
    button: 'bg-green-500 hover:bg-green-400 text-gray-900 focus-visible:ring-green-300',
    check: 'text-green-400',
    cta: 'Unirme al grupo',
  },
  form: {
    header: 'from-violet-700 via-purple-600 to-fuchsia-700',
    button: 'bg-violet-500 hover:bg-violet-400 text-white focus-visible:ring-violet-300',
    check: 'text-violet-400',
    cta: 'Llenar formulario',
  },
  default: {
    header: 'from-blue-700 via-blue-600 to-indigo-700',
    button: 'bg-blue-600 hover:bg-blue-500 text-white focus-visible:ring-blue-300',
    check: 'text-blue-400',
    cta: 'Ver más',
  },
};

const AnnouncementTooltip: React.FC<AnnouncementTooltipProps> = ({ announcements }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // La clave incluye los ids para que avisos nuevos vuelvan a mostrarse
  const storageKey = `hasSeenAnnouncementTooltip-${announcements.map(a => a.id).join('-')}`;
  const total = announcements.length;

  useEffect(() => {
    if (total > 1) {
      try {
        const saved = Number(localStorage.getItem(START_INDEX_KEY)) || 0;
        const start = saved % total;
        setCurrent(start);
        localStorage.setItem(START_INDEX_KEY, String((start + 1) % total));
      } catch {
        // sin localStorage: empieza por el primero
      }
    }

    let hasSeen = false;
    try {
      hasSeen = sessionStorage.getItem(storageKey) === 'true';
    } catch {
      // sessionStorage puede no estar disponible (modo privado)
    }
    if (hasSeen) return;

    const timer = setTimeout(() => setIsVisible(true), 600);
    return () => clearTimeout(timer);
  }, [storageKey, total]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(storageKey, 'true');
    } catch {
      // sin almacenamiento: solo se cierra
    }
  }, [storageKey]);

  const goTo = useCallback((index: number) => {
    setCurrent((index + total) % total);
  }, [total]);

  // Cerrar con Escape, flechas para cambiar de aviso y bloquear el scroll del fondo
  useEffect(() => {
    if (!isVisible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft') goTo(current - 1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isVisible, handleClose, goTo, current]);

  if (!isVisible || total === 0) return null;

  const announcement = announcements[current];
  const variant = getVariant(announcement);
  const accent = VARIANTS[variant];
  const ctaLabel = announcement.ctaLabel ?? accent.cta;
  const readingMs = getReadingTimeMs(announcement);

  const primaryClasses = `w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 font-semibold rounded-xl shadow-lg transition-all focus:outline-none focus-visible:ring-4 group ${accent.button}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-modal-title"
      aria-describedby="announcement-modal-description"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-sm sm:max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 animate-fade-in"
        onPointerEnter={(e) => e.pointerType === 'mouse' && setIsPaused(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setIsPaused(false)}
      >
        <button
          onClick={handleClose}
          className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-black/25 text-white/90 hover:bg-black/40 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Cerrar avisos"
        >
          <X className="h-4 w-4" />
        </button>

        {/* key fuerza la animación de entrada en cada cambio de aviso */}
        <div key={announcement.id} className="animate-fade-in">
          {/* Encabezado compacto: icono + título */}
          <div className={`relative bg-gradient-to-br ${accent.header} pl-4 pr-12 py-4 sm:pl-5 overflow-hidden`}>
            <div className="absolute -bottom-10 -right-6 h-28 w-28 rounded-full bg-white/10" aria-hidden="true" />

            <div className="relative flex items-center gap-3">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-white/20">
                {variant === 'whatsapp' && <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7 text-green-500" />}
                {variant === 'form' && <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-violet-600" />}
                {variant === 'default' && <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />}
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-white/80">
                  Aviso importante{total > 1 && ` · ${current + 1} de ${total}`}
                </span>
                <h2 id="announcement-modal-title" className="text-lg sm:text-xl font-bold leading-tight text-white">
                  {announcement.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Barra de tiempo: al llenarse pasa al siguiente aviso (se pausa con el cursor encima) */}
          {total > 1 && (
            <div className="h-1 bg-gray-700" aria-hidden="true">
              <div
                className="h-full bg-white/70 origin-left animate-progress"
                style={{
                  animationDuration: `${readingMs}ms`,
                  animationPlayState: isPaused ? 'paused' : 'running',
                }}
                onAnimationEnd={() => goTo(current + 1)}
              />
            </div>
          )}

          {/* Contenido */}
          <div className="px-4 sm:px-5 pt-4">
            <p id="announcement-modal-description" className="text-sm text-gray-300 mb-3">
              {announcement.description}
            </p>

            {announcement.highlights && announcement.highlights.length > 0 && (
              <ul className="space-y-1.5 mb-4">
                {announcement.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-snug text-gray-200">
                    <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${accent.check}`} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {announcement.externalLink ? (
              <a
                href={announcement.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryClasses}
              >
                {variant === 'whatsapp' && <WhatsAppIcon className="h-5 w-5" />}
                {ctaLabel}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            ) : (
              <Link
                to={`/anuncios/${announcement.id}`}
                onClick={handleClose}
                className={primaryClasses}
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* Navegación entre avisos y cerrar, en una sola fila */}
        <div className="flex items-center justify-between gap-2 px-4 sm:px-5 py-3">
          {total > 1 ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => goTo(current - 1)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                aria-label="Aviso anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-1.5">
                {announcements.map((a, i) => (
                  <button
                    key={a.id}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all ${i === current ? 'w-5 bg-white' : 'w-2 bg-gray-600 hover:bg-gray-500'}`}
                    aria-label={`Ver aviso ${i + 1}: ${a.title}`}
                    aria-current={i === current}
                  />
                ))}
              </div>
              <button
                onClick={() => goTo(current + 1)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                aria-label="Siguiente aviso"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ) : <span />}

          <button
            onClick={handleClose}
            className="px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-white rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
          >
            Ahora no
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTooltip;
