# API REST de usuarios, categorías y productos

API desarrollada con Node.js, TypeScript, Express y MongoDB. Incluye registro e inicio de sesión, validación de correo, gestión básica de categorías y productos, y carga y consulta de imágenes.

## Requisitos

- Node.js y npm
- MongoDB local o accesible desde la aplicación. Docker Compose puede iniciar MongoDB para desarrollo.
- Una cuenta de correo compatible con Nodemailer para el envío de enlaces de validación.

## Configuración

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Copia `.env.template` como `.env` y configura las variables:

   ```bash
   # Windows PowerShell
   Copy-Item .env.template .env

   # macOS / Linux
   cp .env.template .env
   ```

3. Define en `.env` estas variables:

   | Variable | Descripción |
   | --- | --- |
   | `PORT` | Puerto HTTP de la API, por ejemplo `3000`. |
   | `MONGO_URL` | URI de conexión a MongoDB. |
   | `MONGO_DB_NAME` | Nombre de la base de datos. |
   | `JWT_SEED` | Secreto usado para firmar y validar tokens JWT. |
   | `MAILER_SERVICE` | Servicio de correo que acepta Nodemailer, por ejemplo `gmail`. |
   | `MAILER_EMAIL` | Cuenta usada para enviar mensajes. |
   | `MAILER_SECRET_KEY` | Credencial o contraseña de aplicación del servicio de correo. |

   Todas son obligatorias al iniciar la aplicación. Usa valores propios, fuertes y fuera del control de versiones; no publiques el archivo `.env` ni reutilices credenciales de ejemplo.

4. Para iniciar MongoDB con Docker Compose:

   ```bash
   docker compose up -d mongo-db
   ```

   Con las credenciales definidas en `docker-compose.yml`, la URI local debe autenticar contra la base `admin`, por ejemplo:

   ```text
   mongodb://mongo-user:123456@localhost:27017/mystore?authSource=admin
   ```

   Configura esa URI en `MONGO_URL` y `mystore` en `MONGO_DB_NAME`. Los datos se conservan en el directorio `mongo/`. Para detener el contenedor: `docker compose down`.

## Comandos

| Comando | Acción |
| --- | --- |
| `npm run dev` | Inicia la API en modo desarrollo. |
| `npm run build` | Compila TypeScript en `dist/`. |
| `npm start` | Compila y ejecuta la versión de `dist/`. |
| `npm run seed-data` | Vacía usuarios, productos y categorías, y carga los datos de ejemplo. |

**Atención:** `npm run seed-data` elimina primero los datos de esas tres colecciones. Úsalo solo en una base de desarrollo o después de hacer una copia de seguridad.

## API

Las rutas están bajo `/api`. Las rutas protegidas requieren `Authorization: Bearer <token>`.

| Método | Ruta | Acceso / notas |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Registro de usuario; envía la validación por correo. |
| `POST` | `/api/auth/login` | Inicio de sesión. |
| `GET` | `/api/auth/validate-email/:token` | Valida el correo con el token recibido. |
| `GET` | `/api/categories?page=1&limit=10` | Lista categorías con paginación. |
| `POST` | `/api/categories` | Requiere JWT; crea una categoría. |
| `GET` | `/api/products?page=1&limit=10` | Lista productos con paginación. |
| `POST` | `/api/products` | Requiere JWT; crea un producto. |
| `GET` | `/api/products/:id` | Actualmente devuelve una respuesta provisional. |
| `PUT` | `/api/products/:id` | Actualmente devuelve una respuesta provisional. |
| `DELETE` | `/api/products/:id` | Actualmente devuelve una respuesta provisional. |
| `POST` | `/api/upload/single/:type` | Carga un archivo; `type` admite `users`, `products` o `categories`. |
| `POST` | `/api/upload/multiple/:type` | Carga varios archivos; `type` admite `users`, `products` o `categories`. |
| `GET` | `/api/images/:type/:image` | Devuelve un archivo de imagen. |

Las cargas usan `multipart/form-data` con el campo `file`. El límite configurado por Express es de 50 MB por archivo.

## Estructura del proyecto

```text
src/
├── config/          # Variables de entorno, JWT, bcrypt y validadores
├── data/            # Conexión, modelos de MongoDB y datos de ejemplo
├── domain/          # DTOs, entidades, errores y casos de uso
├── presentation/    # Servidor Express, rutas, controladores y middleware
└── services/        # Servicios de autenticación, correo, archivos y recursos
public/              # Contenido estático servido por Express
uploads/             # Archivos cargados
```

## Enlaces

- [Depurador de JWT](https://jwt.io/)
