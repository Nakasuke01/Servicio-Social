import React from 'react';

interface GuideContentRendererProps {
  content: string | string[]; 
  images?: string[];
}

const GuideContentRenderer: React.FC<GuideContentRendererProps> = ({ content, images = [] }) => {
  const parseContent = () => {
    // 1. ELIMINAR COMAS: Unimos el array sin espacios para que React no inserte comas
    const finalContent = Array.isArray(content) ? content.join('') : content;

    const parser = new DOMParser();
    const doc = parser.parseFromString(finalContent, 'text/html');
    const elements: any[] = [];
    let imageIndex = 0;

    const processNode = (node: ChildNode, parentKey: string = '0'): any => {
      // Si es texto suelto, forzamos color blanco
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim();
        if (!text || text === ',') return null;
        return <span key={parentKey} style={{ color: 'white' }}>{node.textContent}</span>;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.tagName.toLowerCase();

        // Estilos de fuerza bruta para asegurar que se vea bien
        if (tagName === 'h3') {
          return (
            <h3 key={`${parentKey}-h3`} 
                style={{ color: 'white', fontSize: '32px', fontWeight: '800', marginTop: '24px', marginBottom: '16px', display: 'block', borderBottom: '1px solid #374151', paddingBottom: '8px' }}>
              {processChildren(element, `${parentKey}-h3`)}
            </h3>
          );
        }
        if (tagName === 'h4') {
          return (
            <h4 key={`${parentKey}-h4`} 
                style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginTop: '20px', marginBottom: '12px', display: 'block' }}>
              {processChildren(element, `${parentKey}-h4`)}
            </h4>
          );
        }
        if (tagName === 'p') {
          return (
            <p key={`${parentKey}-p`} 
               style={{ color: 'white', fontSize: '18px', marginBottom: '16px', lineHeight: '1.6', display: 'block' }}>
              {processChildren(element, `${parentKey}-p`)}
            </p>
          );
        }
        if (tagName === 'ul') {
          return (
            <ul key={`${parentKey}-ul`} 
                style={{ color: 'white', listStyleType: 'disc', paddingLeft: '24px', marginBottom: '20px', display: 'block' }}>
              {processChildren(element, `${parentKey}-ul`)}
            </ul>
          );
        }
        if (tagName === 'li') {
          return <li key={`${parentKey}-li`} style={{ color: 'white', fontSize: '18px', marginBottom: '8px' }}>{processChildren(element, `${parentKey}-li`)}</li>;
        }
        if (tagName === 'strong' || tagName === 'b') {
          return <b key={`${parentKey}-b`} style={{ color: 'white', fontWeight: 'bold' }}>{processChildren(element, `${parentKey}-b`)}</b>;
        }

        return <span key={parentKey} style={{ color: 'white' }}>{processChildren(element, parentKey)}</span>;
      }
      return null;
    };

    const processChildren = (element: Element, parentKey: string) => {
      return Array.from(element.childNodes)
        .map((child, index) => processNode(child, `${parentKey}-${index}`))
        .filter(child => child !== null);
    };

    const bodyChildren = Array.from(doc.body.childNodes);
    bodyChildren.forEach((node, index) => {
      const result = processNode(node, `node-${index}`);
      if (result) {
        elements.push(result);
        if (node.nodeType === Node.ELEMENT_NODE) {
          const tag = (node as Element).tagName.toLowerCase();
          if ((tag === 'h3' || tag === 'h4') && imageIndex < images.length) {
            elements.push(
              <div key={`img-${imageIndex}`} style={{ margin: '24px 0' }}>
                <img src={images[imageIndex]} style={{ width: '100%', borderRadius: '12px', border: '1px solid #374151' }} alt="" />
              </div>
            );
            imageIndex++;
          }
        }
      }
    });

    return elements;
  };

  return <div style={{ width: '100%', textAlign: 'left' }}>{parseContent()}</div>;
};

export default GuideContentRenderer;