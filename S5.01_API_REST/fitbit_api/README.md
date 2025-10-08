# 🏃‍♀️ Fitbit API - Laravel REST API

## 👤 Alumno
Desarrollado por Marc Sanchez
IT Academy - Sprint 5
Arquitectura API REST

## 📖 Descripción

Proyecto Backend del Sprint 5 sobre API REST para el Bootcamp de PHP de la IT Academy.

Esta API RESTful está desarrollada con Laravel v.12.0, para la gestión de usuarios, disciplinas deportivas y comunidades fitness. El desarrollo está basado bajo la implementación de Testing TDD, los endpoints REST implementados en el proyecto, su arquitectura y casos de uso principales. Todo el contexto de la API reside aquí.

Se ha incluido paquetes de:
- **Laravel Passport** para la autenticación **OAuth2** de tokens.
- **Swagger** para la documentación API.

Las bases de construcción se han basado rigurosamente bajo la Disertación de Roy T Fielding (Cap. 5) para la aplicación de buenas practicas RESTful 

[Ver Disertación](https://ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf)

## 🎯 Palabras Clave
- API REST
- Laravel Passport
- OAuth2
- Endpoints
- HTTP Responses
- Policies / Resources
- TDD
- Swagger

## Características Principales

### 🔐 Autenticación y Autorización
- **OAuth2** con Laravel Passport (Personal Access Tokens)
- **Roles de usuario**: User, Admin, Moderator
- **Middlewares:** Uso de protección Auth para endpoints
- **Tokens de 15 días** de duración configurables

### 📊 Funcionalidades Core
- **CRUD completo de usuarios** con perfiles y roles
- **Disciplinas deportivas** (CRUD con permisos de admin)
- **Comunidades fitness** con membresías dinámicas
- **Estadísticas avanzadas** de usuarios, disciplinas y comunidades
- **Sistema de roles** con diferentes niveles de acceso

### 🛠️ Stack Tecnológico
- **XAMPP** - Servidor local
- **PHP v.8.3** - Lenguaje de programación
- **Laravel v.12.0** - Framework PHP
- **Laravel Passport v.13.2** - Autenticación con protocolo OAuth2
- **MySQL** - Base de datos
- **PHPUnit v.11.5** - Testing con TDD
- **Swagger/OpenAPI v.3.0** - Documentación API interactiva
- **L5-Swagger** - Generación automática de documentación
- **IDE** - Visual Studio Code
- **Git** / **Github**
- **Gitflow** - Metodología de features

## 📋 Requisitos del Sistema

- **Servidor web**: XAMPP, MAMP, LAMP o similar
- **PHP >= 8.1** (PHP 8.1.10 recomendado)
- **Composer** (Gestión de dependencias)
- **MySQL >= 5.7** o compatible
- **Git** (Control de versiones)

## 🛠️ Instalación y Configuración

### 1.- Clonar el Repositorio

```bash
git clone https://github.com/Saikurukaizen/S5_API/fitbit_api

cd fitbit_api
```

### 2.- Instalar Dependencias

```bash
composer install
```

### 3.- Configurar Variables de Entorno

Para configurar las variables de entorno, ya sea para desarrollo o producción, realiza lo siguiente:

```bash
cp .env.example .env
php artisan key:generate
```

### 4.- Configurar Base de Datos
Edita el archivo `.env` con tus credenciales de base de datos:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fitbit_api
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
```
**NOTA:** En el caso de que necesites la instalación para producción, tienes que añadir estas variables:

```env
PASSPORT_PERSONAL_ACCESS_CLIENT_ID=1
PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET=tu_secret
```

### 5.- Ejecuta las Migraciones y Seeders

Después de tener tu entorno preparado, necesitas migrar la base de datos y poblarla. Usa el comando:

```bash
php artisan migrate:fresh --seed
```

### 6.- Configura Laravel Passport

```bash
php artisan passport:install
```

### 7️⃣ Generar Documentación Swagger
```bash
php artisan l5-swagger:generate
```

**NOTA:** En las últimas versiones de Passport, el client_id y el Personal Access Token no lo genera automáticamente. Necesitas crearlo manualmente. Para ello, recomiendo crear un Passport Seeder

### 8️⃣ Iniciar Servidor de Desarrollo
Puedes usar el localhost del servidor de Laravel:

```bash
php artisan serve --port=8000
```

Recomiendo que, si usas un servidor local, uses siempre el mismo

## 🎯 Endpoints Principales

### 🔑 Autenticación
- `POST /api/v1/register` - Registro de usuarios
- `POST /api/v1/login` - Inicio de sesión
- `POST /api/v1/logout` - Cerrar sesión (requiere auth)
- `GET /api/v1/me` - Obtener usuario actual (requiere auth)

### 🏃‍♀️ Disciplinas (Solo Admin)
- `GET /api/v1/disciplines` - Listar todas las disciplinas
- `POST /api/v1/disciplines` - Crear una disciplina
- `GET /api/v1/disciplines/{id}` - Ver una disciplina
- `PUT /api/v1/disciplines/{id}` - Actualizar una disciplina
- `DELETE /api/v1/disciplines/{id}` - Eliminar una disciplina

### 👥 Comunidades
- `GET /api/v1/communities` - Listar comunidades
- `POST /api/v1/communities` - Crear comunidad (admin/mod)
- `GET /api/v1/communities/{id}` - Ver comunidad
- `PUT /api/v1/communities/{id}` - Actualizar comunidad
- `DELETE /api/v1/communities/{id}` - Eliminar comunidad

### 👤 Gestión de Usuarios
- `GET /api/v1/users` - Listar usuarios (admin/mod)
- `GET /api/v1/users/{id}` - Ver perfil de usuario
- `PUT /api/v1/users/{id}` - Actualizar usuario (admin/mod)
- `DELETE /api/v1/users/{id}` - Eliminar usuario (admin)

### 📊 Estadísticas
- `GET /api/v1/stats/communities` - Estadísticas generales de comunidades
- `GET /api/v1/stats/communities/ranking` - Ranking por miembros
- `GET /api/v1/stats/communities/percentage` - Porcentajes de comunidades
- `GET /api/v1/stats/communities/summary` - Resumen completo
- `GET /api/v1/stats/communities/by-discipline` - Estadísticas por disciplina

## 📚 Documentación Interactiva

### 🌐 Swagger UI
Una vez que el servidor esté ejecutándose, accede a la documentación interactiva:

- **Interfaz Swagger**: `http://localhost:8000/api/documentation`
- **JSON Schema**: `http://localhost:8000/docs/api-docs.json`
- **YAML Schema**: `http://localhost:8000/docs/api-docs.yaml`

### 🔧 Regenerar Documentación

```bash
php artisan l5-swagger:generate
```

## 🧪 Testing

### 🎯 Metodología TDD
El proyecto implementa **Test-Driven Development**, se ha aplicado tests con separación de responsabilidades en cada caso de uso. Cuenta con:

- Traits de autenticación personalizados
- Tests Feature/Integración para:
    . Tests Auth
    . validación de endpoints para Disciplines, Users, Communities y Stats
- Tests Unit para:
    . Modelos
    . Policies de roles y permisos
- Tests de Resources para la estructura JSON
- Tests de funcionalidad Management para casos de uso completos

### 📊 Estado Actual de Tests
- Total de tests en ejecución: **123 tests**
- Tests validados: **123** ✅
- Tasa de éxito en Testing: **100%** 🎯
- Cobertura en API: **99.2%**

### 🚀 Ejecutar Tests
```bash
# Ejecutar todos los tests
php artisan test

# Tests con cobertura
php artisan test --coverage

# Tests específicos
php artisan test --filter=AuthTest
```

## 🔐 Autenticación

### 🎫 Credenciales de Prueba

```bash
# Usuario Regular
Email: doom@user.com
Password: 666

# Administrador
Email: lux@admin.com
Password: 8000
```

### 🔑 Tokens
1. Haz un **login** en `/api/v1/login`
2. Obtiene el **token** del response
3. Incluyendolo en el Header: `Authorization: Bearer {token}`

### 📝 Ejemplo de Uso

```bash
# Login
curl -X POST http://localhost:8000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"doom@user.com","password":"666"}'

# Usar token en endpoints protegidos
curl -X GET http://localhost:8000/api/v1/me \
  -H "Authorization: Bearer {tu_token_aqui}"
```

## 🏗️ Arquitectura del Proyecto

Este proyecto cuenta con tipos de roles y permisos, según el tipo de usuario, y la comunidad a la que pertenece bajo una disciplina en concreto:

### 📁 Estructura de Directorios
```
app/
├── Http/
│   ├── Controllers/        # Controladores API
│   ├── Middleware/         # Middlewares personalizados
│   ├── Requests/           # Form requests
│   └── Resources/          # API resources
├── Models/                 # Modelos Eloquent
├── Policies/               # Políticas de autorización
└── Providers/              # Service providers

database/
├── factories/              # Factories para testing
├── migrations/             # Migraciones de BD
└── seeders/                # Seeders de datos

tests/
├── Feature/                # Tests de integración
├── Unit/                   # Tests unitarios
└── Traits/                 # Traits de testing
```

### Flujo de Datos
1. **Request**         - Middleware de autenticación
2. **Controller**      - Validación con Form Requests
3. **Policy**          - Verificación de permisos
4. **Model**           - Lógica de negocio
5. **Resource**        - Formateo de respuesta JSON

## 🌱 Base de Datos

###  Estructura Principal
- **users**             - Usuarios del sistema.
- **disciplines**       - Disciplinas deportivas.
- **communities**       - Comunidades de cada disciplina deportiva.
- **user_community**    - Tabla intermedia n:n
- **oauth_* tables**    - Tablas de Laravel Passport

### 🌿 Seeders

```bash
# Poblar datos de prueba
php artisan db:seed --class=DisciplineSeeder
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=CommunitySeeder
```

## 🚀 Despliegue y Producción

### 📦 Comandos de Despliegue
```bash
# Optimización para producción
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Migraciones en producción
php artisan migrate --force
```

### 🔧 Variables de Entorno Importantes
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tu-dominio.com

# Configuración OAuth
PASSPORT_PERSONAL_ACCESS_CLIENT_ID=1
PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET=tu_secret
```

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles
- [Documentación Laravel](https://laravel.com/docs)
- [Laravel Passport](https://laravel.com/docs/passport)
- [Swagger OpenAPI](https://swagger.io/specification/)
- [PHPUnit Testing](https://phpunit.de/documentation.html)
- [Disertación Roy T Fielding](https://ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf)

### 🎓 Aprendizajes del Sprint 5.01
- **API REST** con mejores prácticas
- **OAuth2** y seguridad en APIs
- **TDD** para desarrollo robusto
- **Documentación automática** con OpenAPI
- **Arquitectura escalable** con Laravel

### 📋 Metodología de Desarrollo
- Instalación y configuración de dependencias antes de codificar
- Uso de TDD para desarrollo guiado por tests
- Separación de la lógica de negocio y los endpoints
- Recursos y respuestas autodescriptivas
- Principios RESTful según *Roy T. Fielding*

## 👤 Autor

*Marc Sanchez*  
 
*Basado en: Disertación de Roy T. Fielding (Cap. 5) para prácticas RESTful.*

---

**🎯 Estado del Proyecto**: **PRODUCTION READY** ✅  
**📅 Última actualización**: Enero 2025  
**🔗 Documentación Swagger**: `http://localhost:8000/api/documentation`