# MediTom 🏥

Sistema de gestion de turnos medicos — aplicacion full stack con autenticacion JWT, servicios en memoria y notificaciones por email.

---

## Descripcion

MediTom permite a los pacientes registrarse, iniciar sesion y gestionar sus citas medicas de forma online. Los usuarios pueden agendar turnos, consultar su historial y cancelar citas. Cada accion relevante dispara una notificacion por email al usuario.

---

## Tecnologias

### Backend
| Tecnologia | Version | Uso |
|---|---|---|
| Node.js | 18+ | Entorno de ejecucion |
| TypeScript | 5.9 | Lenguaje principal |
| Express | 5.2 | Framework HTTP |
| TypeORM | 0.3 | ORM para PostgreSQL |
| PostgreSQL | 14+ | Base de datos |
| bcryptjs | 3.0 | Hashing de contrasenas |
| jsonwebtoken | 9.0 | Autenticacion JWT |
| nodemailer | 6.x | Envio de emails |
| morgan | 1.10 | Logger de requests |

### Frontend
| Tecnologia | Version | Uso |
|---|---|---|
| React | 19 | Libreria UI |
| Vite | 7 | Bundler |
| React Router DOM | 7 | Navegacion |
| Axios | 1.13 | Peticiones HTTP |
| Lucide React | 0.577 | Iconos |
| SweetAlert2 | 11 | Alertas |
| react-datepicker | — | Selector de fechas |

---

## Estructura del proyecto

```
PM3-SarhenRamirez/
├── back/
│   └── src/
│       ├── config/
│       │   └── envs.ts
│       ├── controllers/
│       │   ├── auth.controller.ts
│       │   ├── turnos.controller.ts
│       │   └── usuarios.controller.ts
│       ├── data/
│       │   └── app.datasource.ts
│       ├── dtos/
│       │   ├── Appointment.dto.ts
│       │   ├── Credential.dto.ts
│       │   └── User.dto.ts
│       ├── entities/
│       │   ├── Credential.ts
│       │   ├── Turno.ts
│       │   └── User.ts
│       ├── interfaces/
│       │   ├── IAppointment.ts
│       │   ├── ICredential.ts
│       │   └── IUser.ts
│       ├── middleware/
│       │   ├── auth.ts
│       │   └── error.middleware.ts
│       ├── routes/
│       │   ├── turnos.routes.ts
│       │   └── usuarios.routes.ts
│       ├── services/
│       │   ├── appointments.service.ts
│       │   ├── credentials.service.ts
│       │   ├── email.service.ts
│       │   └── users.service.ts
│       ├── types/
│       │   └── express/index.d.ts
│       └── server.ts
├── front/
│   └── src/
│       ├── components/
│       │   ├── Card.jsx
│       │   ├── Layout.jsx
│       │   ├── Loader.jsx
│       │   ├── Navbar.jsx
│       │   └── ProtectedRoute.jsx
│       ├── context/
│       │   ├── TurnosContext.jsx
│       │   └── UserContext.jsx
│       ├── helpers/
│       │   └── myAppointments.js
│       ├── services/
│       │   └── api.js
│       └── views/
│           ├── Home.jsx
│           ├── Login.jsx
│           ├── MisTurnos.jsx
│           ├── NuevoTurno.jsx
│           ├── Perfil.jsx
│           └── Register.jsx
```

---

## Instalacion y configuracion

### Requisitos previos

