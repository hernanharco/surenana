// src/clientsnew/ClientManager.jsx
import React, { useState } from "react";
import { ClientForm } from "@/clientsnew/components/ClientForm";
import { PDFDocument } from "@/clientsnew/PDF/PDFDocument";
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

export const ClientManager = () => {
  const [data, setData] = useState(null);

  const handleFormSubmit = (formData) => {
    if (!formData.nombre?.trim()) {
      alert("Por favor, ingresa el nombre del cliente.");
      return;
    }
    setData(formData);
  };

  const handleClear = () => {
    setData(null);
  };

  if (!data) {
    return <ClientForm onSubmit={handleFormSubmit} onClear={handleClear} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Vista previa interactiva */}
      <div className="border border-gray-300 rounded-lg h-[80vh]">
        <PDFViewer width="100%" height="100%">
          <PDFDocument data={data} />
        </PDFViewer>
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={handleClear}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
        >
          ← Editar datos
        </button>

        <PDFDownloadLink
          document={<PDFDocument data={data} />}
          fileName={`Seguro_Occident_${data.nombre.replace(/\s+/g, "_")}.pdf`}
        >
          {({ loading }) => (
            <button
              className={`px-6 py-3 rounded-lg font-medium shadow-md transition ${
                loading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
              }`}
            >
              {loading ? "Preparando PDF..." : "📄 Descargar PDF"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};