import React from 'react';

interface TagBadgeProps {
  text: string;
  variant: 'guideType' | 'institution' | 'format';
}

const TagBadge: React.FC<TagBadgeProps> = ({ text, variant }) => {
  const getStyles = () => {
    if (variant === 'guideType') {
      const typeStyles: Record<string, string> = {
        'documentos': 'bg-blue-900 text-blue-200 border-blue-700',
        'asesorias': 'bg-green-900 text-green-200 border-green-700',
        'procedimientos': 'bg-purple-900 text-purple-200 border-purple-700',
        'evaluacion': 'bg-orange-900 text-orange-200 border-orange-700',
        'registro': 'bg-pink-900 text-pink-200 border-pink-700',
        'capacitacion': 'bg-teal-900 text-teal-200 border-teal-700',
      };
      return typeStyles[text] || 'bg-gray-900 text-gray-200 border-gray-700';
    }

    if (variant === 'institution') {
      return 'bg-slate-900 text-slate-200 border-slate-700';
    }

    if (variant === 'format') {
      const formatStyles: Record<string, string> = {
        'word': 'bg-blue-600 text-white',
        'pdf': 'bg-red-600 text-white',
        'excel': 'bg-green-600 text-white',
        'powerpoint': 'bg-orange-600 text-white',
        'sql': 'bg-yellow-600 text-white',
        'access': 'bg-purple-600 text-white',
      };
      return formatStyles[text.toLowerCase()] || 'bg-gray-600 text-white';
    }

    return 'bg-gray-900 text-gray-200 border-gray-700';
  };

  const getLabel = () => {
    if (variant === 'guideType') {
      const labels: Record<string, string> = {
        'documentos': 'Documentos',
        'asesorias': 'Asesorías',
        'procedimientos': 'Procedimientos',
        'evaluacion': 'Evaluación',
        'registro': 'Registro',
        'capacitacion': 'Capacitación',
      };
      return labels[text] || text;
    }

    return text;
  };

  return (
    <span className={`inline-block text-xs px-2.5 py-1 rounded-full border ${getStyles()}`}>
      {getLabel()}
    </span>
  );
};

export default TagBadge;
