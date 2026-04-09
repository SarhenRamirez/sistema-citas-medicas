import { useState } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useTurnos } from "../context/TurnosContext";
import { loginUser, setToken } from "../services/api";
import { LogIn, Mail, Lock, Stethoscope, CalendarDays, CheckCircle } from "lucide-react";
import logo from "../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, user } = useUser();
  const { cargarTurnos } = useTurnos();
  const navigate = useNavigate();

  if (user) return <Navigate to="/mis-turnos" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email y contrasena son obligatorios");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const response = await loginUser({ email, password });
      setToken(response.data.token);
      login(response.data.user);
      await cargarTurnos();
      navigate("/mis-turnos");
    } catch (err) {
      setError(err.response?.data?.message || "Credenciales invalidas");
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
            Bienvenido de vuelta
          </h2>
          <p style={{ color: "#bfdbfe", fontSize: "1rem", lineHeight: 1.7, marginBottom: "3rem" }}>
            Accede a tu panel y gestiona tus citas medicas de forma rapida y segura.
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
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>Iniciar sesion</h1>
            <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Ingresa tu email y contraseña para continuar</p>
          </div>

          {error && (
            <div style={{ marginBottom: "1.5rem", padding: "12px 16px", borderRadius: "10px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                style={{ width: "100%", padding: "12px 14px 12px 44px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.95rem", outline: "none", background: "white", boxSizing: "border-box", color: "#0f172a" }}
              />
            </div>

            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                style={{ width: "100%", padding: "12px 14px 12px 44px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.95rem", outline: "none", background: "white", boxSizing: "border-box", color: "#0f172a" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "13px", background: loading ? "#93c5fd" : "#1d4ed8", color: "white", fontWeight: 700, borderRadius: "10px", border: "none", fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s", marginTop: "8px", boxShadow: "0 4px 12px rgba(29,78,216,0.3)" }}
            >
              <LogIn size={18} />
              {loading ? "Ingresando..." : "Iniciar sesion"}
            </button>
          </form>

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