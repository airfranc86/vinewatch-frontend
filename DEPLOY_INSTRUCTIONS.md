# 🚀 Instrucciones de Deploy - VineWatch Frontend

## Problema Identificado

El botón "Prueba unos minutos" no funciona debido a problemas de configuración de variables de entorno y URLs de redirección en Vercel.

## Solución Implementada

### 1. Variables de Entorno
- Configuradas para usar las variables de Vercel en producción
- Valores por defecto para desarrollo local
- Logging para debugging

### 2. URLs de Redirección
- Cambiadas de `https://vinewatch.streamlit.app` a la URL actual de Vercel
- Configuración dinámica basada en `window.location.origin`

### 3. Deploy Button de Vercel
- Creado `deploy-button.html` con el botón de deploy
- Configurado con variables de entorno requeridas
- Incluye instrucciones detalladas

## Pasos para Deploy

### Opción 1: Deploy Button (Recomendado)

1. Abre `deploy-button.html` en tu navegador
2. Haz clic en "🚀 Deploy en Vercel"
3. Conecta tu cuenta de GitHub
4. Configura las variables de entorno:
   - `VITE_SUPABASE_URL`: Tu URL de Supabase
   - `VITE_SUPABASE_ANON_KEY`: Tu clave anónima de Supabase

### Opción 2: Deploy Manual

1. Sube el código a GitHub
2. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
3. Importa el proyecto desde GitHub
4. Configura las variables de entorno en Settings → Environment Variables

## Configuración de Supabase

Después del deploy, configura en Supabase:

1. Ve a Authentication → URL Configuration
2. Agrega a "Redirect URLs":
   - `https://tu-dominio.vercel.app/auth/callback.html`
   - `https://tu-dominio.vercel.app/auth/callback`

## Variables de Entorno Requeridas

```bash
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
```

## Verificación

Después del deploy:

1. Abre la consola del navegador (F12)
2. Verifica que aparezcan los logs de configuración
3. Prueba el botón "Prueba unos minutos"
4. Verifica que se envíe el magic link correctamente

## Troubleshooting

### El botón no responde
- Verifica que las variables de entorno estén configuradas
- Revisa la consola para errores de JavaScript
- Asegúrate de que Supabase esté configurado correctamente

### Error de redirección
- Verifica que la URL de redirección en Supabase coincida con tu dominio de Vercel
- Asegúrate de que el archivo `auth/callback.html` exista

### Variables de entorno no se cargan
- Verifica que las variables estén configuradas en Vercel
- Asegúrate de que los nombres coincidan exactamente
- Reinicia el deployment si es necesario

## Estructura de Archivos

```
vinewatch-frontend/
├── index.html                 # Página principal
├── deploy-button.html         # Página de deploy
├── vercel.json               # Configuración de Vercel
├── auth/
│   └── callback.html         # Página de callback de autenticación
├── js/
│   └── auth-simple.js        # Lógica de autenticación
└── DEPLOY_INSTRUCTIONS.md    # Este archivo
```

## URLs del Deploy Button

```html
https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftu-usuario%2Fvinewatch-frontend&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY&envDescription=Configura%20las%20variables%20de%20entorno%20de%20Supabase%20para%20que%20la%20autenticaci%C3%B3n%20funcione%20correctamente&envLink=https%3A%2F%2Fsupabase.com%2Fdocs%2Fguides%2Fgetting-started%2Fquickstart
```

## Notas Importantes

- Las credenciales de Supabase están hardcodeadas para desarrollo local
- En producción, Vercel inyectará las variables de entorno
- La URL de redirección se configura dinámicamente
- El logging ayuda a debuggear problemas de configuración
