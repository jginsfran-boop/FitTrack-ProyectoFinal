import { useState } from 'react';
import './App.css';
import EntrenamientoModel from './models/EntrenamientoModel';
import EntrenamientoForm from './components/EntrenamientoForm';
import ResultadoCard from './components/ResultadoCard';
import EstadisticasCard from './components/EstadisticasCard';
import ParticipantesCard from './components/ParticipantesCard';
import HistorialList from './components/HistorialList';
import RegistroPesoForm from './components/RegistroPesoForm';
import PesoChart from './components/PesoChart';
import { quitarUltimoRegistroPeso } from './utils/pesoUtils';

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

  // Historial de peso corporal: cada registro es { fecha, pesoKg }
  const [historialPeso, setHistorialPeso] = useState([]);

  // --- CLASE 14: función que el padre le pasa por props al hijo EntrenamientoForm
  //               para que el hijo pueda "avisarle" al padre cuando hay un registro nuevo ---
  const registrarEntrenamiento = (datos) => {
    // --- CLASE 12: Desestructuración de objeto para extraer cada campo del formulario ---
    const { nombre, actividad, duracion, peso, objetivo } = datos;

    // --- CLASE 8: Instanciación del modelo POO ---
    const nuevoEntrenamiento = new EntrenamientoModel(nombre, actividad, duracion, peso, objetivo);

    // --- CLASE 14: Operador Spread (...) para agregar elementos a un arreglo de forma inmutable ---
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

  // Agrega un nuevo registro de peso al final del historial (estado inmutable)
  const registrarPeso = (pesoKg) => {
    const nuevoRegistro = {
      fecha: new Date().toLocaleDateString(),
      pesoKg,
    };

    // --- CLASE 14: Operador Spread (...) para agregar un registro inmutablemente ---
    setHistorialPeso((prevHistorialPeso) => [...prevHistorialPeso, nuevoRegistro]);
  };

  // Quita el último registro de peso cargado
  const deshacerUltimoPeso = () => {
    setHistorialPeso((prevHistorialPeso) => quitarUltimoRegistroPeso(prevHistorialPeso));
  };

  return (
    <>
      <div className="fit-container">
        <h1>FitTrack - Registro de Entrenamiento (React)</h1>

        {/* --- CLASE 12: Template String interpolando variables de estado --- */}
        <p className="subtitulo">
          {`Llevas ${historial.length} entrenamiento(s) registrado(s) de ${mapaUsuarios.size} participante(s).`}
        </p>

        {/* --- CLASE 14: Componentes: eventos generados por una componente (padre -> hijo) --- */}
        <EntrenamientoForm onRegistrar={registrarEntrenamiento} />

        {/* --- CLASE 13: props con un objeto completo (no solo tipos primitivos) --- */}
        <ResultadoCard entrenamiento={ultimoResultado} />

        {/* --- CLASE 13: props con un arreglo completo --- */}
        <EstadisticasCard historial={historial} />

        {/* --- CLASE 12: props con un Map completo --- */}
        {/* --- CLASE 14: Pasando referencias a funciones como eventos (props) --- */}
        <ParticipantesCard
          mapaUsuarios={mapaUsuarios}
          onEliminar={eliminarParticipante}
          onLimpiarTodo={limpiarParticipantes}
        />

        <HistorialList historial={historial} />

        <RegistroPesoForm onRegistrar={registrarPeso} />

        <PesoChart historialPeso={historialPeso} onDeshacer={deshacerUltimoPeso} />
      </div>
    </>
  );
}

export default App;
