// src/components/ClientForm.jsx
import React, { useState } from "react";
import { usePersistedState } from "../utils/usePersistedState";

const STORAGE_KEY = "seguros_nana_client_form";

// Función auxiliar para obtener la fecha de hoy en formato YYYY-MM-DD
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
      observaciones: "",          // ← Nuevo campo
      fechaCotizacion: getTodayDate(), // ← Fecha de hoy por defecto
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

  // Estado local no persistente
  const [errorMessage, setErrorMessage] = useState("");

  const indemnizacionTipos = [
    { key: "tieneIndemnizacion", label: "Indemnización por Hospitalización", type: "number" },
    { key: "tieneIndeAccidente", label: "Indemnización por Accidente", type: "number" },
    { key: "tieneIndeInvalidez", label: "Indemnización por invalidez", type: "number" },
    { key: "tieneHospitalizacion", label: "Hospitalización Elite", type: "boolean" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("indeniza_")) {
      const [prefix, tipo, indexStr] = name.split("_");
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
            return {
              ...prev,
              mascotasInfo: { cantidad: "", tipos: [] },
            };
          }
          const num = parseInt(nuevaCantidad, 10);
          const tipos = [...prev.mascotasInfo.tipos];
          if (tipos.length > num) {
            tipos.splice(num);
          } else {
            while (tipos.length < num) {
              tipos.push("perro");
            }
          }
          return {
            ...prev,
            mascotasInfo: { cantidad: nuevaCantidad, tipos },
          };
        });
      }
      return;
    }

    if (name.startsWith("tipoMascota_")) {
      const index = parseInt(name.split("_")[1], 10);
      const nuevosTipos = [...mascotasInfo.tipos];
      nuevosTipos[index] = value;
      setState((prev) => ({
        ...prev,
        mascotasInfo: { ...prev.mascotasInfo, tipos: nuevosTipos },
      }));
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

    // Manejo genérico de campos de formData (incluye observaciones y fechaCotizacion)
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [name]: value },
    }));

    // Si cambia cantidadFamiliar, actualizamos indenizas
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
      setErrorMessage("Por favor completa el nombre.");
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
        ? {
            cantidad: parseInt(mascotasInfo.cantidad, 10),
            tipos: [...mascotasInfo.tipos],
          }
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
    // Al limpiar, volvemos a poner la fecha de hoy
    setState({
      ...initialData,
      formData: {
        ...initialData.formData,
        fechaCotizacion: getTodayDate(),
      },
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
      <div key={tipo.key} className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          {tipo.label}: {tipo.type === "boolean" ? "Selecciona por familiar" : "Ingrese los valores"}
        </h3>
        {Array.from({ length: num }).map((_, i) => {
          if (tipo.type === "boolean") {
            return (
              <div key={i}>
                <label
                  htmlFor={`indeniza_${tipo.key}_${i}`}
                  className="block text-sm text-gray-600 mb-1"
                >
                  {tipo.label} - Familiar {i + 1}
                </label>
                <select
                  id={`indeniza_${tipo.key}_${i}`}
                  name={`indeniza_${tipo.key}_${i}`}
                  value={indenizas[tipo.key][i] || "no"}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
            );
          } else {
            return (
              <div key={i}>
                <label
                  htmlFor={`indeniza_${tipo.key}_${i}`}
                  className="block text-sm text-gray-600 mb-1"
                >
                  {tipo.label} - Familiar {i + 1}
                </label>
                <input
                  type="number"
                  id={`indeniza_${tipo.key}_${i}`}
                  name={`indeniza_${tipo.key}_${i}`}
                  value={indenizas[tipo.key][i] || ""}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder={`Ej. ${(i + 1) * 1000}`}
                />
              </div>
            );
          }
        })}
      </div>
    );
  };

  const renderMascotasSection = () => {
    if (!formData.tieneMascota) return null;

    return (
      <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200 mt-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Cobertura para Mascotas
        </h3>

        <div>
          <label htmlFor="cantidadMascotas" className="block text-sm text-gray-700 mb-1">
            Cantidad de mascotas a asegurar (máx. 10)
          </label>
          <input
            type="number"
            id="cantidadMascotas"
            name="cantidadMascotas"
            value={mascotasInfo.cantidad}
            onChange={handleChange}
            min="1"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Ej. 2"
          />
        </div>

        {mascotasInfo.cantidad !== "" && parseInt(mascotasInfo.cantidad, 10) > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Especie de cada mascota:</h4>
            {Array.from({ length: parseInt(mascotasInfo.cantidad, 10) }, (_, i) => (
              <div key={i}>
                <label htmlFor={`tipoMascota_${i}`} className="block text-sm text-gray-600 mb-1">
                  Mascota {i + 1}
                </label>
                <select
                  id={`tipoMascota_${i}`}
                  name={`tipoMascota_${i}`}
                  value={mascotasInfo.tipos[i] || "perro"}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Registro de Cliente
      </h2>

      {errorMessage && (
        <div className="mb-5 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2A1 1 0 0012.707 7.293l-2-2z" clipRule="evenodd" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Completo
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Ej. Juan Pérez"
          />
        </div>

        <div>
          <label htmlFor="cantidadFamiliar" className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad de Familiares
          </label>
          <input
            type="number"
            id="cantidadFamiliar"
            name="cantidadFamiliar"
            value={formData.cantidadFamiliar}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Ej. 3"
          />
        </div>

        {indemnizacionTipos.map((tipo) => (
          <div key={tipo.key} className="flex items-center">
            <input
              type="checkbox"
              id={tipo.key}
              name={tipo.key}
              checked={formData[tipo.key]}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor={tipo.key} className="ml-2 block text-sm text-gray-700">
              {tipo.label}
            </label>
          </div>
        ))}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="tieneMascota"
            name="tieneMascota"
            checked={formData.tieneMascota}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="tieneMascota" className="ml-2 block text-sm text-gray-700">
            Cobertura para Mascotas
          </label>
        </div>

        {indemnizacionTipos.map(renderIndemnizacionSection)}
        {renderMascotasSection()}

        <div>
          <label htmlFor="costoTotal" className="block text-sm font-medium text-gray-700 mb-1">
            Costo del Seguro
          </label>
          <input
            type="number"
            id="costoTotal"
            name="costoTotal"
            value={formData.costoTotal}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Ej. 150.50"
          />
        </div>

        {/* Campo de observaciones */}
        <div>
          <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1">
            Observaciones (opcional)
          </label>
          <textarea
            id="observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Ej. Cliente prefiere cobertura amplia..."
          />
        </div>

        {/* Campo de fecha */}
        <div>
          <label htmlFor="fechaCotizacion" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Cotización
          </label>
          <input
            type="date"
            id="fechaCotizacion"
            name="fechaCotizacion"
            value={formData.fechaCotizacion}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition"
          >
            Ver Vista Previa
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-sm transition"
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};