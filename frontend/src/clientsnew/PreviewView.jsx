// src/components/PreviewView.jsx
import React from "react";

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
    costoTotal,
  } = data;

  console.log("Datos recibidos en PreviewView ", data)

  return (
    <div id="pdf-content" className="p-6 max-w-3xl mx-auto bg-white text-sm leading-relaxed">
      <h2 className="text-xl font-bold mb-4 ">¿QUÉ INCLUYE?</h2>
      <p className="mb-4">
        <strong>{nombre}</strong> {txtfamiliar1}{cantidadFamiliar}{txtfamiliar2}
      </p>
      <p className="mb-4">
        Es como un multi seguro, ya que tiene muchas coberturas incluidas, (es como si tuvieras varias pólizas pagando tan solo una).
      </p>
      <p className="font-bold mb-2 border-t border-gray-300">INCLUYE TODO LO DEL SIGUIENTE LISTADO: TODO</p>
      <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>
          <strong style={{ color: 'red' }}>1. Asesoría jurídica telefónica:</strong> poder llamar a un abogado ,y te asesores desde cualquier área legal, gratis.
          <br />    
          <a href="https://www.occident.com/servicios/asesoramiento-juridico-gratuito-telefono" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver más</a>
        </li>
        <li>
          <strong style={{ color: 'red' }}>2. Servicio de decesos o funerario:</strong> Servicio fúnebre y traslado nacional e internacional si fuera necesario.
          <br />
          <a href="https://www.occident.com/sgi/seguros-decesos/familiar" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver más</a>
        </li>
        <li>
          <strong style={{ color: 'red' }}>3. Gestoría de fallecimiento.</strong>
          <br />
          <a href="https://www.occident.com/servicios/gestoria-defuncion" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver más</a>
        </li>

        <li>
          <strong style={{ color: 'red' }}>4. Testamento online:</strong> Incluye asesoría, gastos de abogado, coordinación y notario para: 1 Testamento hereditario, 2 Testamento vital o últimas voluntades, 3 Borrado digital.
          <br />
          <a href="https://www.occident.com/servicios/testamento-online" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver más</a>
        </li>
        <li>
          <strong style={{ color: 'red' }}>TAMBIÉN INCLUYE : CUADRO MÉDICO OCCIDENT BIENESTAR Y SALUD</strong> los cuales tienen los siguientes servicios:
          <br />
          <a href="https://bienestarysalud.occident.com/busqueda?opc=2 " target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver más</a>
        </li>

        <li>
          <strong style={{ color: 'red' }}>5.Descuentos en el dentista: (Incluye valoración y limpieza dental gratuita a cada uno)</strong>, además de descuentos en tratamientos dentales y ortodoncia (20%-60%).
          <br />
          <a href="https://bienestarysalud.occident.com/busqueda?opc=2" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver más</a>
        </li>
        <li>
          <strong style={{ color: 'red' }}>6.Acceso a la medicina privada:</strong> Cita y controles con todo tipo de especialistas (pediatra, psicólogo, etc.) con precios baremados. Pagas entre 20% y 60% menos.
        </li>
        <li>
          <strong style={{ color: 'red' }}>7. 16 horas al año de asistenta del hogar:</strong> En caso de reposo domiciliario por indicación médica.
        </li>
        <li>
          <strong style={{ color: 'red' }}>8. 8 horas de ayuda a domicilio al año:</strong> Por convalecencia postquirúrgica y/o post hospitalaria.
          <br />
          <a href="https://bienestarysalud.occident.com/gratuitos-convalecencia-post-hospitalaria" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver más</a>
        </li>
        <li>
          <strong style={{ color: 'red' }}>9. Segunda opinión médica:</strong> En caso de enfermedad grave.
          <br />
          <a href="https://bienestarysalud.occident.com/gratuitos-segunda-opinion-medica" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver más</a>
        </li>

        {tieneIndemnizacion && (
          <li>
            <strong style={{ color: 'red' }}>10. Indemnización por hospitalización:</strong> Por cada día que pases en el hospital ingresado.
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
            <strong style={{ color: 'red' }}>11. Indemnización por muerte por accidente:</strong> 
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
            <strong style={{ color: 'red' }}>12. Indemnización por invalidez permanente:</strong> Por cada participante.
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
        NOTA: Ejemplo para {cantidadFamiliar || 'X'} personas por {costoTotal} €/mes. Incluye absolutamente todo lo que está escrito en este documento.
      </p>

      <div className="mt-6 pt-4 border-t border-gray-300 text-sm">
        <p><strong>Eliana Rincón O.</strong></p>
        <p>Móvil: 603 180 226</p>
        <p>Agente de Seguros Exclusivo</p>
      </div>
    </div>
  );
};