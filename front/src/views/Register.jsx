import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useIniciarSesion } from "../hooks/useIniciarSesion";
import { registerUser } from "../services/api";
import AuthPanel from "../components/AuthPanel";
import { UserPlus, Mail, Lock, User, AtSign, ArrowLeft } from "lucide-react";

const CAMPOS = [
  { name: "name", placeholder: "Nombre completo", type: "text", autoComplete: "name", icon: <User size={18} /> },
  { name: "username", placeholder: "Nombre de usuario", type: "text", autoComplete: "username", icon: <AtSign size={18} /> },
  { name: "email", placeholder: "correo@ejemplo.com", type: "email", autoComplete: "email", icon: <Mail size={18} /> },
  { name: "password", placeholder: "Contraseña (minimo 6 caracteres)", type: "password", autoComplete: "new-password", icon: <Lock size={18} /> },
  { name: "confirmPassword", placeholder: "Confirmar contraseña", type: "password", autoComplete: "new-password", icon: <Lock size={18} /> },
];

export default function Register() {
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { iniciarSesion, error: loginError } = useIniciarSesion();

  if (user) return <Navigate to="/mis-turnos" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(form).some((v) => !v.trim())) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (form.password.length < 6) {
      setError("La contrasena debe tener al menos 6 caracteres");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contrasenas no coinciden");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await registerUser({ name: form.name, username: form.username, email: form.email, password: form.password });
      // Entra directo al panel despues de registrarse
      await iniciarSesion(form.username, form.password);
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  const mensajeError = error || loginError;

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <AuthPanel
        titulo="Comienza hoy, es gratis"
        texto="Crea tu cuenta y agenda tu primera cita medica en menos de un minuto."
      />

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.25rem", background: "#ffffff" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <NavLink to="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "0.85rem", textDecoration: "none", marginBottom: "1.5rem" }}>
            <ArrowLeft size={16} /> Volver al inicio
          </NavLink>

          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>Crear cuenta</h1>
            <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Completa el formulario para registrarte</p>
          </div>

          {mensajeError && (
            <div role="alert" style={{ marginBottom: "1.5rem", padding: "12px 16px", borderRadius: "10px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚠</span> {mensajeError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {CAMPOS.map((field) => (
              <div key={field.name} style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex" }}>
                  {field.icon}
                </div>
                <input
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  aria-label={field.placeholder}
                  autoComplete={field.autoComplete}
                  value={form[field.name]}
                  onChange={handleChange}
                  disabled={loading}
                  style={{ width: "100%", padding: "12px 14px 12px 44px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.95rem", outline: "none", background: "white", boxSizing: "border-box", color: "#0f172a" }}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "13px", background: loading ? "#93c5fd" : "#2563eb", color: "white", fontWeight: 700, borderRadius: "12px", border: "none", fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s", marginTop: "8px", boxShadow: "0 1px 2px rgba(15,23,42,0.08)" }}
            >
              <UserPlus size={18} />
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "#64748b" }}>
            Ya tienes cuenta?{" "}
            <NavLink to="/login" style={{ color: "#1d4ed8", fontWeight: 600, textDecoration: "none" }}>
              Inicia sesion
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
