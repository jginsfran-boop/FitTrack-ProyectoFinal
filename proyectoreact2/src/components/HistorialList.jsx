import { useState } from 'react';
import HistorialItem from './HistorialItem';
import { filtrarHistorial, calcularTotalCalorias } from '../utils/arrayUtils';

// --- CLASE 13: Componente hijo que recibe el arreglo "historial" completo por props ---
function HistorialList({ historial }) {
  const [busqueda, setBusqueda] = useState("");

  if (historial.length === 0) return null;

  // --- CLASE 13: filter() + includes() para buscar por nombre o actividad ---
  const historialFiltrado = filtrarHistorial(historial, busqueda);

  // --- CLASE 13: reduce() para el total acumulado de calorías ---
  const totalCalorias = calcularTotalCalorias(historial);

  return (
    <div className="historial-card">
      <h3>Historial de Entrenamientos ({historial.length})</h3>

      <input
        type="text"
        className="input-busqueda"
        placeholder="Buscar por nombre o actividad..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {historialFiltrado.length === 0 ? (
        <p className="sin-resultados">No se encontraron entrenamientos para "{busqueda}".</p>
      ) : (
        <ul>
          {/* --- CLASE 13: map() transforma cada elemento del arreglo en un componente --- */}
          {historialFiltrado.map((item, idx) => (
            <HistorialItem key={idx} item={item} />
          ))}
        </ul>
      )}

      <div className="total-global">
        Total acumulado: <strong>{totalCalorias} kcal</strong>
      </div>
    </div>
  );
}

export default HistorialList;
