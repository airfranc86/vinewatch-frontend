# 🍷 VineWatch - Soluciones Tecnológicas Vitivinícolas

**A&J Consulting** - Especialistas en viticultura de precisión y tecnología satelital para el sector vitivinícola argentino.

## 📋 Descripción del Proyecto

VineWatch es una plataforma integral de monitoreo vitivinícola que combina datos satelitales, meteorológicos y de campo para ofrecer una visión completa de tu viñedo. Utilizamos tecnología de vanguardia para transformar datos en decisiones inteligentes que optimizan la producción vitivinícola.

## ✅ Estado del Proyecto

### 🎉 **COMPLETADO - Sistema en Producción**

## 🚀 Características Principales

### 🛰️ Monitoreo Satelital
- Análisis NDVI en tiempo real
- Detección de estrés hídrico
- Mapeo de variabilidad espacial
- Alertas automáticas

### 📊 Análisis Predictivo
- Modelos de machine learning
- Predicción de rendimientos
- Optimización de riego
- Anticipación de problemas fitosanitarios

### 🎯 Agricultura de Precisión
- Mapas de prescripción
- Aplicación variable de insumos
- Optimización de recursos
- Integración con maquinaria

## 🏗️ Arquitectura del Proyecto

### Frontend (Vercel)
- **Tecnología**: HTML5, CSS3, JavaScript, Tailwind CSS
- **Características**: Responsive, modo claro/oscuro, Swiper.js, Magic Link Auth
- **URL Producción**: `https://vinewatchconsulting.vercel.app`
- **URL Local**: `http://localhost:8000/index.html`

### Backend (Streamlit Cloud)
- **Tecnología**: Python, Streamlit, Pandas, Plotly, Supabase
- **Características**: Dashboard interactivo, visualizaciones, predicciones IA, Panel Admin
- **URL Producción**: `https://vinewatch.streamlit.app`
- **URL Local**: `http://localhost:8501`

### Autenticación (Supabase)
- **Tecnología**: Supabase Auth, Magic Links
- **Características**: Autenticación sin contraseña, Panel Admin, Sesiones persistentes
- **Flujo**: Frontend → Magic Link → Backend

### 🚀 Despliegue en Producción

#### Frontend (Vercel)
1. **Conectar repositorio** a Vercel
2. **Configurar variables de entorno** (opcional, ya están en el código)
3. **Deploy automático** en cada push a `main`

#### Backend (Streamlit Cloud)
1. **Conectar repositorio** a Streamlit Cloud
2. **Configurar secrets** en la interfaz de Streamlit
3. **Main file**: `streamlit_app.py`
4. **Deploy automático** en cada push a `main`

### 🧪 Desarrollo Local

**Acceder a las aplicaciones:**
- Frontend: `http://localhost:8000`
- Backend: `http://localhost:8501`
- Test Magic Link: `http://localhost:8000/test-magic-link.html`

## 🎨 Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos personalizados y variables
- **JavaScript** - Interactividad y animaciones
- **Tailwind CSS** - Framework de utilidades
- **Swiper.js** - Carruseles interactivos
- **Font Awesome** - Iconografía
- **Google Fonts** - Tipografías (Inter, Playfair Display)

### Backend
- **Python 3.11** - Lenguaje principal
- **Streamlit** - Framework web
- **Pandas** - Manipulación de datos
- **Plotly** - Visualizaciones interactivas
- **NumPy** - Cálculos numéricos
- **Supabase** - Autenticación y base de datos
- **Folium** - Mapas interactivos
- **Rasterio** - Procesamiento de datos satelitales
- **Shapely** - Operaciones geoespaciales
- **GeoPandas** - Análisis geoespacial avanzado

### APIs Externas
- **CheckWX** - Datos meteorológicos de aviación
- **NOAA AviationWeather** - Fallback meteorológico
- **Sentinel-2** - Datos satelitales (simulados)

### DevOps
- **GitHub Actions** - CI/CD
- **Vercel** - Hosting frontend
- **Streamlit Cloud** - Hosting backend
- **Supabase** - Backend-as-a-Service
- **Git** - Control de versiones

## 📊 Funcionalidades del Dashboard

### Métricas en Tiempo Real
- **NDVI Promedio** - Salud vegetal
- **GDD Acumulados** - Grados día de crecimiento
- **Humedad del Suelo** - Nivel de humedad
- **Rendimiento Estimado** - Predicción de cosecha

### Visualizaciones Interactivas
- **Gráficos de tendencias** - Evolución temporal
- **Mapas de calor** - Distribución espacial
- **Barras de progreso** - Estados actuales
- **Carruseles** - Navegación por métricas

### Predicciones IA
- **Fecha óptima de cosecha** - Basada en GDD
- **Riesgo de enfermedades** - Análisis preventivo
- **Optimización de riego** - Eficiencia hídrica
- **Rendimiento esperado** - Estimaciones precisas

## 🎯 Paleta de Colores

### Colores Principales
- **Rojo Vino**: `#722F37` - Color corporativo
- **Verde Viña**: `#2D5016` - Naturaleza y crecimiento
- **Dorado**: `#D4AF37` - Elegancia y calidad
- **Cremoso**: `#F5F5DC` - Neutralidad y calidez

### Modo Oscuro
- **Fondo**: `#111827` - Gris muy oscuro
- **Texto**: `#f9fafb` - Blanco suave
- **Acentos**: Colores principales con mayor saturación

## 📱 Responsividad

### Breakpoints
- **Móvil**: < 640px - 1 columna, navegación hamburguesa
- **Tablet**: 640px - 1024px - 2 columnas, layout adaptativo
- **Desktop**: > 1024px - 3 columnas, funcionalidades completas

### Características Móviles
- **Menú hamburguesa** - Navegación táctil
- **Touch-friendly** - Botones optimizados
- **Swipe gestures** - Carruseles nativos
- **Viewport optimizado** - Escalado perfecto


## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

**A&J Consulting**
- 📧 Email: franciscoaucar@ajconsultingit.com
-           andresnj11@ajconsultingit.com
- 📍 Ubicación: Córdoba, Argentina
-                Quito, Ecuador

## 🙏 Agradecimientos

- **Sentinel-2** - Datos satelitales
- **Streamlit** - Framework web
- **Vercel** - Hosting frontend
- **Tailwind CSS** - Framework de estilos
- **Font Awesome** - Iconografía

---

**Desarrollado con 🍷 para la viticultura argentina**
