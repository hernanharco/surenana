// src/components/MascotasSection.jsx

export const MascotasSection = ({ formData, mascotasInfo, handleChange }) => {
  if (!formData.tieneMascota) return null;
  return (
    <div className="space-y-4 p-4 bg-purple-50 rounded-xl border border-purple-100 mt-4">
      <h3 className="text-sm font-semibold text-purple-800 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Cobertura para Mascotas
      </h3>

      <div>
        <label
          for="numero-mascotas"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          ¿Cuántas mascotas deseas asegurar? (máx. 10)
        </label>
        <input
          id="numero-mascotas"
          type="number"
          name="cantidadMascotas"
          value={mascotasInfo.cantidad}
          onChange={handleChange}
          min="1"
          max="10"
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
        />
      </div>

      {mascotasInfo.cantidad !== "" &&
        parseInt(mascotasInfo.cantidad, 10) > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">
              Especie de cada mascota:
            </h4>
            {Array.from(
              { length: parseInt(mascotasInfo.cantidad, 10) },
              (_, i) => (
                <div key={i} className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">
                    Mascota {i + 1}
                  </label>
                  <select
                    name={`tipoMascota_${i}`}
                    value={mascotasInfo.tipos[i] || "perro"}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  >
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                  </select>
                </div>
              )
            )}
          </div>
        )}
    </div>
  );
};
