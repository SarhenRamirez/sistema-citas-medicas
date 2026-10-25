import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

// Credenciales de la cuenta de prueba que crea el backend al iniciar
export const DEMO_CREDENTIALS = { username: "demo", password: "Demo1234" };

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("session-expired"));
    }
    return Promise.reject(error);
  }
);

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => localStorage.getItem("token");

export const registerUser = async (data) => {
  return api.post("/user/register", data);
};

export const loginUser = async (data) => {
  return api.post("/users/login", data);
};

export const crearTurno = async (turno) => {
  return api.post("/turns/schedule", turno);
};

export const obtenerMisTurnos = async () => {
  return api.get("/turns/mis-turnos");
};

export const cancelarTurno = async (id) => {
  return api.put(`/turns/cancel/${id}`);
};
