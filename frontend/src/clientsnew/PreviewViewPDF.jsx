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
    tieneSaludDigital,
    indenizas,
    cantidadFamiliar,
    costoTotal,
    mascotas,
  } = data;

  console.log(data);

  const hasNonZeroValues = (arr) =>
    Array.isArray(arr) && arr.some((v) => v > 0);
  const hasAnyYes = (arr) => Array.isArray(arr) && arr.some((v) => v === "si");

  return (
    <div
      id="pdf-content"
      className="p-6 max-w-3xl mx-auto bg-white"
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: "16px",
        lineHeight: "1.6",
        color: "#1f2937",
        pageBreakAfter: "avoid",
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
      <p className="text-lg font-semibold mb-4 text-gray-800 avoid-page-break text-right">
        <strong>{nombre}</strong> {txtfamiliar1}
        {cantidadFamiliar}
        {txtfamiliar2}
      </p>

      <p className="mb-5 text-gray-700 avoid-page-break">
        Es como un <strong>multiseguro</strong>: múltiples coberturas incluidas
        pagando una sola prima.
      </p>

      <div className="mb-5 p-3 bg-blue-50 border-l-4 border-blue-500 rounded avoid-page-break">
        <p className="font-bold text-blue-800">✅ INCLUYE TODO LO SIGUIENTE:</p>
      </div>

      <ul className="space-y-4 mb-6">
        {/* Servicios fijos */}
        <li className="avoid-page-break">
          <strong className="text-red-600 uppercase">
            1. ACCESO A LA MEDICINA PRIVADA
          </strong>
          : Especialistas (oftalmología, pediatría, ginecología, etc.), análisis
          e imágenes diagnósticas con precios baremados. Ahorra del 20% al 60%
          frente al precio particular.
        </li>

        {/* Indemnizaciones condicionales */}
        {tieneIndemnizacion &&
          hasNonZeroValues(indenizas.tieneIndemnizacion) && (
            <li className="avoid-page-break">
              <strong className="text-red-600 uppercase">
                2. INDEMNIZACIÓN POR HOSPITALIZACIÓN
              </strong>
              : Si llegas a estar ingresado en el hospital , recibe de 20€ a 40€
              ** ( por cualquier causa)
              <strong className="text-red-600 uppercase">
                {" "}
                * carencia de 6 Meses
              </strong>
              <ul className="mt-1 pl-5 list-none">
                {indenizas.tieneIndemnizacion
                  .filter((v) => v > 0)
                  .map((v, i) => (
                    <li key={i} className="text-gray-700">
                      • Familiar {i + 1}: <strong>{v} €</strong>
                    </li>
                  ))}
              </ul>
            </li>
          )}

        {/* Servicios fijos */}
        <li className="avoid-page-break">
          <strong className="text-red-600 uppercase">
            3. ORIENTACION, MEDICA TELEFONICA POR VIDEOLLAMADA
          </strong>
          : desde la Aplicacion
          <br />
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
          <strong className="text-red-600 uppercase">
            4. CONSULTA JURÍDICA TELEFÓNICA
          </strong>
          : consultas telefónicas ilimitadas con un abogado , de cualquier área
          legal sin costo.
          <br />
          <br />
          Ten en cuenta que cada consulta a un abogado está entre 50€ y 60€ ,
          aquí las tendrías gratis todas las que quieras al mes .<br />
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
          <strong className="text-red-600 uppercase">
            5. COBERTURA DENTAL AMPLIA (INCLUYE LIMPIEZA DENTAL ANUAL GRATUITA
            VALORACIÓN A CADA UNO)
          </strong>
          : <br />
          también actos gratuitos como radiografías , descuentos sobre
          tratamientos dentales , ortodoncia, férulas, todo con precio especial
          por tener este seguro .
          <br />
          <br />
          <strong className="text-red-600 uppercase block text-center w-full">
            INCLUYE TAMBIÉN CUADRO MÉDICO OCCIDENT BIENESTAR Y SALUD
          </strong>{" "}
          <br />
          Los cuales tienen los siguiente servicios:
          <br />
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
          <strong className="text-red-600 uppercase">
            6. Tendrás 16 horas cada año de una ASISTENTA DEL HOGAR
          </strong>
          : Si por algún motivo el médico te envía reposo domiciliario, se te
          envía una persona a casa, (para hacer tareas de limpieza, la compra,
          preparación de alimentos u ordenar el domicilio)
        </li>

        <li className="avoid-page-break">
          <strong className="text-red-600 uppercase">
            7. Tendrás 8 horas cada año de AYUDA A DOMICILIO POST-QUIRURGICA
          </strong>
          : si por alguna circunstancia tienes una cirugía, se envía un auxiliar
          formado y con experiencia a casa para cuidarte y realizar actividades
          como: Ayuda para la realización de la higiene y cuidado personal,
          Compras, preparación y cocinado de comida, Control de la medicación,
          Realizar movilizaciones: acostar/levantar, transferencias cama-silla…,
          - Hacer compañía en el domicilio y acompañamientos fuera del hogar.
          <br />
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
          <strong className="text-red-600 uppercase">
            8. SERVICIO DE DECESOS O FUNERARIO
          </strong>
          : servicio fúnebre y traslado nacional e internacional si fuera
          necesario.
          <br />
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
          <strong className="text-red-600 uppercase">
            9. GESTORIA DE FALLECIMIENTO
          </strong>
          : Trámites tras una defunción (pensiones, certificados, etc.).
          <br />
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
          <strong className="text-red-600 uppercase">
            10. TESTAMENTO ONLINE + BORRADO DIGITAL
          </strong>
          : Incluye redacción, notario, registro y limpieza digital.
          <br />
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
          <strong className="text-red-600 uppercase">
            **9. Segunda opinión médica
          </strong>
          : En casos de enfermedad grave.
          <br />
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
        {tieneIndeAccidente &&
          hasNonZeroValues(indenizas.tieneIndeAccidente) && (
            <li className="avoid-page-break">
              <strong className="text-red-600 uppercase ">
                11. Indemnización por muerte por accidente
              </strong>
              <ul className="mt-1 pl-5 list-none">
                {indenizas.tieneIndeAccidente
                  .filter((v) => v > 0)
                  .map((v, i) => (
                    <li key={i} className="text-gray-700">
                      • Familiar {i + 1}: <strong>{v} €</strong>
                    </li>
                  ))}
              </ul>
            </li>
          )}

        {tieneIndeInvalidez &&
          hasNonZeroValues(indenizas.tieneIndeInvalidez) && (
            <li className="avoid-page-break">
              <strong className="text-red-600 uppercase">
                12. Indemnización por invalidez permanente
              </strong>
              <ul className="mt-1 pl-5 list-none">
                {indenizas.tieneIndeInvalidez
                  .filter((v) => v > 0)
                  .map((v, i) => (
                    <li key={i} className="text-gray-700">
                      • Familiar {i + 1}: <strong>{v} €</strong>
                    </li>
                  ))}
              </ul>
            </li>
          )}

        {tieneHospitalizacion && hasAnyYes(indenizas.tieneHospitalizacion) && (
          <li className="avoid-page-break">
            <strong className="text-red-600 uppercase">
              13. Hospitalización Elite
            </strong>
            : Cobertura activa para los siguientes familiares:
            <ul className="mt-1 pl-5 list-none">
              {indenizas.tieneHospitalizacion
                .map((respuesta, i) => ({ respuesta, index: i }))
                .filter(({ respuesta }) => respuesta === "si")
                .map(({ index }) => (
                  <li key={index} className="text-gray-700">
                    • Familiar {index + 1}: <strong>Sí</strong>
                  </li>
                ))}
            </ul>
          </li>
        )}

        {tieneMascota && mascotas && (
          <li className="avoid-page-break">
            <strong className="text-red-600 uppercase">
              14. Cobertura para mascotas
            </strong>
            :
            <ul className="mt-1 pl-5 list-none">
              <li className="text-gray-700">
                Cantidad: <strong>{mascotas.cantidad}</strong>
              </li>
              {mascotas.tipos.map((tipo, i) => (
                <li key={i} className="text-gray-700">
                  • Mascota {i + 1}:{" "}
                  <strong>{tipo === "perro" ? "Perro" : "Gato"}</strong>
                </li>
              ))}
            </ul>
          </li>
        )}

        {tieneSaludDigital && (
          
          <li className="avoid-page-break">
            <strong className="text-red-600 uppercase block text-center w-full">
              tambien tendrás cobertura de salud digital
            </strong>
            <br />
            Esta cobertura tiene los siguientes servicios por cada persona
            inscrita
            <br />
            <br />
            <strong className="text-red-600 uppercase block text-center w-full">
              <span className="mr-2">→</span> VIDEOCONSULTA MÉDICA
            </strong>
            <ul className="list-none pl-5 mt-1 space-y-1">
              {[
                "Medicina General",
                "Pediatría",
                "Nutrición",
                "Psicología",
                "Ginecología",
                "Dermatología",
                "Endocrinología",
              ].map((item, i) => (
                <li key={i} className="text-gray-700">
                  - {item}
                </li>
              ))}
            </ul>
            <br />            
            Así como el servicio de{" "}
            <strong className="text-red-600 uppercase">
              chat médico para medicina general y urgencias sin límite
            </strong>
            <br />
            <b>
              desde una aplicación, solicitas las videollamadas de urgencias o
              citas que programes con el facultativo o especialista que desees
              de forma <strong className="uppercase">gratuita</strong>
            </b>
            <br />
            <br />
            <strong className="text-red-600 uppercase block text-center w-full">
              <span className="mr-2">→</span> consultas Presenciales
            </strong>
            <ul className="list-none pl-5 mt-1 space-y-1">
              {[
                "cualquier especialidad médica",
                "4 visitas anaules por cada persona inscrita",
                "facultativos del cuadro médico 100% de la factura",
                "reembolso max para ambos casos de 40€ / visita",                
              ].map((item, i) => (
                <li key={i} className="text-gray-700">
                  - {item}
                </li>
              ))}
            </ul>
            <br />
            <br />
            <strong className="text-red-600 uppercase block text-center w-full">
              <span className="mr-2">→</span> servicio optométrico y auditivo
            </strong>
            <ul className="list-none pl-5 mt-1 space-y-1">
              {[
                "1 revisión anual para la prevención visual y auditiva",
                "descuentos (general óptica)",                
              ].map((item, i) => (
                <li key={i} className="text-gray-700">
                  - {item}
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>

      {/* Nota final */}
      {costoTotal > 0 && (
        <p className="mt-6 italic text-gray-700 bg-yellow-50 p-3 rounded avoid-page-break">
          <strong>NOTA:</strong> Ejemplo para {cantidadFamiliar || "X"}{" "}
          persona(s) por <strong>{costoTotal} €/mes</strong>. Incluye
          absolutamente todas las coberturas listadas.
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
