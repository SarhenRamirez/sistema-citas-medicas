import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

const DEMO_EMAIL = "demo@meditom.app";

// La foto se guarda aparte por usuario para no perderla al cerrar sesion
const avatarKey = (id) => `avatar_${id}`;

const leerUsuario = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(leerUsuario);

  const guardarUsuario = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const login = (data) => {
    guardarUsuario({
      id: data.id,
      name: data.name,
      email: data.email,
      avatar: localStorage.getItem(avatarKey(data.id)),
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const handleSessionExpired = () => setUser(null);
    window.addEventListener("session-expired", handleSessionExpired);
    return () => window.removeEventListener("session-expired", handleSessionExpired);
  }, []);

  const actualizarFoto = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          localStorage.setItem(avatarKey(user.id), reader.result);
          guardarUsuario({ ...user, avatar: reader.result });
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const isDemo = user?.email === DEMO_EMAIL;

  return (
    <UserContext.Provider value={{ user, isDemo, login, logout, actualizarFoto }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
