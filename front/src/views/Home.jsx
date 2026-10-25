import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/UserContext";
import { useIniciarSesion } from "../hooks/useIniciarSesion";
import CountUp from "../components/ui/CountUp";
import HeroVisual from "../components/home/HeroVisual";
import logo from "../assets/logo.png";
import fotoRegistro from "../assets/fotos/paso-registro.jpg";
import fotoAgenda from "../assets/fotos/paso-agenda.jpg";
import fotoConfirmacion from "../assets/fotos/paso-confirmacion.jpg";
import fotoSeguridad from "../assets/fotos/beneficio-seguridad.jpg";
import fotoCelular from "../assets/fotos/beneficio-celular.jpg";
import { ArrowRight, CheckCircle2, ChevronDown, Github } from "lucide-react";
import { ESPECIALIDADES } from "../helpers/especialidades";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const PASOS = [
  { foto: fotoRegistro, titulo: "Crea tu cuenta", texto: "Registrate con tu email en menos de un minuto. Sin papeleo ni llamadas." },
  { foto: fotoAgenda, titulo: "Elige fecha y hora", texto: "Selecciona la especialidad y el horario que mejor se adapte a tu dia." },
  { foto: fotoConfirmacion, titulo: "Recibe tu confirmacion", texto: "Tu turno queda agendado al instante y te llega la confirmacion por email." },
];

const PREGUNTAS = [
  { p: "¿Cuanto cuesta usar MediTom?", r: "Nada. Crear tu cuenta y agendar turnos es completamente gratis." },
  { p: "¿Con cuanta anticipacion puedo agendar?", r: "Puedes reservar desde el dia siguiente, de lunes a viernes, en horarios de 06:00 a 17:00 cada 20 minutos." },
  { p: "¿Puedo cancelar un turno?", r: "Si. Puedes cancelarlo desde tu panel hasta el dia anterior a la cita, con un solo clic." },
  { p: "¿Como se si mi turno quedo confirmado?", r: "Lo ves al instante en tu panel y ademas recibes un email de confirmacion. Tambien te avisamos por email si lo cancelas." },
  { p: "¿Puedo probarlo antes de registrarme?", r: "Claro. Usa el boton \"Probar demo\" y entra a una cuenta de prueba con turnos de ejemplo." },
];

const HORAS_DEMO = ["08:00", "08:20", "08:40", "09:00", "09:20", "09:40", "10:00", "10:20", "10:40"];

function SectionHeader({ etiqueta, titulo, texto }) {
  return (
    <motion.div variants={fadeUp} className="mx-auto mb-14 max-w-2xl text-center">
      <span className="text-sm font-bold uppercase tracking-widest text-blue-600">{etiqueta}</span>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{titulo}</h2>
      {texto && <p className="mt-4 text-lg text-slate-500">{texto}</p>}
    </motion.div>
  );
}

