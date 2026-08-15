import { obtenerMetPorActividad } from '../utils/metasActividad';

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
    // --- CLASE 12: Objeto Map ---
    // Antes esto era un switch (Clase 4); ahora se resuelve consultando el
    // Map "metasActividad" con get()/has(), definido en utils/metasActividad.js.
    return obtenerMetPorActividad(this.actividad);
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
