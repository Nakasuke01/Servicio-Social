import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/UI/Card';
import Disclaimer from '../components/UI/Disclaimer';
import { AlertCircle, Calendar, Award, BookOpen, Users, ArrowLeft } from 'lucide-react';
import { announcements } from '../data/content';

const Announcements: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'convocatoria': return <AlertCircle className="h-5 w-5 text-blue-400" />;
      case 'evento': return <Calendar className="h-5 w-5 text-green-400" />;
      case 'noticia': return <BookOpen className="h-5 w-5 text-orange-400" />;
      case 'consejo': return <Award className="h-5 w-5 text-purple-400" />;
      case 'informativo': return <Users className="h-5 w-5 text-teal-400" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(`${dateString}T00:00:00`).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sortedAnnouncements = [...announcements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredAnnouncements = selectedType
    ? sortedAnnouncements.filter(a => a.type === selectedType)
    : sortedAnnouncements;

  const getTypeStats = () => {
    const stats: Record<string, number> = {};
    announcements.forEach(a => {
      stats[a.type] = (stats[a.type] || 0) + 1;
    });
    return stats;
  };

  const typeStats = getTypeStats();
  const allTypes = ['convocatoria', 'evento', 'noticia', 'consejo', 'informativo'];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Disclaimer */}
        <Disclaimer />

        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Inicio
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Todos los Anuncios
          </h1>
          <p className="text-base sm:text-xl text-gray-300">
            Encuentra información sobre convocatorias, eventos, noticias y más
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-12">
          <Card>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div
                  onClick={() => setSelectedType(null)}
                  className={`p-4 rounded-lg text-center cursor-pointer transition-all ${
                    selectedType === null
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-2xl font-bold">{announcements.length}</div>
                  <div className="text-sm">Todos</div>
                </div>

                {allTypes.map(type => (
                  <div
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`p-4 rounded-lg text-center cursor-pointer transition-all ${
                      selectedType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="text-2xl font-bold">{typeStats[type] || 0}</div>
                    <div className="text-sm capitalize">
                      {type === 'convocatoria' ? 'Convocatorias' :
                       type === 'evento' ? 'Eventos' :
                       type === 'noticia' ? 'Noticias' :
                       type === 'consejo' ? 'Consejos' :
                       'Informativos'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements List */}
        <Card>
          <CardContent>
            <div className="space-y-4">
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((announcement) => (
                  <Link
                    to={`/anuncios/${announcement.id}`}
                    key={announcement.id}
                    className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-[1.01]"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getAnnouncementIcon(announcement.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {announcement.title}
                      </h3>
                      <p className="text-gray-300 mb-2 line-clamp-2">
                        {announcement.description}
                      </p>
                      <p className="text-sm text-gray-400">{formatDate(announcement.date)}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        announcement.type === 'convocatoria' ? 'bg-blue-600 text-white' :
                        announcement.type === 'evento' ? 'bg-green-600 text-white' :
                        announcement.type === 'noticia' ? 'bg-orange-600 text-white' :
                        announcement.type === 'consejo' ? 'bg-purple-600 text-white' :
                        'bg-teal-600 text-white'
                      }`}>
                        {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-300 text-lg">
                    No hay anuncios en esta categoría
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Announcements;
