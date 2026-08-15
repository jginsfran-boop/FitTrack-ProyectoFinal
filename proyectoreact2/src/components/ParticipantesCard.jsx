// --- CLASE 12: Componente que recibe y recorre un Map por props ---
function ParticipantesCard({ mapaUsuarios, onEliminar, onLimpiarTodo }) {
  if (mapaUsuarios.size === 0) return null;

  const filas = [];

  // --- CLASE 12: for...of para recorrer directamente las entradas [clave, valor] de un Map ---
  for (const [nombre, cantidad] of mapaUsuarios) {
    filas.push({ nombre, cantidad });
  }

  return (
    <div className="participantes-card">
      <h3>Participantes</h3>
      <ul>
        {/* --- CLASE 12: Desestructuración directa en los parámetros de la función --- */}
        {filas.map(({ nombre, cantidad }) => (
          <li key={nombre}>
            {/* --- CLASE 12: Template String para el texto de cada fila --- */}
            <span>{`${nombre}: ${cantidad} ${cantidad === 1 ? "entrenamiento" : "entrenamientos"}`}</span>
            <button type="button" onClick={() => onEliminar(nombre)} className="btn-quitar">
              Quitar
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={onLimpiarTodo} className="btn-limpiar">
        Limpiar participantes
      </button>
    </div>
  );
}

export default ParticipantesCard;
