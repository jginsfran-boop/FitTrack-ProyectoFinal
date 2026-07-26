// --- CLASE 4: Acumulador global ---
// Variable para llevar la suma total de calorías de todos los entrenamientos
let totalCaloriasGlobal = 0;

// --- CLASE 5: Arreglo global ---
// Arreglo para guardar el historial de entrenamientos
const historialEntrenamientos = [];

// --- CLASE 6: Funciones con parámetros y retorno ---
function obtenerMet(actividad) {
  let met;
  
  // --- CLASE 4: Switch en lugar de if/else if ---
  switch (actividad) {
    case "cardio":
      met = 8;
      break;
    case "fuerza":
      met = 6;
      break;
    case "flexibilidad":
      met = 3;
      break;
    default:
      met = 1;
      break;
  }
  
  return met;
}

// --- CLASE 6: Funciones con parámetros y retorno ---
function calcularCalorias(met, peso, duracion) {
  const calorias = met * peso * (duracion / 60);
  
  // --- CLASE 7: Objeto Math ---
  // Uso de Math.round para redondear eliminando decimales
  return Math.round(calorias);
}

// --- CLASE 6: Modularización ---
// Función encargada exclusivamente de actualizar el HTML del historial
function mostrarHistorial() {
  const contenedor = document.getElementById('historial-container');
  contenedor.style.display = 'block';
  
  let html = "<h3>Historial de Entrenamientos</h3><ul>";
  
  // --- CLASE 5: Bucle for clásico ---
  // Recorre el arreglo y lo imprime
  for (let i = 0; i < historialEntrenamientos.length; i++) {
    const item = historialEntrenamientos[i];
    html += `<li>${item.fecha} - ${item.nombre}: ${item.actividad} (${item.duracion} min) - ${item.calorias} kcal</li>`;
  }
  
  html += "</ul>";
  html += `<p><strong>Total acumulado (todas las sesiones): ${totalCaloriasGlobal} kcal</strong></p>`;
  
  contenedor.innerHTML = html;
}

// Función principal vinculada al botón
function registrarEntrenamiento() {
  const nombreInput = document.getElementById('nombre').value;
  const tipoActividad = document.getElementById('tipoActividad').value;
  const duracion = parseInt(document.getElementById('duracion').value);
  const peso = parseFloat(document.getElementById('peso').value);
  const objetivo = parseFloat(document.getElementById('objetivo').value);

  // --- CLASE 4: Operadores lógicos (||) ---
  // Validación de campos vacíos o inválidos antes de procesar
  if (nombreInput === "" || isNaN(duracion) || duracion <= 0 || isNaN(peso) || peso <= 0 || isNaN(objetivo) || objetivo <= 0) {
    alert("Por favor, complete todos los campos con valores válidos mayores a cero.");
    return;
  }

  // --- CLASE 7: Objeto String ---
  // Métodos .charAt(), .toUpperCase(), .substring() y .toLowerCase() para capitalizar
  const nombreCapitalizado = nombreInput.charAt(0).toUpperCase() + nombreInput.substring(1).toLowerCase();

  // --- CLASE 6: Llamadas a las funciones modulares ---
  const met = obtenerMet(tipoActividad);
  const calorias = calcularCalorias(met, peso, duracion);

  // --- CLASE 4: Acumulador global ---
  totalCaloriasGlobal += calorias;

  // Clasificar la duración del entrenamiento
  let intensidad;
  if (duracion >= 60) {
    intensidad = "Entrenamiento largo";
  } else if (duracion >= 30) {
    intensidad = "Entrenamiento moderado";
  } else {
    intensidad = "Entrenamiento corto";
  }

  // Verificar si alcanzó el objetivo diario
  let mensajeObjetivo;
  if (calorias >= objetivo) {
    mensajeObjetivo = "¡Objetivo alcanzado!";
  } else {
    // --- CLASE 7: Objeto Math ---
    // Uso de Math.round para no mostrar decimales largos
    const faltante = Math.round(objetivo - calorias);
    mensajeObjetivo = `Aún te faltan ${faltante} kcal para tu objetivo.`;
  }

  // --- CLASE 7: Objeto Date ---
  // Instancia de new Date() para obtener la fecha y hora exacta del registro
  const fechaActual = new Date();
  const fechaFormateada = fechaActual.toLocaleString();

  // Construcción del mensaje final para el usuario
  const mensaje =
    `Hola ${nombreCapitalizado}, registraste un entrenamiento de ${tipoActividad}.\n` +
    `Fecha y hora del registro: ${fechaFormateada}\n` +
    `Duración: ${duracion} min (${intensidad})\n` +
    `Calorías quemadas estimadas: ${calorias} kcal\n` +
    `${mensajeObjetivo}`;

  document.getElementById('resultado').textContent = mensaje;

  // --- CLASE 5: Agregar al arreglo global ---
  historialEntrenamientos.push({
    nombre: nombreCapitalizado,
    actividad: tipoActividad,
    duracion: duracion,
    calorias: calorias,
    fecha: fechaFormateada
  });

  // --- CLASE 6: Llamada a función para mostrar historial ---
  mostrarHistorial();
}
