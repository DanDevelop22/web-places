# 🔗 Implementación de Redes Sociales en Firestore

Este documento describe la implementación del sistema de redes sociales para los lugares, utilizando Firestore como base de datos.

## 📋 Estructura de Datos

### Colección `socialNetworks`
Cada documento en la colección `socialNetworks` tiene la siguiente estructura:

```typescript
interface FirestoreSocialNetwork {
  id?: string;
  type: string;        // facebook, instagram, twitter, youtube, tiktok, etc.
  uid: string;         // ID único del lugar propietario
  url: string;         // URL de la red social
  createdAt?: Date;    // Fecha de creación
}
```

### Campo `socialNetworks` en Places
Los lugares ahora incluyen un campo `socialNetworks` que es un array de referencias a documentos de la colección `socialNetworks`:

```typescript
interface FirestorePlace {
  // ... otros campos
  socialNetworks: string[]; // Referencias a documentos de socialNetworks
}
```

## 🔧 Servicios Implementados

### `services/socialNetworks.ts`

#### Funciones principales:
- `loadSocialNetworksByIds(ids: string[])` - Cargar redes sociales por IDs
- `loadSocialNetworksByUser(userId: string)` - Cargar redes sociales por usuario
- `createSocialNetwork(data)` - Crear nueva red social
- `updateSocialNetwork(id, data)` - Actualizar red social
- `deleteSocialNetwork(id)` - Eliminar red social
- `getSocialNetworkIcon(type)` - Obtener icono para tipo de red social
- `getSocialNetworkLabel(type)` - Obtener nombre legible para tipo de red social

#### Tipos de redes sociales soportados:
- **Facebook** 📘
- **Instagram** 📷
- **Twitter** 🐦
- **YouTube** 📺
- **TikTok** 🎵
- **LinkedIn** 💼
- **WhatsApp** 📱
- **Telegram** 📬
- **Website** 🌐
- **Phone** 📞
- **Email** 📧
- **Otros** 🔗 (icono genérico)

## 🎯 Integración en la Aplicación

### 1. SidePanel (Vista de Usuario)
- **Ubicación**: `components/organisms/SidePanel.tsx`
- **Funcionalidad**: Muestra las redes sociales del lugar seleccionado
- **Características**:
  - Carga automática de redes sociales al abrir el panel
  - Iconos específicos para cada tipo de red social
  - Enlaces directos a las redes sociales
  - Estado de carga con spinner
  - Manejo de errores

### 2. Panel de Administración
- **Ubicación**: `app/[locale]/admin/restaurants/page.tsx`
- **Funcionalidad**: Muestra iconos de redes sociales en las tarjetas de restaurantes
- **Características**:
  - Carga de redes sociales para todos los restaurantes
  - Visualización de hasta 3 iconos por restaurante
  - Indicador "+N" para restaurantes con más de 3 redes sociales
  - Tooltips con nombres de redes sociales

## 📊 Datos de Ejemplo

### Archivos de datos:
- `firestore-places-example.json` - Lugares con referencias a redes sociales
- `firestore-social-networks-example.json` - Redes sociales individuales

### Ejemplo de estructura:
```json
// En places
{
  "name": "La Bodeguita del Medio",
  "socialNetworks": [
    "/socialNetworks/bodeguita-facebook",
    "/socialNetworks/bodeguita-instagram", 
    "/socialNetworks/bodeguita-website"
  ]
}

// En socialNetworks
{
  "type": "facebook",
  "uid": "bodeguita-uid",
  "url": "https://facebook.com/labodeguitadelmedio"
}
```

## 🚀 Script de Población

### Comando:
```bash
npm run populate-firestore
```

### Proceso:
1. **Carga datos** de ambos archivos JSON
2. **Crea redes sociales** primero para obtener IDs reales
3. **Crea lugares** con referencias correctas a las redes sociales
4. **Muestra progreso** en consola

