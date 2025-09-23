import React from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * Componente Disclaimer - Advertencia sobre la naturaleza independiente del proyecto
 * Se muestra en todas las páginas para aclarar que no es oficial
 */
const Disclaimer: React.FC = () => {
  return (
    <div className="bg-orange-900 border border-orange-700 rounded-lg p-4 mb-8">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-orange-200 mb-1">Aviso Importante</h4>
          <p className="text-orange-100 text-sm leading-relaxed">
            <strong>Proyecto personal independiente</strong>, sin afiliación oficial al IEEA ni al TecNM, 
            ni a cualquier otra institución. La información puede no estar actualizada; 
            verifique siempre en los portales oficiales de cada institución.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;