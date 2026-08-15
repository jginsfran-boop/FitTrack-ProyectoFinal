// --- CLASE 12: Objeto Map ---
// Un Map asocia una clave (el tipo de actividad) a un valor (sus datos de
// intensidad), igual que un diccionario. A diferencia de un objeto literal,
// mantiene el orden de inserción y se puede recorrer directamente con for...of.
// Reemplaza al "switch" que se usaba antes en EntrenamientoModel.
const metasActividad = new Map([
  ["cardio", { met: 8, etiqueta: "Cardio (correr, bici, etc.)" }],
  ["fuerza", { met: 6, etiqueta: "Fuerza (pesas)" }],
  ["flexibilidad", { met: 3, etiqueta: "Flexibilidad (yoga, estiramiento)" }],
]);

// Devuelve el valor MET de una actividad (1 si no está cargada en el Map)
export function obtenerMetPorActividad(actividad) {
  // --- CLASE 12: has() comprueba si la clave existe en el Map ---
  if (!metasActividad.has(actividad)) {
    return 1;
  }

  // --- CLASE 12: get() obtiene el valor asociado a una clave ---
  // --- CLASE 12: Desestructuración de objeto para extraer "met" directamente ---
  const { met } = metasActividad.get(actividad);
  return met;
}

// Arma las opciones del <select> del formulario a partir del Map
export function obtenerOpcionesActividad() {
  const opciones = [];

  // --- CLASE 12: for...of para recorrer las entradas [clave, valor] del Map ---
  for (const [clave, datos] of metasActividad.entries()) {
    const { etiqueta } = datos; // --- CLASE 12: Desestructuración ---
    opciones.push({ valor: clave, etiqueta });
  }

  return opciones;
}

// Arma un listado de texto "actividad: MET x" para mostrar como referencia
export function obtenerTablaMet() {
  const filas = [];

  // --- CLASE 12: forEach() del Map recibe (valor, clave) ---
  metasActividad.forEach((datos, clave) => {
    // --- CLASE 12: Plantillas de cadenas (Template Strings) ---
    filas.push(`${clave}: MET ${datos.met}`);
  });

  return filas;
}

export default metasActividad;
