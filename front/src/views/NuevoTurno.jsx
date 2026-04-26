import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useTurnos } from "../context/TurnosContext";
import { useUser } from "../context/UserContext";
import { CalendarDays, Clock, CheckCircle } from "lucide-react";

export default function NuevoTurno() {
  const navigate = useNavigate();
  const { agregarTurno } = useTurnos();
  const { user } = useUser();

  const [form, setForm] = useState({ date: "", time: "" });
  const [openHoras, setOpenHoras] = useState(false);
  const [loading, setLoading] = useState(false);

  const hoy = new Date();
  hoy.setDate(hoy.getDate() + 1);

  const generarHoras = () => {
    const horas = [];
    for (let min = 360; min <= 1020; min += 20) {
      const h = String(Math.floor(min / 60)).padStart(2, "0");
      const m = String(min % 60).padStart(2, "0");
      horas.push(`${h}:${m}`);
    }
    return horas;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date || !form.time) {
      return Swal.fire({ icon: "warning", title: "Campos incompletos", text: "Selecciona una fecha y una hora" });
    }
    setLoading(true);
    const resultado = await agregarTurno(form.date, form.time, user?.id);
    setLoading(false);
    if (!resultado.ok) {
      return Swal.fire({ icon: "error", title: "Error", text: resultado.message });
    }
    await Swal.fire({ icon: "success", title: "Turno agendado", text: "Tu cita fue registrada correctamente", confirmButtonText: "Ver mis turnos" });
    navigate("/mis-turnos");
  };

  return (
    <section style={{ maxWidth: "560px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>
          Solicitar turno
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
          Elige una fecha y horario disponible
        </p>
      </div>

      <div style={{ background: "white", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "2rem", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#374151", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
              <CalendarDays size={16} color="#1d4ed8" /> Fecha
            </label>
            <DatePicker
              selected={form.date ? new Date(form.date + "T12:00:00") : null}
              onChange={(date) => {
                const offset = date.getTimezoneOffset();
                const fechaCorregida = new Date(date.getTime() - offset * 60000);
                setForm({ ...form, date: fechaCorregida.toISOString().split("T")[0], time: "" });
              }}
              minDate={hoy}
              filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6}
              placeholderText="Selecciona una fecha"
              wrapperClassName="w-full"
              customInput={
                <input style={{
                  width: "100%", padding: "11px 14px", border: "1px solid #e2e8f0",
                  borderRadius: "10px", fontSize: "0.95rem", outline: "none",
                  background: "white", color: "#0f172a", boxSizing: "border-box", cursor: "pointer"
                }} />
              }
            />
          </div>

          <div style={{ position: "relative" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#374151", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Clock size={16} color="#1d4ed8" /> Hora
            </label>
            <button
              type="button"
              onClick={() => setOpenHoras(!openHoras)}
              style={{
                width: "100%", padding: "11px 14px", border: "1px solid #e2e8f0",
                borderRadius: "10px", fontSize: "0.95rem", background: "white",
                color: form.hora ? "#0f172a" : "#94a3b8", textAlign: "left",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between"
              }}
            >
              {form.time || "Selecciona una hora"}
              <Clock size={16} color="#94a3b8" />
            </button>

            {openHoras && (
              <div style={{
                position: "absolute", zIndex: 10, top: "100%", left: 0, right: 0,
                marginTop: "6px", background: "white", border: "1px solid #e2e8f0",
                borderRadius: "12px", padding: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px", maxHeight: "200px", overflowY: "auto" }}>
                  {generarHoras().map((hora) => (
                    <button
                      key={hora}
                      type="button"
                      onClick={() => { setForm({ ...form, time: hora }); setOpenHoras(false); }}
                      style={{
                        padding: "7px 4px", borderRadius: "8px", fontSize: "0.8rem",
                        fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                        border: form.time === hora ? "none" : "1px solid #e2e8f0",
                        background: form.time === hora ? "#1d4ed8" : "white",
                        color: form.time === hora ? "white" : "#374151"
                      }}
                    >
                      {hora}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {form.date && form.time && (
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "12px", padding: "1rem", display: "flex", alignItems: "center", gap: "10px" }}>
              <CheckCircle size={18} color="#1d4ed8" />
              <p style={{ fontSize: "0.9rem", color: "#1d4ed8", fontWeight: 500 }}>
                Turno el <strong>{form.date}</strong> a las <strong>{form.time} hs</strong>
              </p>
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1, padding: "12px", background: loading ? "#93c5fd" : "#1d4ed8",
                color: "white", fontWeight: 700, borderRadius: "10px", border: "none",
                fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 12px rgba(29,78,216,0.3)", transition: "all 0.2s"
              }}
            >
              {loading ? "Agendando..." : "Confirmar turno"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/mis-turnos")}
              style={{
                flex: 1, padding: "12px", background: "white", color: "#374151",
                fontWeight: 600, borderRadius: "10px", border: "1px solid #e2e8f0",
                fontSize: "0.95rem", cursor: "pointer", transition: "all 0.2s"
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}