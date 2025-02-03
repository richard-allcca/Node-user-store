# Rest Project + TypeScript

Authentication and Authorization

## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` para instalar las dependencias
3. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
4. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo

## Enlaces

[JWT - Debuger](https://jwt.io/)

## Example of folders structure - Clean architecture

```md
└── 📁src
    └── 📁config                # Configuración
        └── bcrypt.adapter.ts
        └── envs.ts
        └── jwt.adapter.ts
        └── regular-exp.ts
    └── 📁data                  # Datos
        └── 📁repositories      # Repositorios (Implementaciones)
            └── user.repository.ts
        └── 📁sources           # Fuentes de datos (APIs, Bases de Datos)
            └── 📁mongo         # Específicos de MongoDB
                └── conection.ts
    └── 📁domain                # Dominio
        └── 📁models            # Modelos de dominio
            └── user-model.ts
        └── 📁dtos              # Data Transfer Objects
            └── login-user.dto.ts
            └── register-user.dto.ts
        └── 📁entities          # Entidades
            └── entity.ts
        └── 📁errors            # Errores
            └── custom.error.ts
        └── 📁use_cases         # Casos de uso
            └── create-user.use-case.ts
            └── login-user.use-case.ts
            └── update-user.use-case.ts
    └── 📁presentation          # Presentación (UI/UX)
        └── 📁auth              # Autenticación
            └── controllers.ts
            └── routes.ts
        └── routes.ts
        └── server.ts
    └── 📁services              # Servicios
        └── auth.service.ts
        └── email.service.ts
    └── 📁shared                # Código compartido/utilidades
        └── 📁utils             # Utilidades y funciones generales
            └── ...
        └── 📁constants         # Constantes y definiciones globales
            └── ...
    └── app.ts
```
