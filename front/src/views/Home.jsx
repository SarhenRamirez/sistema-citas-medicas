import { NavLink, Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import {
  UserPlus, CalendarDays, CheckCircle,
  Clock, Shield, Smartphone,
  Stethoscope, Baby, Microscope, Pill,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  const { user } = useUser();
  if (user) return <Navigate to="/mis-turnos" replace />;

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#111827", overflow: "hidden" }}>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)", color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.15,
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px", pointerEvents: "none"
        }} />

        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto", padding: "10rem 1.5rem 6rem", textAlign: "center" }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>

            <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
              <div style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "999px", padding: "8px 20px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: 8, height: 8, background: "#4ade80", borderRadius: "50%", display: "inline-block" }} />
                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Sistema de turnos médicos</span>
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem" }}>
              Tu próxima cita médica,{" "}
              <span style={{ color: "#67e8f9" }}>en segundos</span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{ color: "#bfdbfe", fontSize: "1.2rem", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 3rem" }}>
              Agenda, gestiona y cancela tus turnos médicos desde cualquier lugar. Sin llamadas, sin filas, sin esperas.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center" }}>
              <NavLink to="/register" style={{
                padding: "16px 36px", background: "white", color: "#1d4ed8",
                fontWeight: 700, borderRadius: "14px", textDecoration: "none",
                fontSize: "1rem", boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
              }}>
                Crear cuenta gratis
              </NavLink>
            </motion.div>
          </motion.div>
        </div>

        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", position: "relative" }}>
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white" />
        </svg>
      </section>

      {/* STATS */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}
        >
          {[
            { valor: "500+", label: "Pacientes", icon: <UserPlus size={24} />, color: "#dbeafe", iconColor: "#1d4ed8" },
            { valor: "24/7", label: "Disponible", icon: <Clock size={24} />, color: "#dcfce7", iconColor: "#16a34a" },
            { valor: "< 1 min", label: "Para agendar", icon: <CalendarDays size={24} />, color: "#fef9c3", iconColor: "#ca8a04" },
            { valor: "100%", label: "Gratuito", icon: <CheckCircle size={24} />, color: "#f3e8ff", iconColor: "#9333ea" },
          ].map((s) => (
            <motion.div key={s.label} variants={fadeUp} whileHover={{ y: -4 }} style={{
              background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px",
              padding: "1.5rem", textAlign: "center", transition: "all 0.2s", cursor: "default"
            }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", color: s.iconColor }}>
                {s.icon}
              </div>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1d4ed8" }}>{s.valor}</p>
              <p style={{ fontSize: "0.875rem", color: "#64748b", marginTop: "4px" }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section style={{ background: "#f8fafc", padding: "5rem 1.5rem" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          style={{ maxWidth: "1000px", margin: "0 auto" }}
        >
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ color: "#1d4ed8", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Simple y rápido</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0f172a", marginTop: "8px" }}>¿Cómo funciona?</h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {[
              { num: "1", icon: <UserPlus size={28} />, titulo: "Crea tu cuenta", texto: "Regístrate con tu email y contraseña en menos de un minuto.", color: "#dbeafe", iconColor: "#1d4ed8" },
              { num: "2", icon: <CalendarDays size={28} />, titulo: "Elige fecha y hora", texto: "Selecciona el día y horario disponible que mejor se adapte a ti.", color: "#dcfce7", iconColor: "#16a34a" },
              { num: "3", icon: <CheckCircle size={28} />, titulo: "Listo", texto: "Tu turno queda confirmado. Puedes consultarlo o cancelarlo cuando quieras.", color: "#f3e8ff", iconColor: "#9333ea" },
            ].map((paso) => (
              <motion.div key={paso.num} variants={fadeUp} whileHover={{ y: -6 }} style={{
                background: "white", borderRadius: "20px", padding: "2rem",
                border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                position: "relative", transition: "all 0.2s"
              }}>
                <div style={{
                  position: "absolute", top: "-14px", left: "28px",
                  width: "28px", height: "28px", background: "#1d4ed8", color: "white",
                  borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "0.75rem", fontWeight: 700
                }}>{paso.num}</div>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: paso.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", marginTop: "0.5rem", color: paso.iconColor }}>
                  {paso.icon}
                </div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.75rem" }}>{paso.titulo}</h3>
                <p style={{ color: "#64748b", lineHeight: 1.6, fontSize: "0.9rem" }}>{paso.texto}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ESPECIALIDADES */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          style={{ maxWidth: "1000px", margin: "0 auto" }}
        >
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ color: "#1d4ed8", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Cobertura</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0f172a", marginTop: "8px" }}>Especialidades disponibles</h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            {[
              { nombre: "Medicina General", icon: <Stethoscope size={32} />, color: "#dbeafe", iconColor: "#1d4ed8" },
              { nombre: "Pediatría", icon: <Baby size={32} />, color: "#dcfce7", iconColor: "#16a34a" },
              { nombre: "Dermatología", icon: <Microscope size={32} />, color: "#fef9c3", iconColor: "#ca8a04" },
              { nombre: "Ginecología", icon: <Pill size={32} />, color: "#f3e8ff", iconColor: "#9333ea" },
            ].map((e) => (
              <motion.div key={e.nombre} variants={fadeUp} whileHover={{ scale: 1.04 }} style={{
                background: "white", border: "1px solid #e2e8f0", borderRadius: "16px",
                padding: "2rem 1rem", textAlign: "center", cursor: "default", transition: "all 0.2s"
              }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: e.color, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: e.iconColor }}>
                  {e.icon}
                </div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#374151" }}>{e.nombre}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section style={{ background: "#f8fafc", padding: "5rem 1.5rem" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}
        >
          {[
            { icon: <Shield size={28} />, titulo: "Seguro", texto: "Tus datos protegidos con autenticación JWT.", color: "#dbeafe", iconColor: "#1d4ed8" },
            { icon: <Clock size={28} />, titulo: "Rápido", texto: "Agenda una cita en menos de un minuto.", color: "#dcfce7", iconColor: "#16a34a" },
            { icon: <Smartphone size={28} />, titulo: "Accesible", texto: "Disponible desde cualquier dispositivo.", color: "#f3e8ff", iconColor: "#9333ea" },
          ].map((f) => (
            <motion.div key={f.titulo} variants={fadeUp} whileHover={{ y: -4 }} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: f.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: f.iconColor }}>
                {f.icon}
              </div>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>{f.titulo}</h3>
                <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6 }}>{f.texto}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)", padding: "5rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.1,
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px", pointerEvents: "none"
        }} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ position: "relative", maxWidth: "600px", margin: "0 auto", textAlign: "center", color: "white" }}
        >
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, marginBottom: "1rem" }}>
            Crea tu cuenta y agenda tu primer turno hoy mismo
          </h2>
          <p style={{ color: "#bfdbfe", fontSize: "1.125rem", marginBottom: "2.5rem" }}>
            Únete a MediTom y toma el control de tus citas médicas.
          </p>
          <NavLink to="/register" style={{
            display: "inline-block", padding: "16px 40px", background: "white",
            color: "#1d4ed8", fontWeight: 700, borderRadius: "14px",
            textDecoration: "none", fontSize: "1.1rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
          }}>
            Crear mi cuenta gratis
          </NavLink>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#e2e8f0", borderTop: "1px solid #cbd5e1", padding: "2rem 1.5rem", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
          <img src={logo} alt="MediTom" style={{ height: "28px", opacity: 0.7 }} />
          <span style={{ color: "#475569", fontWeight: 700, fontSize: "1rem" }}>MediTom</span>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>© 2026 MediTom. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}