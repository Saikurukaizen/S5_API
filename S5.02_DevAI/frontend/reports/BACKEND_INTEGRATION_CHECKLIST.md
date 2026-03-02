# 🤝 Backend Integration Checklist

> **Propósito**: Guía para coordinar funcionalidades entre frontend y backend antes de implementar nuevas características.

---

## 📋 Checklist de Consultas Críticas

### 🔐 Sistema de Autenticación

#### ✅ **Confirmado - Funciona**
- [x] Login con email/password
- [x] Registro de usuarios
- [x] Bearer token authentication (15 días de duración)
- [x] Endpoint `/auth/me` para verificar usuario
- [x] Sistema de roles (User, Moderator, Admin)

#### ❓ **Pendiente de Confirmar**
- [ ] **Refresh Tokens**: ¿Existe endpoint `/auth/refresh`?
- [ ] **Logout Backend**: ¿Existe endpoint `/auth/logout` que invalide tokens?
- [ ] **Múltiples Dispositivos**: ¿Se pueden tener múltiples sesiones activas?
- [ ] **Gestión de Sesiones**: ¿Endpoint para ver/revocar sesiones activas?
- [ ] **Verificación de Email**: ¿Sistema de verificación implementado?
- [ ] **Reset de Contraseña**: ¿Flujo de reset por email implementado?
- [ ] **Expiración Personalizada**: ¿Se puede configurar duración de tokens?
- [ ] **Rate Limiting**: ¿Límites de intentos de login implementados?

#### 🚧 **Para Futuro (No Urgente)**
- [ ] Two-Factor Authentication (2FA)
- [ ] Login con redes sociales
- [ ] SSO (Single Sign-On)

---

### 🏆 Sistema de XP y Niveles (Para v2)

#### 🎯 **Eventos Automáticos de XP**
- [ ] **Event Listeners**: ¿Laravel Events configurado para detectar acciones?
- [ ] **Activity Created**: ¿Se dispara evento cuando usuario crea actividad?
- [ ] **Activity Completed**: ¿Se dispara evento al completar actividad?
- [ ] **Discipline Progress**: ¿Se trackea progreso en disciplinas?
- [ ] **Login Streak**: ¿Se puede detectar días consecutivos de login?

#### 💾 **Estructura de Base de Datos**
- [ ] **Tablas Existentes**: ¿Ya existe alguna tabla relacionada con XP/puntos?
- [ ] **User Levels**: ¿Campo `level` en tabla `users`?
- [ ] **XP History**: ¿Tabla para historial de puntos ganados?
- [ ] **Achievements**: ¿Sistema de logros/badges planificado?
- [ ] **Leaderboards**: ¿Soporte para rankings globales?

#### ⚡ **Performance y Escalabilidad**
- [ ] **Caching**: ¿Redis/Memcached para leaderboards?
- [ ] **Queue Jobs**: ¿Sistema de colas para procesamiento asíncrono?
- [ ] **Database Indexes**: ¿Índices optimizados para queries de XP?
- [ ] **Data Archiving**: ¿Estrategia para historial largo de XP?

#### 📱 **Notificaciones**
- [ ] **System Notifications**: ¿Sistema de notificaciones in-app?
- [ ] **Email Notifications**: ¿Emails para level-up/achievements?
- [ ] **Push Notifications**: ¿Notificaciones push para móvil?
- [ ] **Real-time Updates**: ¿WebSockets para updates en tiempo real?

---

### 📊 Sistema de Estadísticas

#### ✅ **Confirmado - Funciona**
- [x] Total de usuarios registrados
- [x] Total de disciplinas disponibles  
- [x] Total de actividades creadas
- [x] Usuarios activos (por definir criterio)

#### ❓ **Pendiente de Confirmar**
- [ ] **User Activity Timeline**: ¿Historial de actividades por usuario?
- [ ] **Discipline Analytics**: ¿Estadísticas detalladas por disciplina?
- [ ] **Completion Rates**: ¿Tasas de finalización de actividades?
- [ ] **Time Tracking**: ¿Tiempo dedicado a cada actividad/disciplina?
- [ ] **Progress Metrics**: ¿Métricas de progreso personal?

---

## 🛠️ Configuración de Desarrollo

### 📝 Variables de Entorno Requeridas

```bash
# Frontend (.env)
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME="IT Academy"

# ¿Variables adicionales necesarias?
# VITE_WS_URL=ws://localhost:6001  # Para WebSockets
# VITE_PUSHER_KEY=your_pusher_key  # Para notificaciones
# VITE_ENABLE_XP_SYSTEM=false     # Feature flag para XP
```

