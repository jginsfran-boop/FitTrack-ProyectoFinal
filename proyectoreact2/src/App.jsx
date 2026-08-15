import { useState } from 'react';
import './App.css';
import EntrenamientoModel from './models/EntrenamientoModel';
import EntrenamientoForm from './components/EntrenamientoForm';
import ResultadoCard from './components/ResultadoCard';
import EstadisticasCard from './components/EstadisticasCard';
import ParticipantesCard from './components/ParticipantesCard';
import HistorialList from './components/HistorialList';

// --- CLASE 13: App es el componente PADRE. Guarda el estado y se lo pasa
//               a cada componente hijo mediante props. ---
function App() {
  // --- CLASE 12: Hook useState ---
  // useState(valorInicial) devuelve [estadoActual, funciónParaActualizarlo].
  // Esa pareja se obtiene con desestructuración de arreglos (técnica de ES6).
  const [historial, setHistorial] = useState([]);
  const [ultimoResultado, setUltimoResultado] = useState(null);

  // --- CLASE 12: Objeto Map como estado ---
  // Guardamos un Map<nombreUsuario, cantidadDeEntrenamientos>. Al ser estado
  // de React, cada actualización debe crear un Map NUEVO (no mutar el actual).
  const [mapaUsuarios, setMapaUsuarios] = useState(new Map());

  // --- CLASE 13: función que el padre le pasa por props al hijo EntrenamientoForm
  //               para que el hijo pueda "avisarle" al padre cuando hay un registro nuevo ---
  const registrarEntrenamiento = (datos) => {
    // --- CLASE 12: Desestructuración de objeto para extraer cada campo del formulario ---
    const { nombre, actividad, duracion, peso, objetivo } = datos;

    // --- CLASE 8: Instanciación del modelo POO ---
    const nuevoEntrenamiento = new EntrenamientoModel(nombre, actividad, duracion, peso, objetivo);

    setHistorial((prevHistorial) => [...prevHistorial, nuevoEntrenamiento]);
    setUltimoResultado(nuevoEntrenamiento);

    // --- CLASE 12: actualizar un Map de forma inmutable dentro de un estado ---
    setMapaUsuarios((prevMapa) => {
      const nuevoMapa = new Map(prevMapa);
      // --- CLASE 12: get() + set() para incrementar el contador del usuario ---
      const cantidadActual = nuevoMapa.get(nombre) ?? 0;
      nuevoMapa.set(nombre, cantidadActual + 1);
      return nuevoMapa;
    });
  };

  // --- CLASE 12: delete() elimina una clave puntual del Map ---
  const eliminarParticipante = (nombre) => {
    setMapaUsuarios((prevMapa) => {
      const nuevoMapa = new Map(prevMapa);
      nuevoMapa.delete(nombre);
      return nuevoMapa;
    });
  };

  // --- CLASE 12: clear() elimina TODAS las claves del Map de una sola vez ---
  const limpiarParticipantes = () => {
    setMapaUsuarios((prevMapa) => {
      const nuevoMapa = new Map(prevMapa);
      nuevoMapa.clear();
      return nuevoMapa;
    });
  };

  return (
    <>
      <div className="fit-container">
        <h1>FitTrack - Registro de Entrenamiento (React)</h1>

        {/* --- CLASE 12: Template String interpolando variables de estado --- */}
        <p className="subtitulo">
          {`Llevas ${historial.length} entrenamiento(s) registrado(s) de ${mapaUsuarios.size} participante(s).`}
        </p>

        {/* --- CLASE 13: Componente + props: App (padre) -> EntrenamientoForm (hijo) --- */}
        <EntrenamientoForm onRegistrar={registrarEntrenamiento} />

        {/* --- CLASE 13: props con un objeto completo (no solo tipos primitivos) --- */}
        <ResultadoCard entrenamiento={ultimoResultado} />

        {/* --- CLASE 13: props con un arreglo completo --- */}
        <EstadisticasCard historial={historial} />

        {/* --- CLASE 12: props con un Map completo --- */}
        <ParticipantesCard
          mapaUsuarios={mapaUsuarios}
          onEliminar={eliminarParticipante}
          onLimpiarTodo={limpiarParticipantes}
        />

        <HistorialList historial={historial} />
      </div>
    </>
  );
}

export default App;
