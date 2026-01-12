import React, { useState, useEffect } from 'react';
import { X, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Announcement } from '../../types';

interface AnnouncementTooltipProps {
  announcement: Announcement;
}

const AnnouncementTooltip: React.FC<AnnouncementTooltipProps> = ({ announcement }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenTooltip = sessionStorage.getItem('hasSeenAnnouncementTooltip');

    if (!hasSeenTooltip) {
      setTimeout(() => {
        setIsVisible(true);
      }, 500);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenAnnouncementTooltip', 'true');
  };

  const handleLinkClick = () => {
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={handleClose}
      />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg px-4">
        <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden animate-fade-in border border-gray-700">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10"
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" />
          </button>

          {announcement.images && announcement.images.length > 0 && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={announcement.images[0]}
                alt={announcement.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent" />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
              <Calendar className="h-4 w-4" />
              <span>{new Date(announcement.date).toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">
              {announcement.title}
            </h3>

            <p className="text-gray-300 mb-6">
              {announcement.description}
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
              >
                No me interesa
              </button>
              <Link
                to={`/anuncios/${announcement.id}`}
                onClick={handleLinkClick}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors group"
              >
                Ver más
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementTooltip;
