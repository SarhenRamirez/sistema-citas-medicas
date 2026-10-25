// Fecha local de hoy en formato YYYY-MM-DD (comparable como string con turno.date)
export const hoyISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export const esPasado = (fecha) => fecha < hoyISO();

// "2026-10-27" -> "martes, 27 de octubre de 2026"
export const formatearFecha = (fecha) => {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  const texto = new Date(anio, mes - 1, dia).toLocaleDateString("es-CO", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};
