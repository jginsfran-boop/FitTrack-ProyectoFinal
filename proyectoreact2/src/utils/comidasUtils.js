// Fórmula estándar de kcal por gramo de macronutriente
const KCAL_POR_PROTEINA = 4;
const KCAL_POR_CARBOHIDRATO = 4;
const KCAL_POR_GRASA = 9;

// Calcula las calorías totales de una comida a partir de sus macros
export function calcularCaloriasDeMacros(proteinas, carbohidratos, grasas) {
  const calorias =
    proteinas * KCAL_POR_PROTEINA +
    carbohidratos * KCAL_POR_CARBOHIDRATO +
    grasas * KCAL_POR_GRASA;
  return Math.round(calorias);
}

// Suma los macros de todas las comidas registradas usando reduce()
export function calcularTotalesMacros(historialComidas) {
  return historialComidas.reduce(
    (totales, comida) => {
      totales.proteinas += comida.proteinas;
      totales.carbohidratos += comida.carbohidratos;
      totales.grasas += comida.grasas;
      totales.fibra += comida.fibra;
      totales.calorias += comida.calorias;
      return totales;
    },
    { proteinas: 0, carbohidratos: 0, grasas: 0, fibra: 0, calorias: 0 }
  );
}

// Calcula qué porcentaje del total de calorías aporta cada macro
export function calcularPorcentajesMacros(totales) {
  const kcalProteinas = totales.proteinas * KCAL_POR_PROTEINA;
  const kcalCarbohidratos = totales.carbohidratos * KCAL_POR_CARBOHIDRATO;
  const kcalGrasas = totales.grasas * KCAL_POR_GRASA;
  const totalKcal = kcalProteinas + kcalCarbohidratos + kcalGrasas;

  if (totalKcal === 0) {
    return { proteinas: 0, carbohidratos: 0, grasas: 0 };
  }

  return {
    proteinas: Math.round((kcalProteinas / totalKcal) * 100),
    carbohidratos: Math.round((kcalCarbohidratos / totalKcal) * 100),
    grasas: Math.round((kcalGrasas / totalKcal) * 100),
  };
}
