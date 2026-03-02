# JWT Authentication Debugging Guide - Laravel Passport

## 📋 Resumen del Problema

Durante la integración de autenticación JWT con Laravel Passport, se experimentaron múltiples errores que impedían el funcionamiento correcto del sistema de login. Este documento detalla los problemas encontrados, el proceso de debugging y las soluciones implementadas.

## 🔍 Problemas Identificados

### 1. **Error Principal: Token JWT no se genera**
```
RuntimeException: Personal access client not found for 'users' user provider. Please create one.
```

### 2. **Error de Llaves de Cifrado**
```
LogicException: Key path "file:///var/www/html/storage/oauth-private.key" does not exist or is not readable
```

### 3. **Error HTTP 500 en Login**
```
POST /api/v1/login HTTP/1.1" 500
```

## 🕵️ Proceso de Debugging

### Paso 1: Análisis de Logs
Se ejecutó el comando para monitorear logs en tiempo real:
```bash
docker-compose exec php tail -f storage/logs/laravel.log
```

**Logs encontrados:**
```log
[2025-10-19 11:43:12] local.ERROR: Key path "file:///var/www/html/storage/oauth-private.key" does not exist or is not readable
[2025-10-19 11:38:12] local.ERROR: Personal access client not found for 'users' user provider. Please create one.
```

### Paso 2: Verificación de Estructura de Base de Datos
Se inspeccionaron las tablas OAuth para identificar configuraciones faltantes:

```sql
-- Verificación de clientes OAuth
SELECT id, name, personal_access_client FROM oauth_clients;

-- Verificación de tabla de personal access clients
SELECT * FROM oauth_personal_access_clients;
```

**Resultado:** La tabla `oauth_personal_access_clients` estaba vacía, causando el error principal.

### Paso 3: Verificación de Archivos de Llaves
```bash
docker-compose exec php find storage/ -name "*oauth*"
docker-compose exec php stat storage/oauth-private.key
```

**Hallazgos:**
- Las llaves existían físicamente
- Permisos incorrectos: `root:root` en lugar de `www-data:www-data`
- Permisos de lectura restrictivos

## 🛠️ Soluciones Implementadas

### Solución 1: Regeneración de Llaves OAuth

**Problema:** Llaves de cifrado corruptas o con permisos incorrectos.

**Comando aplicado:**
```bash
docker-compose exec php php artisan passport:keys --force
```

**Explicación:** El flag `--force` sobrescribe las llaves existentes, garantizando que se generen con la configuración correcta.

### Solución 2: Corrección de Permisos de Archivo

**Problema:** Las llaves OAuth no eran accesibles por el servidor web.

**Comandos aplicados:**
```bash
# Cambiar permisos de lectura
docker-compose exec php chmod 644 storage/oauth-private.key storage/oauth-public.key

# Cambiar propietario a usuario del servidor web
docker-compose exec php chown www-data:www-data storage/oauth-private.key storage/oauth-public.key
```

**Verificación:**
```bash
docker-compose exec php stat storage/oauth-private.key
```

**Resultado esperado:**
```
Access: (0644/-rw-r--r--)  Uid: (82/www-data)   Gid: (82/www-data)
```

### Solución 3: Inserción Manual de Personal Access Client

**Problema:** Laravel Passport no registró automáticamente el personal access client en la tabla correspondiente.

**Query de solución:**
```sql
INSERT INTO oauth_personal_access_clients (client_id, created_at, updated_at) 
SELECT id, NOW(), NOW() 
FROM oauth_clients 
WHERE grant_types LIKE '%personal_access%' 
LIMIT 1 
ON DUPLICATE KEY UPDATE updated_at = NOW();
```

**Explicación:** Esta query vincula el cliente OAuth existente con la tabla de personal access clients, permitiendo la generación de tokens JWT.

### Solución 4: Creación Manual de Cliente Personal Access

**Comando adicional aplicado:**
```bash
docker-compose exec php php artisan passport:client --name="Laravel Personal Access Client" --personal
```

**Configuración seleccionada:**
- User provider: `users`
- Tipo: Personal Access Client

## 🧪 Verificación de la Solución

### Test de Login Exitoso

**Comando de prueba:**
```powershell
$headers = @{"Content-Type"="application/json"; "Accept"="application/json"}
$body = '{"email":"lux@admin.com","password":"8000"}'
$response = Invoke-WebRequest -Uri "http://localhost:8000/api/v1/login" -Method POST -Headers $headers -Body $body
$response.Content
```

**Respuesta exitosa:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 2,
    "name": "Lux",
    "email": "lux@admin.com",
    "role": "admin"
  },
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
  "token_type": "Bearer",
  "expires_at": "2024-11-03T11:54:21.576029Z"
}
```

## 📚 Lecciones Aprendidas

### 1. **Orden de Configuración Crítico**
Laravel Passport requiere un orden específico de configuración:
1. Migración de tablas OAuth
2. Generación de llaves de cifrado
3. Creación de clientes OAuth
4. Registro de personal access clients

### 2. **Permisos de Archivo en Contenedores Docker**
En entornos Docker, los permisos de archivo pueden ser problemáticos:
- Los archivos generados por Artisan pueden pertenecer a `root`
- El servidor web necesita acceso de lectura como `www-data`
- Usar `chown` y `chmod` apropiados es esencial

### 3. **Debugging de Laravel Passport**
Las herramientas de debugging más útiles fueron:
- `tail -f storage/logs/laravel.log` para logs en tiempo real
- Consultas SQL directas para verificar configuración
- `stat` para verificar permisos de archivo

### 4. **Configuración Manual vs Automática**
Aunque Laravel Passport debería configurarse automáticamente, en ciertos entornos (como Docker) puede requerir intervención manual:
- Inserción directa en `oauth_personal_access_clients`
- Regeneración forzada de llaves
- Ajuste manual de permisos

## 🎯 Comandos de Verificación Post-Solución

```bash
# Verificar que las llaves existen y tienen permisos correctos
docker-compose exec php stat storage/oauth-private.key

# Verificar que los clientes están registrados
docker-compose exec db mysql -u fitbit_user -pfitbit_pass fitbit -e "SELECT * FROM oauth_personal_access_clients;"

# Test de login
curl -X POST http://localhost:8000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"lux@admin.com","password":"8000"}'
```

## 🔐 Usuarios de Prueba Disponibles

| ID | Nombre | Email | Rol | Password |
|----|--------|-------|-----|----------|
| 1 | Doom | doom@user.com | user | 666 |
| 2 | Lux | lux@admin.com | admin | 8000 |

## ⚠️ Notas Importantes

1. **Seguridad:** En producción, cambiar las contraseñas por defecto
2. **Backup:** Respaldar las llaves OAuth antes de regenerarlas
3. **Monitoring:** Mantener logs de autenticación para debugging futuro
4. **Permisos:** Verificar permisos después de cada rebuild de contenedores

---

**Estado Final:** ✅ Autenticación JWT completamente funcional con Laravel Passport

**Fecha de Resolución:** 19 de Octubre, 2025

**Tiempo Total de Debugging:** ~2 horas