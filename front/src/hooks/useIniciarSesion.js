import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { loginUser, setToken, DEMO_CREDENTIALS } from "../services/api";

export function useIniciarSesion() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const iniciarSesion = async (username, password) => {
    try {
      setLoading(true);
      setError("");
      const response = await loginUser({ username: username.trim(), password });
      setToken(response.data.token);
      login(response.data.user);
      navigate("/mis-turnos");
      return true;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (err.response ? "Credenciales invalidas" : "No se pudo conectar con el servidor")
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const entrarComoDemo = () => iniciarSesion(DEMO_CREDENTIALS.username, DEMO_CREDENTIALS.password);

  return { iniciarSesion, entrarComoDemo, loading, error, setError };
}
