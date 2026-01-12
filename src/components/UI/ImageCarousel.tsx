import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  title?: string;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

/**
 * Componente Carrusel de Imágenes
 * Permite navegar entre múltiples imágenes con controles de navegación
 * Incluye funcionalidad de auto-cambio opcional
 */
const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  title = "Imagen", 
  className = "",
  autoPlay = false,
  autoPlayInterval = 10000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length]);

  if (!images || images.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Si solo hay una imagen, mostrarla sin controles
  if (images.length === 1) {
    return (
      <div className={`relative rounded-lg overflow-hidden bg-gray-800 ${className}`}>
        <img 
          src={images[0]} 
          alt={`${title} 1`}
          className="w-full h-64 object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`relative rounded-lg overflow-hidden bg-gray-800 ${className}`}>
      {/* Imagen principal */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={images[currentIndex]} 
          alt={`${title} ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        
        {/* Overlay con información */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white text-sm">
            {currentIndex + 1} de {images.length}
          </p>
        </div>
      </div>

      {/* Controles de navegación */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
        aria-label="Siguiente imagen"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Indicadores de puntos */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;