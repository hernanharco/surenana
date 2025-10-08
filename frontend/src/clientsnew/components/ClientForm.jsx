// src/components/ClientForm.jsx
import React, { useState } from "react";
import { useClientFormState } from "../hooks/useClientFormState";
import { IndemnizacionSection } from "../components/IndemnizacionSection";
import { MascotasSection } from "../components/MascotasSection";

export const ClientForm = ({ onSubmit, onClear }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    formData,
    indenizas,
    mascotasInfo,
    handleChange,
    handleSubmit,
    handleClear,
    indemnizacionTipos,
  } = useClientFormState(
    (data) => {
      setErrorMessage("");
      onSubmit(data);
    },
    () => {
      setErrorMessage("");
      onClear();
    }
  );

  // Sobreescribimos handleSubmit para manejar errores
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      setErrorMessage("Por favor, ingresa el nombre del cliente.");
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          📝 Registro de Cliente
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Completa los datos para generar tu cotización personalizada
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2A1 1 0 0012.707 7.293l-2-2z"
              clipRule="evenodd"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            👤 Nombre Completo *
          </label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}            
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Ej. Juan Pérez García"
          />
        </div>

        {/* Cantidad familiar */}
        <div>
          <label
            htmlFor="cantidadFamiliar"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            👨‍👩‍👧‍👦 Cantidad de Familiares
          </label>
          <input
            id="cantidadFamiliar"
            type="number"
            name="cantidadFamiliar"
            value={formData.cantidadFamiliar}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Ej. 3"
          />
        </div>

        {/* Coberturas adicionales */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            🛡️ Coberturas Adicionales
          </label>
          <div className="space-y-2">
            {indemnizacionTipos.map((tipo) => (
              <label
                key={tipo.key}
                className="flex items-start space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={tipo.key}
                  checked={formData[tipo.key]}
                  onChange={handleChange}
                  className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{tipo.label}</span>
              </label>
            ))}
            {/* Salud Digital: solo checkbox, sin sección dinámica */}
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                id="tieneSaludDigital"
                type="checkbox"
                name="tieneSaludDigital"
                checked={formData.tieneSaludDigital}
                onChange={handleChange}
                className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">📱 Salud Digital</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="tieneMascota"
                checked={formData.tieneMascota}
                onChange={handleChange}
                className="mt-1 h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="text-gray-700">🐾 Cobertura para Mascotas</span>
            </label>
          </div>
        </div>

        {/* Secciones dinámicas (solo para indemnizaciones reales) */}
        {indemnizacionTipos.map((tipo) => (
          <IndemnizacionSection
            key={tipo.key}
            tipo={tipo}
            formData={formData}
            indenizas={indenizas}
            handleChange={handleChange}
          />
        ))}
        <MascotasSection
          formData={formData}
          mascotasInfo={mascotasInfo}
          handleChange={handleChange}
        />

        {/* Costo total */}
        <div>
          <label
            htmlFor="costoTotal"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            💶 Costo Mensual del Seguro (€)
          </label>
          <input
            id="costoTotal"
            type="number"
            name="costoTotal"
            value={formData.costoTotal}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="Ej. 150.50"
          />
        </div>

        {/* Observaciones */}
        <div>
          <label
            htmlFor="observaciones"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            📝 Observaciones (Opcional)
          </label>
          <textarea
            id="observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
            placeholder="Notas adicionales sobre el cliente..."
          />
        </div>

        {/* Fecha */}
        <div>
          <label
            htmlFor="fechaCotizacion"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            📅 Fecha de Cotización
          </label>
          <input
            id="fechaCotizacion"
            type="date"
            name="fechaCotizacion"
            value={formData.fechaCotizacion}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
          />
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl transition shadow-sm"
          >
            🧹 Limpiar Todo
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-md transition"
          >
            👁️ Ver Vista Previa
          </button>
        </div>
      </form>
    </div>
  );
};
