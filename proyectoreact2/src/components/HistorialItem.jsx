// --- CLASE 13: Componente pequeño y reutilizable, recibe "item" por props ---
// Dividir la interfaz en piezas chicas como esta es justamente la idea de
// "componentes" vista en la Clase 13: cada <li> del historial se resuelve acá.
function HistorialItem({ item }) {
  return (
    <li>
      <span>{item.fecha}</span> - <strong>{item.nombre}</strong>: {item.actividad} ({item.duracion} min) - <strong>{item.calorias} kcal</strong>
    </li>
  );
}

export default HistorialItem;
