// src/hooks/useClientFormState.js
//importaciones de la carpeta de utils
import { usePersistedState } from '../../utils/usePersistedState'

const STORAGE_KEY = "seguros_nana_client_form";

const getTodayDate = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

const initialData = {
  formData: {
    nombre: "",
    cantidadFamiliar: "",
    tieneIndemnizacion: false,
    tieneIndeAccidente: false,
    tieneIndeInvalidez: false,
    tieneHospitalizacion: false,
    tieneSaludDigital: false,
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

const indemnizacionTipos = [
  { key: "tieneIndemnizacion", label: "Indemnización por Hospitalización", type: "number" },
  { key: "tieneIndeAccidente", label: "Indemnización por Accidente", type: "number" },
  { key: "tieneIndeInvalidez", label: "Indemnización por Invalidez", type: "number" },
  { key: "tieneHospitalizacion", label: "Hospitalización Elite", type: "boolean" },
];

export const useClientFormState = (onSubmit, onClear) => {
  const [state, setState] = usePersistedState(STORAGE_KEY, initialData);
  const { formData, indenizas, mascotasInfo } = state;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Manejo genérico de checkboxes de indemnizaciones
    const tipoItem = indemnizacionTipos.find((item) => item.key === name);
    if (tipoItem) {
      const isChecked = type === "checkbox" ? checked : false;
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

    // Manejo de Salud Digital (solo booleano, sin indenizas)
    if (name === "tieneSaludDigital") {
      setState((prev) => ({
        ...prev,
        formData: { ...prev.formData, tieneSaludDigital: checked }
      }));
      return;
    }

    // Manejo de mascotas
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

    // Actualización genérica de formData
    setState((prev) => ({ ...prev, formData: { ...prev.formData, [name]: value } }));

    // Actualizar indenizas si cambia cantidadFamiliar
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
      // Podrías usar un estado local de error aquí si lo sacas del hook
      alert("Por favor, ingresa el nombre del cliente.");
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
      tieneSaludDigital: formData.tieneSaludDigital,
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

    onSubmit(dataToSend);
  };

  const handleClear = () => {
    setState({
      ...initialData,
      formData: { ...initialData.formData, fechaCotizacion: getTodayDate() },
    });
    onClear();
  };

  return {
    formData,
    indenizas,
    mascotasInfo,
    handleChange,
    handleSubmit,
    handleClear,
    indemnizacionTipos,
  };
};