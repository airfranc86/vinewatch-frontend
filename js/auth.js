// Componente de autenticación para VineWatch
// Compatible con Vercel y entorno de producción

class AuthManager {
  constructor() {
    this.supabase = null
    this.isAuthenticated = false
    this.user = null
    this.init()
  }

  async init() {
    // Cargar Supabase dinámicamente para evitar problemas de módulos
    try {
      const { createClient } = await import('https://cdn.skypack.dev/@supabase/supabase-js@2')
      
      // Configuración para Vercel - usar variables de entorno
      const supabaseUrl = 'https://agesojhoiemujyokbyin.supabase.co' // Tu URL real
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnZXNvamhvaWVtdWp5b2tieWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NTczMTEsImV4cCI6MjA3NDQzMzMxMX0.03CwWaoXbWJINCE7nzLV4dwSJhvlSu9kC8S-V5VCXJo' // Tu anon key real
      
      this.supabase = createClient(supabaseUrl, supabaseKey, {
        auth: {
          redirectTo: window.location.origin + '/auth/callback'
        }
      })

      // Verificar sesión existente
      await this.checkSession()
      
      // Escuchar cambios de autenticación
      this.supabase.auth.onAuthStateChange((event, session) => {
        this.handleAuthChange(event, session)
      })
      
    } catch (error) {
      console.error('Error al inicializar Supabase:', error)
    }
  }

  async checkSession() {
    try {
      const { data: { session }, error } = await this.supabase.auth.getSession()
      
      if (error) {
        console.error('Error al verificar sesión:', error.message)
        return
      }
      
      if (session) {
        this.isAuthenticated = true
        this.user = session.user
        this.updateUI()
      }
    } catch (error) {
      console.error('Error inesperado al verificar sesión:', error)
    }
  }

  handleAuthChange(event, session) {
    if (event === 'SIGNED_IN' && session) {
      this.isAuthenticated = true
      this.user = session.user
      this.updateUI()
      this.showMessage('¡Bienvenido! Sesión iniciada correctamente', 'success')
    } else if (event === 'SIGNED_OUT') {
      this.isAuthenticated = false
      this.user = null
      this.updateUI()
      this.showMessage('Sesión cerrada correctamente', 'info')
    }
  }

