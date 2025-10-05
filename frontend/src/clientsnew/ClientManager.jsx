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

  //En esta parte generamos el PDF a mostrar
  const generatePDF = () => {
    const input = document.getElementById("pdf-content");
    if (!input) {
      console.error("Elemento #pdf-content no encontrado");
      return;
    }

    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, Math.min(height, 297));
      pdf.save(`Seguro_Occident_${previewData.nombre.replace(/\s+/g, "_")}.pdf`); // Colocamos el nombre para cuando se descarga el archivo
    });
  };

  if (previewData) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <PreviewViewPDF data={previewData} />
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setPreviewData(null)}
            className="px-5 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            ← Editar datos
          </button>
          <button
            onClick={generatePDF}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Descargar PDF
          </button>
        </div>
      </div>
    );
  }

  return <ClientForm onSubmit={handleFormSubmit} onClear={handleClear} />;
};