# Documentación de Endpoints - Sprint 5

## Introducción
Este documento describe los endpoints REST implementados en el proyecto, su arquitectura y casos de uso principales. Incluye contexto sobre la API, autenticación con Passport y buenas prácticas RESTful.

---

## Endpoints principales

### Disciplines (solo admin)
- `GET /api/v1/disciplines` - Listar todas las disciplinas
- `POST /api/v1/disciplines` - Crear una disciplina
- `GET /api/v1/disciplines/{id}` - Ver una disciplina
- `PUT /api/v1/disciplines/{id}` - Actualizar una disciplina
- `DELETE /api/v1/disciplines/{id}` - Eliminar una disciplina

### Communities
- `GET /api/v1/communities` - Listar comunidades
- `POST /api/v1/communities` - Crear comunidad
- `GET /api/v1/communities/{id}` - Ver comunidad
- `PUT /api/v1/communities/{id}` - Actualizar comunidad
- `DELETE /api/v1/communities/{id}` - Eliminar comunidad

### Users
- `GET /api/v1/users/{id}` - Ver perfil de usuario
- `PUT /api/v1/users/{id}/discipline` - Cambiar disciplina del usuario
- `POST /api/v1/users/{id}/communities/{community}` - Unirse a comunidad
- `DELETE /api/v1/users/{id}/communities/{community}` - Salir de comunidad

### Estadísticas de disciplinas
- `GET /api/stats/disciplines` - Estadísticas generales de disciplinas
- `GET /api/stats/disciplines/ranking` - Ranking de disciplinas por usuarios
- `GET /api/stats/disciplines/percentage` - Porcentaje de usuarios por disciplina
- `GET /api/stats/disciplines/summary` - Actividad mensual de disciplinas

---

## Casos de uso
- Gestión CRUD de disciplinas y comunidades
- Asignación y cambio de disciplina para usuarios
- Unirse y salir de comunidades
- Consultar estadísticas agregadas sobre disciplinas
- Autenticación y autorización con Passport (OAuth2)

## Arquitectura y buenas prácticas
- API RESTful, stateless, con rutas versionadas
- Uso de Laravel Passport para OAuth2 y protección de endpoints
- Validación de datos y respuestas JSON autocontenidas
- Tests de Feature y Management para asegurar la lógica de negocio

## Contexto Sprint5
- Instalación y configuración de dependencias antes de codificar
- Uso de TDD y PHPUnit para desarrollo guiado por tests
- Separación de lógica de negocio y endpoints
- Recursos y respuestas autodescriptivas

---

## Plantilla para README

```
# Documentación de la API REST

## Introducción
Breve descripción del proyecto y su propósito.

## Endpoints
- [ ] Listar y describir cada endpoint con método, ruta y ejemplo de respuesta.
- [ ] Incluir casos de uso y ejemplos de payloads.

## Autenticación
- [ ] Explicar el sistema de autenticación (Passport/Sanctum).
- [ ] Ejemplo de flujo OAuth2.

## Arquitectura
- [ ] Explicar la estructura RESTful, versionado y buenas prácticas.

## Tests
- [ ] Describir la estrategia de testing y ejemplos de tests.

## Recursos
- [ ] Enlaces a documentación oficial, Postman, etc.

## Notas Sprint5
- [ ] Resumir aprendizajes y decisiones técnicas relevantes.
```

---

> Completa cada sección con ejemplos y detalles específicos de tu implementación.
