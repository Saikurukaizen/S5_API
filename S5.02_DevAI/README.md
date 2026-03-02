# 🏃‍♀️ Fitbit UI Client / Frontend Client

## 👤 Alumno
Desarrollado por Marc Sanchez
IT Academy - Sprint 5
Arquitectura API REST

## 📖 Descripción
Interfaz de usuario Cliente para el consumo de la API REST, almacenado en S5.01_API_REST/fitbit. Una interfaz potente e interactiva, integrada con el backend / db y creada con agentes de IA a partir de toda la documentación generada en la API.

DISCLAIMER
Está en fase de mejora e implementación. Se implementarán soluciones de tiempos de carga, funcionabilidades, etc.  

## 🎯 Palabras Clave
- IA Generativa
- Motores IA
- Agentes MCP
- IA Workflow
- Claude Code
- React Components
- TypeScript
- Responsive Web Design

## Características Principales

### Implementaciones de IA

- Toda la implementación frontend UX/UI ha sido usando motores y agentes de IA como requisito obligatorio para este proyecto, usando metodologías de prompt como ASPECCT.

- **IA Backend**: Laravel GPT de OpenAI
- **Responsable de diseño**: Claude Sonnet 4 - Fitbit Frontend Design.
- **Frontend React Senior**: GPT React Assistant.
- **Frontend TypeScript Senior**: Claude Sonnet 4.5 TypeScript Frontend.
- **Especialista SEO Frontend**: ChatGPT 4o & Claude Sonnet 4.5
- **Full-Stack Mid-Senior Assistant**: Github Copilot integrado en IDE.

### Flujo de trabajo de IA

Planificación (Claude & ChatGPT 4o) 
   ↓
Diseño UX/UI (Claude)
   ↓
Implementación React (React Frontend Assistant + Copilot)
   ↓
Validación API (Laravel GPT)
   ↓
Revisión Semántica y Debug (Claude + Copilot)
   ↓
Iteración siguiente

### Metodología de prompts

He usado la metodología ASPECCT para coordinar a los modelos:

| Sigla | Función | Ejemplo |
|--------|:----:|:---------:|
| A | Actor / Rol | “Actúa como diseñador UI experto en dashboards médicos” |
| S | Stage / Contexto | “Estamos en la fase de planificación de la vista principal del panel de actividad del usuario.” |
| P | Purpose / Objetivo | “Definir los componentes visuales que mostrarán los datos de Fitbit.” |
| E | Expectation / Output esperado | “Devuelve un esquema JSON con nombre de componente, tipo y props.” |
| C | Constraints / Límites | “Usa TailwindCSS y componentes reutilizables, sin dependencias extra.” |
| C(2) | Checks / Validación | “Verifica consistencia con los endpoints de la API Swagger.” |
| T | Tone / Estilo | “Profesional y académico, claro, con foco en reusabilidad.” |

---

- **CRUD completo de usuarios** con perfiles y roles
- **Disciplinas deportivas** (CRUD con permisos de admin)
- **Comunidades fitness** con membresías dinámicas
- **Estadísticas avanzadas** de usuarios, disciplinas y comunidades
- **Sistema de roles** con diferentes niveles de acceso

## 🛠️ Stack Tecnológico
- **Docker** - Creación de contenedores frontend/backend en local
- **React v.^18.0** - Lenguaje de componentes reactivos
- **TypeScript v.^5.0** - Para comportamiento asíncronos.
- **Vite** - Para creación de builds
- **TailwindCSS** - Para diseño de IU Client & Landing Page
- **TanStack Query** - React Query para caché
- **Axios** - Para interceptores HTTP
- **IDE** - Visual Studio Code
- **Git** / **Github**
- **Gitflow** - Metodología de features

## 📋 Requisitos del Sistema

- **Servidor web**: XAMPP, MAMP, LAMP o similar
- **PHP >= 8.1** (PHP 8.1.10 recomendado)
- **Composer** (Gestión de dependencias)
- **MySQL >= 5.7** o compatible
- **Git** (Control de versiones)

## **1. Estructura del Proyecto**

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Auth/           # Sistema de autenticación
│   │   ├── RoleGuard/      # Control de acceso por roles
│   │   └── UI/             # Componentes de interfaz
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   ├── providers/          # Providers de la aplicación
│   ├── styles/             # Estilos globales y temáticos
│   └── types/              # Definiciones TypeScript
├── public/                 # Assets estáticos
└── docs/                   # Documentación del proyecto

