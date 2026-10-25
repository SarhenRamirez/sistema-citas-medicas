import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import heroFoto from "../../assets/fotos/hero-consulta.jpg";
import { especialidadInfo } from "../../helpers/especialidades";

const PROXIMAS = [
  { especialidad: "Medicina general", fecha: "Lun 27 oct · 09:00" },
  { especialidad: "Pediatria", fecha: "Vie 31 oct · 10:40" },
];

function Miniatura({ especialidad, size = "h-10 w-10" }) {
  const { foto } = especialidadInfo(especialidad);
  return <img src={foto} alt="" className={`${size} shrink-0 rounded-xl object-cover`} />;
}

// Foto principal con avisos flotantes; se inclina levemente siguiendo el mouse
export default function HeroVisual() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 15 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 15 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative mx-auto w-full max-w-md [perspective:1200px]"
    >
      <motion.div style={{ rotateX, rotateY }} className="relative">
        <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-300/60">
          <img
            src={heroFoto}
            alt="Paciente conversando con su medica en el consultorio"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>

        {/* Aviso: turno confirmado */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 160 }}
          className="absolute -left-4 top-10 sm:-left-12"
        >
          <div className="flex animate-float items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl shadow-slate-300/50">
            <Miniatura especialidad="Cardiologia" />
            <div>
              <p className="text-sm font-bold text-slate-900">Turno confirmado</p>
              <p className="text-xs text-slate-500">Cardiologia · Mie 14:20</p>
            </div>
            <span className="ml-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-600">✓</span>
          </div>
        </motion.div>

        {/* Aviso: proximas citas */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 160 }}
          className="absolute -bottom-8 -right-4 w-64 sm:-right-12"
        >
          <div className="animate-float-slow rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-300/50 [animation-delay:-3s]">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Tus proximas citas</p>
            <div className="space-y-3">
              {PROXIMAS.map((t) => (
                <div key={t.especialidad} className="flex items-center gap-3">
                  <Miniatura especialidad={t.especialidad} size="h-9 w-9" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{t.especialidad}</p>
                    <p className="text-xs text-slate-500">{t.fecha}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
