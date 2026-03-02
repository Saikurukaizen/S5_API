# 🎨 Design System - Frontend Cyberpunk/Synthwave Project

## 📋 Tabla de Contenidos
- [Paleta de Colores](#-paleta-de-colores)
- [Tipografía](#-tipografía)
- [Espaciado y Dimensiones](#-espaciado-y-dimensiones)
- [Efectos y Animaciones](#-efectos-y-animaciones)
- [Componentes Base](#-componentes-base)
- [Layout System](#-layout-system)
- [Dark/Light Theme](#-darklight-theme)
- [ASPECCT Prompt para Backend](#-aspecct-prompt-para-backend)

---

## 🎨 Paleta de Colores

### 🌈 Colores Principales (CSS Variables)

```css
/* Colores Neon Cyberpunk */
--neon-cyan: #00e6e6;       /* Color principal - Cyan brillante */
--neon-pink: #e6007a;       /* Color secundario - Rosa/Magenta */
--neon-purple: #7a00e6;     /* Color terciario - Púrpura */
--neon-green: #00e66e;      /* Estado success/online */
--neon-orange: #ff8c00;     /* Advertencias */
--neon-red: #ff3366;        /* Errores/crítico */

/* Backgrounds */
--bg-color: #0a0a0f;        /* Fondo principal oscuro */
--bg-secondary: #0f0f1a;    /* Fondo secundario */
--card-bg: rgba(20, 20, 35, 0.8);  /* Fondo de tarjetas */
--sidebar-bg: rgba(10, 10, 15, 0.95); /* Fondo sidebar/header */

/* Textos */
--text-primary: #ffffff;     /* Texto principal */
--text-secondary: #b3b3cc;   /* Texto secundario */
--text-muted: #666680;       /* Texto atenuado */

/* Estados */
--success-color: #00e66e;    /* Verde success */
--warning-color: #ff8c00;    /* Naranja warning */
--error-color: #ff3366;      /* Rojo error */
--accent-color: #00e6e6;     /* Color de acento principal */

/* Bordes y Sombras */
--border-color: rgba(0, 230, 230, 0.3);
--shadow: rgba(0, 0, 0, 0.5);
```

### 🌅 Modo Claro (Light Theme)

```css
body:not(.dark) {
  --bg-color: #f8f9ff;
  --bg-secondary: #ffffff;
  --text-primary: #1a1a2e;
  --text-secondary: #4a4a6a;
  --text-muted: #8888aa;
  --card-bg: rgba(255, 255, 255, 0.9);
  --border-color: rgba(0, 153, 153, 0.2);
  --shadow: rgba(0, 0, 0, 0.1);
}
```

### 🎨 Gradientes Predefinidos

```css
--gradient-primary: linear-gradient(135deg, var(--neon-cyan) 0%, var(--neon-pink) 100%);
--gradient-secondary: linear-gradient(135deg, var(--neon-purple) 0%, var(--neon-cyan) 100%);
--gradient-neon: linear-gradient(45deg, var(--neon-cyan), var(--neon-pink), var(--neon-purple));
--gradient-cyberpunk: radial-gradient(circle at center, rgba(0, 230, 230, 0.2) 0%, transparent 70%);
```

---

## 🔤 Tipografía

### 📝 Fuente Principal: Orbitron

```css
/* Importación desde Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');

/* Aplicación */
font-family: 'Orbitron', monospace;
```

### 📊 Jerarquía Tipográfica

```css
/* Headers */
h1 { font-size: 2.5rem; font-weight: 900; letter-spacing: 2px; }
h2 { font-size: 2rem; font-weight: 700; letter-spacing: 1.5px; }
h3 { font-size: 1.5rem; font-weight: 700; letter-spacing: 1px; }
h4 { font-size: 1.25rem; font-weight: 600; letter-spacing: 0.5px; }

/* Body Text */
body { font-size: 16px; font-weight: 400; line-height: 1.6; }
.text-sm { font-size: 14px; }
.text-lg { font-size: 18px; }
.text-xl { font-size: 20px; }

/* Special Effects */
text-transform: uppercase; /* Para botones y labels */
letter-spacing: 1px;       /* Espaciado futurista */
```

### ✨ Efectos de Texto Neon

```css
/* Glow Effect para Dark Mode */
text-shadow: 0 0 10px var(--neon-cyan);

/* Pulse Animation */
animation: neon-pulse 2s infinite alternate;

/* Light Mode Text Glow */
text-shadow: 0 0 6px var(--neon-cyan), 0 0 1px rgba(0, 0, 0, 0.3);
```

---

## 📐 Espaciado y Dimensiones

### 🎯 Sistema de Espaciado

```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
```

### 🔄 Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 50%;
```

### ⏱️ Transiciones

```css
--transition-fast: 0.15s ease-in-out;
--transition-normal: 0.3s ease-in-out;
--transition-slow: 0.5s ease-in-out;
```

---

## ✨ Efectos y Animaciones

### 🌊 Animaciones Principales

```css
/* Neon Pulse */
@keyframes neon-pulse {
  0%, 100% { 
    text-shadow: 0 0 3px currentColor, 0 0 6px currentColor, 0 0 12px currentColor;
  }
  50% { 
    text-shadow: 0 0 2px currentColor, 0 0 4px currentColor, 0 0 8px currentColor;
  }
}

/* Cyberpunk Glow */
@keyframes cyberpunk-glow {
  0%, 100% { 
    box-shadow: 0 0 10px var(--neon-cyan);
  }
  50% { 
    box-shadow: 0 0 18px var(--neon-pink);
  }
}

/* Hologram Flicker */
@keyframes hologram-flicker {
  0%, 100% { opacity: 1; }
  98% { opacity: 1; }
  99% { opacity: 0.8; }
  99.5% { opacity: 1; }
}

/* Data Stream */
@keyframes data-stream {
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

/* Slide In Up */
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### 🎬 Efectos de Backdrop

```css
backdrop-filter: blur(15px);  /* Para tarjetas y modales */
backdrop-filter: blur(20px);  /* Para header/sidebar */
```

### 🌌 Partículas de Fondo

```css
/* Dark Theme Particles */
background-image: 
  radial-gradient(1px 1px at 20% 10%, rgba(0, 230, 230, 0.4), transparent),
  radial-gradient(1px 1px at 40% 70%, rgba(230, 0, 122, 0.3), transparent),
  radial-gradient(0.5px 0.5px at 60% 30%, rgba(122, 0, 230, 0.3), transparent);
background-size: 400px 400px, 300px 300px, 200px 200px;
animation: particles-float 20s ease-in-out infinite;
```

---

## 🧩 Componentes Base

### 🔘 Botones Cyberpunk

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--neon-cyan);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 600;
  font-family: 'Orbitron', monospace;
  background: rgba(0, 255, 255, 0.1);
  color: var(--neon-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
  backdrop-filter: blur(10px);
  transition: all var(--transition-fast);
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.btn:hover {
  background: rgba(0, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 0 20px var(--neon-cyan);
}

.btn:hover::before {
  left: 100%;
}
```

### 🃏 Cards Holográficas

```css
.card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  backdrop-filter: blur(15px);
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(0, 255, 255, 0.1);
  animation: hologram-flicker 3s infinite;
  transition: all var(--transition-normal);
  overflow: hidden;
  position: relative;
}

.card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 
    0 0 25px var(--neon-cyan),
    0 10px 30px rgba(0, 255, 255, 0.2);
  border-color: var(--neon-cyan);
}
```

### 📝 Inputs Futuristas

```css
.input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  background: rgba(0, 0, 0, 0.3);
  color: var(--text-primary);
  font-family: 'Orbitron', monospace;
  font-size: 14px;
  backdrop-filter: blur(10px);
  transition: all var(--transition-fast);
}

.input:focus {
  outline: none;
  border-color: var(--neon-cyan);
  box-shadow: 
    0 0 15px var(--neon-cyan),
    inset 0 1px 0 rgba(0, 255, 255, 0.2);
  background: rgba(0, 255, 255, 0.05);
}
```

---

## 🏗️ Layout System

### 📱 Header Cyberpunk

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--sidebar-bg);
  border-bottom: 2px solid var(--accent-color);
  padding: var(--spacing-lg) var(--spacing-xl);
  height: 95px;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  box-shadow: 
    0 4px 20px var(--shadow),
    inset 0 1px 0 var(--border-color);
  animation: hologram-flicker 4s infinite;
}
```

### 🔍 Logo con Efectos

```css
.logo {
  font-size: 24px;
  font-weight: 900;
  font-family: 'Orbitron', monospace;
  color: var(--neon-cyan);
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px var(--neon-cyan);
}

.logo-icon {
  background: var(--gradient-neon);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px var(--neon-cyan));
  animation: cyberpunk-glow 3s infinite;
}
```

### 📊 Grid System

```css
.grid {
  display: grid;
  gap: var(--spacing-lg);
}

.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive */
@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
}
```

---

## 🌓 Dark/Light Theme

### 🌙 Modo Oscuro (Por defecto)

```css
body.dark {
  --bg-color: #0a0a0f;
  --bg-secondary: #0f0f1a;
  --text-primary: #ffffff;
  --text-secondary: #b3b3cc;
  --card-bg: rgba(20, 20, 35, 0.8);
}
```

### ☀️ Modo Claro

```css
body:not(.dark) {
  --bg-color: #f8f9ff;
  --bg-secondary: #ffffff;
  --text-primary: #1a1a2e;
  --text-secondary: #4a4a6a;
  --card-bg: rgba(255, 255, 255, 0.9);
}
```

### 🔄 Toggle de Tema

Los efectos neon se adaptan automáticamente:
- **Dark Mode**: Glow intenso con `neon-pulse`
- **Light Mode**: Glow suave con `neon-pulse-light`

---

## 🎯 Utilidades CSS

### 🎨 Colores de Texto

```css
.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-muted { color: var(--text-muted); }
.text-success { color: var(--success-color); }
.text-warning { color: var(--warning-color); }
.text-error { color: var(--error-color); }
```

### 🌈 Backgrounds

```css
.bg-primary { background-color: var(--accent-color); }
.bg-success { background-color: var(--success-color); }
.bg-warning { background-color: var(--warning-color); }
.bg-error { background-color: var(--error-color); }
```

### 📐 Bordes y Sombras

```css
.rounded-sm { border-radius: var(--radius-sm); }
.rounded-md { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-xl { border-radius: var(--radius-xl); }

.shadow-sm { box-shadow: 0 1px 3px var(--shadow); }
.shadow-md { box-shadow: 0 4px 6px var(--shadow); }
.shadow-lg { box-shadow: 0 10px 15px var(--shadow); }
```

### ⚡ Transiciones

```css
.transition-fast { transition: all var(--transition-fast); }
.transition-normal { transition: all var(--transition-normal); }
.transition-slow { transition: all var(--transition-slow); }
```

### 🎬 Animaciones

```css
.fade-in { animation: fadeIn var(--transition-normal); }
.slide-in-up { animation: slideInUp var(--transition-normal); }
```

---

## 🤖 ASPECCT Prompt para Backend

**Para el diseñador que creará las vistas de endpoints del backend:**

### 🎯 ASPECCT Framework

**A - Audience**: Desarrollador backend creando vistas para API endpoints
**S - Situation**: Necesitas crear interfaces web para mostrar datos de endpoints backend que coincidan con el diseño cyberpunk/synthwave del frontend
**P - Purpose**: Generar vistas cohesivas que integren perfectamente con el sistema de diseño existente
**E - Expectations**: Interfaces funcionales, responsive y visualmente consistentes con el tema cyberpunk
**C - Context**: Sistema React + TypeScript con tema dark/light, fuentes Orbitron, efectos neon y animaciones holográficas
**C - Constraints**: Debe usar las variables CSS existentes, mantener accesibilidad y ser responsive
**T - Task**: Crear componentes para visualizar datos de endpoints backend

### 📋 Prompt Específico

```
Actúa como un diseñador UX/UI experto especializado en interfaces cyberpunk/synthwave.

CONTEXTO: Tienes que crear vistas para endpoints de backend que se integren perfectamente con un frontend React existente que usa:

SISTEMA DE DISEÑO OBLIGATORIO:
- Fuente: 'Orbitron', monospace
- Colores principales: #00e6e6 (cyan), #e6007a (pink), #7a00e6 (purple)
- Background oscuro: #0a0a0f con partículas flotantes
- Efectos: backdrop-filter blur, box-shadow neon, text-shadow glow
- Animaciones: hologram-flicker, neon-pulse, cyberpunk-glow
- Variables CSS: usar --neon-cyan, --neon-pink, --spacing-md, etc.

REQUERIMIENTOS TÉCNICOS:
- Responsive design (mobile-first)
- Accesible (ARIA labels, contraste)
- Componentes modulares reutilizables
- Soporte dark/light theme automático
- Efectos hover/focus suaves
- Carga de datos async con spinners

ELEMENTOS A CREAR:
1. [ESPECIFICA QUÉ ENDPOINTS/VISTAS NECESITAS]
2. Tablas de datos con scroll horizontal
3. Cards para items individuales
4. Formularios de filtrado/búsqueda
5. Estados de loading, error, empty
6. Modales para detalles
7. Breadcrumbs de navegación

CÓDIGO ESPERADO:
- React + TypeScript
- CSS Modules o styled-components
- Hooks para gestión de estado
- Componentes con props tipadas
- Comentarios explicativos

Genera el código completo siguiendo EXACTAMENTE este diseño cyberpunk, incluyendo todas las animaciones y efectos visuales mencionados.
```

### 🔧 Variables CSS a Usar Obligatoriamente

```css
/* Copiar estas variables en cada componente */
:root {
  --neon-cyan: #00e6e6;
  --neon-pink: #e6007a;
  --neon-purple: #7a00e6;
  --bg-color: #0a0a0f;
  --card-bg: rgba(20, 20, 35, 0.8);
  --text-primary: #ffffff;
  --border-color: rgba(0, 230, 230, 0.3);
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --radius-md: 8px;
  --radius-lg: 12px;
  --transition-fast: 0.15s ease-in-out;
  --transition-normal: 0.3s ease-in-out;
}
```

### 📦 Estructura de Componente Ejemplo

```typescript
// Estructura base para cualquier vista de endpoint
interface EndpointViewProps {
  data?: any[];
  loading?: boolean;
  error?: string;
  onRefresh?: () => void;
}

const EndpointView: React.FC<EndpointViewProps> = ({
  data,
  loading,
  error,
  onRefresh
}) => {
  return (
    <div className="endpoint-view">
      <div className="endpoint-header">
        <h1 className="endpoint-title">TÍTULO ENDPOINT</h1>
        <button className="btn btn-primary" onClick={onRefresh}>
          REFRESH
        </button>
      </div>
      
      {loading && <LoadingSpinner />}
      {error && <ErrorCard message={error} />}
      {data && <DataGrid items={data} />}
    </div>
  );
};
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
@media (max-width: 640px) { /* Mobile */ }
@media (min-width: 641px) and (max-width: 768px) { /* Tablet */ }
@media (min-width: 769px) and (max-width: 1024px) { /* Desktop Small */ }
@media (min-width: 1025px) { /* Desktop Large */ }
```

---

## ✅ Checklist para Nuevos Componentes

- [ ] ✨ Usa fuente 'Orbitron' con text-transform: uppercase
- [ ] 🎨 Implementa efectos neon con box-shadow y text-shadow
- [ ] 🌊 Añade animación hologram-flicker o cyberpunk-glow
- [ ] 🔄 Incluye estados hover con transform y glow
- [ ] 📱 Es responsive con grid/flexbox
- [ ] 🌓 Funciona en dark/light theme
- [ ] ♿ Tiene labels ARIA y buen contraste
- [ ] ⚡ Usa transiciones suaves (--transition-fast/normal)
- [ ] 🎯 Variables CSS en lugar de valores hardcoded
- [ ] 🧩 Estructura modular y reutilizable

---

**🚀 Este documento contiene TODOS los estilos del proyecto frontend para crear vistas de backend coherentes con el diseño cyberpunk/synthwave existente.**