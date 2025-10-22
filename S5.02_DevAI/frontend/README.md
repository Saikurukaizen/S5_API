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

## 🧪 Testing

### 📊 Estado Actual de Tests

### 🚀 Ejecutar Tests

## 🔐 Autenticación

### 🎫 Credenciales de Prueba


### 🔑 Tokens

### 📝 Ejemplo de Uso

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