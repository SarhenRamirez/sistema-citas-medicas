import { AppDataSource } from "../data/app.datasource";
import { DEMO_USER } from "../config/demo";
import { Turno } from "../entities/Turno";
import { User } from "../entities/User";
import { checkCredentials } from "./credentials.service";
import { createUser, getUserByCredentialsId } from "./users.service";

const formatDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// Devuelve el dia habil (lunes a viernes) numero `n` a partir de hoy
const diaHabil = (n: number): string => {
  const d = new Date();
  let contados = 0;
  while (contados < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) contados++;
  }
  return formatDate(d);
};

// Crea la cuenta demo si no existe y le asegura turnos de ejemplo vigentes
export const ensureDemoUser = async () => {
  let user: User | undefined;
  const credentialsId = await checkCredentials(DEMO_USER.username, DEMO_USER.password);

  if (credentialsId) {
    user = await getUserByCredentialsId(credentialsId);
  } else {
    user = await createUser(DEMO_USER);
  }
  if (!user) return;

  if (user.name !== DEMO_USER.name) {
    user.name = DEMO_USER.name;
    await AppDataSource.getRepository(User).save(user);
  }

  const repo = AppDataSource.getRepository(Turno);
  const turnos = await repo.find({ where: { user: { id: user.id } } });
  const hoy = formatDate(new Date());
  const tieneFuturos = turnos.some((t) => t.status === "active" && t.date > hoy);
  if (tieneFuturos) return;

  const ejemplos = [
    { date: diaHabil(2), time: "09:00", specialty: "Medicina general", status: "active" as const },
    { date: diaHabil(4), time: "14:20", specialty: "Cardiologia", status: "active" as const },
    { date: diaHabil(6), time: "10:40", specialty: "Dermatologia", status: "cancelled" as const },
  ];

  await repo.save(ejemplos.map((t) => repo.create({ ...t, user: { id: user!.id } as User })));
  console.log("🧪 Cuenta demo lista (usuario: demo)");
};
