import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const guardarUsuario = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const login = (data) => {
    guardarUsuario({
      id: data.id,
      name: data.name,
      email: data.email,
      avatar: null,
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

  const actualizarFoto = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      const updatedUser = { ...user, avatar: base64 };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    };
    reader.readAsDataURL(file);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, actualizarFoto }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}