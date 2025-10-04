// ClientList.jsx
import React, { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// ======================
// PreviewView (embebido)
// ======================
const PreviewView = ({ data }) => {
  const {
    nombre,
    txtfamiliar1,
    txtfamiliar2,
    tieneIndemnizacion,
    tieneIndeAccidente,
    tieneIndeInvalidez,
    tieneHospitalizacion,
    tieneMascota,
    indenizas,
    cantidadFamiliar,
  } = data;

  return (
    <div id="pdf-content" className="p-6 max-w-3xl mx-auto bg-white text-sm leading-relaxed">
      <h2 className="text-xl font-bold mb-4">¿QUÉ INCLUYE?</h2>
      <p className="mb-4">
        <strong>{nombre}</strong> {txtfamiliar1}{cantidadFamiliar}{txtfamiliar2}
      </p>
      <p className="mb-4">
        Es como un multi seguro, ya que tiene muchas coberturas incluidas, (es como si tuvieras varias pólizas pagando tan solo una).
      </p>
      <p className="font-bold mb-2">INCLUYE TODO LO DEL SIGUIENTE LISTADO: TODO</p>
      <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>
          <strong>Asesoría jurídica telefónica:</strong> Poder llamar a un abogado y te asesores desde cualquier área legal, gratis.
        </li>
        <li>
          <strong>Servicio de decesos o funerario:</strong> Servicio fúnebre y traslado nacional e internacional si fuera necesario.
        </li>
        <li>
          <strong>Gestoría de fallecimiento.</strong>
        </li>
        <li>
          <strong>Testamento online:</strong> Incluye asesoría, gastos de abogado, coordinación y notario para: 1 Testamento hereditario, 2 Testamento vital o últimas voluntades, 3 Borrado digital.
        </li>
        <li>
          <strong>Descuentos en el dentista:</strong> Incluye valoración y limpieza dental gratuita a cada uno, además de descuentos en tratamientos dentales y ortodoncia (20%-60%).
        </li>
        <li>
          <strong>Acceso a la medicina privada:</strong> Cita y controles con todo tipo de especialistas (pediatra, psicólogo, etc.) con precios baremados. Pagas entre 20% y 60% menos.
        </li>
        <li>
          <strong>16 horas al año de asistenta del hogar:</strong> En caso de reposo domiciliario por indicación médica.
        </li>
        <li>
          <strong>8 horas de ayuda a domicilio al año:</strong> Por convalecencia postquirúrgica y/o post hospitalaria.
        </li>
        <li>
          <strong>Segunda opinión médica:</strong> En caso de enfermedad grave.
        </li>

        {tieneIndemnizacion && (
          <li>
            <strong>Indemnización por hospitalización:</strong> Por día que pases en el hospital ingresado, se te indemniza por 40€ (tomador) y 30€ a beneficiarias.
            {indenizas.tieneIndemnizacion.length > 0 && (
              <ul className="list-none pl-0 mt-1">
                {indenizas.tieneIndemnizacion.map((v, i) => (
                  <li key={i}>• Familiar {i + 1}: {v}€</li>
                ))}
              </ul>
            )}
          </li>
        )}

        {tieneIndeAccidente && (
          <li>
            <strong>Indemnización por muerte por accidente:</strong> 15.000€ al tomador + 15.000€ a la pareja.
            {indenizas.tieneIndeAccidente.length > 0 && (
              <ul className="list-none pl-0 mt-1">
                {indenizas.tieneIndeAccidente.map((v, i) => (
                  <li key={i}>• Familiar {i + 1}: {v}€</li>
                ))}
              </ul>
            )}
          </li>
        )}

        {tieneIndeInvalidez && (
          <li>
            <strong>Indemnización por invalidez permanente:</strong> Por cada participante.
            {indenizas.tieneIndeInvalidez.length > 0 && (
              <ul className="list-none pl-0 mt-1">
                {indenizas.tieneIndeInvalidez.map((v, i) => (
                  <li key={i}>• Familiar {i + 1}: {v}€</li>
                ))}
              </ul>
            )}
          </li>
        )}

        {tieneHospitalizacion && <li><strong>Hospitalización Elite</strong></li>}
        {tieneMascota && <li><strong>Cobertura para mascotas</strong></li>}
      </ul>

      <p className="mt-4 italic">
        NOTA: Ejemplo para {cantidadFamiliar || 'X'} personas por 16,57€/mes. Incluye absolutamente todo lo que está escrito en este documento.
      </p>

      <div className="mt-6 pt-4 border-t border-gray-300 text-sm">
        <p><strong>Elia Rincón</strong></p>
        <p>Móvil: 603 180 226</p>
        <p>Agente de Seguros Exclusivo - Occident</p>
      </div>
    </div>
  );
};

// ======================
// Componente principal
// ======================
export const ClientList = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    cantidadFamiliar: "",
    tieneIndemnizacion: false,
    tieneIndeAccidente: false,
    tieneIndeInvalidez: false,
    tieneHospitalizacion: false,
    tieneMascota: false,
  });

  const [indenizas, setIndenizas] = useState({
    tieneIndemnizacion: [],
    tieneIndeAccidente: [],
    tieneIndeInvalidez: [],
    tieneHospitalizacion: [],
    tieneMascota: [],
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [previewData, setPreviewData] = useState(null); // <-- nuevo estado

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

    for (const { key } of indemnizacionTipos) {
      if (formData[key] && formData.cantidadFamiliar !== "") {
        const cantidad = parseInt(formData.cantidadFamiliar, 10);
        if (!isNaN(cantidad) && cantidad > 0) {
          const hasEmpty = indenizas[key].some(
            (val) => val === "" || isNaN(parseFloat(val))
          );
          if (hasEmpty) {
            setErrorMessage(`Por favor completa todos los campos de ${key.replace("tiene", "").replace(/([A-Z])/g, " $1").toLowerCase()}.`);
            return;
          }
        }
      }
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
      timestamp: new Date().toISOString(),
    };

    setPreviewData(dataToSend);
    setErrorMessage("");
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
    setPreviewData(null);
  };

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
      pdf.save(`Seguro_Occident_${previewData.nombre.replace(/\s+/g, "_")}.pdf`);
    });
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
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder={`Ej. ${(i + 1) * 1000}`}
            />
          </div>
        ))}
      </div>
    );
  };

  // ======================
  // Render principal
  // ======================
  if (previewData) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <PreviewView data={previewData} />
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setPreviewData(null)}
            className="px-5 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            ← Editar datos
          </button>
          <button
            type="button"
            onClick={generatePDF}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Descargar PDF
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Registro de Cliente
      </h2>

      {errorMessage && (
        <div className="mb-5 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 flex-shrink-0"
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

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="cantidadFamiliar"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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

        {indemnizacionTipos.map(renderIndemnizacionSection)}

        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Ver Vista Previa
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};