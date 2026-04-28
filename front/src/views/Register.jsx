import { useState } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { registerUser } from "../services/api";
import { UserPlus, Mail, Lock, User, Stethoscope, CalendarDays, CheckCircle } from "lucide-react";
import logo from "../assets/logo.png";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  if (user) return <Navigate to="/mis-turnos" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contrasenas no coinciden");
      return;
    }
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await registerUser({ name: form.name, email: form.email, password: form.password });
      setSuccess("Cuenta creada correctamente. Redirigiendo...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <div style={{
        width: "45%", background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "3rem", position: "relative", overflow: "hidden"
      }} className="hidden md:flex">
        <div style={{
          position: "absolute", inset: 0, opacity: 0.1,
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px", pointerEvents: "none"
        }} />
        <div style={{ position: "relative" }}>
          <NavLink to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "3rem" }}>
            <img src={logo} alt="MediTom" style={{ height: "36px" }} />
            <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "white" }}>MediTom</span>
          </NavLink>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: "1rem" }}>
            Comienza hoy, es gratis
          </h2>
          <p style={{ color: "#bfdbfe", fontSize: "1rem", lineHeight: 1.7, marginBottom: "3rem" }}>
            Crea tu cuenta y accede a todos los beneficios de MediTom sin costo alguno.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { icon: <Stethoscope size={18} />, texto: "Turnos medicos online" },
              { icon: <CalendarDays size={18} />, texto: "Agenda disponible 24/7" },
              { icon: <CheckCircle size={18} />, texto: "Confirmacion inmediata" },
            ].map((item) => (
              <div key={item.texto} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <span style={{ color: "#e0f2fe", fontSize: "0.95rem", fontWeight: 500 }}>{item.texto}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "#f8fafc" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>Crear cuenta</h1>
            <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Completa el formulario para registrarte</p>
          </div>

          {error && (
            <div style={{ marginBottom: "1.5rem", padding: "12px 16px", borderRadius: "10px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚠</span> {error}
            </div>
          )}

          {success && (
            <div style={{ marginBottom: "1.5rem", padding: "12px 16px", borderRadius: "10px", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle size={16} /> {success}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { name: "name", placeholder: "Nombre completo", type: "text", icon: <User size={18} /> },
              { name: "email", placeholder: "correo@ejemplo.com", type: "email", icon: <Mail size={18} /> },
              { name: "password", placeholder: "Contraseña", type: "password", icon: <Lock size={18} /> },
              { name: "confirmPassword", placeholder: "Confirmar contraseña", type: "password", icon: <Lock size={18} /> },
            ].map((field) => (
              <div key={field.name} style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                  {field.icon}
                </div>
                <input
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
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
              style={{ width: "100%", padding: "13px", background: loading ? "#93c5fd" : "#1d4ed8", color: "white", fontWeight: 700, borderRadius: "10px", border: "none", fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s", marginTop: "8px", boxShadow: "0 4px 12px rgba(29,78,216,0.3)" }}
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