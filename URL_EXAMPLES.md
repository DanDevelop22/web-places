# Ejemplos de URLs para Compartir Lugares

## 📍 URLs por Nombre del Lugar

### La Bodeguita del Medio
```
http://localhost:3000/es?place=labodeguitadelmedio
```

### Casa de la Música
```
http://localhost:3000/es?place=casadelamusica
```

### El Floridita
```
http://localhost:3000/es?place=elfloridita
```

### Restaurante 1830
```
http://localhost:3000/es?place=restaurante1830
```

### Teatro Nacional
```
http://localhost:3000/es?place=teatronacional
```

## 🗺️ URLs por Coordenadas

### La Bodeguita del Medio
```
http://localhost:3000/es?lat=23.1136&lng=-82.3594
```

### Casa de la Música
```
http://localhost:3000/es?lat=23.1139&lng=-82.4456
```

### El Floridita
```
http://localhost:3000/es?lat=23.1135&lng=-82.3598
```

### Restaurante 1830
```
http://localhost:3000/es?lat=23.1384&lng=-82.3890
```

### Teatro Nacional
```
http://localhost:3000/es?lat=23.1422&lng=-82.3956
```

## 🔧 Cómo Funciona

### 1. URLs por Nombre
- Se limpia el nombre del lugar (solo letras y números)
- Se convierte a minúsculas
- Se busca coincidencia exacta en la base de datos

### 2. URLs por Coordenadas
- Se usan las coordenadas exactas del lugar
- Se busca con una tolerancia de ±0.001 grados
- Útil para lugares que pueden tener nombres variables

### 3. Comportamiento
- Al acceder a una URL con parámetros, se abre automáticamente el panel del lugar
- El mapa se centra en el lugar seleccionado
- **Los parámetros se limpian automáticamente** después de 100ms para evitar problemas de navegación
- Funciona tanto en móvil como en desktop

### 4. Limpieza de URL
- Después de abrir el lugar, la URL vuelve a su estado limpio
- Ejemplo: `http://localhost:3000/es?place=labodeguitadelmedio` → `http://localhost:3000/es`
- Esto permite navegación normal después de acceder a un enlace directo
- Evita que los parámetros interfieran con futuras interacciones

## 🚀 Uso en el Código

```typescript
import { 
  generateShareUrl, 
  generatePlaceUrl, 
  generateCoordinatesUrl,
  cleanUrlParams,
  hasPlaceParams 
} from '@/utils/urlHelpers';

// Generar URL por nombre
const urlByName = generatePlaceUrl(place);

// Generar URL por coordenadas
const urlByCoords = generateCoordinatesUrl(place);

// Generar URL de compartir (por defecto usa nombre)
const shareUrl = generateShareUrl(place);

// Generar URL de compartir usando coordenadas
const shareUrlCoords = generateShareUrl(place, 'es', true);

// Limpiar parámetros de URL
cleanUrlParams(router);

// Verificar si hay parámetros de lugar
const hasParams = hasPlaceParams(searchParams);
```

## 📱 Compartir en Redes Sociales

Las URLs generadas se pueden compartir en:
- WhatsApp
- Telegram
- Email
- Redes sociales
- Mensajes de texto

Al hacer clic en el enlace, el usuario irá directamente al lugar específico con el panel de detalles abierto.

## 🔄 Flujo de Navegación

1. **Usuario accede a URL con parámetros**: `http://localhost:3000/es?place=labodeguitadelmedio`
2. **Sistema detecta parámetros** y busca el lugar correspondiente
3. **Se abre automáticamente** el panel del lugar
4. **Se centra el mapa** en la ubicación del lugar
5. **Se limpian los parámetros** después de 100ms: `http://localhost:3000/es`
6. **Usuario puede navegar normalmente** sin interferencias

## ⚠️ Consideraciones

- La limpieza de URL es automática y no requiere intervención del usuario
- El delay de 100ms asegura que el lugar se abra correctamente antes de limpiar
- Si el usuario recarga la página después de la limpieza, no se abrirá ningún lugar automáticamente
- Los parámetros se limpian solo cuando se abre un lugar desde URL, no cuando se selecciona manualmente