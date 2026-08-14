// --- CLASE 13: Componente hijo que recibe el objeto "entrenamiento" por props ---
function ResultadoCard({ entrenamiento }) {
  if (!entrenamiento) return null;

  return (
    <div className="resultado-card">
      <h3>Último Registro</h3>
      <p>Hola <strong>{entrenamiento.nombre}</strong>, registraste un entrenamiento de <strong>{entrenamiento.actividad}</strong>.</p>
      <p><small>Fecha y hora: {entrenamiento.fecha}</small></p>
      <p>Duración: {entrenamiento.duracion} min ({entrenamiento.intensidad})</p>
      <p>Calorías quemadas estimadas: <strong>{entrenamiento.calorias} kcal</strong></p>
      <p className="mensaje-objetivo">{entrenamiento.mensajeObjetivo}</p>
    </div>
  );
}

export default ResultadoCard;
