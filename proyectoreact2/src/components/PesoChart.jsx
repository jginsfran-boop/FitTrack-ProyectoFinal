import { calcularVariacionPeso, generarPorcentajesPeso, obtenerUltimoPeso } from '../utils/pesoUtils';

// Componente hijo: recibe el arreglo historialPeso y la función onDeshacer por props
function PesoChart({ historialPeso, onDeshacer }) {
  if (historialPeso.length === 0) return null;

  const porcentajes = generarPorcentajesPeso(historialPeso);
  const variacion = calcularVariacionPeso(historialPeso);
  const ultimo = obtenerUltimoPeso(historialPeso);

  let mensajeVariacion;
  if (historialPeso.length < 2) {
    mensajeVariacion = "Registrá al menos dos días para ver la variación.";
  } else if (variacion === 0) {
    mensajeVariacion = "Tu peso se mantuvo estable.";
  } else if (variacion > 0) {
    mensajeVariacion = `Subiste ${variacion} kg desde tu primer registro.`;
  } else {
    mensajeVariacion = `Bajaste ${Math.abs(variacion)} kg desde tu primer registro.`;
  }

  return (
    <div className="peso-card">
      <h3>Seguimiento de Peso</h3>

      <p className="peso-actual">
        Peso actual: <strong>{ultimo.pesoKg} kg</strong> <small>({ultimo.fecha})</small>
      </p>

      <div className="grafico-peso">
        {historialPeso.map((registro, indice) => (
          <div className="barra-peso-contenedor" key={`${registro.fecha}-${indice}`}>
            <div className="barra-peso" style={{ height: `${porcentajes[indice]}%` }} />
            <span className="barra-peso-valor">{registro.pesoKg}</span>
            <span className="barra-peso-fecha">{registro.fecha}</span>
          </div>
        ))}
      </div>

      <p className="peso-variacion">{mensajeVariacion}</p>

      <button type="button" className="btn-deshacer" onClick={onDeshacer}>
        Deshacer último registro
      </button>
    </div>
  );
}

export default PesoChart;
