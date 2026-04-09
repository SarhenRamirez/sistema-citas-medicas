import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAuthPage) return null;

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.1)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.2)" : "none",
      }}
    >
      <nav style={{
        maxWidth: "1152px", margin: "0 auto", padding: "0 1.5rem",
        height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>

        <NavLink to="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <motion.img
            src={logo} alt="MediTom"
            style={{ height: "46px", width: "auto" }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.span
            style={{ fontSize: "1.3rem", fontWeight: 700, color: scrolled ? "#1d4ed8" : "white", transition: "color 0.3s ease" }}
            whileHover={{ scale: 1.03 }}
          >
            MediTom
          </motion.span>
        </NavLink>

        <motion.div
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{
            width: "1px", height: "28px",
            background: scrolled ? "#e2e8f0" : "rgba(255,255,255,0.3)",
            marginRight: "4px", transition: "background 0.3s ease"
          }} />

          <NavLink to="/login" style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 20px", borderRadius: "10px", textDecoration: "none",
            fontSize: "0.9rem", fontWeight: 600, transition: "all 0.2s",
            color: scrolled ? "#1d4ed8" : "white",
            border: scrolled ? "2px solid #1d4ed8" : "2px solid rgba(255,255,255,0.8)",
            background: scrolled ? "rgba(29,78,216,0.06)" : "rgba(255,255,255,0.15)",
            backdropFilter: "blur(4px)"
          }}
            onMouseEnter={e => { e.currentTarget.style.background = scrolled ? "rgba(29,78,216,0.12)" : "rgba(255,255,255,0.25)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = scrolled ? "rgba(29,78,216,0.06)" : "rgba(255,255,255,0.15)"; }}
          >
            <LogIn size={16} />
            Iniciar sesion
          </NavLink>

          <NavLink to="/register" style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 20px", borderRadius: "10px", textDecoration: "none",
            fontSize: "0.9rem", fontWeight: 600, transition: "all 0.2s",
            color: scrolled ? "white" : "#1d4ed8",
            background: scrolled ? "#1d4ed8" : "white",
            boxShadow: scrolled ? "0 2px 8px rgba(29,78,216,0.3)" : "0 2px 8px rgba(0,0,0,0.15)"
          }}
            onMouseEnter={e => { e.currentTarget.style.background = scrolled ? "#1e40af" : "#f0f7ff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = scrolled ? "#1d4ed8" : "white"; }}
          >
            <UserPlus size={16} />
            Registrarse
          </NavLink>
        </motion.div>
      </nav>
    </motion.header>
  );
}