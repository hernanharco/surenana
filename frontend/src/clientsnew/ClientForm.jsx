// src/components/ClientForm.jsx
import React, { useState } from "react";

export const ClientForm = ({ onSubmit, onClear }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    cantidadFamiliar: "",
    tieneIndemnizacion: false,
    tieneIndeAccidente: false,
    tieneIndeInvalidez: false,
    tieneHospitalizacion: false,
    tieneMascota: false,
    costoTotal: false
  });

  const [indenizas, setIndenizas] = useState({
    tieneIndemnizacion: [],
    tieneIndeAccidente: [],
    tieneIndeInvalidez: [],
    tieneHospitalizacion: [],
    tieneMascota: [],
  });

  const [errorMessage, setErrorMessage] = useState("");

  const indemnizacionTipos = [
    { key: "tieneIndemnizacion", label: "Indemnización por Hospitalización" },
    { key: "tieneIndeAccidente", label: "Indemnización por Accidente" },
    { key: "tieneIndeInvalidez", label: "Indemnización por invalidez" },
    { key: "tieneHospitalizacion", label: "Hospitalización Elite" },
    { key: "tieneMascota", label: "Cobertura para Mascotas" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("indeniza_")) {
      const [prefix, tipo, indexStr] = name.split("_");
      const index = parseInt(indexStr, 10);
      const newIndenizas = { ...indenizas };
      newIndenizas[tipo][index] = value === "" ? "" : value;
      setIndenizas(newIndenizas);
      return;
    }

    if (indemnizacionTipos.some((item) => item.key === name)) {
      const isChecked = type === "checkbox" ? checked : value === "true";
      setFormData((prev) => ({ ...prev, [name]: isChecked }));

      if (!isChecked) {
        setIndenizas((prev) => ({ ...prev, [name]: [] }));
      } else if (formData.cantidadFamiliar !== "") {
        const num = parseInt(formData.cantidadFamiliar, 10);
        if (!isNaN(num) && num > 0) {
          setIndenizas((prev) => {
            const current = [...(prev[name] || [])].slice(0, num);
            while (current.length < num) current.push("");
            return { ...prev, [name]: current };
          });
        }
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "cantidadFamiliar") {
      const num = value === "" ? 0 : parseInt(value, 10);
      setIndenizas((prev) => {
        const updated = { ...prev };
        indemnizacionTipos.forEach((item) => {
          if (formData[item.key]) {
            if (isNaN(num) || num <= 0) {
              updated[item.key] = [];
            } else {
              const current = [...(updated[item.key] || [])].slice(0, num);
              while (current.length < num) current.push("");
              updated[item.key] = current;
            }
          }
        });
        return updated;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      setErrorMessage("Por favor completa el nombre.");
      return;
    }

    // for (const { key } of indemnizacionTipos) {
    //   if (formData[key] && formData.cantidadFamiliar !== "") {
    //     const cantidad = parseInt(formData.cantidadFamiliar, 10);
    //     if (!isNaN(cantidad) && cantidad > 0) {
    //       const hasEmpty = indenizas[key].some(
    //         (val) => val === "" || isNaN(parseFloat(val))
    //       );
    //       if (hasEmpty) {
    //         setErrorMessage(`Por favor completa todos los campos de ${key.replace("tiene", "").replace(/([A-Z])/g, " $1").toLowerCase()}.`);
    //         return;
    //       }
    //     }
    //   }
    // }

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
          ? indenizas.tieneIndemnizacion.map((v) => parseFloat(v))
          : [],
        tieneIndeAccidente: formData.tieneIndeAccidente
          ? indenizas.tieneIndeAccidente.map((v) => parseFloat(v))
          : [],
        tieneIndeInvalidez: formData.tieneIndeInvalidez
          ? indenizas.tieneIndeInvalidez.map((v) => parseFloat(v))
          : [],
        tieneHospitalizacion: formData.tieneHospitalizacion
          ? indenizas.tieneHospitalizacion.map((v) => parseFloat(v))
          : [],
        tieneMascota: formData.tieneMascota
          ? indenizas.tieneMascota.map((v) => parseFloat(v))
          : [],        
      },
      costoTotal:formData.costoTotal,
      timestamp: new Date().toISOString(),
    };

    setErrorMessage("");
    onSubmit(dataToSend);
  };

  const handleClear = () => {
    setFormData({
      nombre: "",
      cantidadFamiliar: "",
      tieneIndemnizacion: false,
      tieneIndeAccidente: false,
      tieneIndeInvalidez: false,
      tieneHospitalizacion: false,
      tieneMascota: false,
    });
    setIndenizas({
      tieneIndemnizacion: [],
      tieneIndeAccidente: [],
      tieneIndeInvalidez: [],
      tieneHospitalizacion: [],
      tieneMascota: [],
    });
    setErrorMessage("");
    onClear();
  };

  // Dibuja la cantidad de campos segun la seleccion que se haga
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
          {tipo.label}: Ingrese los valores
        </h3>
        {Array.from({ length: num }).map((_, i) => (
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
        ))}
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

        {/* dibujar los campos segun la seleccion */}
        {indemnizacionTipos.map(renderIndemnizacionSection)}

        {/* Solicita el valor del Seguro */}
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
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Ej. 10"
          />
        </div>

        {/* Dibujas los botones */}
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