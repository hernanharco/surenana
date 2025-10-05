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

  // Forzar que el contenedor sea visible y tenga altura completa
  const originalStyle = input.style.cssText;
  input.style.overflow = "visible";
  input.style.height = "auto";

  // Aumentar escala para mejor calidad en móvil
  html2canvas(input, {
    scale: 2, // Escala razonable para móviles (3 puede ser demasiado)
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    width: input.scrollWidth, // Capturar todo el ancho
    height: input.scrollHeight, // Capturar toda la altura
  }).then((canvas) => {
    // Restaurar estilo original
    input.style.cssText = originalStyle;

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210; // Ancho A4 en mm
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Si el contenido es más alto que una página, dividirlo
    let position = 0;
    let pageHeight = 297; // Altura A4 en mm

    while (position < pdfHeight) {
      pdf.addImage(imgData, "PNG", 0, -position, pdfWidth, pdfHeight);

      position += pageHeight;

      if (position < pdfHeight) {
        pdf.addPage();
      }
    }

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