import { useState } from 'react';
import { obtenerOpcionesActividad, obtenerTablaMet } from '../utils/metasActividad';

// --- CLASE 13: Concepto de Componentes ---
// EntrenamientoForm es un componente hijo: recibe "onRegistrar" por props,
// una función que le pasa App (el padre) para poder comunicarle los datos
// del formulario sin que el hijo necesite conocer el resto de la app.
function EntrenamientoForm({ onRegistrar }) {
  const [error, setError] = useState("");

  // --- CLASE 12: Hook useState ---
  // useState devuelve un arreglo [valor, funciónParaActualizarlo] que se
  // extrae con desestructuración de arreglos: "mostrarInfoMet" guarda el
  // valor actual (true/false) y "setMostrarInfoMet" lo actualiza y hace que
  // React vuelva a renderizar el componente.
  const [mostrarInfoMet, setMostrarInfoMet] = useState(false);

  // --- CLASE 12: las opciones del <select> salen del Map en vez de estar
  //               escritas a mano en el JSX ---
  const opcionesActividad = obtenerOpcionesActividad();
  const tablaMet = obtenerTablaMet();

  const handleSubmit = (e) => {
    // --- CLASE 10: Prevenir la recarga por defecto del formulario ---
    e.preventDefault();
    setError("");

    const nombreRaw = e.target.nombre.value;
    const actividad = e.target.tipoActividad.value;
    const duracion = e.target.duracion.value;
    const peso = e.target.peso.value;
    const objetivo = e.target.objetivo.value;

    // --- CLASE 13: every() para validar que TODOS los campos cumplan su condición ---
    const campos = [
      nombreRaw.trim() !== "",
      duracion && Number(duracion) > 0,
      peso && Number(peso) > 0,
      objetivo && Number(objetivo) > 0,
    ];
    const formularioValido = campos.every((esValido) => Boolean(esValido));

    if (!formularioValido) {
      setError("Por favor ingrese valores válidos mayores a 0 en todos los campos.");
      return;
    }

    // --- CLASE 7: Formateo de String ---
    const nombre = nombreRaw.charAt(0).toUpperCase() + nombreRaw.substring(1).toLowerCase();

    // --- CLASE 13: Props avanzadas -> el hijo envía un objeto completo al padre ---
    onRegistrar({ nombre, actividad, duracion, peso, objetivo });

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="fit-form">
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" placeholder="Ingrese su nombre" required />
      </div>

      <div className="form-group">
        <label htmlFor="tipoActividad">Tipo de actividad:</label>
        <select id="tipoActividad" name="tipoActividad" defaultValue="cardio">
          {/* --- CLASE 12: map() + desestructuración para generar las <option> desde el Map --- */}
          {opcionesActividad.map(({ valor, etiqueta }) => (
            <option key={valor} value={valor}>{etiqueta}</option>
          ))}
        </select>

        <button
          type="button"
          className="btn-info-met"
          // --- CLASE 12: la función de actualización de useState puede recibir
          //               el valor previo para invertirlo de forma segura ---
          onClick={() => setMostrarInfoMet((valorPrevio) => !valorPrevio)}
        >
          {/* --- CLASE 12: Template String para armar el texto del botón dinámicamente --- */}
          {`${mostrarInfoMet ? "Ocultar" : "Ver"} tabla de intensidad (MET)`}
        </button>

        {mostrarInfoMet && (
          <ul className="tabla-met">
            {tablaMet.map((fila) => (
              <li key={fila}>{fila}</li>
            ))}
          </ul>
        )}
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

      {error !== "" && <p className="form-error">{error}</p>}

      <button type="submit" className="btn-submit">Registrar Entrenamiento</button>
    </form>
  );
}

export default EntrenamientoForm;
