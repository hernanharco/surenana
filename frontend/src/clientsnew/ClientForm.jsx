// src/components/ClientForm.jsx
import React, { useState } from "react";
import { usePersistedState } from "../utils/usePersistedState";

const STORAGE_KEY = "seguros_nana_client_form";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const ClientForm = ({ onSubmit, onClear }) => {
  const initialData = {
    formData: {
      nombre: "",
      cantidadFamiliar: "",
      tieneIndemnizacion: false,
      tieneIndeAccidente: false,
      tieneIndeInvalidez: false,
      tieneHospitalizacion: false,
      tieneMascota: false,
      costoTotal: "",
      observaciones: "",
      fechaCotizacion: getTodayDate(),
    },
    indenizas: {
      tieneIndemnizacion: [],
      tieneIndeAccidente: [],
      tieneIndeInvalidez: [],
      tieneHospitalizacion: [],
    },
    mascotasInfo: {
      cantidad: "",
      tipos: [],
    },
  };

  const [state, setState] = usePersistedState(STORAGE_KEY, initialData);
  const { formData, indenizas, mascotasInfo } = state;
  const [errorMessage, setErrorMessage] = useState("");

  const indemnizacionTipos = [
    { key: "tieneIndemnizacion", label: "Indemnización por Hospitalización", type: "number" },
    { key: "tieneIndeAccidente", label: "Indemnización por Accidente", type: "number" },
    { key: "tieneIndeInvalidez", label: "Indemnización por Invalidez", type: "number" },
    { key: "tieneHospitalizacion", label: "Hospitalización Elite", type: "boolean" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("indeniza_")) {
      const [_, tipo, indexStr] = name.split("_");
      const index = parseInt(indexStr, 10);
      setState((prev) => {
        const newIndenizas = { ...prev.indenizas };
        newIndenizas[tipo][index] = value;
        return { ...prev, indenizas: newIndenizas };
      });
      return;
    }

    if (name === "tieneMascota") {
      const isChecked = checked;
      setState((prev) => ({
        ...prev,
        formData: { ...prev.formData, tieneMascota: isChecked },
        mascotasInfo: isChecked ? prev.mascotasInfo : { cantidad: "", tipos: [] },
      }));
      return;
    }

    if (name === "cantidadMascotas") {
      const nuevaCantidad = value === "" ? "" : value;
      if (nuevaCantidad === "" || (/^\d+$/.test(nuevaCantidad) && parseInt(nuevaCantidad, 10) >= 1 && parseInt(nuevaCantidad, 10) <= 10)) {
        setState((prev) => {
          if (nuevaCantidad === "") {
            return { ...prev, mascotasInfo: { cantidad: "", tipos: [] } };
          }
          const num = parseInt(nuevaCantidad, 10);
          const tipos = [...prev.mascotasInfo.tipos];
          if (tipos.length > num) tipos.splice(num);
          else while (tipos.length < num) tipos.push("perro");
          return { ...prev, mascotasInfo: { cantidad: nuevaCantidad, tipos } };
        });
      }
      return;
    }

    if (name.startsWith("tipoMascota_")) {
      const index = parseInt(name.split("_")[1], 10);
      const nuevosTipos = [...mascotasInfo.tipos];
      nuevosTipos[index] = value;
      setState((prev) => ({ ...prev, mascotasInfo: { ...prev.mascotasInfo, tipos: nuevosTipos } }));
      return;
    }

    const tipoItem = indemnizacionTipos.find((item) => item.key === name);
    if (tipoItem) {
      const isChecked = type === "checkbox" ? checked : value === "true";
      setState((prev) => {
        const newFormData = { ...prev.formData, [name]: isChecked };
        let newIndenizas = { ...prev.indenizas };

        if (!isChecked) {
          newIndenizas = { ...newIndenizas, [name]: [] };
        } else {
          const num = prev.formData.cantidadFamiliar !== "" ? parseInt(prev.formData.cantidadFamiliar, 10) : 0;
          if (!isNaN(num) && num > 0) {
            const current = [...(newIndenizas[name] || [])].slice(0, num);
            while (current.length < num) {
              current.push(tipoItem.type === "boolean" ? "no" : "");
            }
            newIndenizas = { ...newIndenizas, [name]: current };
          }
        }
        return { ...prev, formData: newFormData, indenizas: newIndenizas };
      });
      return;
    }

    setState((prev) => ({ ...prev, formData: { ...prev.formData, [name]: value } }));

    if (name === "cantidadFamiliar") {
      const num = value === "" ? 0 : parseInt(value, 10);
      setState((prev) => {
        const updatedIndenizas = { ...prev.indenizas };
        indemnizacionTipos.forEach((item) => {
          if (prev.formData[item.key]) {
            if (isNaN(num) || num <= 0) {
              updatedIndenizas[item.key] = [];
            } else {
              const current = [...(updatedIndenizas[item.key] || [])].slice(0, num);
              while (current.length < num) {
                current.push(item.type === "boolean" ? "no" : "");
              }
              updatedIndenizas[item.key] = current;
            }
          }
        });
        return { ...prev, indenizas: updatedIndenizas };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      setErrorMessage("Por favor, ingresa el nombre del cliente.");
      return;
    }

    let cantidadFamiliarValue = "";
    let txtfamiliar1Value = "";
    let txtfamiliar2Value = "";

    if (formData.cantidadFamiliar !== "") {
      const num = parseInt(formData.cantidadFamiliar, 10);
      if (!isNaN(num) && num > 0) {
        cantidadFamiliarValue = num;
        txtfamiliar1Value = "(Grupo Familiar ";
        txtfamiliar2Value = " personas)";
      }
    }

    const dataToSend = {
      nombre: formData.nombre.trim(),
      cantidadFamiliar: cantidadFamiliarValue,
      txtfamiliar1: txtfamiliar1Value,
      txtfamiliar2: txtfamiliar2Value,
      tieneIndemnizacion: formData.tieneIndemnizacion,
      tieneIndeAccidente: formData.tieneIndeAccidente,
      tieneIndeInvalidez: formData.tieneIndeInvalidez,
      tieneHospitalizacion: formData.tieneHospitalizacion,
      tieneMascota: formData.tieneMascota,
      indenizas: {
        tieneIndemnizacion: formData.tieneIndemnizacion
          ? indenizas.tieneIndemnizacion.map((v) => (v === "" ? 0 : parseFloat(v)))
          : [],
        tieneIndeAccidente: formData.tieneIndeAccidente
          ? indenizas.tieneIndeAccidente.map((v) => (v === "" ? 0 : parseFloat(v)))
          : [],
        tieneIndeInvalidez: formData.tieneIndeInvalidez
          ? indenizas.tieneIndeInvalidez.map((v) => (v === "" ? 0 : parseFloat(v)))
          : [],
        tieneHospitalizacion: formData.tieneHospitalizacion ? [...indenizas.tieneHospitalizacion] : [],
      },
      mascotas: formData.tieneMascota
        ? { cantidad: parseInt(mascotasInfo.cantidad, 10), tipos: [...mascotasInfo.tipos] }
        : null,
      costoTotal: formData.costoTotal ? parseFloat(formData.costoTotal) : 0,
      observaciones: formData.observaciones.trim(),
      fechaCotizacion: formData.fechaCotizacion,
      timestamp: new Date().toISOString(),
    };

    setErrorMessage("");
    onSubmit(dataToSend);
  };

  const handleClear = () => {
    setState({
      ...initialData,
      formData: { ...initialData.formData, fechaCotizacion: getTodayDate() },
    });
    setErrorMessage("");
    onClear();
  };

  const renderIndemnizacionSection = (tipo) => {
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

  const renderMascotasSection = () => {
    if (!formData.tieneMascota) return null;
    return (
      <div className="space-y-4 p-4 bg-purple-50 rounded-xl border border-purple-100 mt-4">
        <h3 className="text-sm font-semibold text-purple-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Cobertura para Mascotas
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ¿Cuántas mascotas deseas asegurar? (máx. 10)
          </label>
          <input
            type="number"
            name="cantidadMascotas"
            value={mascotasInfo.cantidad}
            onChange={handleChange}
            min="1"
            max="10"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          />
        </div>

        {mascotasInfo.cantidad !== "" && parseInt(mascotasInfo.cantidad, 10) > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Especie de cada mascota:</h4>
            {Array.from({ length: parseInt(mascotasInfo.cantidad, 10) }, (_, i) => (
              <div key={i} className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Mascota {i + 1}</label>
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
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">📝 Registro de Cliente</h2>
        <p className="text-gray-500 text-sm mt-2">Completa los datos para generar tu cotización personalizada</p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2A1 1 0 0012.707 7.293l-2-2z" clipRule="evenodd" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">👤 Nombre Completo *</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Ej. Juan Pérez García"
          />
        </div>

        {/* Cantidad familiar */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">👨‍👩‍👧‍👦 Cantidad de Familiares</label>
          <input
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
          <label className="block text-sm font-semibold text-gray-700 mb-3">🛡️ Coberturas Adicionales</label>
          <div className="space-y-2">
            {indemnizacionTipos.map((tipo) => (
              <label key={tipo.key} className="flex items-start space-x-3 cursor-pointer">
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

        {/* Secciones dinámicas */}
        {indemnizacionTipos.map(renderIndemnizacionSection)}
        {renderMascotasSection()}

        {/* Costo total */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">💶 Costo Mensual del Seguro (€)</label>
          <input
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">📝 Observaciones (Opcional)</label>
          <textarea
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Fecha de Cotización</label>
          <input
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