### 🔧 Configuración Backend Esperada

```php
// ¿Configuración en Laravel necesaria?
// config/auth.php - Token expiration
// config/queue.php - Queue configuration  
// config/broadcasting.php - WebSocket config
// config/mail.php - Email notifications
```

---

## 📞 Preguntas Específicas para el Backend

### 🔄 Refresh Tokens
```bash
# ¿Existe este endpoint?
POST /api/auth/refresh
Authorization: Bearer {refresh_token}

# ¿Qué response devuelve?
{
  "access_token": "new_token",
  "refresh_token": "new_refresh_token", // ¿rotating refresh?
  "expires_in": 900, // ¿tiempo en segundos?
  "user": {...} // ¿incluye datos del usuario?
}
```

### 🏁 Logout Backend
```bash
# ¿Existe este endpoint?
POST /api/auth/logout
Authorization: Bearer {access_token}

# ¿Qué hace exactamente?
# - ¿Invalida solo el token actual?
# - ¿Invalida todos los tokens del usuario?
# - ¿Limpia sesiones en Redis/cache?
```

### 📧 Sistema de Email
```bash
# ¿Funcionalidades disponibles?
POST /api/auth/password/reset-request
POST /api/auth/password/reset
POST /api/auth/email/verify
POST /api/auth/email/resend
```

### 🎮 Eventos para XP
```php
// ¿Eventos disponibles para escuchar?
ActivityCreated::class
ActivityCompleted::class
UserLoggedIn::class
DisciplineStarted::class

// ¿O necesitamos implementar manualmente?
```

---

## ⚡ Plan de Implementación por Fases

### 🚀 **Fase 1: Mejoras de Auth (Inmediato)**
1. Confirmar capacidades actuales del backend
2. Implementar refresh tokens si están disponibles
3. Añadir logout backend si existe
4. Mejorar manejo de errores de auth

### 🏗️ **Fase 2: XP System Backend (1-2 sprints)**
1. Diseñar schema de base de datos para XP
2. Implementar eventos automáticos
3. Crear endpoints para XP y niveles
4. Sistema básico de achievements

### 🎯 **Fase 3: Frontend XP Integration (1 sprint)**
1. Activar código comentado de XP en frontend
2. Integrar con APIs reales de XP
3. Componentes de progreso y niveles
4. Notificaciones de level-up

### 📱 **Fase 4: Notificaciones y Real-time (Futuro)**
1. WebSockets para updates en tiempo real
2. Push notifications
3. Email notifications para milestones
4. Sistema completo de achievements

---

## 🎯 Próximos Pasos Recomendados

### 🔍 **Investigación Inmediata**
1. **Revisar documentación actual del backend** - ¿Existe Swagger/OpenAPI?
2. **Testing de endpoints** - Usar Postman/Insomnia para verificar capacidades
3. **Revisar código fuente** - Si tienes acceso al repo del backend
4. **Consultar con team lead** - ¿Roadmap del backend incluye estas features?

### 💬 **Preguntas para Daily/Planning**
1. "¿El backend actual soporta refresh tokens?"
2. "¿Cuándo planean implementar el sistema de XP?"
3. "¿Necesitan ayuda del frontend para definir endpoints de XP?"
4. "¿Hay alguna documentación técnica que deberíamos revisar?"

### 📋 **Deliverables Esperados**
- [ ] **Backend Capabilities Document** - Lista confirmada de features disponibles
- [ ] **API Endpoints Documentation** - Swagger/Postman collection actualizada  
- [ ] **Database Schema** - ERD para sistema de XP si está planificado
- [ ] **Integration Timeline** - Cuándo estará listo cada feature

---

## 🚨 Blockers Potenciales

### ⚠️ **Auth System**
- **Sin Refresh Tokens**: Frontend necesitará manejar re-login frecuente
- **Sin Logout Backend**: Tokens quedan activos hasta expirar
- **Sin Rate Limiting**: App vulnerable a ataques de fuerza bruta

### ⚠️ **XP System**  
- **Sin Event System**: Necesitaremos implementación manual en cada endpoint
- **Sin Queue Jobs**: Procesamiento de XP será síncrono (más lento)
- **Sin Caching**: Leaderboards serán lentos con muchos usuarios

### ⚠️ **Notifications**
- **Sin WebSockets**: No real-time updates
- **Sin Push Service**: No notificaciones móviles
- **Sin Email Templates**: No notificaciones por email

---

**💡 Tip**: Mantén este documento actualizado después de cada conversación con el backend team. Es tu fuente de verdad para features disponibles vs planificadas.