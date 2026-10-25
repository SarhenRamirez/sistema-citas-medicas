import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useIniciarSesion } from "../hooks/useIniciarSesion";
import { DEMO_CREDENTIALS } from "../services/api";
import AuthPanel from "../components/AuthPanel";
import { LogIn, AtSign, Lock, Sparkles, ArrowLeft } from "lucide-react";

const inputStyle = { width: "100%", padding: "12px 14px 12px 44px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.95rem", outline: "none", background: "white", boxSizing: "border-box", color: "#0f172a" };
const iconStyle = { position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex" };

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useUser();
  const { iniciarSesion, entrarComoDemo, loading, error, setError } = useIniciarSesion();

  if (user) return <Navigate to="/mis-turnos" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Usuario y contrasena son obligatorios");
      return;
    }
    iniciarSesion(username, password);
  };

  const handleDemo = () => {
    setUsername(DEMO_CREDENTIALS.username);
    setPassword(DEMO_CREDENTIALS.password);
    entrarComoDemo();
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <AuthPanel
        titulo="Bienvenido de vuelta"
        texto="Accede a tu panel y gestiona tus citas medicas de forma rapida y segura."
      />

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.25rem", background: "#ffffff" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <NavLink to="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "0.85rem", textDecoration: "none", marginBottom: "1.5rem" }}>
            <ArrowLeft size={16} /> Volver al inicio
          </NavLink>

          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>Iniciar sesion</h1>
            <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Ingresa tu usuario y contraseña para continuar</p>
          </div>

          {error && (
            <div role="alert" style={{ marginBottom: "1.5rem", padding: "12px 16px", borderRadius: "10px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ position: "relative" }}>
              <div style={iconStyle}><AtSign size={18} /></div>
              <input
                type="text"
                placeholder="Nombre de usuario"
                autoComplete="username"
                aria-label="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                style={inputStyle}
              />
            </div>

            <div style={{ position: "relative" }}>
              <div style={iconStyle}><Lock size={18} /></div>
              <input
                type="password"
                placeholder="Contraseña"
                autoComplete="current-password"
                aria-label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "13px", background: loading ? "#93c5fd" : "#2563eb", color: "white", fontWeight: 700, borderRadius: "12px", border: "none", fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s", marginTop: "8px", boxShadow: "0 1px 2px rgba(15,23,42,0.08)" }}
            >
              <LogIn size={18} />
              {loading ? "Ingresando..." : "Iniciar sesion"}
            </button>
          </form>

          {/* Acceso rapido con la cuenta de prueba */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "1.5rem 0", color: "#94a3b8", fontSize: "0.8rem" }}>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            o
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          </div>

          <button
            type="button"
            onClick={handleDemo}
            disabled={loading}
            style={{ width: "100%", padding: "12px", background: "#fefce8", color: "#854d0e", fontWeight: 700, borderRadius: "10px", border: "1px solid #fde68a", fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
          >
            <Sparkles size={18} />
            Entrar con la cuenta demo
          </button>
          <p style={{ textAlign: "center", marginTop: "8px", fontSize: "0.78rem", color: "#94a3b8" }}>
            Usuario <strong>{DEMO_CREDENTIALS.username}</strong> · Contraseña <strong>{DEMO_CREDENTIALS.password}</strong>
          </p>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "#64748b" }}>
            No tienes cuenta?{" "}
            <NavLink to="/register" style={{ color: "#1d4ed8", fontWeight: 600, textDecoration: "none" }}>
              Registrate
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
