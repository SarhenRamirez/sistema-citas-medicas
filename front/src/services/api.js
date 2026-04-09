import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

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

export const removeToken = () => {
  delete api.defaults.headers.common["Authorization"];
  localStorage.removeItem("token");
};

export const registerUser = async (data) => {
  return api.post("/auth/register", data);
};

export const loginUser = async (data) => {
  return api.post("/auth/login", data);
};

export const crearTurno = async (turno) => {
  return api.post("/turnos", turno);
};

export const obtenerMisTurnos = async () => {
  return api.get("/turnos/mis-turnos");
};

export const cancelarTurno = async (id) => {
  return api.patch(`/turnos/${id}/cancelar`);
};

export const obtenerTurnoPorId = async (id) => {
  return api.get(`/turnos/${id}`);
};

export const getPerfil = async () => {
  return api.get("/usuarios/perfil");
};