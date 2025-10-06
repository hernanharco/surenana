import React, { useState } from "react";
import { ClientForm } from "./ClientForm";
import { PreviewViewPDF } from "./PreviewViewPDF";
import html2pdf from 'html2pdf.js';

export const ClientManager = () => {
  const [previewData, setPreviewData] = useState(null);

  const handleFormSubmit = (data) => {
    setPreviewData(data);
  };

  const handleClear = () => {
    setPreviewData(null);
  };

  const generatePDF = () => {
    const element = document.getElementById("pdf-content");
    if (!element || !previewData) {
      console.error("Elemento #pdf-content no encontrado o datos no disponibles");
      return;
    }

    const opt = {
      margin: 10, // 10 mm = 1 cm de margen en todos los lados
      filename: `Seguro_Occident_${previewData.nombre.replace(/\s+/g, "_")}.pdf`,
      image: {
        type: 'png',
        quality: 0.98,
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      },
      jsPDF: {
        unit: "mm",
        format: "letter", // Usa formato Carta (215.9 x 279.4 mm)
        orientation: "portrait",
      },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'],
        after: 'img', // Evita cortar justo después de imágenes
      },
      enableLinks: true, // Intenta preservar los enlaces <a>
    };

    html2pdf().set(opt).from(element).save();
  };

  if (previewData) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <PreviewViewPDF data={previewData} />
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={() => setPreviewData(null)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
          >
            ← Editar datos
          </button>
          <button
            onClick={generatePDF}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition font-medium shadow-md"
          >
            📄 Descargar PDF
          </button>
        </div>
      </div>
    );
  }

  return <ClientForm onSubmit={handleFormSubmit} onClear={handleClear} />;
};