# 🔍 GUÍA DE DEBUG VERCEL - VineWatch

## 🚨 PROBLEMA IDENTIFICADO
El botón "Prueba unos minutos" no funciona en Vercel, necesitamos hacer una investigación exhaustiva.

## 📋 ARCHIVOS DE DIAGNÓSTICO CREADOS

### 1. `debug.html` - Diagnóstico Completo
**URL**: `https://tu-dominio.vercel.app/debug.html`

**Funcionalidades**:
- ✅ Verificación de variables de entorno
- ✅ Test de conexión con Supabase
- ✅ Verificación de URLs de redirección
- ✅ Logging en tiempo real
- ✅ Captura de errores de consola

### 2. `test-vercel.html` - Simulación Vercel
**URL**: `https://tu-dominio.vercel.app/test-vercel.html`

**Funcionalidades**:
- ✅ Simula comportamiento en Vercel
- ✅ Test específico de Magic Link
- ✅ Verificación de configuración
- ✅ Debug detallado paso a paso

### 3. `config.js` - Configuración Centralizada
**Archivo**: `public/config.js`

**Funcionalidades**:
- ✅ Manejo centralizado de variables de entorno
- ✅ Fallback para desarrollo y producción
- ✅ Logging detallado de configuración
- ✅ Validación de variables requeridas

## 🔧 CONFIGURACIÓN VERCEL ACTUALIZADA

### `vercel.json` Optimizado
```json
{
  "version": 2,
  "name": "vinewatch-frontend",
  "buildCommand": "echo 'No build step required for static site'",
  "outputDirectory": "public",
  "rewrites": [
    {
      "source": "/auth/callback",
      "destination": "/auth/callback.html"
    }
  ],
  "headers": [
    {
      "source": "/js/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 🧪 PLAN DE TESTING

### PASO 1: Verificar Deploy
1. **Acceder a Vercel Dashboard**
2. **Verificar que el deploy se completó** sin errores
3. **Revisar logs de build** si hay errores

### PASO 2: Test de Diagnóstico
1. **Abrir `debug.html`** en el navegador
2. **Ejecutar todas las verificaciones**:
   - Verificar Entorno
   - Verificar Variables de Entorno
   - Probar Conexión Supabase
   - Verificar URLs
3. **Revisar logs en tiempo real**

### PASO 3: Test Específico Vercel
1. **Abrir `test-vercel.html`** en el navegador
2. **Probar Magic Link** con un email real
3. **Revisar consola** para errores específicos
4. **Verificar configuración** paso a paso

### PASO 4: Análisis de Resultados
1. **Identificar errores específicos** en los logs
2. **Verificar variables de entorno** en Vercel Dashboard
3. **Revisar configuración de Supabase**
4. **Probar redirección** manualmente

## 🔍 POSIBLES CAUSAS DEL PROBLEMA

### 1. **Variables de Entorno**
- ❌ No configuradas en Vercel Dashboard
- ❌ Nombres incorrectos
- ❌ Valores incorrectos

### 2. **Configuración Supabase**
- ❌ URL de redirección incorrecta
- ❌ Configuración de autenticación
- ❌ Permisos de API

### 3. **Configuración Vercel**
- ❌ Headers incorrectos
- ❌ Rewrites mal configurados
- ❌ CORS issues

### 4. **Código JavaScript**
- ❌ Variables no definidas
- ❌ Errores de sintaxis
- ❌ Problemas de timing

## 📊 CHECKLIST DE VERIFICACIÓN

### ✅ COMPLETADO
- [x] Archivos de diagnóstico creados
- [x] Configuración Vercel optimizada
- [x] Configuración centralizada implementada
- [x] Deploy realizado exitosamente

### ⏳ PENDIENTE
- [ ] Verificar deploy en Vercel
- [ ] Ejecutar tests de diagnóstico
- [ ] Identificar error específico
- [ ] Implementar solución
- [ ] Verificar funcionamiento final

## 🎯 PRÓXIMOS PASOS INMEDIATOS

1. **Acceder a Vercel Dashboard** y verificar deploy
2. **Abrir `debug.html`** y ejecutar diagnósticos
3. **Revisar logs** para identificar el problema específico
4. **Configurar variables de entorno** si es necesario
5. **Probar botón "Prueba unos minutos"** después de correcciones

## 📞 INFORMACIÓN DE CONTACTO

Si necesitas ayuda adicional:
- **Repositorio**: https://github.com/airfranc86/vinewatch-frontend
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://supabase.com/dashboard

---
**Creado**: $(Get-Date -Format "yyyy-MM-dd HH:mm")
**Estado**: 🔍 Investigación en progreso
