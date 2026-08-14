// --- CLASE 8: Programación Orientada a Objetos (POO) ---
// --- CLASE 13: Se extrae la clase a su propio archivo para modularizar el código
//               (mismo espíritu de "dividir la interfaz/lógica para reutilizar código") ---
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
    if (this.calorias >= this.objetivo) {
      return "¡Objetivo alcanzado!";
    } else {
      const faltante = Math.round(this.objetivo - this.calorias);
      return `Aún te faltan ${faltante} kcal para tu objetivo.`;
    }
  }
}

export default EntrenamientoModel;
