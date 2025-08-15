# Mapa de Lugares - Aplicación Web Interactiva

Una aplicación web responsiva desarrollada con Next.js, React, Tailwind CSS y Mapbox GL JS que muestra un mapa interactivo con restaurantes, conciertos y bares.

## 🚀 Características

### Mapa Interactivo
- **Estilo minimalista**: Mapa limpio sin elementos innecesarios
- **Geolocalización**: Centra automáticamente el mapa en la ubicación del usuario
- **Marcadores personalizados**: Iconos SVG según categoría (restaurante, concierto, bar)
- **Animaciones suaves**: Vuelo animado hacia marcadores seleccionados

### Panel Lateral
- **Información completa**: Nombre, dirección, descripción
- **Galería de fotos**: Carrusel con Swiper.js
- **Sistema de reseñas**: Ver y agregar reseñas
- **Contenido dinámico**:
  - **Restaurantes**: Menú digital y reservas
  - **Conciertos**: Información de eventos y compra de entradas
  - **Bares**: Carta de bebidas

### Diseño y UX
- **Responsive**: Optimizado para móviles y desktop
- **Modo oscuro**: Soporte completo para tema oscuro
- **Animaciones**: Transiciones suaves y efectos visuales
- **Accesibilidad**: Elementos accesibles y navegación intuitiva

## 🏗️ Arquitectura

El proyecto sigue la metodología **Atomic Design**:

```
components/
├── atoms/          # Componentes básicos (Button, Rating, CategoryIcon)
├── molecules/      # Combinaciones de átomos (PhotoCarousel, ReviewSection)
├── organisms/      # Componentes complejos (MapView, SidePanel, MarkerCustom)
└── templates/      # Layouts (MapLayout)
```

## 🛠️ Tecnologías

- **Next.js 14**: Framework de React
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de CSS utility-first
- **Mapbox GL JS**: Mapas interactivos
- **Swiper.js**: Carrusel de imágenes
- **Lucide React**: Iconos
- **clsx**: Utilidad para clases CSS condicionales

## 📦 Instalación

1. **Clonar el repositorio**:
```bash
git clone <url-del-repositorio>
cd restaurants-map-app
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar Mapbox**:
   - Obtener un token de acceso en [Mapbox Account](https://account.mapbox.com/access-tokens/)
   - Crear archivo `.env.local` y agregar:
   ```bash
   NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_de_mapbox_aqui
   ```

4. **Ejecutar en desarrollo**:
```bash
npm run dev
```

5. **Abrir en el navegador**:
```
http://localhost:3000
```

## 🔧 Configuración

### Variables de Entorno

Crear un archivo `.env.local`:

```env
# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_de_mapbox

# n8n (opcional)
NEXT_PUBLIC_N8N_BASE_URL=http://localhost:5678
NEXT_PUBLIC_N8N_API_KEY=tu_api_key_de_n8n
```

### Datos de Prueba

Los datos están en `data/places.json` con la siguiente estructura:

```json
{
  "places": [
    {
      "id": "1",
      "name": "Nombre del lugar",
      "category": "restaurant|concert|bar",
      "address": "Dirección completa",
      "coordinates": {
        "lng": -3.7038,
        "lat": 40.4168
      },
      "description": "Descripción del lugar",
      "photos": ["url1", "url2"],
      "rating": 4.5,
      "reviews": [...],
      "menu": [...],
      "event": {...}
    }
  ]
}
```

## 🔌 Integraciones Futuras

### Firebase
- Carga de datos desde Firestore
- Autenticación de usuarios
- Almacenamiento de reseñas y reservas

### n8n
- Automatización de reservas
- Procesamiento de compras de entradas
- Notificaciones por email/SMS

## 📱 Responsive Design

La aplicación está optimizada para:
- **Móviles**: Panel lateral a pantalla completa
- **Tablets**: Panel lateral con overlay
- **Desktop**: Panel lateral fijo

## 🎨 Personalización

### Colores
Los colores se pueden personalizar en `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... más tonos
    900: '#0c4a6e',
  },
}
```

### Iconos
Los iconos SVG están en `components/atoms/CategoryIcon.tsx` y se pueden personalizar según las categorías.

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Subir la carpeta .next a Netlify
```

## 📄 Scripts Disponibles

- `npm run dev`: Servidor de desarrollo
- `npm run build`: Construir para producción
- `npm run start`: Servidor de producción
- `npm run lint`: Ejecutar ESLint

## 🔧 Solución de Problemas

### Error: "Token de Mapbox no configurado"
Si ves este error al calcular rutas:
1. Verifica que tienes un archivo `.env.local` en la raíz del proyecto
2. Asegúrate de que contiene: `NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_real`
3. Reinicia el servidor de desarrollo: `npm run dev`

### Error: "Cannot read properties of undefined"
Si ves este error al calcular rutas:
1. Verifica que tu token de Mapbox es válido
2. Asegúrate de que tienes permisos para usar la API de direcciones
3. Verifica que las coordenadas son válidas

### Ubicación no disponible
Si el botón de ruta no aparece:
1. Permite el acceso a la ubicación en tu navegador
2. Verifica que tu dispositivo tiene GPS activado
3. Intenta recargar la página

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:
1. Revisar la documentación
2. Buscar en los issues existentes
3. Crear un nuevo issue con detalles del problema

## 🔮 Roadmap

- [ ] Integración con Firebase
- [ ] Sistema de autenticación
- [ ] Filtros por categoría
- [ ] Búsqueda de lugares
- [ ] Favoritos del usuario
- [ ] Notificaciones push
- [ ] PWA (Progressive Web App)
- [ ] Múltiples idiomas
