import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const SECCIONES = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#preguntas", label: "Preguntas" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAuthPage) return null;

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
        <NavLink to="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white transition-transform group-hover:scale-105">
            <img src={logo} alt="" className="h-9 w-9 object-contain" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">MediTom</span>
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {SECCIONES.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <NavLink
            to="/login"
            aria-label="Iniciar sesion"
            className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:px-4"
          >
            <LogIn size={16} />
            <span className="nav-label">Iniciar sesion</span>
          </NavLink>
          <NavLink
            to="/register"
            aria-label="Registrarse"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-3.5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700 sm:px-5"
          >
            <UserPlus size={16} />
            <span className="nav-label">Registrarse</span>
          </NavLink>
        </div>
      </nav>
    </motion.header>
  );
}
