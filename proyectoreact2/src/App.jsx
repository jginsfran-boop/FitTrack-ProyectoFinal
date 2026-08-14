import { useState } from 'react';
import './App.css';
import EntrenamientoModel from './models/EntrenamientoModel';
import EntrenamientoForm from './components/EntrenamientoForm';
import ResultadoCard from './components/ResultadoCard';
import EstadisticasCard from './components/EstadisticasCard';
import HistorialList from './components/HistorialList';

// --- CLASE 13: App es el componente PADRE. Guarda el estado y se lo pasa
//               a cada componente hijo mediante props. ---
function App() {
  const [historial, setHistorial] = useState([]);
  const [ultimoResultado, setUltimoResultado] = useState(null);

  // --- CLASE 13: función que el padre le pasa por props al hijo EntrenamientoForm
  //               para que el hijo pueda "avisarle" al padre cuando hay un registro nuevo ---
  const registrarEntrenamiento = (datos) => {
    // --- CLASE 8: Instanciación del modelo POO ---
    const nuevoEntrenamiento = new EntrenamientoModel(
      datos.nombre,
      datos.actividad,
      datos.duracion,
      datos.peso,
      datos.objetivo
    );

    setHistorial((prevHistorial) => [...prevHistorial, nuevoEntrenamiento]);
    setUltimoResultado(nuevoEntrenamiento);
  };

  return (
    <>
      <div className="fit-container">
        <h1>FitTrack - Registro de Entrenamiento (React)</h1>

        {/* --- CLASE 13: Componente + props: App (padre) -> EntrenamientoForm (hijo) --- */}
        <EntrenamientoForm onRegistrar={registrarEntrenamiento} />

        {/* --- CLASE 13: props con un objeto completo (no solo tipos primitivos) --- */}
        <ResultadoCard entrenamiento={ultimoResultado} />

        {/* --- CLASE 13: props con un arreglo completo --- */}
        <EstadisticasCard historial={historial} />

        <HistorialList historial={historial} />
      </div>
    </>
  );
}

export default App;
