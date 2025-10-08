// src/clientsnew/PDF/PDFDocument.jsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#1f2937",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 8,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: "#ef4444",
    margin: "0 auto",
  },
  clientName: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 12,
  },
  intro: {
    marginBottom: 14,
    color: "#374151",
  },
  highlightBox: {
    backgroundColor: "#dbeafe",
    padding: 10,
    borderLeft: "4px solid #3b82f6",
    marginBottom: 16,
  },
  listItem: {
    marginBottom: 12,
    breakInside: "avoid", // ✅ Evita que el bloque se corte entre páginas
    minHeight: 40, // ⬅️ Asegura que haya espacio mínimo
  },
  strong: {
    color: "#dc2626",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  note: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#fef3c7",
    fontStyle: "italic",
    borderRadius: 4,
  },
  signature: {
    marginTop: 30,
    paddingTop: 15,
    borderTop: "1px solid #d1d5db",
    textAlign: "center",
  },
  link: {
    color: "#2563eb",
    textDecoration: "underline",
  },
});

const hasNonZeroValues = (arr) => Array.isArray(arr) && arr.some((v) => v > 0);
const hasAnyYes = (arr) => Array.isArray(arr) && arr.some((v) => v === "si");

export const PDFDocument = ({ data }) => {
  const {
    nombre,
    txtfamiliar1,
    txtfamiliar2,
    cantidadFamiliar,
    costoTotal,
    tieneIndemnizacion,
    tieneIndeAccidente,
    tieneIndeInvalidez,
    tieneHospitalizacion,
    tieneMascota,
    tieneSaludDigital,
    indenizas,
    mascotas,
  } = data;

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>RESUMEN DE COBERTURAS</Text>
          <View style={styles.divider} />
        </View>

        {/* Nombre del cliente */}
        <Text style={styles.clientName}>
          <Text style={{ fontWeight: "bold" }}>{nombre}</Text> {txtfamiliar1}
          {cantidadFamiliar}
          {txtfamiliar2}
        </Text>

        <Text style={styles.intro}>
          Es como un <Text style={{ fontWeight: "bold" }}>multiseguro</Text>:
          múltiples coberturas incluidas pagando una sola prima.
        </Text>

        <View style={styles.highlightBox}>
          <Text style={{ fontWeight: "bold", color: "#1e40af" }}>
            ✅ INCLUYE TODO LO SIGUIENTE:
          </Text>
        </View>

        {/* Cobertura 1: Medicina privada */}
        <View style={styles.listItem}>
          <Text>
            <Text style={styles.strong}>1. ACCESO A LA MEDICINA PRIVADA</Text>:
            Especialistas (oftalmología, pediatría, ginecología, etc.), análisis
            e imágenes diagnósticas con precios baremados. Ahorra del 20% al 60%
            frente al precio particular.
          </Text>
        </View>

        {/* Cobertura 2: Indemnización por hospitalización */}
        {tieneIndemnizacion &&
          hasNonZeroValues(indenizas.tieneIndemnizacion) && (
            <View style={styles.listItem}>
              <Text>
                <Text style={styles.strong}>
                  2. INDEMNIZACIÓN POR HOSPITALIZACIÓN
                </Text>
                : Si llegas a estar ingresado en el hospital, recibe de 20€ a
                40€ ** (por cualquier causa)
                <Text style={styles.strong}> * carencia de 6 Meses</Text>
              </Text>
              {indenizas.tieneIndemnizacion
                .filter((v) => v > 0)
                .map((v, i) => (
                  <Text key={i} style={{ paddingLeft: 16 }}>
                    • Familiar {i + 1}:{" "}
                    <Text style={{ fontWeight: "bold" }}>{v} €</Text>
                  </Text>
                ))}
            </View>
          )}

        {/* Cobertura 3: Orientación médica telefónica */}
        <View style={styles.listItem}>
          <Text>
            <Text style={styles.strong}>
              3. ORIENTACIÓN MÉDICA TELEFÓNICA POR VIDEOLLAMADA
            </Text>
            : desde la Aplicación.
          </Text>
          <Link
            src="https://www.occident.com/servicios/asesoramiento-juridico-gratuito-telefono"
            style={styles.link}
          >
            Ver más
          </Link>
        </View>

        {/* Cobertura 4: Consulta jurídica telefónica */}
        <View style={styles.listItem}>
          <Text>
            <Text style={styles.strong}>4. CONSULTA JURÍDICA TELEFÓNICA</Text>:
            consultas ilimitadas con un abogado en cualquier área legal, sin
            costo. Cada consulta normalmente cuesta entre 50€ y 60€.
          </Text>
          <Link
            src="https://www.occident.com/servicios/asesoramiento-juridico-gratuito-telefono"
            style={styles.link}
          >
            Ver más
          </Link>
        </View>

        {/* Cobertura 5: Cobertura dental */}
        <View style={styles.listItem}>
          <Text>
            <Text style={styles.strong}>5. COBERTURA DENTAL AMPLIA</Text>:
            Incluye limpieza dental anual gratuita, radiografías sin coste, y
            descuentos en tratamientos (ortodoncia, férulas, etc.).
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "#dc2626",
              textAlign: "center",
              marginTop: 6,
            }}
          >
            INCLUYE CUADRO MÉDICO OCCIDENT BIENESTAR Y SALUD
          </Text>
          <Link
            src="https://bienestarysalud.occident.com/busqueda?opc=2"
            style={styles.link}
          >
            Ver más
          </Link>
        </View>

        {/* Cobertura 6: Asistenta del hogar */}
        <View style={styles.listItem}>
          <Text>
            <Text style={styles.strong}>
              6. 16 HORAS/AÑO DE ASISTENTA DEL HOGAR
            </Text>
            : En caso de reposo domiciliario prescrito por médico.
          </Text>
        </View>

        {/* Cobertura 7: Ayuda post-quirúrgica */}
        <View style={styles.listItem}>
          <Text>
            <Text style={styles.strong}>
              7. 8 HORAS/AÑO DE AYUDA A DOMICILIO POST-QUIRÚRGICA
            </Text>
            : Cuidados personales, compras, medicación, movilizaciones,
            compañía.
          </Text>
          <Link
            src="https://bienestarysalud.occident.com/gratuitos-convalecencia-post-hospitalaria"
            style={styles.link}
          >
            Ver más
          </Link>
        </View>

        {/* Cobertura 8: Servicio de decesos */}
        <View style={styles.listItem}>
          <Text>
            <Text style={styles.strong}>
              8. SERVICIO DE DECESOS O FUNERARIO
            </Text>
            : Incluye sepelio, traslado nacional e internacional, y lugar de
            descanso (nicho, sepultura, etc.).
          </Text>
          <Link
            src="https://www.occident.com/sgi/seguros-decesos/familiar"
            style={styles.link}
          >
            Ver más
          </Link>
        </View>

        {/* Cobertura 9: Gestoría de fallecimiento */}
        <View style={styles.listItem}>
          <Text>
            <Text style={styles.strong}>9. GESTORÍA DE FALLECIMIENTO</Text>:
            Trámites tras una defunción: pensiones, certificados, bajas en
            Seguridad Social, etc.
          </Text>
          <Link
            src="https://www.occident.com/servicios/gestoria-defuncion"
            style={styles.link}
          >
            Ver más
          </Link>
        </View>

        {/* Cobertura 10: Testamento online + borrado digital */}
        <View style={styles.listItem}>
          <Text>
            <Text style={styles.strong}>
              10. TESTAMENTO ONLINE + BORRADO DIGITAL
            </Text>
            : Redacción, notario, registro y limpieza de huella digital.
          </Text>
          <Link
            src="https://www.occident.com/servicios/testamento-online"
            style={styles.link}
          >
            Ver más
          </Link>
        </View>

        {/* Cobertura 11: Segunda opinión médica */}
        <View style={styles.listItem}>
          <Text>
            <Text style={styles.strong}>11. SEGUNDA OPINIÓN MÉDICA</Text>: En
            casos de enfermedad grave.
          </Text>
          <Link
            src="https://bienestarysalud.occident.com/gratuitos-segunda-opinion-medica"
            style={styles.link}
          >
            Ver más
          </Link>
        </View>

        {/* Indemnización por accidente */}
        {tieneIndeAccidente &&
          hasNonZeroValues(indenizas.tieneIndeAccidente) && (
            <View style={styles.listItem}>
              <Text style={styles.strong}>
                12. INDEMNIZACIÓN POR MUERTE POR ACCIDENTE
              </Text>
              {indenizas.tieneIndeAccidente
                .filter((v) => v > 0)
                .map((v, i) => (
                  <Text key={i} style={{ paddingLeft: 16 }}>
                    • Familiar {i + 1}:{" "}
                    <Text style={{ fontWeight: "bold" }}>{v} €</Text>
                  </Text>
                ))}
            </View>
          )}

        {/* Indemnización por invalidez */}
        {tieneIndeInvalidez &&
          hasNonZeroValues(indenizas.tieneIndeInvalidez) && (
            <View style={styles.listItem}>
              <Text style={styles.strong}>
                13. INDEMNIZACIÓN POR INVALIDEZ PERMANENTE
              </Text>
              {indenizas.tieneIndeInvalidez
                .filter((v) => v > 0)
                .map((v, i) => (
                  <Text key={i} style={{ paddingLeft: 16 }}>
                    • Familiar {i + 1}:{" "}
                    <Text style={{ fontWeight: "bold" }}>{v} €</Text>
                  </Text>
                ))}
            </View>
          )}

        {/* Hospitalización Elite */}
        {tieneHospitalizacion && hasAnyYes(indenizas.tieneHospitalizacion) && (
          <View style={styles.listItem}>
            <Text style={styles.strong}>14. HOSPITALIZACIÓN ELITE</Text>
            <Text>Cobertura activa para los siguientes familiares:</Text>
            {indenizas.tieneHospitalizacion
              .map((r, i) => ({ r, i }))
              .filter(({ r }) => r === "si")
              .map(({ i }) => (
                <Text key={i} style={{ paddingLeft: 16 }}>
                  • Familiar {i + 1}:{" "}
                  <Text style={{ fontWeight: "bold" }}>Sí</Text>
                </Text>
              ))}
          </View>
        )}

        {/* Mascotas */}
        {tieneMascota && mascotas && (
          <View style={styles.listItem}>
            <Text style={styles.strong}>15. COBERTURA PARA MASCOTAS</Text>
            <Text style={{ paddingLeft: 16 }}>
              Cantidad:{" "}
              <Text style={{ fontWeight: "bold" }}>{mascotas.cantidad}</Text>
            </Text>
            {mascotas.tipos.map((tipo, i) => (
              <Text key={i} style={{ paddingLeft: 16 }}>
                • Mascota {i + 1}:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {tipo === "perro" ? "Perro" : "Gato"}
                </Text>
              </Text>
            ))}
          </View>
        )}

        {/* Salud digital */}
        {tieneSaludDigital && (
          <View style={styles.listItem}>
            <Text
              style={{
                fontWeight: "bold",
                color: "#dc2626",
                textAlign: "center",
                marginBottom: 6,
              }}
            >
              TAMBIÉN TENDRÁS COBERTURA DE SALUD DIGITAL
            </Text>
            <Text>Por cada persona inscrita:</Text>

            <Text
              style={{ fontWeight: "bold", color: "#dc2626", marginTop: 8 }}
            >
              → VIDEOCONSULTA MÉDICA
            </Text>
            {[
              "Medicina General",
              "Pediatría",
              "Nutrición",
              "Psicología",
              "Ginecología",
              "Dermatología",
              "Endocrinología",
            ].map((item, i) => (
              <Text key={i} style={{ paddingLeft: 16 }}>
                • {item}
              </Text>
            ))}

            <Text style={{ marginTop: 8 }}>
              Además,{" "}
              <Text style={{ fontWeight: "bold" }}>chat médico ilimitado</Text>{" "}
              para medicina general y urgencias.
            </Text>

            <Text
              style={{ fontWeight: "bold", color: "#dc2626", marginTop: 10 }}
            >
              → CONSULTAS PRESENCIALES
            </Text>
            {[
              "Cualquier especialidad médica",
              "4 visitas anuales por persona",
              "Reembolso máx. 40€/visita",
            ].map((item, i) => (
              <Text key={i} style={{ paddingLeft: 16 }}>
                • {item}
              </Text>
            ))}

            <Text
              style={{ fontWeight: "bold", color: "#dc2626", marginTop: 10 }}
            >
              → SERVICIO OPTOMÉTRICO Y AUDITIVO
            </Text>
            {["1 revisión anual visual y auditiva", "Descuentos en óptica"].map(
              (item, i) => (
                <Text key={i} style={{ paddingLeft: 16 }}>
                  • {item}
                </Text>
              )
            )}
          </View>
        )}

        {/* Nota final */}
        {costoTotal > 0 && (
          <View style={styles.note}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>NOTA:</Text> Ejemplo para{" "}
              {cantidadFamiliar || "X"} persona(s) por{" "}
              <Text style={{ fontWeight: "bold" }}>{costoTotal} €/mes</Text>.
              Incluye absolutamente todas las coberturas listadas.
            </Text>
          </View>
        )}

        {/* Firma */}
        <View style={styles.signature}>
          <Text style={{ fontWeight: "bold" }}>Eliana Rincón O.</Text>
          <Text>Móvil: 603 180 226</Text>
          <Text>Agente de Seguros Exclusivo</Text>
        </View>
      </Page>
    </Document>
  );
};
