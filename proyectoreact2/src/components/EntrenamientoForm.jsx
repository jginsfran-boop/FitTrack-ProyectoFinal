import { useState } from 'react';

// --- CLASE 13: Concepto de Componentes ---
// EntrenamientoForm es un componente hijo: recibe "onRegistrar" por props,
// una función que le pasa App (el padre) para poder comunicarle los datos
// del formulario sin que el hijo necesite conocer el resto de la app.
function EntrenamientoForm({ onRegistrar }) {
  const [error, setError] = useState("");

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

      {error !== "" && <p className="form-error">{error}</p>}

      <button type="submit" className="btn-submit">Registrar Entrenamiento</button>
    </form>
  );
}

export default EntrenamientoForm;
