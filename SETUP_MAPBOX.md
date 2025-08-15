# Configuración de Mapbox para Rutas

## 🔧 Pasos para configurar el token de Mapbox

### 1. Obtener Token de Mapbox

1. Ve a [Mapbox Account](https://account.mapbox.com/access-tokens/)
2. Inicia sesión o crea una cuenta
3. Crea un nuevo token o usa uno existente
4. Asegúrate de que el token tenga permisos para:
   - **Directions API** (para calcular rutas)
   - **Mapbox GL JS** (para mostrar mapas)

### 2. Configurar el Token

1. Crea un archivo `.env.local` en la raíz del proyecto:
```bash
touch .env.local
```

2. Agrega tu token al archivo:
```bash
NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_real_de_mapbox_aqui
```

### 3. Verificar la Configuración

1. Reinicia el servidor de desarrollo:
```bash
npm run dev
```

2. Abre la consola del navegador (F12)
3. Busca mensajes que indiquen:
   - ✅ "Token de Mapbox configurado correctamente"
   - ❌ "Token de Mapbox no configurado"

### 4. Probar las Rutas

1. Permite el acceso a tu ubicación
2. Selecciona un lugar en el mapa
3. Haz clic en "Calcular Ruta" en el panel lateral
4. Deberías ver una línea azul en el mapa

## 🚨 Problemas Comunes

### Error: "Token de Mapbox no configurado"
- Verifica que el archivo `.env.local` existe
- Asegúrate de que el token esté correctamente escrito
- Reinicia el servidor después de cambiar el token

### Error: "Cannot read properties of undefined"
- Verifica que tu token tenga permisos para Directions API
- Asegúrate de que las coordenadas sean válidas

### La ruta no aparece en el mapa
- Verifica la consola del navegador para errores
- Asegúrate de que el mapa esté completamente cargado
- Verifica que tu ubicación esté activada

## 📞 Soporte

Si sigues teniendo problemas:
1. Verifica que tu token sea válido en [Mapbox Account](https://account.mapbox.com/access-tokens/)
2. Revisa los logs en la consola del navegador
3. Asegúrate de que tienes una conexión a internet estable
