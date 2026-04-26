import { NavLink } from "react-router-dom";
import { useTurnos } from "../context/TurnosContext";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Swal from "sweetalert2";
import { CalendarDays, Clock } from "lucide-react";

export default function MisTurnos() {
  const { turnos, cancelarTurno, loading, error } = useTurnos();

  const turnosActivos = turnos.filter((t) => t.status === "active");
  const turnosCancelados = turnos.filter((t) => t.status === "cancelled");

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
              <Card key={turno.id} turno={turno} onCancelar={handleCancelar} />
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
              <Card key={turno.id} turno={turno} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}