import { CalendarDays, Clock, XCircle, Stethoscope } from "lucide-react";

export default function Card({ turno, onCancelar }) {
  const isActive = turno.status === "active";

  return (
    <div style={{
      background: isActive ? "white" : "#f8fafc",
      borderRadius: "16px",
      padding: "1.5rem",
      border: "1px solid #e2e8f0",
      boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600 }}>Turno #{turno.id}</span>
        <span style={{
          background: isActive ? "#dcfce7" : "#fee2e2",
          color: isActive ? "#16a34a" : "#ef4444",
          fontSize: "0.75rem", fontWeight: 700, padding: "4px 10px", borderRadius: "999px",
        }}>
          {isActive ? "Agendado" : "Cancelado"}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: isActive ? "1.25rem" : 0 }}>
        {turno.specialty && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: isActive ? "#374151" : "#64748b", fontSize: "0.9rem" }}>
            <Stethoscope size={15} color={isActive ? "#1d4ed8" : "#94a3b8"} />
            {isActive ? <strong>{turno.specialty}</strong> : turno.specialty}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: isActive ? "#374151" : "#64748b", fontSize: "0.9rem" }}>
          <CalendarDays size={15} color={isActive ? "#1d4ed8" : "#94a3b8"} />
          {isActive ? <strong>{turno.date}</strong> : turno.date}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: isActive ? "#374151" : "#64748b", fontSize: "0.9rem" }}>
          <Clock size={15} color={isActive ? "#1d4ed8" : "#94a3b8"} />
          {isActive ? <strong>{turno.time} hs</strong> : `${turno.time} hs`}
        </div>
      </div>

      {isActive && onCancelar && (
        <button
          onClick={() => onCancelar(turno.id)}
          style={{
            width: "100%", padding: "9px", border: "1px solid #fca5a5",
            color: "#ef4444", background: "transparent", borderRadius: "8px",
            fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "6px", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#fef2f2"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
        >
          <XCircle size={15} /> Cancelar cita
        </button>
      )}
    </div>
  );
}
