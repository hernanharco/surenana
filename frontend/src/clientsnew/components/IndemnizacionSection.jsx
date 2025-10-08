// src/components/IndemnizacionSection.jsx

export const IndemnizacionSection = ({ tipo, formData, indenizas, handleChange }) => {
  const cantidad = formData.cantidadFamiliar;
  const mostrar =
    formData[tipo.key] &&
    cantidad !== "" &&
    !isNaN(parseInt(cantidad, 10)) &&
    parseInt(cantidad, 10) > 0;

  if (!mostrar) return null;

  const num = parseInt(cantidad, 10);
  return (
    <div key={tipo.key} className="space-y-3 p-4 bg-blue-50 rounded-xl border border-blue-100 mt-4">
      <h3 className="text-sm font-semibold text-blue-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {tipo.label}
      </h3>
      <p className="text-xs text-blue-600 mb-2">
        {tipo.type === "boolean" ? "Selecciona 'Sí' o 'No' para cada familiar" : "Ingresa el importe en euros (€)"}
      </p>
      {Array.from({ length: num }).map((_, i) => (
        <div key={i} className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Familiar {i + 1}
          </label>
          {tipo.type === "boolean" ? (
            <select
              name={`indeniza_${tipo.key}_${i}`}
              value={indenizas[tipo.key][i] || "no"}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          ) : (
            <input
              type="number"
              name={`indeniza_${tipo.key}_${i}`}
              value={indenizas[tipo.key][i] || ""}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="Ej. 1000"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          )}
        </div>
      ))}
    </div>
  );
};