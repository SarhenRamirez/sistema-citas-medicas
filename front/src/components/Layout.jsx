import { Outlet, useLocation, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import { User, CalendarPlus, CalendarDays, LogOut } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function Sidebar() {
  const { user, logout } = useUser();
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
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        position: "fixed", left: 0, top: 0, height: "100%", width: "260px",
        background: "white", borderRight: "1px solid #e2e8f0",
        display: "flex", flexDirection: "column", zIndex: 50
      }}
    >
      {/* Logo */}
      <div style={{ padding: "1.5rem", borderBottom: "1px solid #f1f5f9" }}>
        <NavLink to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img src={logo} alt="MediTom" style={{ height: "42px" }} />
          <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1d4ed8" }}>MediTom</span>
        </NavLink>
      </div>

      {/* Perfil */}
      <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #f1f5f9" }}>
        <NavLink to="/perfil" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid #bfdbfe" }} />
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
              {user?.nombre}
            </p>
            <p style={{ fontSize: "0.72rem", color: "#cbd5e1", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: "1px" }}>
              {user?.email}
            </p>
          </div>
        </NavLink>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "4px" }}>
        <SidebarItem to="/perfil" label="Mi perfil" icon={<User size={18} />} />
        <SidebarItem to="/nuevo-turno" label="Solicitar turno" icon={<CalendarPlus size={18} />} />
        <SidebarItem to="/mis-turnos" label="Mis turnos" icon={<CalendarDays size={18} />} />
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
    </motion.aside>
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
        borderLeft: isActive ? "3px solid #1d4ed8" : "3px solid transparent",
        paddingLeft: isActive ? "10px" : "12px",
      })}
    >
      {icon}
      {label}
    </NavLink>
  );
}

export default function Layout() {
  const location = useLocation();
  const { user } = useUser();

  return (
    <>
      {user ? (
        <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
          <Sidebar />
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}
            >
              <Outlet />
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
              <Outlet />
            </motion.main>
          </AnimatePresence>
        </>
      )}
    </>
  );
}