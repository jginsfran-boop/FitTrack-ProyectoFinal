// --- Utilidades para el seguimiento de peso corporal ---
// Cada registro tiene la forma: { fecha: "dd/mm/aaaa", pesoKg: number }

// Diferencia entre el primer y el último registro (positivo = subió, negativo = bajó)
export function calcularVariacionPeso(historialPeso) {
  if (historialPeso.length < 2) return 0;

  // --- Desestructuración con renombre de propiedad ---
  const { pesoKg: pesoInicial } = historialPeso[0];
  const { pesoKg: pesoActual } = historialPeso[historialPeso.length - 1];

  return Math.round((pesoActual - pesoInicial) * 10) / 10;
}

// Último peso registrado (o null si todavía no hay ninguno)
export function obtenerUltimoPeso(historialPeso) {
  if (historialPeso.length === 0) return null;
  return historialPeso[historialPeso.length - 1];
}

// Genera un porcentaje (0-100) por registro, para dibujar las barras del gráfico.
// Se escala entre el mínimo y el máximo del historial (no desde 0) porque el
// peso corporal varía en un rango chico y así se nota mejor la evolución.
export function generarPorcentajesPeso(historialPeso) {
  if (historialPeso.length === 0) return [];

  const pesos = historialPeso.map((registro) => registro.pesoKg);
  // --- CLASE 14: Operador Spread (...) para descomponer el arreglo y pasarlo como argumentos ---
  const minimo = Math.min(...pesos);
  const maximo = Math.max(...pesos);

  if (minimo === maximo) {
    return pesos.map(() => 50); // todos iguales -> barras a media altura
  }

  return pesos.map((valor) => Math.round(((valor - minimo) / (maximo - minimo)) * 100));
}

// --- CLASE 14: Equivalente inmutable del método pop() para quitar el último registro ---
export function quitarUltimoRegistroPeso(historialPeso) {
  return historialPeso.slice(0, -1);
}
