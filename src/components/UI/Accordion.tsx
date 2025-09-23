import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

/**
 * Componente Accordion para preguntas frecuentes
 * Permite expandir/contraer múltiples elementos
 */
const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      if (!allowMultiple) {
        newOpenItems.clear();
      }
      newOpenItems.add(id);
    }
    
    setOpenItems(newOpenItems);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        
        return (
          <div key={item.id} className="bg-gray-800 rounded-lg border border-gray-700">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-750 transition-colors rounded-lg"
            >
              <h3 className="text-lg font-medium text-white pr-4">{item.title}</h3>
              <ChevronDown 
                className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                  isOpen ? 'transform rotate-180' : ''
                }`} 
              />
            </button>
            
            {isOpen && (
              <div className="px-6 pb-4 border-t border-gray-700 mt-2 pt-4">
                <div 
                  className="text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;