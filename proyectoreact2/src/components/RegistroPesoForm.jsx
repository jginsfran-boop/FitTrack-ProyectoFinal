import { useState } from 'react';

// Componente hijo: recibe "onRegistrar" por props, igual patrón que EntrenamientoForm
function RegistroPesoForm({ onRegistrar }) {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const pesoIngresado = e.target.pesoKg.value;

    if (!pesoIngresado || Number(pesoIngresado) <= 0) {
      setError("Ingresá un peso válido mayor a 0.");
      return;
    }

    onRegistrar(Number(pesoIngresado));
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="fit-form peso-form">
      <div className="form-group">
        <label htmlFor="pesoKg">Peso de hoy (kg):</label>
        <input
          type="number"
          id="pesoKg"
          name="pesoKg"
          step="0.1"
          placeholder="Ej: 70.5"
          required
        />
      </div>

      {error !== "" && <p className="form-error">{error}</p>}

      <button type="submit" className="btn-submit btn-peso">Registrar Peso</button>
    </form>
  );
}

export default RegistroPesoForm;
