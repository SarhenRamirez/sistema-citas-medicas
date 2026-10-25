import { motion } from "framer-motion";
import { CalendarDays, Clock, XCircle } from "lucide-react";
import { formatearFecha, hoyISO } from "../helpers/fechas";
import { especialidadInfo } from "../helpers/especialidades";

const ESTADOS = {
  proximo: { label: "Agendado", clase: "bg-emerald-50 text-emerald-600 ring-emerald-200" },
  hoy: { label: "Hoy", clase: "bg-blue-50 text-blue-600 ring-blue-200" },
  finalizado: { label: "Finalizado", clase: "bg-slate-100 text-slate-500 ring-slate-200" },
  cancelado: { label: "Cancelado", clase: "bg-rose-50 text-rose-500 ring-rose-200" },
};

const estadoDe = (turno) => {
  if (turno.status === "cancelled") return "cancelado";
  const hoy = hoyISO();
  if (turno.date < hoy) return "finalizado";
  if (turno.date === hoy) return "hoy";
  return "proximo";
};

export default function Card({ turno, onCancelar }) {
  const estado = estadoDe(turno);
  const badge = ESTADOS[estado];
  const destacado = estado === "proximo" || estado === "hoy";
  // El backend solo permite cancelar hasta el dia anterior
  const puedeCancelar = estado === "proximo" && onCancelar;
  const esp = especialidadInfo(turno.specialty);

  return (
    <motion.div
      layout
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      whileHover={destacado ? { y: -4 } : undefined}
      className={`group relative overflow-hidden rounded-2xl border p-6 transition-shadow ${
        destacado
          ? "border-slate-200 bg-white shadow-sm hover:shadow-lg"
          : "border-slate-200/70 bg-slate-50/80"
      }`}
    >
      {destacado && <div className={`absolute inset-x-0 top-0 h-1 ${esp.bar}`} />}

      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={esp.foto}
            alt=""
            className={`h-12 w-12 shrink-0 rounded-xl object-cover ${destacado ? "" : "opacity-50 grayscale"}`}
          />
          <div>
            <p className={`font-bold ${destacado ? "text-slate-900" : "text-slate-500"}`}>{turno.specialty}</p>
            <p className="text-xs font-medium text-slate-400">Turno #{turno.id}</p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${badge.clase}`}>
          {badge.label}
        </span>
      </div>

      <div className={`space-y-2 text-sm ${destacado ? "text-slate-700" : "text-slate-500"}`}>
        <p className="flex items-center gap-2.5 font-medium">
          <CalendarDays size={16} className={destacado ? "text-blue-600" : "text-slate-400"} />
          {formatearFecha(turno.date)}
        </p>
        <p className="flex items-center gap-2.5 font-medium">
          <Clock size={16} className={destacado ? "text-blue-600" : "text-slate-400"} />
          {turno.time} hs
        </p>
      </div>

      {puedeCancelar && (
        <button
          onClick={() => onCancelar(turno.id)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 py-2.5 text-sm font-semibold text-rose-500 transition-colors hover:bg-rose-50"
        >
          <XCircle size={16} /> Cancelar cita
        </button>
      )}
    </motion.div>
  );
}
