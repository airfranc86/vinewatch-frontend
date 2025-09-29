// Configuración de variables de entorno para VineWatch
// Este archivo se carga antes que cualquier otro script

(function() {
    'use strict';
    
    // Configurar variables de entorno
    // En desarrollo: usar valores por defecto
    // En producción: Vercel inyectará las variables de entorno
    window.VITE_SUPABASE_URL = window.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://agesojhoiemujyokbyin.supabase.co';
    window.VITE_SUPABASE_ANON_KEY = window.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnZXNvamhvaWVtdWp5b2tieWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NTczMTEsImV4cCI6MjA3NDQzMzMxMX0.03CwWaoXbWJINCE7nzLV4dwSJhvlSu9kC8S-V5VCXJo';
    
    // Obtener la URL actual para redirección
    window.CURRENT_URL = window.location.origin;
    
    // Logging para debugging
    console.log('🔧 Configuración cargada:', {
        supabaseUrl: window.VITE_SUPABASE_URL,
        hasAnonKey: !!window.VITE_SUPABASE_ANON_KEY,
        currentUrl: window.CURRENT_URL,
        environment: process.env.NODE_ENV || 'development'
    });
    
    // Verificar configuración
    if (!window.VITE_SUPABASE_URL || !window.VITE_SUPABASE_ANON_KEY) {
        console.error('❌ Error: Variables de entorno de Supabase no configuradas correctamente');
        console.error('VITE_SUPABASE_URL:', window.VITE_SUPABASE_URL);
        console.error('VITE_SUPABASE_ANON_KEY:', window.VITE_SUPABASE_ANON_KEY ? 'Configurada' : 'No configurada');
    } else {
        console.log('✅ Variables de entorno configuradas correctamente');
    }
})();
