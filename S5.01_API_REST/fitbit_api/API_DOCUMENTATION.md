# S5.01: API REST fitbit

## 👤 Alumno
Desarrollado por Marc Sanchez

## 📄 Descripción
Describimos las fases de construcción y desarrollo de una API REST. Aquí se describe la implementación de Testing TDD, los endpoints REST implementados en el proyecto, su arquitectura y casos de uso principales. Todo el contexto de la API reside aquí.

Se ha incluido paquetes de:
- Laravel Passport para la autenticación OAuth2 de tokens.
- Laravel Forge para su despliegue en producción.

 Las bases de construcción se han basado rigurosamente bajo la Disertación de Roy T Fielding (Cap. 5) para la aplicación de buenas practicas RESTful 

[Ver Disertación](https://ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf)

## 🎯 Palabras Clave
- API REST
- Cliente/Servidor
- Endpoints
- TDD
- Policies, Resources

## 🛠️ Tecnologías utilizadas
- XAMPP v.() para el servidor local
- PHP v.8.3
- Laravel v.12.0
- Laravel Passport v.13.2
- Laravel Forge v.()
- PHPUnit v.10.0
- IDE: Visual Studio Code
- Git & Github
- Metodología Gitflow

## 📋 Requisitos
- Servidor local tipo Laragon / XAMPP / MAMP / LAMP para
la compilación de PHP
- También puedes usar el PHP Server usando:

```bash

php artisan serve

```
- Laravel v.12.0 para el proyecto
- PHPUnit v.10.0

## 🛠️ Instalación
- Pasos para la instalación del proyecto en entorno local.
- 

## ▶️ Documentación y ejecución

### Documemntación Endpoints: Lista de principales

#### Disciplines (solo admin)
- `GET /api/v1/disciplines` - Listar todas las disciplinas
- `POST /api/v1/disciplines` - Crear una disciplina
- `GET /api/v1/disciplines/{id}` - Ver una disciplina
- `PUT /api/v1/disciplines/{id}` - Actualizar una disciplina
- `DELETE /api/v1/disciplines/{id}` - Eliminar una disciplina

#### Communities
- `GET /api/v1/communities` - Listar comunidades
- `POST /api/v1/communities` - Crear comunidad
- `GET /api/v1/communities/{id}` - Ver comunidad
- `PUT /api/v1/communities/{id}` - Actualizar comunidad
- `DELETE /api/v1/communities/{id}` - Eliminar comunidad

#### Users
- `GET /api/v1/users/{id}` - Ver perfil de usuario
- `PUT /api/v1/users/{id}/discipline` - Cambiar disciplina del usuario
- `POST /api/v1/users/{id}/communities/{community}` - Unirse a comunidad
- `DELETE /api/v1/users/{id}/communities/{community}` - Salir de comunidad

#### Estadísticas de disciplinas
- `GET /api/stats/disciplines` - Estadísticas generales de disciplinas
- `GET /api/stats/disciplines/ranking` - Ranking de disciplinas por usuarios
- `GET /api/stats/disciplines/percentage` - Porcentaje de usuarios por disciplina
- `GET /api/stats/disciplines/summary` - Actividad mensual de disciplinas.

### Casos de uso
- Gestión CRUD de disciplinas y comunidades
- Asignación y cambio de disciplina para usuarios
- Unirse y salir de comunidades
- Consultar estadísticas agregadas sobre disciplinas
- Autenticación y autorización con Passport (OAuth2)
- 
### Autenticación con Laravel Passport

### Acerca de la arquitectura API RESTful

### Tests
- [ ] Describir la estrategia de testing y ejemplos de tests.

### Recursos
- [ ] Enlaces a documentación oficial, Postman, etc.

### Notas en contexto del S5.01 - API REST
- [ ] Resumir aprendizajes y decisiones técnicas relevantes.
- Instalación y configuración de dependencias antes de codificar
- Uso de TDD y PHPUnit para desarrollo guiado por tests
- Separación de lógica de negocio y endpoints
- Recursos y respuestas autodescriptivas

## 🌐 Despliegue
- PHP installed on your development environment (PHP 7.4+ recommended, PHP 8.1.10 used)
- A local server like XAMPP, MAMP, or LAMP to run PHP scripts

[Documentación oficial de Laravel](https://laravel.com/docs)



