// PreviewView.jsx
import React from 'react';

export const PreviewView = ({ data }) => {
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

  // Función auxiliar para formatear indemnizaciones
  const renderIndemnizacion = (valores, label) => {
    if (!valores || valores.length === 0) return null;
    return (
      <li>
        <strong>{label}:</strong> {valores.map((v, i) => (
          <span key={i}>
            Familiar {i + 1}: {v.toLocaleString('es-ES')}€{i < valores.length - 1 ? ', ' : ''}
          </span>
        ))}
      </li>
    );
  };

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
        <li><strong>Asesoría jurídica telefónica:</strong> Poder llamar a un abogado y te asesores desde cualquier área legal, gratis.</li>
        <li><strong>Servicio de decesos o funerario:</strong> Servicio fúnebre y traslado nacional e internacional si fuera necesario.</li>
        <li><strong>Gestoría de fallecimiento.</strong></li>
        <li><strong>Testamento online:</strong> Incluye asesoría, gastos de abogado, coordinación y notario para: 1 Testamento hereditario, 2 Testamento vital o últimas voluntades, 3 Borrado digital.</li>
        <li><strong>Descuentos en el dentista:</strong> Incluye valoración y limpieza dental gratuita a cada uno, además de descuentos en tratamientos dentales y ortodoncia (20%-60%).</li>
        <li><strong>Acceso a la medicina privada:</strong> Cita y controles con todo tipo de especialistas (pediatra, psicólogo, etc.) con precios baremados. Pagas entre 20% y 60% menos.</li>
        <li><strong>16 horas al año de asistenta del hogar:</strong> En caso de reposo domiciliario por indicación médica.</li>
        <li><strong>8 horas de ayuda a domicilio al año:</strong> Por convalecencia postquirúrgica y/o post hospitalaria.</li>
        <li><strong>Segunda opinión médica:</strong> En caso de enfermedad grave.</li>
        
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

        {tieneIndeAccidente && renderIndemnizacion(indenizas.tieneIndeAccidente, "Indemnización por muerte por accidente (15.000€ tomador + 15.000€ pareja)")}
        {tieneIndeInvalidez && renderIndemnizacion(indenizas.tieneIndeInvalidez, "Indemnización por invalidez permanente")}
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