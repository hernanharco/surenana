// src/components/ClientManager.jsx
import React, { useState } from "react";
import { ClientForm } from "./ClientForm";
import { PreviewViewPDF } from "./PreviewViewPDF";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const ClientManager = () => {
  const [previewData, setPreviewData] = useState(null);

  const handleFormSubmit = (data) => {
    setPreviewData(data);
  };

  const handleClear = () => {
    setPreviewData(null);
  };

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");
    if (!input) {
      console.error("Elemento #pdf-content no encontrado");
      return;
    }

    // Aumentar escala para mejor calidad en móvil
    html2canvas(input, {
      scale: 3, // Alta resolución
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Si el contenido es más largo que una página, podrías dividirlo (aquí asumimos 1 página)
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, Math.min(pdfHeight, 297));
      pdf.save(`Seguro_Occident_${previewData.nombre.replace(/\s+/g, "_")}.pdf`);
    });
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