import { NavLink } from "react-router-dom";
import { useTurnos } from "../context/TurnosContext";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { CalendarDays, Clock, XCircle } from "lucide-react";

export default function MisTurnos() {
  const { turnos, cancelarTurno, loading, error } = useTurnos();

  const turnosActivos = turnos.filter((t) => t.estado === "agendado");
  const turnosCancelados = turnos.filter((t) => t.estado === "cancelado");

  const handleCancelar = (id) => {
    Swal.fire({
      title: "¿Cancelar cita?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
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

  if (loading) return <Loader text="Cargando tus turnos..." />;
  if (error) return <p style={{ textAlign: "center", marginTop: "2rem", color: "#ef4444" }}>{error}</p>;

  return (
    <section style={{ maxWidth: "900px", margin: "0 auto" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>Mis turnos</h1>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Consultá y administrá tus citas médicas</p>
        </div>
        <NavLink to="/nuevo-turno" style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "10px 20px", background: "#1d4ed8", color: "white",
          borderRadius: "10px", textDecoration: "none", fontSize: "0.9rem",
          fontWeight: 600, boxShadow: "0 2px 8px rgba(29,78,216,0.3)"
        }}>
          + Solicitar turno
        </NavLink>
      </div>

      {/* Turnos activos */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
          <CalendarDays size={18} color="#1d4ed8" /> Turnos activos
        </h2>

        {turnosActivos.length === 0 ? (
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "14px", padding: "1.5rem", textAlign: "center", color: "#3b82f6", fontSize: "0.95rem" }}>
            No tenés citas activas actualmente.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {turnosActivos.map((turno) => (
              <div key={turno.id} style={{ background: "white", borderRadius: "16px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600 }}>Turno #{turno.id}</span>
                  <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: "0.75rem", fontWeight: 700, padding: "4px 10px", borderRadius: "999px" }}>
                    Agendado
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#374151", fontSize: "0.9rem" }}>
                    <CalendarDays size={15} color="#1d4ed8" />
                    <strong>{turno.fecha}</strong>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#374151", fontSize: "0.9rem" }}>
                    <Clock size={15} color="#1d4ed8" />
                    <strong>{turno.hora} hs</strong>
                  </div>
                </div>
                <button
                  onClick={() => handleCancelar(turno.id)}
                  style={{ width: "100%", padding: "9px", border: "1px solid #fca5a5", color: "#ef4444", background: "transparent", borderRadius: "8px", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#fef2f2"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <XCircle size={15} /> Cancelar cita
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Historial */}
      <div>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
          <Clock size={18} color="#64748b" /> Historial
        </h2>

        {turnosCancelados.length === 0 ? (
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "1.5rem", textAlign: "center", color: "#94a3b8", fontSize: "0.95rem" }}>
            No hay turnos cancelados.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {turnosCancelados.map((turno) => (
              <div key={turno.id} style={{ background: "#f8fafc", borderRadius: "16px", padding: "1.5rem", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600 }}>Turno #{turno.id}</span>
                  <span style={{ background: "#fee2e2", color: "#ef4444", fontSize: "0.75rem", fontWeight: 700, padding: "4px 10px", borderRadius: "999px" }}>
                    Cancelado
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "0.9rem" }}>
                    <CalendarDays size={15} color="#94a3b8" />
                    {turno.fecha}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "0.9rem" }}>
                    <Clock size={15} color="#94a3b8" />
                    {turno.hora} hs
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}