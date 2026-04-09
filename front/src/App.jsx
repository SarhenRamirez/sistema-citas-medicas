import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import MisTurnos from "./views/MisTurnos";
import NuevoTurno from "./views/NuevoTurno";
import Perfil from "./views/Perfil";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/*  RUTAS PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*  RUTAS PROTEGIDAS */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mis-turnos" element={<MisTurnos />} />
          <Route path="/nuevo-turno" element={<NuevoTurno />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
