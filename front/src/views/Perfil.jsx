import { useRef } from "react";
import { useUser } from "../context/UserContext";
import { Camera, User, Mail, Shield } from "lucide-react";

export default function Perfil() {
  const { user, actualizarFoto } = useUser();
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten imágenes");
      return;
    }
    actualizarFoto(file);
  };

  return (
    <section style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem 1.5rem" }}>
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

        {/* Info */}
        <div style={{ padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
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
              <p style={{ fontSize: "1rem", fontWeight: 600, color: "#0f172a", marginTop: "2px" }}>{user?.email}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#f3e8ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Shield size={18} color="#9333ea" />
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Estado</p>
              <p style={{ fontSize: "1rem", fontWeight: 600, color: "#16a34a", marginTop: "2px" }}>Cuenta activa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}