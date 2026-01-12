import jsPDF from 'jspdf';
import { Guide } from '../types';

const addWatermark = (doc: jsPDF, pageCount: number) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('IEEA - Instituto Estatal de Educación para Adultos', pageWidth / 2, pageHeight - 10, { align: 'center' });
  doc.text(`Página ${pageCount}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
};

const loadImage = async (url: string): Promise<string | null> => {
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      return canvas.toDataURL('image/jpeg', 0.7);
    }
    return null;
  } catch (error) {
    console.error('Error loading image:', error);
    return null;
  }
};

const addImageToPDF = async (
  doc: jsPDF,
  imageUrl: string,
  yPosition: number,
  margin: number,
  contentWidth: number
): Promise<number> => {
  const imgData = await loadImage(imageUrl);
  if (!imgData) return yPosition;

  const img = new Image();
  img.src = imgData;

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  const imgWidth = contentWidth;
  const imgHeight = (img.height * imgWidth) / img.width;
  const maxHeight = 100;
  const finalHeight = Math.min(imgHeight, maxHeight);
  const finalWidth = (finalHeight * imgWidth) / imgHeight;

  doc.addImage(imgData, 'JPEG', margin, yPosition, finalWidth, finalHeight);
  return yPosition + finalHeight + 10;
};

export const generateGuidePDF = async (guide: Guide): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);
  let yPosition = margin;
  let pageCount = 1;

  const checkPageBreak = (requiredSpace: number = 40) => {
    if (yPosition > pageHeight - requiredSpace) {
      addWatermark(doc, pageCount);
      doc.addPage();
      pageCount++;
      yPosition = margin;
      return true;
    }
    return false;
  };

  doc.setFillColor(41, 128, 185);
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  const titleLines = doc.splitTextToSize(guide.title, contentWidth);
  doc.text(titleLines, margin, 25);

  yPosition = 50;

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Tipo: ${guide.guideType || 'General'}`, margin, yPosition);
  yPosition += 10;

  if (guide.institutions) {
    const institutions = guide.institutions.includes('todas')
      ? 'Todas las instituciones'
      : guide.institutions.join(', ');
    doc.text(`Instituciones: ${institutions}`, margin, yPosition);
    yPosition += 10;
  }

  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 15;

  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  const descLines = doc.splitTextToSize(guide.description, contentWidth);
  doc.text(descLines, margin, yPosition);
  yPosition += descLines.length * 7 + 10;

  checkPageBreak();

  doc.setFontSize(14);
  doc.setTextColor(41, 128, 185);
  doc.text('Contenido Detallado', margin, yPosition);
  yPosition += 10;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = guide.content;

  const elements = Array.from(tempDiv.children);
  let imageIndex = 0;
  const images = guide.images || [];

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    checkPageBreak();

    if (element.tagName === 'H3' || element.tagName === 'H4') {
      checkPageBreak(50);

      doc.setFontSize(element.tagName === 'H3' ? 14 : 12);
      doc.setTextColor(element.tagName === 'H3' ? 41 : 52, element.tagName === 'H3' ? 128 : 152, element.tagName === 'H3' ? 185 : 219);
      const lines = doc.splitTextToSize(element.textContent || '', contentWidth);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * (element.tagName === 'H3' ? 7 : 6) + (element.tagName === 'H3' ? 5 : 4);

      if (imageIndex < images.length) {
        checkPageBreak(120);
        yPosition = await addImageToPDF(doc, images[imageIndex], yPosition, margin, contentWidth);
        imageIndex++;
        yPosition += 5;
      }
    } else if (element.tagName === 'P') {
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const lines = doc.splitTextToSize(element.textContent || '', contentWidth);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * 5 + 3;
    } else if (element.tagName === 'UL' || element.tagName === 'OL') {
      const items = element.querySelectorAll('li');
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);

      items.forEach((item, index) => {
        checkPageBreak();

        const bullet = element.tagName === 'UL' ? '•' : `${index + 1}.`;
        const text = item.textContent || '';
        const lines = doc.splitTextToSize(text, contentWidth - 10);

        doc.text(bullet, margin + 5, yPosition);
        doc.text(lines, margin + 10, yPosition);
        yPosition += lines.length * 5 + 2;
      });

      yPosition += 3;
    }
  }

  if (guide.relatedLinks && guide.relatedLinks.length > 0) {
    checkPageBreak(60);

    yPosition += 10;
    doc.setFontSize(14);
    doc.setTextColor(41, 128, 185);
    doc.text('Enlaces Relacionados', margin, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setTextColor(52, 152, 219);
    guide.relatedLinks.forEach(link => {
      checkPageBreak();

      doc.text(`• ${link.title}`, margin + 5, yPosition);
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.text(link.url, margin + 10, yPosition + 4);
      doc.setFontSize(10);
      doc.setTextColor(52, 152, 219);
      yPosition += 10;
    });
  }

  addWatermark(doc, pageCount);

  const fileName = `${guide.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
  doc.save(fileName);
};
