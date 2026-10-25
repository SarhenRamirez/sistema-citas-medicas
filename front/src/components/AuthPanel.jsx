import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import fotoPanel from "../assets/fotos/auth-panel.jpg";
import fotoCardiologia from "../assets/fotos/cardiologia.jpg";

// Panel con foto a la izquierda en Login y Registro (oculto en celulares)
export default function AuthPanel({ titulo, texto }) {
  return (
    <div className="auth-panel relative w-[45%] flex-col justify-between overflow-hidden p-10">
      <img src={fotoPanel} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

      <NavLink to="/" className="relative flex w-fit items-center gap-3 rounded-2xl bg-white/95 py-2 pl-2 pr-4 shadow-md">
        <img src={logo} alt="" className="h-9 w-9 object-contain" />
        <span className="text-lg font-extrabold text-slate-900">MediTom</span>
      </NavLink>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-md rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur"
      >
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900">{titulo}</h2>
        <p className="mt-3 leading-relaxed text-slate-600">{texto}</p>

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <img src={fotoCardiologia} alt="" className="h-11 w-11 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900">Cardiologia</p>
            <p className="text-xs text-slate-500">Miercoles · 14:20</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">Confirmado</span>
        </div>
      </motion.div>
    </div>
  );
}
