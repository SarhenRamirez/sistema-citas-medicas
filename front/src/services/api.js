import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("session-expired"));
    }
    return Promise.reject(error);
  }
);

export const setToken = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("token", token);
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return token;
};

export const registerUser = async (data) => {
  return api.post("/users/register", data);
};

export const loginUser = async (data) => {
  return api.post("/users/login", data);
};

export const crearTurno = async (turno) => {
  return api.post("/appointments/schedule", turno);
};

export const obtenerMisTurnos = async () => {
  return api.get("/appointments/mis-turnos");
};

export const cancelarTurno = async (id) => {
  return api.put(`/appointments/cancel/${id}`);
};
