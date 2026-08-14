// --- CLASE 13: Métodos de Arreglos ---
// Funciones puras que reciben el historial de entrenamientos y devuelven
// datos derivados, usando los métodos de arreglos vistos en la Clase 13.

// Actividades distintas que se registraron (sin repetir)
export function obtenerActividadesUnicas(historial) {
  // --- CLASE 13: Array.from() para convertir un Set (sin duplicados) en un arreglo ---
  return Array.from(new Set(historial.map((item) => item.actividad)));
}

// Cantidad de sesiones registradas por cada tipo de actividad
export function contarPorActividad(historial) {
  // --- CLASE 13: reduce() para acumular resultados en un objeto ---
  return historial.reduce((acumulador, item) => {
    acumulador[item.actividad] = (acumulador[item.actividad] || 0) + 1;
    return acumulador;
  }, {});
}

// Suma total de calorías quemadas en todas las sesiones
export function calcularTotalCalorias(historial) {
  // --- CLASE 13: reduce() para obtener un único valor acumulado ---
  return historial.reduce((total, item) => total + item.calorias, 0);
}

// Promedio de calorías quemadas por sesión
export function calcularPromedioCalorias(historial) {
  if (historial.length === 0) return 0;
  return Math.round(calcularTotalCalorias(historial) / historial.length);
}

// Entrenamiento con mayor cantidad de calorías quemadas
export function obtenerEntrenamientoMasIntenso(historial) {
  if (historial.length === 0) return null;
  // --- CLASE 13: reduceRight() recorre el arreglo de derecha a izquierda ---
  return historial.reduceRight((masIntenso, item) =>
    item.calorias > masIntenso.calorias ? item : masIntenso
  );
}

// ¿Todas las sesiones alcanzaron su objetivo calórico?
export function todosAlcanzaronObjetivo(historial) {
  // --- CLASE 13: every() valida que TODOS los elementos cumplan la condición ---
  return historial.length > 0 && historial.every((item) => item.calorias >= item.objetivo);
}

// ¿Se registró al menos un entrenamiento de fuerza?
export function hayEntrenamientoDeFuerza(historial) {
  // --- CLASE 13: some() valida que AL MENOS UN elemento cumpla la condición ---
  return historial.some((item) => item.actividad === "fuerza");
}

// Primer entrenamiento largo (60 min o más) que se registró
export function primerEntrenamientoLargo(historial) {
  // --- CLASE 13: find() devuelve el primer elemento que cumple la condición ---
  return historial.find((item) => item.duracion >= 60) || null;
}

// Posición del primer entrenamiento de cardio dentro del historial
export function indicePrimerCardio(historial) {
  // --- CLASE 13: findIndex() devuelve la posición del primer elemento que cumple ---
  return historial.findIndex((item) => item.actividad === "cardio");
}

// ¿El usuario ya había entrenado antes? Y si es así, ¿cuántas veces?
export function contarSesionesDeUsuario(historial, nombre) {
  const nombres = historial.map((item) => item.nombre);
  return {
    // --- CLASE 13: includes() verifica si el arreglo contiene un valor ---
    yaRegistrado: nombres.includes(nombre),
    // --- CLASE 13: indexOf() ubica la primera aparición ---
    primeraVez: nombres.indexOf(nombre),
    // --- CLASE 13: lastIndexOf() ubica la última aparición ---
    ultimaVez: nombres.lastIndexOf(nombre),
  };
}

// Filtra el historial por nombre o tipo de actividad (para el buscador)
export function filtrarHistorial(historial, textoBusqueda) {
  const texto = textoBusqueda.trim().toLowerCase();
  if (texto === "") return historial;
  // --- CLASE 13: filter() genera un nuevo arreglo según un criterio de búsqueda ---
  return historial.filter(
    (item) =>
      item.nombre.toLowerCase().includes(texto) ||
      item.actividad.toLowerCase().includes(texto)
  );
}

// Total de calorías quemadas por día de la semana (Dom=0 ... Sáb=6)
export function calcularCaloriasPorDiaSemana(historial) {
  // --- CLASE 13: fill() para inicializar un arreglo de 7 posiciones en cero ---
  const totalesPorDia = new Array(7).fill(0);

  historial.forEach((item) => {
    const diaSemana = new Date(item.fecha).getDay();
    if (!Number.isNaN(diaSemana)) {
      totalesPorDia[diaSemana] += item.calorias;
    }
  });

  return totalesPorDia;
}

// Etiquetas fijas de los días de la semana, usadas junto con calcularCaloriasPorDiaSemana()
export const DIAS_SEMANA =
  // --- CLASE 13: Array.of() crea un arreglo a partir de una lista de valores ---
  Array.of("Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb");
