import { useState, useEffect } from "react";
import { useOutlet, useLocation, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import { User, CalendarPlus, CalendarDays, LogOut, Menu, X, Sparkles } from "lucide-react";

// Congela el contenido de la ruta al montarse: asi la pagina que sale anima con su
// propio contenido en vez de renderizar la ruta nueva (y su salida termina bien)
function AnimatedOutlet() {
  const outlet = useOutlet();
  const [congelado] = useState(outlet);
  return congelado;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function Sidebar({ open, onClose }) {
  const { user, isDemo, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión actual se cerrará",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
      }
    });
  };

  return (
    <aside
      className={`app-sidebar${open ? " open" : ""}`}
      style={{
        position: "fixed", left: 0, top: 0, height: "100%", width: "260px",
        background: "white", borderRight: "1px solid #e2e8f0",
        display: "flex", flexDirection: "column", zIndex: 50
      }}
    >
      {/* Logo */}
      <div style={{ padding: "1.5rem", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <NavLink to="/mis-turnos" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img src={logo} alt="MediTom" style={{ height: "42px" }} />
          <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>MediTom</span>
        </NavLink>
        <button
          className="app-topbar"
          onClick={onClose}
          aria-label="Cerrar menu"
          style={{ border: "none", background: "transparent", cursor: "pointer", color: "#64748b", padding: 4 }}
        >
          <X size={22} />
        </button>
      </div>

      {/* Perfil */}
      <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #f1f5f9" }}>
        <NavLink to="/perfil" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid #bfdbfe", flexShrink: 0 }} />
          ) : (
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <User size={20} color="#1d4ed8" />
            </div>
          )}
          <div style={{ overflow: "hidden" }}>
            <p style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 500, marginBottom: "2px" }}>
              Bienvenido de vuelta
            </p>
            <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user?.name}
            </p>
            <p style={{ fontSize: "0.72rem", color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: "1px" }}>
              {user?.email}
            </p>
          </div>
        </NavLink>
      </div>

      {isDemo && (
        <div style={{ margin: "1rem 0.75rem 0", padding: "10px 12px", borderRadius: "10px", background: "#fef9c3", border: "1px solid #fde68a", color: "#854d0e", fontSize: "0.78rem", lineHeight: 1.5, display: "flex", gap: "8px" }}>
          <Sparkles size={16} style={{ flexShrink: 0, marginTop: 2 }} />
          <span>Estas en la <strong>cuenta demo</strong>. Agenda y cancela turnos libremente.</span>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "4px" }}>
        <SidebarItem to="/mis-turnos" label="Mis turnos" icon={<CalendarDays size={18} />} />
        <SidebarItem to="/nuevo-turno" label="Solicitar turno" icon={<CalendarPlus size={18} />} />
        <SidebarItem to="/perfil" label="Mi perfil" icon={<User size={18} />} />
      </nav>

      {/* Logout */}
      <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid #f1f5f9" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: "12px",
            padding: "10px 12px", borderRadius: "10px", border: "none",
            background: "transparent", color: "#ef4444", cursor: "pointer",
            fontSize: "0.875rem", fontWeight: 600, transition: "all 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: "flex", alignItems: "center", gap: "12px",
        padding: "10px 12px", borderRadius: "10px", textDecoration: "none",
        fontSize: "0.875rem", fontWeight: 600, transition: "all 0.2s",
        background: isActive ? "#eff6ff" : "transparent",
        color: isActive ? "#1d4ed8" : "#64748b",
        borderLeft: isActive ? "3px solid #2563eb" : "3px solid transparent",
        paddingLeft: isActive ? "10px" : "12px",
      })}
    >
      {icon}
      {label}
    </NavLink>
  );
}

// Barra superior visible solo en celulares/tablets (ver .app-topbar en index.css)
function Topbar({ onOpen }) {
  return (
    <header className="app-topbar" style={{
      position: "fixed", top: 0, left: 0, right: 0, height: "64px", zIndex: 40,
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid #e2e8f0", alignItems: "center", gap: "12px", padding: "0 1rem",
    }}>
      <button
        onClick={onOpen}
        aria-label="Abrir menu"
        style={{ border: "none", background: "transparent", cursor: "pointer", color: "#0f172a", padding: 4, display: "flex" }}
      >
        <Menu size={24} />
      </button>
      <img src={logo} alt="MediTom" style={{ height: "34px" }} />
      <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>MediTom</span>
    </header>
  );
}

export default function Layout() {
  const location = useLocation();
  const { user } = useUser();
  // El menu movil queda abierto solo en la ruta donde se abrio: al navegar se cierra solo
  const [menuPath, setMenuPath] = useState(null);
  const menuOpen = menuPath === location.pathname;
  const setMenuOpen = (open) => setMenuPath(open ? location.pathname : null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {user ? (
        <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
          <Topbar onOpen={() => setMenuOpen(true)} />
          <div
            className={`app-backdrop${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)", zIndex: 45 }}
          />
          <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="app-main"
            >
              <AnimatedOutlet />
            </motion.main>
          </AnimatePresence>
        </div>
      ) : (
        <>
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="min-h-screen"
            >
              <AnimatedOutlet />
            </motion.main>
          </AnimatePresence>
        </>
      )}
    </>
  );
}
