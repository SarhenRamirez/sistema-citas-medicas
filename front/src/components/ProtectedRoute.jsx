import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute() {
  const { user } = useUser();

  // ❌ No logueado → login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logueado → renderiza la ruta
  return <Outlet />;
}
