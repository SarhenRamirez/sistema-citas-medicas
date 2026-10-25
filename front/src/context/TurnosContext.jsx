import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  crearTurno,
  obtenerMisTurnos,
  cancelarTurno as cancelarTurnoApi,
  getToken,
} from "../services/api";
import { useUser } from "./UserContext";

const TurnosContext = createContext();

export function TurnosProvider({ children }) {
  const { user } = useUser();
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarTurnos = useCallback(async () => {
    if (!getToken()) return;
    try {
      setLoading(true);
      setError("");
      const res = await obtenerMisTurnos();
      setTurnos(res.data);
    } catch {
      setError("Error al cargar los turnos");
    } finally {
      setLoading(false);
    }
  }, []);

  // Recarga al iniciar sesion y limpia al cerrarla, asi no se mezclan turnos entre cuentas
  useEffect(() => {
    if (user) cargarTurnos();
    else setTurnos([]);
  }, [user?.id, cargarTurnos]); // eslint-disable-line react-hooks/exhaustive-deps

  const agregarTurno = async (fecha, hora, especialidad) => {
    try {
      const res = await crearTurno({ date: fecha, time: hora, specialty: especialidad });
      setTurnos((prev) => [...prev, res.data.turno]);
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        message: err.response?.data?.message || "Error al agendar el turno",
      };
    }
  };

  const cancelarTurno = async (id) => {
    try {
      await cancelarTurnoApi(id);
      setTurnos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: "cancelled" } : t))
      );
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        message: err.response?.data?.message || "Error al cancelar el turno",
      };
    }
  };

  return (
    <TurnosContext.Provider value={{ turnos, loading, error, agregarTurno, cancelarTurno, cargarTurnos }}>
      {children}
    </TurnosContext.Provider>
  );
}

export function useTurnos() {
  return useContext(TurnosContext);
}
