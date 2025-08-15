# 🍽️ Restaurants Map - Aplicación de Restaurantes Interactiva

Una aplicación web moderna y responsiva para descubrir y gestionar restaurantes, bares y eventos en La Habana, Cuba.

## ✨ Características Principales

### 🗺️ Mapa Interactivo
- **Mapbox GL JS** con estilo limpio y minimalista
- **Marcadores personalizados** por categoría (restaurante, bar, concierto)
- **Geolocalización** del usuario
- **Navegación fluida** con animaciones
- **Filtros y búsqueda** en tiempo real

### 📱 Panel de Información
- **Panel lateral responsivo** con información detallada
- **Galería de fotos** con Swiper.js
- **Sistema de reseñas** con calificaciones
- **Redes sociales** integradas
- **Menús digitales** completos

### 🔐 Sistema de Administración
- **Autenticación segura** con Firebase (preparado)
- **Panel de administración** completo
- **Gestión de restaurantes** con formularios avanzados
- **Moderación de reseñas**
- **Estadísticas en tiempo real**

### 📋 Formularios Avanzados
- **Formik + Yup** para validación robusta
- **Componentes reutilizables** para campos de formulario
- **Validación en tiempo real** con mensajes de error claros
- **Manejo de estado** optimizado
- **Experiencia de usuario** mejorada

### 🚨 Manejo de Errores y Estados
- **Páginas de error 404** personalizadas y atractivas
- **Páginas de error global** para errores inesperados
- **Páginas de loading** con animaciones suaves
- **Estados de carga** consistentes en toda la aplicación
- **Manejo de errores** robusto y amigable

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **Next.js 14** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utilitario
- **Formik** - Manejo de formularios
- **Yup** - Validación de esquemas
- **Lucide React** - Iconografía moderna

### Mapas y Geolocalización
- **Mapbox GL JS** - Mapas interactivos
- **Mapbox Directions API** - Cálculo de rutas

### UI/UX
- **Swiper.js** - Carruseles táctiles
- **clsx** - Utilidad para clases CSS condicionales
- **Animaciones CSS** personalizadas

### Internacionalización
- **next-intl** - Soporte multiidioma

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Token de Mapbox

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd restaurants
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Editar `.env.local` y agregar tu token de Mapbox:
```env
NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_de_mapbox_aqui
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

## 🗺️ Configuración de Mapbox

### 1. Crear cuenta en Mapbox
- Ve a [mapbox.com](https://mapbox.com)
- Crea una cuenta gratuita
- Obtén tu token de acceso público

### 2. Configurar el token
- Copia el token en tu archivo `.env.local`
- El token debe tener permisos para:
  - Mapbox GL JS
  - Mapbox Directions API
  - Geocoding API

### 3. Personalizar estilos
- Puedes cambiar el estilo del mapa en `MapView.tsx`
- Estilos disponibles: `streets-v12`, `light-v11`, `dark-v11`, etc.

## 📁 Estructura del Proyecto

```
restaurants/
├── app/                          # App Router de Next.js
│   ├── [locale]/                 # Rutas internacionalizadas
│   │   ├── admin/                # Panel de administración
│   │   │   ├── login/            # Página de login
│   │   │   ├── restaurants/      # Gestión de restaurantes
│   │   │   └── reviews/          # Gestión de reseñas
│   │   ├── menu/                 # Páginas de menús
│   │   ├── loading.tsx           # Página de carga
│   │   ├── not-found.tsx         # Página 404
│   │   └── page.tsx              # Página principal
│   ├── loading.tsx               # Página de carga global
│   ├── error.tsx                 # Página de error global
│   ├── not-found.tsx             # Página 404 global
│   ├── globals.css               # Estilos globales
│   └── layout.tsx                # Layout raíz
├── components/                   # Componentes React
│   ├── atoms/                    # Componentes atómicos
│   │   ├── Button.tsx
│   │   ├── FormField.tsx         # Campo de formulario reutilizable
│   │   ├── FormButton.tsx        # Botón de formulario reutilizable
│   │   └── ...
│   ├── molecules/                # Componentes moleculares
│   │   ├── PhotoCarousel.tsx
│   │   ├── ReviewSection.tsx
│   │   ├── SocialMediaLinks.tsx
│   │   └── MapFilters.tsx
│   ├── organisms/                # Componentes orgánicos
│   │   ├── MapView.tsx
│   │   └── SidePanel.tsx
│   └── templates/                # Plantillas
│       └── MapLayout.tsx
├── hooks/                        # Hooks personalizados
│   └── useFormikForm.ts          # Hook para formularios
├── utils/                        # Utilidades
│   ├── urlHelpers.ts             # Helpers para URLs
│   └── validationSchemas.ts      # Esquemas de validación
├── types/                        # Tipos TypeScript
│   └── index.ts
├── data/                         # Datos de ejemplo
│   └── places.json
└── services/                     # Servicios (preparados)
    ├── firebase.ts
    └── n8n.ts
