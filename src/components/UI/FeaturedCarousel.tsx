import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Announcement } from '../../types';

interface FeaturedCarouselProps {
  announcements: Announcement[];
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ announcements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredAnnouncements = announcements
    .filter(announcement => announcement.featured)
    .slice(0, 6);

  useEffect(() => {
    if (featuredAnnouncements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === featuredAnnouncements.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredAnnouncements.length]);

  if (featuredAnnouncements.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredAnnouncements.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredAnnouncements.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentAnnouncement = featuredAnnouncements[currentIndex];
  const backgroundImage = currentAnnouncement.images && currentAnnouncement.images.length > 0
    ? currentAnnouncement.images[0]
    : 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1600';

  return (
    <section className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-2xl mb-16">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>

      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className={`inline-block px-4 py-1 rounded-full mb-4 ${
              currentAnnouncement.type === 'convocatoria' ? 'bg-blue-600' :
              currentAnnouncement.type === 'evento' ? 'bg-green-600' :
              currentAnnouncement.type === 'noticia' ? 'bg-purple-600' :
              currentAnnouncement.type === 'consejo' ? 'bg-orange-600' :
              currentAnnouncement.type === 'informativo' ? 'bg-teal-600' : 'bg-blue-600'
            }`}>
              <span className="text-sm font-semibold text-white uppercase">
                {currentAnnouncement.type === 'convocatoria' && 'Convocatoria'}
                {currentAnnouncement.type === 'evento' && 'Evento'}
                {currentAnnouncement.type === 'noticia' && 'Noticia'}
                {currentAnnouncement.type === 'consejo' && 'Consejo'}
                {currentAnnouncement.type === 'informativo' && 'Informativo'}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {currentAnnouncement.title}
            </h2>

            <p className="text-lg text-gray-200 mb-6 leading-relaxed">
              {currentAnnouncement.description}
            </p>

            <Link
              to={`/anuncios/${currentAnnouncement.id}`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Ver más información
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {featuredAnnouncements.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-10"
            aria-label="Anuncio anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-10"
            aria-label="Siguiente anuncio"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {featuredAnnouncements.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Ir a anuncio ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedCarousel;
