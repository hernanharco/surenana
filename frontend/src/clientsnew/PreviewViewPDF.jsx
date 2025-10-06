import React from "react";

export const PreviewViewPDF = ({ data }) => {
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
    costoTotal,
    mascotas,
  } = data;

  const hasNonZeroValues = (arr) => Array.isArray(arr) && arr.some(v => v > 0);
  const hasAnyYes = (arr) => Array.isArray(arr) && arr.some(v => v === "si");

  return (
    <div
      id="pdf-content"
      className="p-6 max-w-3xl mx-auto bg-white"
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#1f2937',
        pageBreakAfter: 'avoid',
      }}
    >
      {/* Encabezado */}
      <div className="text-center mb-6 avoid-page-break">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-2">
          RESUMEN DE COBERTURAS
        </h1>
        <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
      </div>

      {/* Nombre y grupo familiar */}
      <p className="text-lg font-semibold mb-4 text-gray-800 avoid-page-break">
        <strong>{nombre}</strong> {txtfamiliar1}{cantidadFamiliar}{txtfamiliar2}
      </p>

      <p className="mb-5 text-gray-700 avoid-page-break">
        Es como un <strong>multiseguro</strong>: múltiples coberturas incluidas pagando una sola prima.
      </p>

      <div className="mb-5 p-3 bg-blue-50 border-l-4 border-blue-500 rounded avoid-page-break">
        <p className="font-bold text-blue-800">✅ INCLUYE TODO LO SIGUIENTE:</p>
      </div>

      <ul className="space-y-4 mb-6">
        {/* Servicios fijos */}
        <li className="avoid-page-break">
          <strong className="text-red-600">1. Asesoría jurídica telefónica</strong>: Acceso gratuito a abogado en cualquier área legal.<br />
          <a
            href="https://www.occident.com/servicios/asesoramiento-juridico-gratuito-telefono"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Ver más
          </a>
        </li>

        <li className="avoid-page-break">
          <strong className="text-red-600">2. Servicio funerario (decesos)</strong>: Incluye sepelio, traslado nacional e internacional.<br />
          <a
            href="https://www.occident.com/sgi/seguros-decesos/familiar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Ver más
          </a>
        </li>

        <li className="avoid-page-break">
          <strong className="text-red-600">3. Gestoría de fallecimiento</strong>: Trámites tras una defunción (pensiones, certificados, etc.).<br />
          <a
            href="https://www.occident.com/servicios/gestoria-defuncion"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Ver más
          </a>
        </li>

        <li className="avoid-page-break">
          <strong className="text-red-600">4. Testamento online + Borrado digital</strong>: Incluye redacción, notario, registro y limpieza digital.<br />
          <a
            href="https://www.occident.com/servicios/testamento-online"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Ver más
          </a>
        </li>

        <li className="avoid-page-break">
          <strong className="text-red-600">5. Bienestar y Salud Occident</strong>: Cuadro médico privado, descuentos dentales, psicología, etc.<br />
          <a
            href="https://bienestarysalud.occident.com/busqueda?opc=2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Ver más
          </a>
        </li>

        <li className="avoid-page-break">
          <strong className="text-red-600">6. Medicina privada con descuentos</strong>: Hasta 60% menos en consultas con especialistas.
        </li>

        <li className="avoid-page-break">
          <strong className="text-red-600">7. 16 horas/año de asistenta del hogar</strong>: En caso de reposo médico domiciliario.
        </li>

        <li className="avoid-page-break">
          <strong className="text-red-600">8. 8 horas/año de ayuda a domicilio</strong>: Tras hospitalización.<br />
          <a
            href="https://bienestarysalud.occident.com/gratuitos-convalecencia-post-hospitalaria"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Ver más
          </a>
        </li>

        <li className="avoid-page-break">
          <strong className="text-red-600">9. Segunda opinión médica</strong>: En casos de enfermedad grave.<br />
          <a
            href="https://bienestarysalud.occident.com/gratuitos-segunda-opinion-medica"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Ver más
          </a>
        </li>

        {/* Indemnizaciones condicionales */}
        {tieneIndemnizacion && hasNonZeroValues(indenizas.tieneIndemnizacion) && (
          <li className="avoid-page-break">
            <strong className="text-red-600">10. Indemnización por hospitalización</strong>: Por día de ingreso hospitalario.
            <ul className="mt-1 pl-5 list-none">
              {indenizas.tieneIndemnizacion
                .filter(v => v > 0)
                .map((v, i) => (
                  <li key={i} className="text-gray-700">• Familiar {i + 1}: <strong>{v} €</strong></li>
                ))}
            </ul>
          </li>
        )}

        {tieneIndeAccidente && hasNonZeroValues(indenizas.tieneIndeAccidente) && (
          <li className="avoid-page-break">
            <strong className="text-red-600">11. Indemnización por muerte por accidente</strong>
            <ul className="mt-1 pl-5 list-none">
              {indenizas.tieneIndeAccidente
                .filter(v => v > 0)
                .map((v, i) => (
                  <li key={i} className="text-gray-700">• Familiar {i + 1}: <strong>{v} €</strong></li>
                ))}
            </ul>
          </li>
        )}

        {tieneIndeInvalidez && hasNonZeroValues(indenizas.tieneIndeInvalidez) && (
          <li className="avoid-page-break">
            <strong className="text-red-600">12. Indemnización por invalidez permanente</strong>
            <ul className="mt-1 pl-5 list-none">
              {indenizas.tieneIndeInvalidez
                .filter(v => v > 0)
                .map((v, i) => (
                  <li key={i} className="text-gray-700">• Familiar {i + 1}: <strong>{v} €</strong></li>
                ))}
            </ul>
          </li>
        )}

        {tieneHospitalizacion && hasAnyYes(indenizas.tieneHospitalizacion) && (
          <li className="avoid-page-break">
            <strong className="text-red-600">13. Hospitalización Elite</strong>: Cobertura activa para los siguientes familiares:
            <ul className="mt-1 pl-5 list-none">
              {indenizas.tieneHospitalizacion
                .map((respuesta, i) => ({ respuesta, index: i }))
                .filter(({ respuesta }) => respuesta === "si")
                .map(({ index }) => (
                  <li key={index} className="text-gray-700">• Familiar {index + 1}: <strong>Sí</strong></li>
                ))}
            </ul>
          </li>
        )}

        {tieneMascota && mascotas && (
          <li className="avoid-page-break">
            <strong className="text-red-600">14. Cobertura para mascotas</strong>:
            <ul className="mt-1 pl-5 list-none">
              <li className="text-gray-700">
                Cantidad: <strong>{mascotas.cantidad}</strong>
              </li>
              {mascotas.tipos.map((tipo, i) => (
                <li key={i} className="text-gray-700">
                  • Mascota {i + 1}: <strong>{tipo === "perro" ? "Perro" : "Gato"}</strong>
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>

      {/* Nota final */}
      {costoTotal > 0 && (
        <p className="mt-6 italic text-gray-700 bg-yellow-50 p-3 rounded avoid-page-break">
          <strong>NOTA:</strong> Ejemplo para {cantidadFamiliar || 'X'} persona(s) por <strong>{costoTotal} €/mes</strong>. Incluye absolutamente todas las coberturas listadas.
        </p>
      )}

      {/* Firma */}
      <div className="mt-8 pt-4 border-t border-gray-300 text-center avoid-page-break">
        <p className="font-semibold text-gray-800">Eliana Rincón O.</p>
        <p className="text-gray-600">Móvil: 603 180 226</p>
        <p className="text-gray-600">Agente de Seguros Exclusivo</p>
      </div>
    </div>
  );
};