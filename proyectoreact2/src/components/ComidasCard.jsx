import { calcularTotalesMacros, calcularPorcentajesMacros } from '../utils/comidasUtils';

// Componente hijo: recibe "historialComidas" por props, mismo patrón que EstadisticasCard
function ComidasCard({ historialComidas }) {
  if (historialComidas.length === 0) return null;

  const totales = calcularTotalesMacros(historialComidas);
  const porcentajes = calcularPorcentajesMacros(totales);

  return (
    <div className="comidas-card">
      <h3>Comidas Registradas ({historialComidas.length})</h3>

      <ul className="lista-comidas">
        {historialComidas.map((comida, idx) => (
          <li key={`${comida.nombre}-${idx}`}>
            <strong>{comida.nombre}</strong> — {comida.calorias} kcal
            <br />
            <small>
              P: {comida.proteinas}g · C: {comida.carbohidratos}g · G: {comida.grasas}g · Fibra: {comida.fibra}g
            </small>
          </li>
        ))}
      </ul>

      <div className="totales-macros">
        <h4>Totales del día</h4>
        <p>Calorías totales: <strong>{totales.calorias} kcal</strong></p>
        <ul>
          <li>Proteínas: <strong>{totales.proteinas}g</strong> ({porcentajes.proteinas}%)</li>
          <li>Carbohidratos: <strong>{totales.carbohidratos}g</strong> ({porcentajes.carbohidratos}%)</li>
          <li>Grasas: <strong>{totales.grasas}g</strong> ({porcentajes.grasas}%)</li>
          <li>Fibra: <strong>{totales.fibra}g</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default ComidasCard;
