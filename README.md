# CRUD de Clientes — React + Node (Vercel)

Un proyecto full‑stack pensado para demostrar buenas prácticas modernas en frontend y backend: autenticación JWT, rutas protegidas, CRUD de clientes, y despliegue en Vercel. Ideal para evaluación técnica rápida: está funcional, seguro y fácil de entender.

## Qué resuelve
- Permite registrarse, iniciar sesión y cerrar sesión.
- Gestiona clientes (crear, listar, editar, eliminar) con rutas protegidas.
- Experiencia de usuario con toasts y estados de carga.
- Deploy productivo en Vercel con backend serverless y SPA en React.

## Demo
- Frontend: https://crud3-x65b.vercel.app/
- Backend (health): https://crud3-puce.vercel.app/api/health
- Usuario demo: disponible automáticamente si se define DEMO_EMAIL y DEMO_PASSWORD en el backend. También puedes registrarte y usar tu propia cuenta.

## Tecnologías
- Frontend: React + Vite, React Router, Axios, Tailwind CSS.
- Backend: Node.js + Express, MongoDB (Mongoose), JWT, bcrypt, CORS.
- Infraestructura: Vercel (monorepo con `client` y `server`), rutas configuradas en `vercel.json`.

## Arquitectura
- SPA en `client` consume API REST de `server`.
- Autenticación con JWT:
  - Login emite token y se almacena en `localStorage`.
  - Interceptor Axios añade `Authorization: Bearer <token>`.
  - Middleware en el backend valida el token y protege `/api/clients`.
- Conexión a MongoDB con caché de conexión para entornos serverless.

## Endpoints principales
- Auth
  - `POST /api/auth/register` — Registra usuario (email, password).
  - `POST /api/auth/login` — Devuelve `token` JWT.
- Clients (requiere `Authorization: Bearer`)
  - `GET /api/clients`
  - `POST /api/clients`
  - `PUT /api/clients/:id`
  - `DELETE /api/clients/:id`

## Seguridad
- Secretos solo en servidor: `JWT_SECRET`, `DEMO_EMAIL`, `DEMO_PASSWORD`, `MONGODB_URI`.
- El repositorio ignora `.env` tanto en raíz, `server` y `client`.
- En el cliente solo se usan variables públicas `VITE_*` (no contienen secretos).
- CORS restringe orígenes permitidos (localhost y dominios deploy).

## Cómo correr localmente
1) Clonar el repo.
2) Backend (`/server`):
   - Crear `.env` con:
     - `MONGODB_URI=<tu cadena de conexión>`
     - `JWT_SECRET=<valor seguro>`
     - (Opcional) `DEMO_EMAIL`, `DEMO_PASSWORD`
   - Instalar y levantar:
     - `npm install`
     - `npm run dev`
3) Frontend (`/client`):
   - Crear `.env` con:
     - `VITE_API_URL=http://localhost:3000` (o el puerto donde corra el backend)
     - (Opcional) `VITE_DEMO_EMAIL`, `VITE_DEMO_PASSWORD`
   - Instalar y levantar:
     - `npm install`
     - `npm run dev`

Notas:
- En producción, `VITE_API_URL` apunta al backend de Vercel (`https://crud3-puce.vercel.app`).
- Si cambias el puerto del frontend, actualiza los orígenes permitidos en el CORS del backend.

## Despliegue en Vercel
- Se usa un único `vercel.json` en la raíz:
  - Build de `server/index.js` con `@vercel/node`.
  - Build de `client` con `@vercel/static-build` (`dist`).
  - Rutas: `/api/*` hacia el backend y `/(.*)` hacia `client/dist/index.html`.
- Variables de entorno se definen en el proyecto backend en Vercel.

## Qué evaluar (como reclutador)
- Claridad de arquitectura y separación de responsabilidades.
- Buenas prácticas de seguridad (JWT, bcrypt, CORS, .env).
- UX simple y efectiva (toasts, estados de carga, rutas protegidas).
- Deploy confiable y reproducible con Vercel.


