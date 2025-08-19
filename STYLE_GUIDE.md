# Guía de Estilos - DóndeTú

Esta guía documenta la configuración de estilos y colores para la aplicación DóndeTú, basada en el logo oficial.

## 🎨 Paleta de Colores

### Colores Principales
- **Primary (Magenta)**: `#FF006E` - Color principal del gradiente
- **Secondary (Naranja)**: `#FF6B35` - Color secundario del gradiente
- **Accent (Naranja Claro)**: `#FF8E53` - Color de acento

### Gradientes
- **Gradiente Principal**: `linear-gradient(135deg, #FF006E 0%, #FF6B35 100%)`
- **Gradiente Horizontal**: `linear-gradient(90deg, #FF006E 0%, #FF6B35 100%)`
- **Gradiente Vertical**: `linear-gradient(180deg, #FF006E 0%, #FF6B35 100%)`

### Colores Neutros
Basados en el fondo oscuro del logo:
- **Dark 900**: `#1A1D20` - Fondo oscuro del logo
- **Dark 800**: `#212529`
- **Dark 700**: `#343A40`
- **Dark 600**: `#495057`
- **Dark 500**: `#6C757D`

## 🎯 Clases CSS Disponibles

### Botones
```html
<!-- Botón principal con gradiente -->
<button class="btn-brand">Botón Principal</button>

<!-- Botón secundario -->
<button class="btn-brand-secondary">Botón Secundario</button>
```

### Cards
```html
<div class="card-brand">
  <h3>Contenido de la Card</h3>
  <p>Descripción...</p>
</div>
```

### Inputs
```html
<input type="text" class="input-brand" placeholder="Escribe aquí..." />
```

### Badges
```html
<span class="badge-brand">Nuevo</span>
```

### Texto con Gradiente
```html
<h1 class="text-gradient">DóndeTú</h1>
```

### Efectos de Glow
```html
<div class="logo-glow">
  <!-- Contenido con efecto glow -->
</div>
```

## 🎨 Clases de Tailwind Personalizadas

### Colores
```css
/* Colores del brand */
bg-brand-primary      /* #FF006E */
bg-brand-secondary    /* #FF6B35 */
bg-brand-accent       /* #FF8E53 */
text-brand-primary    /* #FF006E */
text-brand-secondary  /* #FF6B35 */

/* Colores oscuros */
bg-brand-dark-900     /* #1A1D20 */
bg-brand-dark-800     /* #212529 */
bg-brand-dark-700     /* #343A40 */
```

### Gradientes
```css
/* Gradientes del brand */
bg-brand-gradient           /* Gradiente diagonal */
bg-brand-gradient-horizontal /* Gradiente horizontal */
bg-brand-gradient-vertical   /* Gradiente vertical */
bg-brand-gradient-radial     /* Gradiente radial */
```

### Sombras
```css
/* Sombras con colores del brand */
shadow-brand      /* Sombra pequeña */
shadow-brand-lg   /* Sombra grande */
shadow-brand-xl   /* Sombra extra grande */
shadow-brand-glow /* Efecto glow */
```

### Bordes Redondeados
```css
/* Bordes redondeados personalizados */
rounded-brand     /* 12px */
rounded-brand-lg  /* 16px */
rounded-brand-xl  /* 20px */
```

### Animaciones
```css
/* Animaciones personalizadas */
animate-brand-pulse  /* Pulso con colores del brand */
animate-brand-glow   /* Efecto glow animado */
```

## 🔧 Configuración Centralizada

### Archivo de Configuración
La configuración principal se encuentra en `config/theme.ts`. Para cambiar colores:

1. Abre `config/theme.ts`
2. Modifica los valores en `themeConfig.colors`
3. Los cambios se reflejarán automáticamente en toda la aplicación

### Variables CSS
Las variables CSS están definidas en `app/globals.css`:

```css
:root {
  --brand-primary: #FF006E;
  --brand-secondary: #FF6B35;
  --brand-accent: #FF8E53;
  --brand-dark: #1A1D20;
  --brand-light: #F8F9FA;
  --brand-gradient: linear-gradient(135deg, #FF006E 0%, #FF6B35 100%);
  --brand-shadow: 0 4px 14px 0 rgba(255, 0, 110, 0.25);
  --brand-glow: 0 0 20px rgba(255, 0, 110, 0.5);
}
```

## 📱 Componentes Específicos

### Navbar
```html
<nav class="navbar-brand">
  <!-- Contenido del navbar -->
</nav>
```

### Footer
```html
<footer class="footer-brand">
  <!-- Contenido del footer -->
</footer>
```

### Modales
```html
<div class="modal-brand">
  <!-- Contenido del modal -->
</div>
```

### Notificaciones
```html
<div class="notification-brand">
  <!-- Mensaje de notificación -->
</div>
```

### Loading States
```html
<div class="skeleton-brand">
  <!-- Placeholder de carga -->
</div>
```

## 🌙 Modo Oscuro

El sistema incluye soporte completo para modo oscuro. Los colores se adaptan automáticamente:

```css
/* Los componentes se adaptan automáticamente */
.card-brand {
  @apply bg-white dark:bg-brand-dark-900;
}

.input-brand {
  @apply bg-white dark:bg-brand-dark-800;
}
```

## 🎭 Uso en Componentes React

### Ejemplo de Botón
```tsx
import { themeConfig } from '@/config/theme';

const Button = ({ variant = 'primary', children, ...props }) => {
  const baseClasses = 'font-semibold py-3 px-6 rounded-brand transition-all duration-300';
  
  const variants = {
    primary: 'btn-brand',
    secondary: 'btn-brand-secondary',
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Ejemplo de Card
```tsx
const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`card-brand ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
```

## 🔄 Cómo Cambiar Colores

### 1. Cambiar Color Principal
En `config/theme.ts`:
```typescript
colors: {
  primary: '#NUEVO_COLOR', // Cambiar aquí
  // ...
}
```

### 2. Actualizar Tailwind
En `tailwind.config.js`:
```javascript
colors: {
  brand: {
    primary: '#NUEVO_COLOR', // Cambiar aquí
    // ...
  }
}
```

### 3. Actualizar Variables CSS
En `app/globals.css`:
```css
:root {
  --brand-primary: #NUEVO_COLOR; /* Cambiar aquí */
  /* ... */
}
```

## 📋 Checklist de Implementación

- [ ] Usar `btn-brand` para botones principales
- [ ] Usar `card-brand` para tarjetas
- [ ] Usar `input-brand` para campos de entrada
- [ ] Usar `text-gradient` para títulos importantes
- [ ] Usar `badge-brand` para etiquetas
- [ ] Implementar modo oscuro en todos los componentes
- [ ] Usar sombras `shadow-brand-*` para profundidad
- [ ] Aplicar bordes redondeados `rounded-brand-*`

## 🎨 Inspiración del Logo

Esta paleta de colores está inspirada en el logo oficial de DóndeTú:
- **Fondo oscuro**: Representa el fondo negro del logo
- **Gradiente magenta-naranja**: Representa el icono de ubicación del logo
- **Tipografía**: Inter para texto, Poppins para títulos (moderna y legible)
- **Efectos glow**: Inspirados en el efecto luminoso del icono del logo
