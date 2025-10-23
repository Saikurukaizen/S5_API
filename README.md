<div align="center">

# 🏃‍♂️ Kaizen Fitbit Tracker

## 👤 Alumno
Desarrollado por Marc Sanchez

![Kaizen Logo](S5.02_DevAI/frontend/assets/img/Captura%20de%20pantalla%20logo.png)

**La plataforma definitiva para gestionar comunidades deportivas**

[![Live Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge&logo=railway)](https://s5-api-production.up.railway.app)
[![API Docs](https://img.shields.io/badge/API-Swagger-85EA2D?style=for-the-badge&logo=swagger)](https://s5-api-production.up.railway.app/api/documentation)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://github.com/Saikurukaizen/S5_API/tree/dev)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

[Características](#-características-principales) • [Demo](#-demo-interactiva) • [Tecnologías](#-stack-tecnológico) • [Instalación](#-instalación-rápida) • [Roadmap](#-roadmap-20)
</div>

---

## 📖 Índice

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura-del-sistema)
- [Demo Interactiva](#-demo-interactiva)
- [Instalación Rápida](#-instalación-rápida)
- [Uso y Configuración](#-uso-y-configuración)
- [Roadmap 2.0](#-roadmap-20)
- [Contribución](#-contribución)
- [Autor](#-sobre-el-autor)
- [Agradecimientos](#-agradecimientos)
- [Licencia](#-licencia)

---

## 📄 Descripción

**Kaizen Fitbit Tracker** es una plataforma full-stack moderna para la gestión integral de comunidades deportivas. Diseñada con arquitectura escalable y siguiendo las mejores prácticas de desarrollo, permite a usuarios, moderadores y administradores gestionar disciplinas, crear comunidades y analizar estadísticas en tiempo real.

Consta de una API REST para el servidor backend y una interfaz de cliente frontend.

DISCLAIMER: Es un proyecto en fase de mejora, y devuelve tanto datos de la db (como el perfil de usuario y rol o el listado de Disciplinas), como datos mockeados para testear la visualización completa del frontend. Así como algunos apartados a la espera de ser ampliados en ambas partes, mejoras en los tiempos de carga, etc.

### 🌟 ¿Por qué Kaizen?

> **Kaizen** (改善) = Mejora continua

- 🚀 **Rendimiento**: API REST optimizada con Laravel 12 y cache Redis
- 🎨 **UX/UI Moderna**: Interface Cyberpunk/Synthwave con React 18 + TypeScript
- 🔒 **Seguridad**: Autenticación JWT Bearer con roles granulares (User/Moderator/Admin)
- 📊 **Analytics**: Dashboard con estadísticas en tiempo real y visualizaciones interactivas
- 🐳 **DevOps**: Totalmente dockerizado y deployado en Railway
- 📱 **Responsive**: Diseño adaptativo para mobile, tablet y desktop.

## 🎯 Palabras Clave
- API REST
- IA Generativa
- TDD
- Agentes IA
- Flujo de Trabajo IA
- React
- TypeScript
- Integración Cliente/Servidor
- Docker
- Deploy

## IA

### Implementaciones de IA

- Toda la implementación frontend UX/UI ha sido usando motores y agentes de IA como requisito obligatorio para este proyecto, usando metodologías de prompt como ASPECCT.

- **IA Backend**: Laravel GPT de OpenAI
- **Responsable de diseño**: Claude Sonnet 4 - Fitbit Frontend Design.
- **Frontend React Senior**: GPT React Assistant.
- **Frontend TypeScript Senior**: Claude Sonnet 4.5 TypeScript Frontend.
- **Especialista SEO Frontend**: ChatGPT 4o & Claude Sonnet 4.5
- **Full-Stack Mid-Senior Assistant**: Github Copilot integrado en IDE.

<div align="center">

### Flujo de trabajo de IA

Planificación (Claude & ChatGPT 4o)
<tr>
   ↓
<tr>
Diseño UX/UI (Claude)
<tr>
   ↓
<tr>
Implementación React (React Frontend Assistant + Copilot)
<tr>
   ↓
<tr>
Validación API (Laravel GPT)
<tr>
   ↓
<tr>
Revisión Semántica y Debug (Claude + Copilot)
<tr>
   ↓
<tr>
*Iteración siguiente*

</div>

Cada ciclo produce artefactos concretos:

```typescript

- /docs/ui-wireframe.md → //generado por GPT-4o
- /src/routes.tsx →       //propuesto por React Assistant
- /src/components/... →   //implementado por Copilot
- /src/api/client.ts →    //validado por Laravel GPT
- /src/__tests__ →        //verificado por Claude

```

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

## ✨ Características Principales

### 🔐 Sistema de Autenticación Robusto

```typescript
// Autenticación JWT Bearer sin OAuth2
POST /api/v1/login    // Login con email/password
POST /api/v1/register // Registro de usuarios
POST /api/v1/logout   // Revocación de token server-side
GET  /api/v1/me       // Información del usuario autenticado
```

- ✅ Token Bearer de 15 días de duración
- ✅ Timeout de inactividad configurable (30 min)
- ✅ Revocación de tokens en logout
- ✅ Sistema de roles jerárquico (User < Moderator < Admin)

### 🏋️ Gestión de Disciplinas

- ➕ Crear nuevas disciplinas deportivas (Admin)
- ✏️ Editar nombre y descripción (Admin)
- 🗑️ Eliminar con confirmación modal (Admin)
- 📊 Ver estadísticas por disciplina
- 🎯 Filtrado y búsqueda avanzada

### 👥 Comunidades Activas

- 🌐 Listado completo de comunidades
- ➕ Crear comunidades asociadas a disciplinas (Admin/Moderator)
- 👤 Gestión de miembros y roles
- 📈 Estadísticas de comunidad al detalle
- 🔔 Notificaciones de actividad

### 📊 Dashboard de Analytics

```javascript
// Endpoints de estadísticas disponibles
GET /api/v1/stats/communities              // Resumen general
GET /api/v1/stats/communities/ranking      // Top 5 comunidades
GET /api/v1/stats/communities/percentage   // Distribución %
GET /api/v1/stats/communities/summary      // Métricas clave
GET /api/v1/stats/communities/by-discipline // Stats por disciplina
```

- 📊 Gráficos interactivos con Recharts
- 🏆 Ranking de comunidades más activas
- 🎯 Distribución por disciplinas
- 📈 KPIs en tiempo real

### 🛡️ Sistema de Roles y Permisos

| Acción | User | Moderator | Admin |
|--------|:----:|:---------:|:-----:|
| Crear Disciplinas | ❌ | ❌ | ✅ |
| Editar Disciplinas | ❌ | ❌ | ✅ |
| Crear Comunidades | ❌ | ✅ | ✅ |
| Gestionar Usuarios | ❌ | ✅ | ✅ |
| Eliminar Usuarios | ❌ | ❌ | ✅ |
| Ver Estadísticas | ❌ | ✅ | ✅ |
| Panel Admin | ❌ | ❌ | ✅ |

---

<div align="center">

## 🛠️ Tecnologías utilizadas

### Backend (API REST)

<table>
<tr>
<td align="center"><img src="https://laravel.com/img/logomark.min.svg" width="50"/><br/>Laravel 12</td>
<td align="center"><img src="https://www.php.net/images/logos/new-php-logo.svg" width="50"/><br/>PHP 8.3</td>
<td align="center"><img src="https://www.mysql.com/common/logos/logo-mysql-170x115.png" width="50"/><br/>MySQL 8</td>
<td align="center"><img src="S5.02_DevAI/frontend/assets/img/Redis-Logo-500x313.jpg" width="50"/><br/>Redis 7</td>
</tr>
</table>

- **Framework**: Laravel 12.0 (último estable)
- **Autenticación**: JWT Bearer (NO Passport OAuth2)
- **Base de Datos**: MySQL 8.0 con migraciones y seeders
- **Cache**: Redis para sesiones y queries
- **Documentación**: Swagger/OpenAPI 3.0
- **Testing**: PHPUnit con 80%+ coverage en +100 tests, con implementación TDD

### Frontend (SPA)

<table>
<tr>
<td align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="50"/><br/>React 18</td>
<td align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="50"/><br/>TypeScript</td>
<td align="center"><img src="https://vitejs.dev/logo.svg" width="50"/><br/>Vite</td>
<td align="center"><img src="S5.02_DevAI/frontend/assets/img/t_tailwind-css7675.logowik.com.webp" width="50"/><br/>Tailwind CSS</td>
</tr>
</table>

- **Framework**: React 18+ con hooks modernos
- **Lenguaje**: TypeScript 5+ (100% tipado)
- **Bundler**: Vite para builds ultrarrápidos
- **Estilos**: TailwindCSS + Custom Cyberpunk theme
- **State**: TanStack Query (React Query) para cache
- **Routing**: React Router v6
- **HTTP**: Axios con interceptores

### DevOps & Infraestructura

<table>
<tr>
<td align="center"><img src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" width="50"/><br/>Docker</td>
<td align="center"><img src="https://railway.app/brand/logo-light.svg" width="50"/><br/>Railway</td>
<td align="center"><img src="https://nginx.org/nginx.png" width="50"/><br/>Nginx</td>
<td align="center"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="50"/><br/>GitHub Actions</td>
</tr>
</table>

- **Contenedores**: Docker Compose para desarrollo local
- **Deploy**: Railway (backend + DB)
- **Web Server**: Nginx como reverse proxy
- **CI/CD**: GitHub Actions para testing y deploy automático

---

## 🏗 Arquitectura del Sistema

### Diagrama de Alto Nivel

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENTE (Browser)                       │
│                    React 18 + TypeScript                    │
└───────────────┬─────────────────────────────────────────────┘
                │
                │ HTTPS (TLS 1.3)
                ▼
┌─────────────────────────────────────────────────────────────┐
│                     Nginx (Reverse Proxy)                   │
└───────────────┬─────────────────────────────────────────────┘
                │
                │ Bearer Token JWT
                ▼
┌─────────────────────────────────────────────────────────────┐
│                  Laravel 12 API REST                        │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Controllers  │  │  Services    │  │   Models     │       │
│  │   (API v1)   │→ │   (Logic)    │→ │  (Eloquent)  │       │
│  └──────────────┘  └──────────────┘  └──────┬───────┘       │
└─────────────────────────────────────────────│─────────────  ┘
                                              │
                    ┌─────────────────────────┼─────────────┐
                    ▼                         ▼             ▼
           ┌──────────────┐         ┌──────────────┐  ┌──────────┐
           │  MySQL 8.0   │         │   Redis 7    │  │  Swagger │
           │  (Database)  │         │   (Cache)    │  │  (Docs)  │
           └──────────────┘         └──────────────┘  └──────────┘
```

### Estructura de Directorios

```

S5_API/
├── backend/                  # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/  # Lógica de endpoints
│   │   │   └── Middleware/   # JWT, CORS, Rate limit
│   │   ├── Models/          # Eloquent ORM
│   │   └── Services/        # Lógica de negocio
│   ├── database/
│   │   ├── migrations/      # Esquema DB versionado
│   │   └── seeders/         # Datos de prueba
│   ├── routes/
│   │   └── api.php          # Endpoints /api/v1/*
│   └── tests/               # PHPUnit tests
│
├── frontend/ (DevAI)        # React SPA
│   ├── src/
│   │   ├── api/             # Servicios HTTP
│   │   ├── components/      # Componentes reutilizables
│   │   ├── contexts/        # React Context (Auth)
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Vistas principales
│   │   └── utils/           # Helpers
│   ├── public/              # Assets estáticos
│   └── tests/               # Vitest + RTL
│
└── docker/                  # Configuración Docker
    ├── docker-compose.yml   # Orquestación de servicios
    ├── nginx/               # Config Nginx
    └── php/                 # Dockerfile PHP-FPM

```

---

## 🎮 Demo Interactiva

### 🌐 Acceso a la Aplicación

| Entorno | URL | Credenciales |
|---------|-----|--------------|
| **Producción** | [kaizen-fitbit.railway.app](https://s5-api-production.up.railway.app) | Ver abajo ↓ |
| **API Swagger** | [/api/documentation](https://s5-api-production.up.railway.app/api/documentation) | - |
| **Repositorio** | [GitHub](https://github.com/Saikurukaizen/S5_API/tree/dev) | - |

</div>

### 👤 Usuarios de Prueba

```javascript
// Administrador
{
  email: "lux@admin.com",
  password: "8000",
  role: "Admin"
}

// Usuario Regular
{
  email: "doom@user.com",
  password: "666",
  role: "User"
}

```

### 📸 Capturas de Pantalla

<details>
<summary>🖼️ Ver Screenshots (Click para expandir)</summary>

#### Login & Dashboard
![Login](S5.02_DevAI/frontend/assets/img/Captura%20de%20pantalla%202025-10-23%20063804.png)
*Pantalla de autenticación con diseño Cyberpunk*

![Dashboard](S5.02_DevAI/frontend/assets/img/Captura%20de%20pantalla%202025-10-23%20063206.png)
*Dashboard principal con estadísticas en tiempo real*

#### Gestión de Disciplinas
![Disciplines](S5.02_DevAI/frontend/assets/img/Captura%20de%20pantalla%202025-10-23%20063512.png)
*CRUD completo de disciplinas deportivas*

#### Comunidades Activas
![Communities](S5.02_DevAI/frontend/assets/img/Captura%20de%20pantalla%202025-10-23%20063442.png)
*Gestión de comunidades con estadísticas*

#### Analytics
![Analytics](S5.02_DevAI/frontend/assets/img/Captura%20de%20pantalla%202025-10-23%20063722.png)
*Dashboard de analytics con gráficos interactivos*

</details>

---

## 🚀 Instalación

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- ✅ Docker 24+ y Docker Compose 2.20+
- ✅ Node.js 20+ y npm 10+
- ✅ Git 2.40+

### Opción 1: Docker (Recomendado)

```bash
# 1. Clonar el repositorio
git clone https://github.com/Saikurukaizen/S5_API.git
cd S5_API

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Levantar todos los servicios
docker-compose up -d

# 4. Instalar dependencias y migrar DB
docker-compose exec backend composer install
docker-compose exec backend php artisan key:generate
docker-compose exec backend php artisan migrate --seed

# 5. Instalar frontend
cd frontend
npm install
npm run dev
```

**¡Listo!** 🎉
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`
- Swagger: `http://localhost:8000/api/documentation`

### Opción 2: Instalación Manual

<details>
<summary>📝 Ver instrucciones detalladas</summary>

#### Backend (Laravel)

```bash
# 1. Instalar dependencias PHP
cd backend
composer install

# 2. Configurar entorno
cp .env.example .env
php artisan key:generate

# 3. Configurar base de datos en .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fitbit_db
DB_USERNAME=root
DB_PASSWORD=

# 4. Migrar y seed
php artisan migrate:fresh --seed

# 5. Iniciar servidor
php artisan serve
```

#### Frontend (React)

```bash
# 1. Instalar dependencias
cd frontend
npm install

# 2. Configurar API URL
echo "REACT_APP_API_BASE_URL=http://localhost:8000/api/v1" > .env.local

# 3. Iniciar desarrollo
npm run dev
```

</details>

---

## 📖 Uso y Configuración

### Variables de Entorno

#### Backend (.env)

<!-- ```bash
# Aplicación
APP_NAME="Kaizen Fitness Tracker"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://s5-api-production.up.railway.app

# Base de Datos
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=kaizen_db
DB_USERNAME=kaizen_user
DB_PASSWORD=secure_password_here

# JWT
JWT_SECRET=your-super-secret-key
JWT_TTL=21600 # 15 días en minutos

# Redis
REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

# CORS
CORS_ALLOWED_ORIGINS=https://kaizen-frontend.vercel.app,http://localhost:3000
```

#### Frontend (.env.local)

```bash
# API
REACT_APP_API_BASE_URL=https://s5-api-production.up.railway.app/api/v1

# Timeouts
REACT_APP_INACTIVITY_TIMEOUT=1800000  # 30 minutos
REACT_APP_API_TIMEOUT=10000            # 10 segundos
``` -->

### Comandos Útiles

```bash
# Backend
php artisan migrate:fresh --seed  # Resetear BD con datos de prueba
php artisan test                  # Ejecutar tests
php artisan l5-swagger:generate   # Regenerar Swagger docs

# Frontend
npm run build                     # Build de producción
npm run preview                   # Preview del build
npm run test                      # Ejecutar tests con Vitest
npm run lint                      # Linter ESLint
```

### Testing

```bash
# Backend (PHPUnit)
docker-compose exec backend php artisan test --coverage

# Frontend (Vitest)
cd frontend
npm run test:coverage
```

---

## 🗺 Roadmap 2.0

### 🚧 En Desarrollo

#### 🎯 Mejoras de UX/UI Inmediatas

- [x] Modal unificado de creación (FAB "+" para Users/Disciplines/Communities)
- [ ] **Listado de comunidades** mejorado (igual diseño que disciplinas)
- [ ] **Sidebar de usuarios** con scroll infinite
- [ ] **Perfil de usuario** al clicar en lista (modal/página)
- [ ] **Moderación avanzada**: Asignar rol Moderator a miembros de comunidades

#### 📊 Analytics Avanzado

- [ ] **Gráficos completos** con Chart.js/Recharts:
  - 🍕 Pie charts para distribución
  - 📈 Line charts para evolución temporal
  - 📊 Bar charts para comparativas
- [ ] **Estadísticas por disciplina** al seleccionar disciplina:
  - Número de comunidades
  - Total de miembros
  - Actividad reciente
- [ ] **Estadísticas de comunidad** al clicar en comunidad activa:
  - Crecimiento de miembros
  - Actividad semanal/mensual
  - Distribución de roles
- [ ] **Click en "X miembros"** redirige a listado filtrado de usuarios

#### 🎮 Sistema de Gamificación (XP/Niveles)

- [ ] **Backend**: Implementar tablas `user_levels`, `xp_history`, `xp_actions`
- [ ] **Sistema de XP**:
  - +10 XP por completar actividad
  - +25 XP por crear disciplina
  - +15 XP por unirse a comunidad
  - +5 XP por login diario
- [ ] **Niveles progresivos**: 1-100 con progresión exponencial
- [ ] **Leaderboard público**: Ranking de usuarios por XP
- [ ] **Badges y logros**: Sistema de reconocimientos
- [ ] **Integración UI**: Badge de nivel en Header, progress bar

#### 🔧 Funcionalidades CRUD Mejoradas

- [ ] **Disciplinas**:
  - Modal de stats al seleccionar
  - Editar nombre/descripción in-place
  - Confirmación de borrado mejorada
- [ ] **Comunidades**:
  - Gestión de miembros (add/remove)
  - Asignar/revocar rol Moderator
  - Ver actividad reciente
- [ ] **Usuarios**:
  - Perfil completo con avatar
  - Historial de actividad
  - Comunidades a las que pertenece

### 🔮 Planificado (Q1 2026)

- [ ] **Notificaciones en tiempo real** (WebSockets)
- [ ] **Sistema de mensajería** entre usuarios
- [ ] **Calendario de eventos** por comunidad
- [ ] **Integración con APIs externas** (Strava, Garmin, Fitbit)
- [ ] **App móvil** (React Native)
- [ ] **PWA** con soporte offline
- [ ] **Multi-idioma** (i18n)

### 💡 Ideas Futuras

- [ ] Gamificación con desafíos y competiciones
- [ ] Sistema de recompensas y descuentos
- [ ] Integración con wearables (smartwatches)
- [ ] IA para recomendaciones personalizadas
- [ ] Marketplace de entrenadores/nutricionistas

---

<div align="center">

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Sigue estos pasos:

1. **Fork** el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### Estándares de Código

- **Backend**: PSR-12 (PHP Standards Recommendations)
- **Frontend**: ESLint + Prettier con reglas Airbnb
- **Commits**: Conventional Commits (feat, fix, docs, style, refactor, test)
- **Tests**: Cobertura mínima del 80%

### Reporte de Bugs

Si encuentras un bug, por favor [abre un issue](https://github.com/Saikurukaizen/S5_API/issues/new) con:
- Descripción del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots (si aplica)
- Entorno (OS, browser, versión)

---

## 👨‍💻 Sobre el Autor

![Marc Sanchez](S5.02_DevAI/frontend/assets/img/IMG_20251022_150709.png)

### **Marc Sanchez**
*Full-Stack Developer | DevOps Enthusiast | Open Source Contributor*

[![Portfolio](https://img.shields.io/badge/Portfolio-667eea?style=for-the-badge&logo=google-chrome&logoColor=white)](https://marcsanchez.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/marc-sanchez-dev)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Saikurukaizen)

</div>

#### 🎓 Formación

- **Certificado de competencias PHP Full-Stack** - Bootcamp PHP Fullstack - IT Academy - Barcelona
- **Introduction in Computer Science** - Harvard University (Actualmente en curso)
- **Certificado de profesionalidad Lv.3** - Desarrollo de Aplicaciones Web (2024-2026)
- **Certificaciones**:
  - MySQL advanced
  - AWS
  - Git & Github for Github Foundations
  - AI Introduction

#### 💼 Experiencia

- **Full-Stack Developer** @ IT Academy (2025)
  - Desarrollo de SPAs con TailwindCSS y AIGen
  - APIs RESTful con PHP/Laravel/Node.js
  - DevOps con Docker, CI/CD, Railway, AWS

#### 🛠️ Skills Técnicos

**Backend**: PHP, Laravel, Node.js, Java, C
**Frontend**: React, TypeScript, TailwindCSS, Next.js  
**Database**: MySQL, MongoDB, Redis  
**DevOps**: Docker, Kubernetes, GitHub Actions, Railway, Vercel  
**Tools**: Git, VSCode, Postman, Figma, Jira

#### 📊 Proyectos Destacados

- **Kaizen Fitbit Tracker** - Plataforma de gestión de comunidades deportivas
- **Geestor de tareas estilo Kanban** - Gestor de tareas en MVC 
- **e-Commerce con CRM** - Aplicación e-commerce con presupuestador para empresa de aluminios.
- **Filesystem Package** - Refactorización de un paquete de gestor de archivos

#### 🌱 Actualmente Aprendiendo

- Patrones de diseño, arquitectura de software
- Claude Code con IA
- Bases de Python
- Data Algorhytms

---

¿Te interesa colaborar? **¡Contáctame!**

</div>

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2025 Marc Sanchez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🙏 Agradecimientos

- **Rubén Francisco Alcalde aka CloudSalander** - Por la mentoría a lo largo del bootcamp, del cual no hubiera sido posible llegar hasta aquí sin su supervisión.
- **IT Academy Barcelona** - Por ampliar horizontes en el sector IT a nuevos devs
- **A mis compañeros del bootcamp** - Por las sesiones grupales de apoyo mutuo
- **Toni Domenech Quero / Ingenio Hosting** - Por los primeros pasos guiados y la confianza depositada desde el principio.

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐**

[![Star on GitHub](https://img.shields.io/github/stars/Saikurukaizen/S5_API?style=social)](https://github.com/Saikurukaizen/S5_API)
[![Watch on GitHub](https://img.shields.io/github/watchers/Saikurukaizen/S5_API?style=social)](https://github.com/Saikurukaizen/S5_API)
[![Fork on GitHub](https://img.shields.io/github/forks/Saikurukaizen/S5_API?style=social)](https://github.com/Saikurukaizen/S5_API/fork)

---

**Hecho con ❤️ por Marc Sanchez**

[↑ Volver arriba](#-kaizen-fitbit-tracker)

</div>