// Configuración de Supabase Client
import { createClient } from '@supabase/supabase-js'

// Variables de entorno - estas deben configurarse en Vercel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tu-proyecto.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'tu-anon-key'

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Configurar redirect URL para Magic Links
    redirectTo: window.location.origin + '/auth/callback'
  }
})

// Función para enviar Magic Link
export const sendMagicLink = async (email) => {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/auth/callback'
      }
    })
    
    if (error) {
      console.error('Error al enviar Magic Link:', error.message)
      return { success: false, error: error.message }
    }
    
    return { success: true, message: 'Revisá tu mail para el link mágico ✨' }
  } catch (error) {
    console.error('Error inesperado:', error)
    return { success: false, error: 'Error inesperado al enviar el Magic Link' }
  }
}

// Función para obtener la sesión actual
export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Error al obtener sesión:', error.message)
      return { session: null, error: error.message }
    }
    
    return { session, error: null }
  } catch (error) {
    console.error('Error inesperado:', error)
    return { session: null, error: 'Error inesperado al obtener la sesión' }
  }
}

// Función para cerrar sesión
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Error al cerrar sesión:', error.message)
      return { success: false, error: error.message }
    }
    
    return { success: true, message: 'Sesión cerrada correctamente' }
  } catch (error) {
    console.error('Error inesperado:', error)
    return { success: false, error: 'Error inesperado al cerrar sesión' }
  }
}

// Función para hacer requests autenticados al backend
export const authenticatedRequest = async (url, options = {}) => {
  try {
    const { session } = await getCurrentSession()
    
    if (!session) {
      return { success: false, error: 'No hay sesión activa' }
    }
    
    const token = session.access_token
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return { 
        success: false, 
        error: errorData.message || `Error ${response.status}: ${response.statusText}` 
      }
    }
    
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('Error en request autenticado:', error)
    return { success: false, error: 'Error de conexión con el servidor' }
  }
}
