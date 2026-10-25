import { useRef } from "react";
import Swal from "sweetalert2";
import { useUser } from "../context/UserContext";
import { useTurnos } from "../context/TurnosContext";
import { esPasado } from "../helpers/fechas";
import { Camera, User, Mail, Shield } from "lucide-react";

const MAX_FOTO_MB = 1;

export default function Perfil() {
  const { user, isDemo, actualizarFoto } = useUser();
  const { turnos } = useTurnos();
  const inputRef = useRef(null);

  const stats = [
    { label: "Proximas", valor: turnos.filter((t) => t.status === "active" && !esPasado(t.date)).length, color: "#1d4ed8" },
    { label: "Realizadas", valor: turnos.filter((t) => t.status === "active" && esPasado(t.date)).length, color: "#16a34a" },
    { label: "Canceladas", valor: turnos.filter((t) => t.status === "cancelled").length, color: "#ef4444" },
  ];

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      Swal.fire({ icon: "warning", title: "Archivo no valido", text: "Solo se permiten imagenes PNG o JPG" });
      return;
    }
    if (file.size > MAX_FOTO_MB * 1024 * 1024) {
      Swal.fire({ icon: "warning", title: "Imagen muy pesada", text: `La foto debe pesar menos de ${MAX_FOTO_MB} MB` });
      return;
    }
    try {
      await actualizarFoto(file);
      Swal.fire({ icon: "success", title: "Foto actualizada", timer: 1500, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo guardar la foto" });
    }
  };

  return (
    <section style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", marginBottom: "2rem" }}>
        Mi perfil
      </h1>

      <div style={{ background: "white", borderRadius: "20px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>

        {/* Header con foto */}
        <div style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)", padding: "2.5rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div style={{ position: "relative" }}>
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Foto de perfil"
                style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", border: "4px solid rgba(255,255,255,0.3)" }}
              />
            ) : (
              <div style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "4px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User size={40} color="white" />
              </div>
            )}

            <button
              onClick={() => inputRef.current?.click()}
              aria-label="Cambiar foto de perfil"
              title="Cambiar foto de perfil"
              style={{
                position: "absolute", bottom: 0, right: 0,
                width: 32, height: 32, borderRadius: "50%",
                background: "white", border: "2px solid #1d4ed8",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
              }}
            >
              <Camera size={14} color="#1d4ed8" />
            </button>

            <input
              ref={inputRef}
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <div style={{ textAlign: "center", color: "white" }}>
            <p style={{ fontSize: "1.25rem", fontWeight: 700 }}>{user?.name}</p>
            <p style={{ fontSize: "0.875rem", opacity: 0.75, marginTop: "2px" }}>{user?.email}</p>
          </div>
        </div>

        {/* Resumen de turnos */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderBottom: "1px solid #e2e8f0" }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ padding: "1.25rem 0.5rem", textAlign: "center", borderLeft: i ? "1px solid #e2e8f0" : "none" }}>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color }}>{s.valor}</p>
              <p style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Info */}
        <div style={{ padding: "1.5rem clamp(1rem, 4vw, 2rem)", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <User size={18} color="#1d4ed8" />
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Nombre</p>
              <p style={{ fontSize: "1rem", fontWeight: 600, color: "#0f172a", marginTop: "2px" }}>{user?.name}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Mail size={18} color="#16a34a" />
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Email</p>
              <p style={{ fontSize: "1rem", fontWeight: 600, color: "#0f172a", marginTop: "2px", wordBreak: "break-all" }}>{user?.email}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#f3e8ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Shield size={18} color="#9333ea" />
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Estado</p>
              <p style={{ fontSize: "1rem", fontWeight: 600, color: "#16a34a", marginTop: "2px" }}>{isDemo ? "Cuenta demo" : "Cuenta activa"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}