```

## 🎯 Funcionalidades Detalladas

### Formularios con Formik y Yup

#### Componentes Reutilizables
- **FormField**: Campo de formulario con validación integrada
- **FormButton**: Botón con estados de carga y variantes
- **useFormikForm**: Hook personalizado para manejo de formularios

#### Esquemas de Validación
```typescript
// Ejemplo de esquema de validación
const RestaurantSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .required('El nombre es requerido'),
  email: Yup.string()
    .email('Formato de email inválido'),
  phone: Yup.string()
    .matches(/^[\+]?[0-9\s\-\(\)]+$/, 'Formato de teléfono inválido')
});
```

#### Uso de FormField
```typescript
<FormField
  name="email"
  label="Correo Electrónico"
  type="email"
  placeholder="tu@email.com"
  icon={<Mail className="w-4 h-4" />}
  required
/>
```

### Panel de Administración

#### Autenticación
- **Login con email/password**
- **Login con Google** (preparado para Firebase)
- **Validación de formularios** con Formik + Yup
- **Manejo de errores** robusto

#### Gestión de Restaurantes
- **Crear restaurantes** con formulario completo
- **Selección de ubicación** con Mapbox
- **Subida de fotos** múltiples
- **Gestión de menús** dinámica
- **Redes sociales** integradas

#### Moderación de Reseñas
- **Aprobar/rechazar** reseñas
- **Filtros avanzados** por restaurante, rating, estado
- **Estadísticas** en tiempo real
- **Acciones masivas**

### Navegación y URLs

#### URLs de Compartir
```
/es?place=labodeguitadelmedio
/es?lat=23.1136&lng=-82.3666
/es/menu/1
```

#### Navegación Inteligente
- **Parámetros de URL** para mantener contexto
- **Limpieza automática** de parámetros
- **Apertura automática** del panel al regresar

### Manejo de Errores y Estados

#### Páginas de Error
- **404 Personalizada**: Diseño atractivo con ilustraciones temáticas
- **Error Global**: Manejo de errores inesperados con detalles en desarrollo
- **Navegación de Recuperación**: Botones para volver al inicio o intentar de nuevo

#### Páginas de Loading
- **Loading Global**: Animaciones suaves con iconos temáticos
- **Estados de Carga**: Indicadores de progreso y mensajes informativos
- **Experiencia Consistente**: Diseño coherente en toda la aplicación

#### Características de las Páginas de Error
- **Diseño Responsivo**: Adaptable a todos los dispositivos
- **Modo Oscuro**: Soporte completo para tema oscuro
- **Animaciones**: Elementos animados para mejor UX
- **Navegación Clara**: Botones de acción bien definidos
- **Información Útil**: Consejos y opciones de recuperación

## 🔧 Configuración Avanzada

### Personalización de Estilos
```css
/* En tailwind.config.js */
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

### Configuración de Mapbox
```javascript
// En config/mapbox.js
export const MAPBOX_CONFIG = {
  token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-82.3666, 23.1136], // La Habana
  zoom: 13
};
```

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Otros Proveedores
- **Netlify**: Compatible con Next.js
- **Railway**: Soporte completo
- **Heroku**: Requiere configuración adicional

## 🔮 Próximas Funcionalidades

### Integración con Firebase
- [ ] Autenticación real con Firebase Auth
- [ ] Base de datos Firestore para restaurantes
- [ ] Storage para fotos
- [ ] Funciones Cloud para lógica de negocio

### Integración con n8n
- [ ] Envío de reservas automático
- [ ] Notificaciones de nuevas reseñas
- [ ] Workflows personalizados
- [ ] Integración con sistemas externos

### Funcionalidades Avanzadas
- [ ] Sistema de reservas en tiempo real
- [ ] Chat en vivo con restaurantes
- [ ] Sistema de lealtad y puntos
- [ ] Análisis avanzado de datos

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

- **Email**: soporte@restaurants.com
- **Documentación**: [docs.restaurants.com](https://docs.restaurants.com)
- **Issues**: [GitHub Issues](https://github.com/username/restaurants/issues)

---

**Desarrollado con ❤️ para la comunidad gastronómica de La Habana**
