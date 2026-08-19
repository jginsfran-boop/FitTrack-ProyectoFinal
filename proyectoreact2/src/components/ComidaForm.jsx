import { useState } from 'react';
import { calcularCaloriasDeMacros } from '../utils/comidasUtils';

// Componente hijo: recibe "onRegistrar" por props, mismo patrón que RegistroPesoForm
function ComidaForm({ onRegistrar }) {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const nombreRaw = e.target.nombre.value;
    const proteinas = e.target.proteinas.value;
    const carbohidratos = e.target.carbohidratos.value;
    const grasas = e.target.grasas.value;
    const fibra = e.target.fibra.value;

    const camposValidos = [
      nombreRaw.trim() !== "",
      proteinas !== "" && Number(proteinas) >= 0,
      carbohidratos !== "" && Number(carbohidratos) >= 0,
      grasas !== "" && Number(grasas) >= 0,
      fibra !== "" && Number(fibra) >= 0,
    ].every((esValido) => Boolean(esValido));

    if (!camposValidos) {
      setError("Por favor ingrese valores válidos (0 o más) en todos los campos.");
      return;
    }

    const nombre = nombreRaw.charAt(0).toUpperCase() + nombreRaw.substring(1).toLowerCase();
    const proteinasNum = Number(proteinas);
    const carbohidratosNum = Number(carbohidratos);
    const grasasNum = Number(grasas);
    const fibraNum = Number(fibra);

    const calorias = calcularCaloriasDeMacros(proteinasNum, carbohidratosNum, grasasNum);

    onRegistrar({
      nombre,
      proteinas: proteinasNum,
      carbohidratos: carbohidratosNum,
      grasas: grasasNum,
      fibra: fibraNum,
      calorias,
      fecha: new Date().toLocaleString(),
    });

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="fit-form comida-form">
      <div className="form-group">
        <label htmlFor="nombreComida">Alimento:</label>
        <input type="text" id="nombreComida" name="nombre" placeholder="Ej: Pechuga de pollo, ensalada de lechuga con pasta, etc..." required />
      </div>

      <div className="form-group">
        <label htmlFor="proteinas">Proteínas (g):</label>
        <input type="number" id="proteinas" name="proteinas" step="0.1" placeholder="Ej: 25" required />
      </div>

      <div className="form-group">
        <label htmlFor="carbohidratos">Carbohidratos (g):</label>
        <input type="number" id="carbohidratos" name="carbohidratos" step="0.1" placeholder="Ej: 10" required />
      </div>

      <div className="form-group">
        <label htmlFor="grasas">Grasas (g):</label>
        <input type="number" id="grasas" name="grasas" step="0.1" placeholder="Ej: 5" required />
      </div>

      <div className="form-group">
        <label htmlFor="fibra">Fibra (g):</label>
        <input type="number" id="fibra" name="fibra" step="0.1" placeholder="Ej: 3" required />
      </div>

      {error !== "" && <p className="form-error">{error}</p>}

      <button type="submit" className="btn-submit btn-comida">Registrar Comida</button>
    </form>
  );
}

export default ComidaForm;
