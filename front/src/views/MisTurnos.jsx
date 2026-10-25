import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTurnos } from "../context/TurnosContext";
import { useUser } from "../context/UserContext";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Swal from "sweetalert2";
import { CalendarDays, Clock, CalendarPlus, ArrowRight, CalendarHeart } from "lucide-react";
import { esPasado, formatearFecha } from "../helpers/fechas";

const ordenar = (a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`);

const grilla = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function Grilla({ children }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={grilla} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {children}
    </motion.div>
  );
}

export default function MisTurnos() {
  const { turnos, cancelarTurno, cargarTurnos, loading, error } = useTurnos();
  const { user } = useUser();

  const proximos = turnos
    .filter((t) => t.status === "active" && !esPasado(t.date))
    .sort(ordenar);
  const historial = turnos
    .filter((t) => t.status === "cancelled" || esPasado(t.date))
    .sort((a, b) => ordenar(b, a));
  const siguiente = proximos[0];

  const handleCancelar = (id) => {
    Swal.fire({
      title: "¿Cancelar cita?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, volver",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await cancelarTurno(id);
        if (res.ok) {
          Swal.fire({ icon: "success", title: "Cita cancelada", timer: 2000, showConfirmButton: false });
        } else {
          Swal.fire({ icon: "error", title: "Error", text: res.message });
        }
      }
    });
  };

  if (loading && turnos.length === 0) return <Loader text="Cargando tus turnos..." />;
  if (error) {
    return (
      <div className="mt-8 text-center">
        <p className="mb-4 text-rose-500">{error}</p>
        <button onClick={cargarTurnos} className="rounded-xl border border-slate-200 bg-white px-5 py-2 font-semibold hover:bg-slate-50">
          Reintentar
        </button>
      </div>
    );
  }

  const primerNombre = user?.name?.split(" ")[0];

  return (
    <section className="mx-auto max-w-5xl">

      {/* Banner de bienvenida */}
      <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Bienvenido de vuelta</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Hola, {primerNombre} 👋</h1>
            <p className="mt-2 text-slate-500">
              {proximos.length === 0
                ? "No tienes citas proximas. ¡Agenda la primera!"
                : `Tienes ${proximos.length} ${proximos.length === 1 ? "cita proxima" : "citas proximas"}`}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {siguiente && (
              <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
                  <CalendarHeart size={14} /> Proxima cita
                </p>
                <p className="mt-1 font-semibold text-slate-900">{siguiente.specialty}</p>
                <p className="text-sm text-slate-500">{formatearFecha(siguiente.date)} · {siguiente.time}</p>
              </div>
            )}
            <NavLink
              to="/nuevo-turno"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white transition-colors hover:bg-blue-700"
            >
              <CalendarPlus size={18} /> Solicitar turno
            </NavLink>
          </div>
        </div>
      </div>

      {/* Proximos */}
      <div className="mb-12">
        <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
          <CalendarDays size={20} className="text-blue-600" /> Proximas citas
          {proximos.length > 0 && <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600">{proximos.length}</span>}
        </h2>

        {proximos.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-white px-6 py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <CalendarPlus size={26} />
            </div>
            <p className="font-semibold text-slate-700">No tienes citas activas actualmente</p>
            <NavLink to="/nuevo-turno" className="group mt-3 inline-flex items-center gap-1.5 font-bold text-blue-600">
              Agenda tu primera cita <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </NavLink>
          </div>
        ) : (
          <Grilla>
            {proximos.map((turno) => (
              <Card key={turno.id} turno={turno} onCancelar={handleCancelar} />
            ))}
          </Grilla>
        )}
      </div>

      {/* Historial */}
      <div>
        <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
          <Clock size={20} className="text-slate-400" /> Historial
        </h2>

        {historial.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center text-slate-400">
            Aun no tienes citas pasadas o canceladas.
          </div>
        ) : (
          <Grilla>
            {historial.map((turno) => (
              <Card key={turno.id} turno={turno} />
            ))}
          </Grilla>
        )}
      </div>
    </section>
  );
}