- **Node.js** v18 o superior → [nodejs.org](https://nodejs.org)
- **npm** v9 o superior (incluido con Node.js)
- **PostgreSQL** v14 o superior → [postgresql.org](https://www.postgresql.org/download)
- **Git** → [git-scm.com](https://git-scm.com)

```bash
node --version    # v18.x.x o superior
npm --version     # 9.x.x o superior
psql --version    # PostgreSQL 14.x o superior
```

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/SarhenRamirez/sistema-citas-medicas.git
cd sistema-citas-medicas
```

---

### 2. Configurar el backend

#### 2.1 Instalar dependencias

```bash
cd back
npm install
```

#### 2.2 Crear el archivo de variables de entorno

En la carpeta `back/`, crea un archivo `.env` basandote en `.env.example`:

```bash
# Linux/Mac
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

Abre el archivo y completa los valores:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contrasena_de_postgres
DB_NAME=meditom

JWT_SECRET=una_cadena_larga_aleatoria_y_secreta

EMAIL_USER=tucorreo@gmail.com
EMAIL_PASS=tu_app_password_de_google
```

**Que significa cada variable?**

| Variable | Descripcion | Ejemplo |
|---|---|---|
| `PORT` | Puerto del servidor backend | `3000` |
| `DB_HOST` | Host de la base de datos | `localhost` |
| `DB_PORT` | Puerto de PostgreSQL | `5432` |
| `DB_USER` | Usuario de PostgreSQL | `postgres` |
| `DB_PASSWORD` | Contrasena de PostgreSQL | `miPassword123` |
| `DB_NAME` | Nombre de la base de datos | `meditom` |
| `JWT_SECRET` | Clave secreta para tokens JWT | `s3cr3t0_l4rg0_xyz` |
| `EMAIL_USER` | Tu direccion de Gmail | `tucorreo@gmail.com` |
| `EMAIL_PASS` | App Password de Google (no tu contrasena normal) | `xxxx xxxx xxxx xxxx` |

> El archivo `.env` esta incluido en `.gitignore` y **no se sube al repositorio**. Cada persona debe crear el suyo con sus datos.

#### Como obtener el App Password de Gmail

1. Activa la **verificacion en dos pasos** en tu cuenta de Google
2. Ve a [myaccount.google.com](https://myaccount.google.com) → Seguridad → **Contrasenas de aplicaciones**
3. Crea una nueva para "Correo" y copia los 16 caracteres generados
4. Pega ese valor en `EMAIL_PASS`

---

### 3. Crear la base de datos en PostgreSQL

#### Opcion A — Desde la terminal

```bash
psql -U postgres -c "CREATE DATABASE meditom;"
```

#### Opcion B — Desde pgAdmin

1. Clic derecho en **Databases** → **Create** → **Database...**
2. Nombre: `meditom` → **Save**

> Las tablas se crean automaticamente al iniciar el servidor gracias a `synchronize: true` de TypeORM.

---

### 4. Configurar el frontend

```bash
cd front
npm install
```

El frontend no requiere variables de entorno. La URL del backend ya esta configurada en `src/services/api.js` apuntando a `http://localhost:3000`.

---

## Ejecucion

Necesitas **dos terminales** abiertas simultaneamente.

### Terminal 1 — Backend

```bash
cd back
npm run dev
```

Disponible en `http://localhost:3000`. Deberias ver:
```
📦 Base de datos conectada
✅ Backend corriendo en http://localhost:3000
```

### Terminal 2 — Frontend

```bash
cd front
npm run dev
```

Disponible en `http://localhost:5173`.

---

## Endpoints de la API

### Usuarios

| Metodo | Endpoint | Auth | Descripcion |
|---|---|---|---|
| `POST` | `/user/register` | No | Registrar nuevo usuario |
| `POST` | `/users/login` | No | Iniciar sesion — devuelve JWT |
| `GET` | `/users/` | JWT | Obtener todos los usuarios |
| `GET` | `/users/perfil` | JWT | Ver perfil del usuario logueado |
| `GET` | `/users/:id` | JWT | Obtener usuario por ID con sus turnos |

### Turnos

| Metodo | Endpoint | Auth | Descripcion |
|---|---|---|---|
| `POST` | `/turns/schedule` | JWT | Crear turno |
| `GET` | `/turns/mis-turnos` | JWT | Obtener turnos del usuario logueado |
| `GET` | `/turns/` | JWT | Obtener todos los turnos |
| `GET` | `/turns/:id` | JWT | Obtener turno por ID |
| `PUT` | `/turns/cancel/:id` | JWT | Cancelar turno |

---

## Autenticacion

El sistema usa **JSON Web Tokens (JWT)**. Al hacer login, el servidor devuelve un token que debe enviarse en el header de cada peticion protegida:

```
Authorization: Bearer <token>
```

El token expira en **24 horas**. Si expira, el frontend redirige automaticamente al login.

---

## Modelo de datos

### User
| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | `integer PK` | Identificador unico |
| `name` | `varchar` | Nombre completo |
| `email` | `varchar UNIQUE` | Email del usuario |
| `birthdate` | `date` | Fecha de nacimiento (opcional) |
| `nDni` | `integer` | Numero de DNI (opcional) |
| `credentialsId` | `integer FK` | Referencia a Credential |

### Credential
| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | `integer PK` | Identificador unico |
| `username` | `varchar UNIQUE` | Nombre de usuario para login |
| `password` | `varchar` | Contrasena hasheada con bcrypt |

### Turno
| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | `integer PK` | Identificador unico |
| `date` | `varchar` | Fecha en formato `YYYY-MM-DD` |
| `time` | `varchar` | Hora en formato `HH:mm` |
| `specialty` | `varchar` | Especialidad medica del turno |
| `status` | `varchar` | `active` o `cancelled` |
| `userId` | `integer FK` | Referencia al usuario dueno |

---

## Reglas de negocio

- Solo se pueden agendar turnos a partir del **dia siguiente**
- No se permiten turnos en **fines de semana**
- El horario disponible es de **06:00 a 17:00**
- Multiples usuarios pueden agendar el mismo horario (recursos infinitos)
- Solo el **dueno del turno** puede cancelarlo
- Solo se puede cancelar un turno **hasta el dia anterior** a la fecha reservada

---

## Notificaciones por email

El sistema envia emails automaticos en los siguientes eventos:

| Evento | Asunto |
|---|---|
| Registro de cuenta | Bienvenido/a a MediTom 🎉 |
| Turno agendado | Turno confirmado en MediTom ✅ |
| Turno cancelado | Turno cancelado en MediTom ❌ |

---

## Scripts disponibles

### Backend

| Script | Descripcion |
|---|---|
| `npm run dev` | Servidor en modo desarrollo con nodemon |
| `npm run build` | Compila TypeScript a JavaScript |
| `npm start` | Inicia el servidor compilado |

### Frontend

| Script | Descripcion |
|---|---|
| `npm run dev` | Inicia Vite en modo desarrollo |
| `npm run build` | Genera el build de produccion |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | Ejecuta ESLint |

---

## Solucion de problemas frecuentes

**`password authentication failed for user "postgres"`**  
→ La contrasena en `DB_PASSWORD` no coincide con la de tu PostgreSQL local.

**`database "meditom" does not exist`**  
→ Falta crear la base de datos. Ejecuta el paso 3 de la instalacion.

**`EADDRINUSE: address already in use :::3000`**  
→ El puerto 3000 esta ocupado. Cambia `PORT` en el `.env` o cierra el proceso que lo usa.

**El frontend no se conecta al backend**  
→ Verifica que el backend este corriendo en `http://localhost:3000` antes de usar el frontend.

**Los emails no llegan**  
→ Revisa la carpeta de Spam. Verifica que `EMAIL_USER` y `EMAIL_PASS` esten correctamente configurados en el `.env`.

---

## Autor

Desarrollado por **Sarhen Ramirez** — Proyecto PM3