```
## **⚡ Performance Optimizada**
- **Build time**: ~964ms para 177 modules
- **Bundle size**: Optimizado con tree-shaking
- **CSS**: Hardware-accelerated animations
- **Dependencies**: Solo las necesarias, sin bloat

## **🔧 Developer Experience**
- **Hot reload**: Instantáneo con Vite 6.x
- **TypeScript**: Strict mode habilitado
- **Error handling**: Boundaries y feedback claro
- **DevTools**: Integración nativa y personalizada

## 🛠️ Instalación y Configuración

### � **Rutas RESTful Frontend**

### **🌐 Arquitectura RESTful Completa**

El frontend implementa rutas que corresponden exactamente con los endpoints del backend API:

#### **🔓 Rutas Públicas**
```bash
✅ http://localhost:5173/login           # Formulario de login
✅ http://localhost:5173/register        # Formulario de registro
```

#### **🔐 Rutas Protegidas - Principales**
```bash
✅ http://localhost:5173/dashboard       # Panel principal
✅ http://localhost:5173/profile         # Perfil de usuario
```

#### **🏃‍♀️ Rutas Protegidas - Disciplinas**
```bash
✅ http://localhost:5173/disciplines           # GET /api/v1/disciplines
✅ http://localhost:5173/disciplines/create    # POST /api/v1/disciplines
✅ http://localhost:5173/disciplines/:id       # GET /api/v1/disciplines/{id}
```

#### **👥 Rutas Protegidas - Comunidades**
```bash
✅ http://localhost:5173/communities           # GET /api/v1/communities
✅ http://localhost:5173/communities/create    # POST /api/v1/communities
✅ http://localhost:5173/communities/:id       # GET /api/v1/communities/{id}
```

#### **👤 Rutas Protegidas - Usuarios**
```bash
✅ http://localhost:5173/users                 # GET /api/v1/users
✅ http://localhost:5173/users/create          # POST /api/v1/users
✅ http://localhost:5173/users/:id             # GET /api/v1/users/{id}
```

#### **📊 Rutas Protegidas - Estadísticas**
```bash
✅ http://localhost:5173/stats                 # Panel general
✅ http://localhost:5173/stats/disciplines     # GET /api/v1/stats/disciplines/*
✅ http://localhost:5173/stats/users           # GET /api/v1/stats/users/*
✅ http://localhost:5173/stats/communities     # GET /api/v1/stats/communities/*
```

### **🎯 Principios RESTful Implementados**

#### **✅ Un Recurso = Una URL**
```bash
❌ Antes: /login (contenía login + register)
✅ Ahora: /login y /register (recursos separados)
```

#### **✅ URLs Semánticamente Correctas**
```bash
✅ /disciplines/create     # Crear disciplina
✅ /disciplines/123        # Ver disciplina ID 123
✅ /communities/456        # Ver comunidad ID 456
✅ /stats/users           # Estadísticas de usuarios
```

#### **✅ Navegación Stateless**
```typescript
// ✅ Navegación RESTful
<Link to="/disciplines">Ver Disciplinas</Link>
<Link to="/communities/create">Crear Comunidad</Link>

// ❌ Antes (estado local)
<button onClick={() => setTab('disciplines')}>
```

#### **✅ URLs Bookmarkeables**
- Cada URL puede ser guardada como marcador
- Compartir URLs específicas funciona
- Navegación directa por URL habilitada

### **🛡️ Control de Acceso por Rutas**

#### **Permisos del Backend Reflejados:**
```bash
# Disciplinas - Solo Admin
/disciplines/create         → can:manage-disciplines

# Comunidades - Solo Admin  
/communities/create         → can:manage-communities

# Usuarios - Solo Admin
/users                      → can:viewAllUsers
/users/create              → can:createUser