function Pregunta({ item, abierta, onToggle }) {
  return (
    <div className={`rounded-2xl border bg-white transition-colors ${abierta ? "border-blue-200" : "border-slate-200 hover:border-slate-300"}`}>
      <button
        onClick={onToggle}
        aria-expanded={abierta}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-semibold text-slate-900">{item.p}</span>
        <motion.span animate={{ rotate: abierta ? 180 : 0 }} className="shrink-0 text-slate-400">
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {abierta && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 leading-relaxed text-slate-600">{item.r}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const { user } = useUser();
  const { entrarComoDemo, loading: demoLoading, error: demoError } = useIniciarSesion();
  const [preguntaAbierta, setPreguntaAbierta] = useState(0);

  if (user) return <Navigate to="/mis-turnos" replace />;

  return (
    <div className="overflow-hidden bg-white text-slate-900">

      {/* HERO */}
      <section className="relative bg-gradient-to-b from-blue-50/70 via-white to-white">
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 pb-24 pt-32 sm:px-6 md:pt-40 lg:grid-cols-[1.05fr_1fr] lg:pb-28">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center lg:text-left">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Turnos medicos online · 24/7
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="mt-7 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Tu proxima cita medica, <span className="text-blue-600">en segundos</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0">
              Agenda, consulta y cancela tus turnos desde cualquier lugar.
              Sin llamadas, sin filas y con confirmacion inmediata en tu correo.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <NavLink
                to="/register"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg sm:w-auto"
              >
                Crear cuenta gratis
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </NavLink>
              <button
                type="button"
                onClick={entrarComoDemo}
                disabled={demoLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-4 font-bold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400 disabled:cursor-wait sm:w-auto"
              >
                {demoLoading ? "Entrando..." : "Probar demo"}
              </button>
            </motion.div>
            {demoError && <p role="alert" className="mt-4 text-sm text-rose-600">{demoError}</p>}

            <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-500 lg:justify-start">
              {["100% gratis", "Confirmacion por email", "Cancela cuando quieras"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" /> {t}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <HeroVisual />
        </div>
      </section>

      {/* CARRUSEL DE ESPECIALIDADES */}
      <section className="border-y border-slate-100 bg-white py-10">
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
          Atencion en 10 especialidades medicas
        </p>
        <div className="mask-fade-x relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
            {[...ESPECIALIDADES, ...ESPECIALIDADES].map((e, i) => (
              <div key={i} className="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-2 pl-2 pr-5">
                <img src={e.foto} alt="" className="h-8 w-8 rounded-full object-cover" />
                <span className="whitespace-nowrap text-sm font-semibold text-slate-700">{e.nombre}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CIFRAS */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
        >
          {[
            { valor: <CountUp to={10} />, label: "Especialidades" },
            { valor: <CountUp to={24} suffix="/7" />, label: "Agenda disponible" },
            { valor: <CountUp to={1} prefix="< " suffix=" min" duration={1} />, label: "Para agendar" },
            { valor: <CountUp to={100} suffix="%" />, label: "Gratuito" },
          ].map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="rounded-2xl border border-slate-200 bg-white p-6 text-center sm:p-8">
              <p className="text-4xl font-extrabold text-blue-600 sm:text-5xl">{s.valor}</p>
              <p className="mt-2 text-sm font-medium text-slate-500">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="scroll-mt-20 bg-slate-50 px-5 py-24 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mx-auto max-w-6xl">
          <SectionHeader etiqueta="Simple y rapido" titulo="Tu turno en 3 pasos" texto="Pensado para que agendar una cita sea tan facil como enviar un mensaje." />

          <div className="relative grid gap-6 md:grid-cols-3">
            {PASOS.map((paso, i) => (
              <motion.div
                key={paso.titulo}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={paso.foto} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-extrabold text-blue-600 shadow-md">
                    {i + 1}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold text-slate-900">{paso.titulo}</h3>
                  <p className="mt-3 leading-relaxed text-slate-500">{paso.texto}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="scroll-mt-20 px-5 py-24 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mx-auto max-w-6xl">
          <SectionHeader etiqueta="Beneficios" titulo="Todo lo que necesitas, nada que sobre" />

          <div className="grid gap-5 lg:grid-cols-3">
            {/* Agenda rapida */}
            <motion.div variants={fadeUp} className="rounded-2xl border border-slate-200 bg-blue-50/50 p-8 lg:col-span-2">
              <div className="grid items-center gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Agenda en menos de un minuto</h3>
                  <p className="mt-3 leading-relaxed text-slate-500">Elige especialidad, dia y horario disponible. Sin esperas en linea ni formularios eternos.</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {HORAS_DEMO.map((h, i) => (
                    <motion.span
                      key={h}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className={`rounded-lg py-2.5 text-center text-sm font-semibold ${
                        h === "09:20" ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-500"
                      }`}
                    >
                      {h}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp} className="rounded-2xl border border-slate-200 bg-emerald-50/40 p-8">
              <h3 className="text-xl font-bold text-slate-900">Avisos por email</h3>
              <p className="mt-3 leading-relaxed text-slate-500">Confirmacion al agendar y aviso al cancelar. Siempre sabes en que estado esta tu cita.</p>
              <div className="mt-6 flex animate-float items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-md">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">✓</span>
                <span className="text-sm font-semibold text-slate-700">Turno confirmado</span>
              </div>
            </motion.div>

            {/* Seguridad */}
            <motion.div variants={fadeUp} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <img src={fotoSeguridad} alt="" className="h-44 w-full object-cover" />
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900">Tus datos, protegidos</h3>
                <p className="mt-3 leading-relaxed text-slate-500">Contrasenas cifradas y sesiones seguras con JWT. Solo tu puedes ver y gestionar tus turnos.</p>
              </div>
            </motion.div>

            {/* Multi dispositivo */}
            <motion.div variants={fadeUp} className="overflow-hidden rounded-2xl border border-slate-200 bg-white lg:col-span-2">
              <div className="grid h-full sm:grid-cols-2">
                <div className="flex flex-col justify-center p-8">
                  <h3 className="text-xl font-bold text-slate-900">Desde cualquier dispositivo</h3>
                  <p className="mt-3 leading-relaxed text-slate-500">Celular, tablet o computador. La experiencia se adapta a tu pantalla para que gestiones tus citas donde estes.</p>
                </div>
                <img src={fotoCelular} alt="Mujer agendando un turno desde su celular" className="h-56 w-full object-cover sm:h-full" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ESPECIALIDADES */}
      <section id="especialidades" className="scroll-mt-20 bg-slate-50 px-5 py-24 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mx-auto max-w-6xl">
          <SectionHeader etiqueta="Cobertura" titulo="Especialidades disponibles" texto="Encuentra al profesional que necesitas y agenda en el horario que prefieras." />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {ESPECIALIDADES.map((e) => (
              <motion.div
                key={e.nombre}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-xl"
              >
                <img
                  src={e.foto}
                  alt={e.nombre}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/10 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-4 text-sm font-bold text-white sm:text-base">{e.nombre}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section id="preguntas" className="scroll-mt-20 px-5 py-24 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mx-auto max-w-3xl">
          <SectionHeader etiqueta="Preguntas frecuentes" titulo="¿Tienes dudas?" />
          <motion.div variants={fadeUp} className="space-y-3">
            {PREGUNTAS.map((item, i) => (
              <Pregunta
                key={item.p}
                item={item}
                abierta={preguntaAbierta === i}
                onToggle={() => setPreguntaAbierta(preguntaAbierta === i ? null : i)}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <section className="px-5 pb-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-6xl rounded-3xl border border-blue-100 bg-blue-50 px-6 py-16 text-center sm:px-12 sm:py-20"
        >
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Agenda tu primer turno <span className="text-blue-600">hoy mismo</span>
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              Unete a MediTom y toma el control de tus citas medicas. Es gratis y toma menos de un minuto.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <NavLink
                to="/register"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto"
              >
                Crear mi cuenta gratis
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </NavLink>
              <button
                type="button"
                onClick={entrarComoDemo}
                disabled={demoLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-4 font-bold text-slate-700 transition-all hover:border-slate-400 sm:w-auto"
              >
                Explorar la demo
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50 px-5 pb-10 pt-16 text-slate-500 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 border-b border-slate-200 pb-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                <img src={logo} alt="" className="h-9 w-9 object-contain" />
              </span>
              <span className="text-xl font-extrabold text-slate-900">MediTom</span>
            </div>
            <p className="mt-4 max-w-sm leading-relaxed">
              Gestion de turnos medicos online. Agenda, consulta y cancela tus citas en segundos, desde cualquier lugar.
            </p>
          </div>
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900">Navegacion</p>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#como-funciona" className="hover:text-slate-900">Como funciona</a></li>
              <li><a href="#especialidades" className="hover:text-slate-900">Especialidades</a></li>
              <li><a href="#preguntas" className="hover:text-slate-900">Preguntas frecuentes</a></li>
              <li><NavLink to="/login" className="hover:text-slate-900">Iniciar sesion</NavLink></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900">Proyecto</p>
            <p className="text-sm leading-relaxed">Hecho con React, Node.js, Express, TypeScript y PostgreSQL.</p>
            <a
              href="https://github.com/SarhenRamirez"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
            >
              <Github size={16} /> Ver en GitHub
            </a>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 pt-8 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} MediTom. Todos los derechos reservados.</p>
          <p>Desarrollado por <span className="font-semibold text-slate-900">Sarhen Ramirez</span></p>
        </div>
      </footer>
    </div>
  );
}
