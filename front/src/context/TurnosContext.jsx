import { createContext, useContext, useState, useEffect } from "react";
import {
  crearTurno,
  obtenerMisTurnos,
  cancelarTurno as cancelarTurnoApi,
  getToken,
} from "../services/api";

const TurnosContext = createContext();

export function TurnosProvider({ children }) {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarTurnos = async () => {
    if (!getToken()) return;
    try {
      setLoading(true);
      const res = await obtenerMisTurnos();
      setTurnos(res.data);
    } catch (err) {
      setError("Error al cargar los turnos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTurnos();
  }, []);

  const agregarTurno = async (fecha, hora, userId, especialidad) => {
    try {
      const res = await crearTurno({ date: fecha, time: hora, specialty: especialidad, userId });
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