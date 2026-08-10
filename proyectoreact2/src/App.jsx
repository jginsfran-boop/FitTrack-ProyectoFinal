import { useState } from 'react';
import './App.css';

// --- CLASE 8: Programación Orientada a Objetos (POO) ---
class EntrenamientoModel {
  constructor(nombre, actividad, duracion, peso, objetivo) {
    this.nombre = nombre;
    this.actividad = actividad;
    this.duracion = Number(duracion);
    this.peso = Number(peso);
    this.objetivo = Number(objetivo);
    
    // --- CLASE 7: Objeto Date ---
    this.fecha = new Date().toLocaleString();

    this.met = this.obtenerMet();
    this.calorias = this.calcularCalorias();
    this.intensidad = this.obtenerIntensidad();
    this.mensajeObjetivo = this.evaluarObjetivo();
  }

  obtenerMet() {
    let met;
    // --- CLASE 4: Switch ---
    switch (this.actividad) {
      case 'cardio':
        met = 8;
        break;
      case 'fuerza':
        met = 6;
        break;
      case 'flexibilidad':
        met = 3;
        break;
      default:
        met = 1;
        break;
    }
    return met;
  }

  calcularCalorias() {
    // --- CLASE 7: Objeto Math ---
    return Math.round(this.met * this.peso * (this.duracion / 60));
  }

  obtenerIntensidad() {
    if (this.duracion >= 60) {
      return "Entrenamiento largo";
    } else if (this.duracion >= 30) {
      return "Entrenamiento moderado";
    } else {
      return "Entrenamiento corto";
    }
  }

  evaluarObjetivo() {
    // --- CLASE 11: Operador de igualdad estricta (===) ---
    if (this.calorias >= this.objetivo) {
      return "¡Objetivo alcanzado!";
    } else {
      const faltante = Math.round(this.objetivo - this.calorias);
      return `Aún te faltan ${faltante} kcal para tu objetivo.`;
    }
  }
}

function App() {
  const [historial, setHistorial] = useState([]);
  const [totalCalorias, setTotalCalorias] = useState(0);
  const [ultimoResultado, setUltimoResultado] = useState(null);

  // --- CLASE 10 y 11: Manejo de evento submit de formulario en React ---
  const handleSubmit = (e) => {
    // --- CLASE 10: Prevenir recarga por defecto con e.preventDefault() ---
    e.preventDefault();

    // --- CLASE 10: Captura de datos de los elementos del formulario ---
    const nombreRaw = e.target.nombre.value;
    const actividad = e.target.tipoActividad.value;
    const duracion = e.target.duracion.value;
    const peso = e.target.peso.value;
    const objetivo = e.target.objetivo.value;

    // --- CLASE 11: Validaciones utilizando igualdad estricta (===) ---
    if (nombreRaw.trim() === "" || !duracion || Number(duracion) <= 0 || !peso || Number(peso) <= 0 || !objetivo || Number(objetivo) <= 0) {
      alert("Por favor ingrese valores válidos mayores a 0 en todos los campos.");
      return;
    }

    // --- CLASE 7: Formateo de String ---
    const nombre = nombreRaw.charAt(0).toUpperCase() + nombreRaw.substring(1).toLowerCase();

    // --- CLASE 8: Instanciación del modelo POO ---
    const nuevoEntrenamiento = new EntrenamientoModel(nombre, actividad, duracion, peso, objetivo);

    // Actualización de estado en React
    setHistorial((prevHistorial) => [...prevHistorial, nuevoEntrenamiento]);
    setTotalCalorias((prevTotal) => prevTotal + nuevoEntrenamiento.calorias);
    setUltimoResultado(nuevoEntrenamiento);

    // Limpiar campos del formulario
    e.target.reset();
  };

  return (
    // --- CLASE 11: Uso de React Fragments (<>...</>) para envolver elementos JSX sin divs extra ---
    <>
      <div className="fit-container">
        <h1>FitTrack - Registro de Entrenamiento (React)</h1>

        {/* --- CLASE 10 y 11: Formulario con onSubmit en JSX --- */}
        <form onSubmit={handleSubmit} className="fit-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" placeholder="Ingrese su nombre" required />
          </div>

          <div className="form-group">
            <label htmlFor="tipoActividad">Tipo de actividad:</label>
            <select id="tipoActividad" name="tipoActividad" defaultValue="cardio">
              <option value="cardio">Cardio (correr, bici, etc.)</option>
              <option value="fuerza">Fuerza (pesas)</option>
              <option value="flexibilidad">Flexibilidad (yoga, estiramiento)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="duracion">Duración (minutos):</label>
            <input type="number" id="duracion" name="duracion" placeholder="Ej: 45" required />
          </div>

          <div className="form-group">
            <label htmlFor="peso">Peso corporal (kg):</label>
            <input type="number" id="peso" name="peso" placeholder="Ej: 70" required />
          </div>

          <div className="form-group">
            <label htmlFor="objetivo">Objetivo calórico diario (kcal):</label>
            <input type="number" id="objetivo" name="objetivo" placeholder="Ej: 400" required />
          </div>

          {/* --- CLASE 10: Botón submit del formulario --- */}
          <button type="submit" className="btn-submit">Registrar Entrenamiento</button>
        </form>

        {/* Muestra del último resultado registrado */}
        {ultimoResultado !== null && (
          <div className="resultado-card">
            <h3>Último Registro</h3>
            <p>Hola <strong>{ultimoResultado.nombre}</strong>, registraste un entrenamiento de <strong>{ultimoResultado.actividad}</strong>.</p>
            <p><small>Fecha y hora: {ultimoResultado.fecha}</small></p>
            <p>Duración: {ultimoResultado.duracion} min ({ultimoResultado.intensidad})</p>
            <p>Calorías quemadas estimadas: <strong>{ultimoResultado.calorias} kcal</strong></p>
            <p className="mensaje-objetivo">{ultimoResultado.mensajeObjetivo}</p>
          </div>
        )}

        {/* Historial acumulado */}
        {historial.length > 0 && (
          <div className="historial-card">
            <h3>Historial de Entrenamientos ({historial.length})</h3>
            <ul>
              {historial.map((item, idx) => (
                <li key={idx}>
                  <span>{item.fecha}</span> - <strong>{item.nombre}</strong>: {item.actividad} ({item.duracion} min) - <strong>{item.calorias} kcal</strong>
                </li>
              ))}
            </ul>
            <div className="total-global">
              Total acumulado: <strong>{totalCalorias} kcal</strong>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