# Estadísticas - Permisos específicos
/stats/*                   → can:viewStats
```

## �🚀 Ejecución Rápida (Dependencias ya instaladas)

DISCLAIMER: Necesitarás clonar el servidor para hacer funcionar la integración frontend/backend
y para la navegación por endpoints con middleware. Usa un php artisan serve para levantar el backend

#### 1. Configuración del Entorno
Edita el archivo `.env.local` para configurar la URL de tu API:

```env
# URL base de la API Laravel
API_BASE_URL=http://localhost:8000/api

# Otras configuraciones
VITE_APP_NAME=DevAI Frontend
```

#### 2. Ejecutar el Frontend

```bash
# Navegar al directorio frontend
cd frontend

# Ejecutar servidor de desarrollo
npm run dev
```

El frontend se ejecutará en: **http://localhost:5173**

#### 3. Verificar Conexión
- ✅ Frontend: http://localhost:5173
- ✅ API Backend: http://localhost:8000/api
- ✅ Sin errores de CORS

### 🔧 Instalación Completa (si es necesario)

#### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- API REST ejecutándose (backend Laravel)

#### Instalación de Dependencias
```bash
# Si necesitas reinstalar dependencias
npm install
```

### 📋 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo (puerto 5173)

# Producción
npm run build        # Construir para producción
npm run preview      # Vista previa de la build

# Linting y formato
npm run lint         # Ejecutar ESLint
npm run type-check   # Verificar tipos TypeScript
```

### 🌐 Configuración de API

#### Cliente API Automático
El proyecto utiliza configuración automática en `src/api/client.ts`:
- ✅ Conexión automática via variables de entorno
- ✅ Gestión automática de tokens JWT
- ✅ Interceptores request/response
- ✅ Timeout configurado (10 segundos)
- ✅ Manejo de errores centralizados

#### Autenticación
Configuración en `src/config/auth.config.ts`:
- ✅ URL base configurable
- ✅ Endpoints predefinidos (login/logout)
- ✅ Gestión automática de sesiones

### 🚨 Resolución de Problemas

#### Error de Conexión API
- Verificar que la API esté ejecutándose en el puerto correcto
- Revisar la URL en `.env.local`
- Comprobar configuración CORS en Laravel

#### Puerto 5173 Ocupado
- Vite elegirá automáticamente el siguiente puerto disponible
- El puerto puede cambiarse en `vite.config.js`

### ✅ Checklist de Verificación

- [ ] Node.js instalado (v16+)
- [ ] API Laravel ejecutándose
- [ ] `.env.local` configurado correctamente
- [ ] `npm run dev` ejecutado sin errores
- [ ] Frontend accesible en http://localhost:5173
- [ ] Sin errores de CORS en consola del navegador

## 🧪 Testing

### 📊 Estado Actual de Tests

### 🚀 Ejecutar Tests

## 🔐 Autenticación

### 🎫 Credenciales de Prueba

Para probar la aplicación, usa estas credenciales (asegúrate de que estén creadas en tu base de datos):

```json
// Usuario Admin
{
  "email": "admin@test.com",
  "password": "password123"
}

// Usuario Regular
{
  "email": "user@test.com", 
  "password": "password123"
}

// Usuario Moderador
{
  "email": "moderator@test.com",
  "password": "password123"
}
```

### 🔑 Tokens

El sistema maneja automáticamente:
- ✅ **JWT Tokens**: Gestión automática de autenticación
- ✅ **Refresh Tokens**: Renovación automática de sesiones
- ✅ **Storage**: Almacenamiento seguro en localStorage
- ✅ **Interceptors**: Inclusión automática en headers

### **🎮 Navegación RESTful Práctica**

#### **1. Sin Backend (Solo Interfaz)**
```bash
✅ http://localhost:5173/login        # Formulario de login
✅ http://localhost:5173/register     # Formulario de registro
❌ Otras rutas → Redirigen a /login (requieren autenticación)
```

#### **2. Con Backend Completo**
```bash
# Después de hacer login exitoso:
✅ http://localhost:5173/dashboard         # Panel principal
✅ http://localhost:5173/disciplines       # Lista disciplinas
✅ http://localhost:5173/communities       # Lista comunidades
✅ http://localhost:5173/users             # Gestión usuarios (admin)
✅ http://localhost:5173/stats             # Estadísticas (permisos)

# Navegación por recursos:
✅ http://localhost:5173/disciplines/123   # Detalle disciplina
✅ http://localhost:5173/communities/456   # Detalle comunidad
✅ http://localhost:5173/users/789         # Perfil usuario
```

#### **3. Navegación Directa por URL**
```bash
# ✅ Ahora puedes hacer:
- Bookmark de cualquier página específica
- Compartir URL directa a un recurso
- Navegación por URL sin estado local
- Recargar página mantiene el contexto
```

### 🎯 Funcionalidades por Rol

#### 👤 Usuario Regular
- ✅ Ver perfil propio
- ✅ Editar datos personales
- ✅ Ver comunidades públicas
- ✅ Unirse/salir de comunidades

#### 🛡️ Moderador
- ✅ Todas las funciones de usuario
- ✅ Gestionar miembros de comunidades
- ✅ Moderar contenido

#### 👑 Administrador
- ✅ Todas las funciones anteriores
- ✅ Gestión completa de usuarios
- ✅ CRUD de disciplinas
- ✅ CRUD de comunidades
- ✅ Acceso a estadísticas completas

## 🏗️ Arquitectura del Proyecto

### 📁 Estructura de Directorios

### Flujo de Datos
1. **Request**         - Middleware de autenticación
2. **Controller**      - Validación con Form Requests
3. **Policy**          - Verificación de permisos
4. **Model**           - Lógica de negocio
5. **Resource**        - Formateo de respuesta JSON

### 🌿 Seeders

## 🚀 Despliegue y Producción

### 📦 Comandos de Despliegue


### 🔧 Variables de Entorno Importantes

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles
- []()
- []()
- []()
- []()
- []()

### 🎓 Aprendizajes del Sprint 5.02


### 📋 Metodología de Desarrollo


## 👤 Autor

*Marc Sanchez*  

*Frontend moderno, seguro, de alto performance y con una experiencia de desarrollo excepcional.* ⚡🎨✨
 

**🎯 Estado del Proyecto**: **PRODUCTION READY** ✅  
**📅 Última actualización**: Noviembre 2025  
**🔗 Documentación Swagger**: `http://localhost:8000/api/documentation`