  async sendMagicLink(email) {
    if (!this.supabase) {
      this.showMessage('Error: Supabase no está inicializado', 'error')
      return false
    }

    try {
      const { error } = await this.supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + '/auth/callback'
        }
      })
      
      if (error) {
        console.error('Error al enviar Magic Link:', error.message)
        this.showMessage(`Error: ${error.message}`, 'error')
        return false
      }
      
      this.showMessage('¡Revisá tu mail para el link mágico ✨', 'success')
      return true
    } catch (error) {
      console.error('Error inesperado:', error)
      this.showMessage('Error inesperado al enviar el Magic Link', 'error')
      return false
    }
  }

  async signOut() {
    if (!this.supabase) {
      this.showMessage('Error: Supabase no está inicializado', 'error')
      return false
    }

    try {
      const { error } = await this.supabase.auth.signOut()
      
      if (error) {
        console.error('Error al cerrar sesión:', error.message)
        this.showMessage(`Error: ${error.message}`, 'error')
        return false
      }
      
      return true
    } catch (error) {
      console.error('Error inesperado:', error)
      this.showMessage('Error inesperado al cerrar sesión', 'error')
      return false
    }
  }

  async getToken() {
    if (!this.isAuthenticated || !this.user) {
      return null
    }

    try {
      const { data: { session } } = await this.supabase.auth.getSession()
      return session?.access_token || null
    } catch (error) {
      console.error('Error al obtener token:', error)
      return null
    }
  }

  async makeAuthenticatedRequest(url, options = {}) {
    const token = await this.getToken()
    
    if (!token) {
      this.showMessage('No hay sesión activa', 'error')
      return { success: false, error: 'No hay sesión activa' }
    }

    try {
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

  updateUI() {
    const authContainer = document.getElementById('auth-container')
    const userInfo = document.getElementById('user-info')
    const loginForm = document.getElementById('login-form')
    
    if (!authContainer) return

    if (this.isAuthenticated && this.user) {
      // Usuario autenticado
      if (userInfo) {
        userInfo.innerHTML = `
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-wine-gradient rounded-full flex items-center justify-center">
              <i class="fas fa-user text-white text-sm"></i>
            </div>
            <div>
              <p class="text-sm font-medium" style="color: var(--text-primary);">${this.user.email}</p>
              <p class="text-xs" style="color: var(--text-secondary);">Sesión activa</p>
            </div>
            <button onclick="authManager.signOut()" class="text-xs px-3 py-1 rounded-full transition-colors duration-300" style="background-color: var(--bg-secondary); color: var(--text-secondary);">
              Cerrar Sesión
            </button>
          </div>
        `
        userInfo.style.display = 'block'
      }
      
      if (loginForm) {
        loginForm.style.display = 'none'
      }
    } else {
      // Usuario no autenticado
      if (userInfo) {
        userInfo.style.display = 'none'
      }
      
      if (loginForm) {
        loginForm.style.display = 'block'
      }
    }
  }

  showMessage(message, type = 'info') {
    // Crear o actualizar mensaje de notificación
    let messageEl = document.getElementById('auth-message')
    
    if (!messageEl) {
      messageEl = document.createElement('div')
      messageEl.id = 'auth-message'
      messageEl.className = 'fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg transition-all duration-300'
      document.body.appendChild(messageEl)
    }

    const colors = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white',
      warning: 'bg-yellow-500 text-black'
    }

    messageEl.className = `fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg transition-all duration-300 ${colors[type]}`
    messageEl.innerHTML = `
      <div class="flex items-center space-x-2">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `

    // Auto-remover después de 5 segundos
    setTimeout(() => {
      if (messageEl && messageEl.parentElement) {
        messageEl.remove()
      }
    }, 5000)
  }
}

// Inicializar el manager de autenticación
const authManager = new AuthManager()

// Función para enviar Magic Link desde el formulario
async function sendMagicLink() {
  const emailInput = document.getElementById('email-input')
  const email = emailInput?.value?.trim()
  
  if (!email) {
    authManager.showMessage('Por favor, ingresá tu email', 'warning')
    return
  }
  
  if (!isValidEmail(email)) {
    authManager.showMessage('Por favor, ingresá un email válido', 'warning')
    return
  }
  
  const button = document.getElementById('send-magic-link-btn')
  const originalText = button.innerHTML
  
  button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...'
  button.disabled = true
  
  const success = await authManager.sendMagicLink(email)
  
  button.innerHTML = originalText
  button.disabled = false
  
  if (success) {
    emailInput.value = ''
  }
}

// Función para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Manejar callback de autenticación (cuando el usuario hace clic en el Magic Link)
async function handleAuthCallback() {
  const urlParams = new URLSearchParams(window.location.search)
  const accessToken = urlParams.get('access_token')
  const refreshToken = urlParams.get('refresh_token')
  
  if (accessToken && refreshToken) {
    try {
      const { data, error } = await authManager.supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      })
      
      if (error) {
        console.error('Error al procesar callback:', error.message)
        authManager.showMessage('Error al procesar la autenticación', 'error')
      } else {
        authManager.showMessage('¡Autenticación exitosa!', 'success')
        // Limpiar URL
        window.history.replaceState({}, document.title, window.location.pathname)
      }
    } catch (error) {
      console.error('Error inesperado en callback:', error)
      authManager.showMessage('Error inesperado en la autenticación', 'error')
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Manejar callback de autenticación
  handleAuthCallback()
  
  // Configurar evento del formulario
  const loginForm = document.getElementById('login-form')
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault()
      sendMagicLink()
    })
  }
  
  // Configurar evento del botón
  const sendButton = document.getElementById('send-magic-link-btn')
  if (sendButton) {
    sendButton.addEventListener('click', sendMagicLink)
  }
})
