// Cuenta de prueba publica para que cualquier visitante pueda explorar la app
export const DEMO_USER = {
  name: "Paciente Demo",
  email: "demo@meditom.app",
  username: "demo",
  password: "Demo1234",
};

export const isDemoEmail = (email: string) => email === DEMO_USER.email;
