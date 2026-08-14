import {
  calcularPromedioCalorias,
  obtenerEntrenamientoMasIntenso,
  todosAlcanzaronObjetivo,
  hayEntrenamientoDeFuerza,
  primerEntrenamientoLargo,
  indicePrimerCardio,
  obtenerActividadesUnicas,
  contarPorActividad,
} from '../utils/arrayUtils';

// --- CLASE 13: Componente hijo dedicado a mostrar datos derivados del historial ---
// Recibe "historial" por props y aplica los métodos de arreglos de la Clase 13
// (reduce, reduceRight, every, some, find, findIndex, entries, filter, map).
function EstadisticasCard({ historial }) {
  if (historial.length === 0) return null;

  const promedio = calcularPromedioCalorias(historial);
  const masIntenso = obtenerEntrenamientoMasIntenso(historial);
  const todosCumplieron = todosAlcanzaronObjetivo(historial);
  const huboFuerza = hayEntrenamientoDeFuerza(historial);
  const primerLargo = primerEntrenamientoLargo(historial);
  const indiceCardio = indicePrimerCardio(historial);
  const actividadesUnicas = obtenerActividadesUnicas(historial);
  const conteoPorActividad = contarPorActividad(historial);

  // --- CLASE 13: Array.prototype.entries() para recorrer con [índice, valor] ---
  const ultimosTres = [];
  for (const [indice, item] of historial.slice(-3).entries()) {
    ultimosTres.push(`#${indice + 1}: ${item.nombre} (${item.calorias} kcal)`);
  }

  return (
    <div className="estadisticas-card">
      <h3>Estadísticas</h3>

      <ul className="estadisticas-lista">
        <li>Promedio de calorías por sesión: <strong>{promedio} kcal</strong></li>
        {masIntenso && (
          <li>
            Entrenamiento más intenso: <strong>{masIntenso.actividad}</strong> de {masIntenso.nombre} ({masIntenso.calorias} kcal)
          </li>
        )}
        <li>¿Todas las sesiones alcanzaron su objetivo?: <strong>{todosCumplieron ? "Sí" : "No"}</strong></li>
        <li>¿Se registró algún entrenamiento de fuerza?: <strong>{huboFuerza ? "Sí" : "No"}</strong></li>
        {primerLargo && (
          <li>
            Primer entrenamiento largo (&ge;60 min): <strong>{primerLargo.nombre}</strong> el {primerLargo.fecha}
          </li>
        )}
        <li>
          Posición del primer cardio registrado:{" "}
          <strong>{indiceCardio === -1 ? "Aún no hay ninguno" : `#${indiceCardio + 1}`}</strong>
        </li>
        <li>Actividades practicadas: <strong>{actividadesUnicas.join(", ")}</strong></li>
      </ul>

      <div className="conteo-actividades">
        {Object.keys(conteoPorActividad).map((actividad) => (
          <span key={actividad} className="badge-actividad">
            {actividad}: {conteoPorActividad[actividad]}
          </span>
        ))}
      </div>

      <div className="ultimos-tres">
        <strong>Últimas sesiones:</strong>
        <ul>
          {ultimosTres.map((texto) => (
            <li key={texto}>{texto}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EstadisticasCard;
