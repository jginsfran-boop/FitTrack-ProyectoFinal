// --- CLASE 4: Acumulador global ---
let totalCaloriasGlobal = 0;

// --- CLASE 5: Arreglo global ---
const historialEntrenamientos = [];

// --- CLASE 8: Programación Orientada a Objetos (POO) ---
class Entrenamiento {
  constructor(nombre, actividad, duracion, peso, objetivo) {
    this.nombre = nombre;
    this.actividad = actividad;
    this.duracion = duracion;
    this.peso = peso;
    this.objetivo = objetivo;

    // --- CLASE 7: Objeto Date ---
    this.fecha = new Date().toLocaleString();

    // Métodos ejecutados al instanciar
    this.met = this.obtenerMet();
    this.calorias = this.calcularCalorias();
    this.intensidad = this.obtenerIntensidad();
    this.mensajeObjetivo = this.evaluarObjetivo();
  }

  // Método para obtener valor MET
  obtenerMet() {
    let met;
    // --- CLASE 4: Switch ---
    switch (this.actividad) {
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

  // Método para calcular calorías quemadas
  calcularCalorias() {
    const calorias = this.met * this.peso * (this.duracion / 60);
    // --- CLASE 7: Objeto Math ---
    return Math.round(calorias);
  }

  // Método para determinar intensidad
  obtenerIntensidad() {
    if (this.duracion >= 60) {
      return "Entrenamiento largo";
    } else if (this.duracion >= 30) {
      return "Entrenamiento moderado";
    } else {
      return "Entrenamiento corto";
    }
  }

  // Método para evaluar si se alcanzó el objetivo diario
  evaluarObjetivo() {
    if (this.calorias >= this.objetivo) {
      return "¡Objetivo alcanzado!";
    } else {
      const faltante = Math.round(this.objetivo - this.calorias);
      return `Aún te faltan ${faltante} kcal para tu objetivo.`;
    }
  }
}

// --- CLASE 6: Modularización ---
function mostrarHistorial() {
  const contenedor = document.getElementById('historial-container');
  contenedor.style.display = 'block';
  
  let html = "<h3>Historial de Entrenamientos</h3><ul>";
  
  // --- CLASE 5: Bucle for clásico ---
  for (let i = 0; i < historialEntrenamientos.length; i++) {
    const item = historialEntrenamientos[i];
    html += `<li>${item.fecha} - ${item.nombre}: ${item.actividad} (${item.duracion} min) - ${item.calorias} kcal</li>`;
  }
  
  html += "</ul>";
  html += `<p><strong>Total acumulado (todas las sesiones): ${totalCaloriasGlobal} kcal</strong></p>`;
  
  contenedor.innerHTML = html;
}

// --- CLASE 10: Parámetro del evento (evt) en la función registradora ---
function registrarEntrenamiento(evt) {
  // --- CLASE 10: Evitar la recarga de página al enviar el formulario ---
  evt.preventDefault();

  const nombreInput = document.getElementById('nombre').value;
  const tipoActividad = document.getElementById('tipoActividad').value;
  const duracion = parseInt(document.getElementById('duracion').value, 10);
  const peso = parseFloat(document.getElementById('peso').value);
  const objetivo = parseFloat(document.getElementById('objetivo').value);

  // --- CLASE 11: Operadores de comparación e igualdad estricta (===, !==) ---
  if (nombreInput.trim() === "" || isNaN(duracion) || duracion <= 0 || isNaN(peso) || peso <= 0 || isNaN(objetivo) || objetivo <= 0) {
    alert("Por favor, complete todos los campos con valores válidos mayores a cero.");
    return;
  }

  // --- CLASE 7: Objeto String ---
  const nombreCapitalizado = nombreInput.charAt(0).toUpperCase() + nombreInput.substring(1).toLowerCase();

  // --- CLASE 8: Instanciación de objeto de la clase Entrenamiento (POO) ---
  const entrenamiento = new Entrenamiento(nombreCapitalizado, tipoActividad, duracion, peso, objetivo);

  // --- CLASE 4: Acumulador global ---
  totalCaloriasGlobal += entrenamiento.calorias;

  // Construcción del mensaje final para el usuario
  const mensaje =
    `Hola ${entrenamiento.nombre}, registraste un entrenamiento de ${entrenamiento.actividad}.\n` +
    `Fecha y hora del registro: ${entrenamiento.fecha}\n` +
    `Duración: ${entrenamiento.duracion} min (${entrenamiento.intensidad})\n` +
    `Calorías quemadas estimadas: ${entrenamiento.calorias} kcal\n` +
    `${entrenamiento.mensajeObjetivo}`;

  document.getElementById('resultado').textContent = mensaje;

  // --- CLASE 5: Agregar al arreglo global ---
  historialEntrenamientos.push(entrenamiento);

  // --- CLASE 6: Llamada a función para mostrar historial ---
  mostrarHistorial();
}

// --- CLASE 10: Evento DOMContentLoaded para inicializar llamadas ---
window.addEventListener('DOMContentLoaded', inicio);

// --- CLASE 8 y 10: Modelo de eventos W3C (addEventListener) asociando el submit del formulario ---
function inicio() {
  const formulario = document.getElementById('formEntrenamiento');
  if (formulario) {
    formulario.addEventListener('submit', registrarEntrenamiento);
  }
}