### Salida esperada:
```
🔥 Iniciando población de Firestore...
📊 Cargando 8 lugares y 24 redes sociales...
📝 Agregando redes sociales...
📝 Red social 1/24: facebook para bodeguita-uid
📝 Red social 2/24: instagram para bodeguita-uid
...
📝 Agregando lugares...
📝 Agregando lugar 1/8: La Bodeguita del Medio
...
✅ ¡Firestore poblado exitosamente!
📊 Se agregaron 8 lugares a la colección 'places'
📊 Se agregaron 24 redes sociales a la colección 'socialNetworks'
```

## 🎨 Interfaz de Usuario

### SidePanel - Redes Sociales:
```tsx
{/* Redes Sociales desde Firestore */}
{socialNetworks.length > 0 && (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Redes Sociales
    </h3>
    <div className="space-y-2">
      {socialNetworks.map((network) => (
        <a
          key={network.id}
          href={network.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl">{getSocialNetworkIcon(network.type)}</span>
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-white">
              {getSocialNetworkLabel(network.type)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {network.url}
            </p>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </a>
      ))}
    </div>
  </div>
)}
```

### Admin - Iconos en Tarjetas:
```tsx
{/* Redes Sociales */}
{restaurantSocialNetworks[restaurant.id] && restaurantSocialNetworks[restaurant.id].length > 0 && (
  <div className="flex items-center gap-1">
    <span className="text-xs text-gray-500 dark:text-gray-400">Redes:</span>
    <div className="flex gap-1">
      {restaurantSocialNetworks[restaurant.id].slice(0, 3).map((network, index) => (
        <span key={index} className="text-xs" title={getSocialNetworkLabel(network.type)}>
          {getSocialNetworkIcon(network.type)}
        </span>
      ))}
      {restaurantSocialNetworks[restaurant.id].length > 3 && (
        <span className="text-xs text-gray-400">
          +{restaurantSocialNetworks[restaurant.id].length - 3}
        </span>
      )}
    </div>
  </div>
)}
```

## 🔄 Flujo de Datos

### 1. Carga de Lugares:
1. Se cargan los lugares desde Firestore
2. Para cada lugar, se extraen las referencias a redes sociales
3. Se cargan las redes sociales por IDs
4. Se transforman los datos al formato de la aplicación

### 2. Visualización:
1. **SidePanel**: Se muestran todas las redes sociales del lugar
2. **Admin**: Se muestran iconos de las primeras 3 redes sociales

### 3. Interacción:
1. **SidePanel**: Clic en red social abre la URL en nueva pestaña
2. **Admin**: Hover sobre iconos muestra tooltip con nombre

## 🛠️ Solución de Problemas

### Error: "No se cargan las redes sociales"
**Causas posibles:**
- Referencias incorrectas en el campo `socialNetworks`
- Documentos de redes sociales no existen
- Problemas de permisos en Firestore

**Solución:**
1. Verificar que existan documentos en `socialNetworks`
2. Confirmar que las referencias sean correctas
3. Revisar reglas de Firestore

### Error: "Iconos no se muestran"
**Causas posibles:**
- Tipo de red social no reconocido
- Función `getSocialNetworkIcon` no maneja el tipo

**Solución:**
1. Verificar que el tipo esté en minúsculas
2. Agregar el tipo a la función si es necesario

## 🚀 Próximos Pasos

### Funcionalidades Pendientes:
1. **Gestión de redes sociales** en el admin
2. **Formulario de creación** de redes sociales
3. **Edición de redes sociales** existentes
4. **Validación de URLs** de redes sociales
5. **Integración con APIs** de redes sociales

### Mejoras de UX:
1. **Previsualización** de redes sociales
2. **Drag & drop** para reordenar redes sociales
3. **Búsqueda** en redes sociales
4. **Filtros** por tipo de red social

### Optimizaciones Técnicas:
1. **Caché** de redes sociales
2. **Carga lazy** de redes sociales
3. **Compresión** de URLs largas
4. **Validación** de URLs en tiempo real

¡La implementación de redes sociales está completa y funcional! 🎉
