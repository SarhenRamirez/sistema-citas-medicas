import medicinaGeneral from "../assets/fotos/medicina-general.jpg";
import pediatria from "../assets/fotos/pediatria.jpg";
import cardiologia from "../assets/fotos/cardiologia.jpg";
import dermatologia from "../assets/fotos/dermatologia.jpg";
import ginecologia from "../assets/fotos/ginecologia.jpg";
import odontologia from "../assets/fotos/odontologia.jpg";
import oftalmologia from "../assets/fotos/oftalmologia.jpg";
import traumatologia from "../assets/fotos/traumatologia.jpg";
import neurologia from "../assets/fotos/neurologia.jpg";
import psicologia from "../assets/fotos/psicologia.jpg";

// Especialidades que ofrece la app. Fotos de Unsplash (licencia libre). `bar` = color de acento
export const ESPECIALIDADES = [
  { nombre: "Medicina general", foto: medicinaGeneral, bar: "bg-blue-500" },
  { nombre: "Pediatria", foto: pediatria, bar: "bg-emerald-500" },
  { nombre: "Cardiologia", foto: cardiologia, bar: "bg-rose-500" },
  { nombre: "Dermatologia", foto: dermatologia, bar: "bg-amber-500" },
  { nombre: "Ginecologia", foto: ginecologia, bar: "bg-purple-500" },
  { nombre: "Odontologia", foto: odontologia, bar: "bg-sky-500" },
  { nombre: "Oftalmologia", foto: oftalmologia, bar: "bg-indigo-500" },
  { nombre: "Traumatologia", foto: traumatologia, bar: "bg-orange-500" },
  { nombre: "Neurologia", foto: neurologia, bar: "bg-pink-500" },
  { nombre: "Psicologia", foto: psicologia, bar: "bg-teal-500" },
];

export const especialidadInfo = (nombre) =>
  ESPECIALIDADES.find((e) => e.nombre.toLowerCase() === nombre?.toLowerCase()) ?? ESPECIALIDADES[0];
