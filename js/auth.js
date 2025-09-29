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

      // Configuración para Vercel - Variables de entorno o valores por defecto
      const supabaseUrl = window.VITE_SUPABASE_URL || 'https://agesojhoiemujyokbyin.supabase.co'
      const supabaseKey = window.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnZXNvamhvaWVtdWp5b2tieWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NTczMTEsImV4cCI6MjA3NDQzMzMxMX0.03CwWaoXbWJINCE7nzLV4dwSJhvlSu9kC8S-V5VCXJo'

      if (!supabaseUrl || !supabaseKey) {
        console.error('❌ Variables de entorno de Supabase no configuradas')
        this.showMessage('Error: Configuración de Supabase no encontrada', 'error')
        return
      }

      this.supabase = createClient(supabaseUrl, supabaseKey, {
        auth: {
          redirectTo: 'https://vinewatch.streamlit.app'
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
      console.log('📧 Enviando Magic Link a:', email)
      console.log('🔗 Supabase URL:', this.supabase.supabaseUrl)
      console.log('🔑 Supabase Key:', this.supabase.supabaseKey ? 'Presente' : 'Ausente')

      const { error } = await this.supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: 'https://vinewatch.streamlit.app'
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
      // Usuario autenticado - mostrar en el hero
      if (userInfo) {
        userInfo.innerHTML = `
          <div class="flex flex-col sm:flex-row gap-4 w-full">
            <div class="flex-1 bg-white rounded-lg p-4 shadow-lg">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-wine-gradient rounded-full flex items-center justify-center">
                  <i class="fas fa-user text-white"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900">¡Bienvenido!</p>
                  <p class="text-sm text-gray-600">${this.user.email}</p>
                </div>
              </div>
            </div>
            <button onclick="authManager.signOut()" class="btn-outline-wine text-lg px-8 py-4 whitespace-nowrap">
              <i class="fas fa-sign-out-alt mr-2"></i>
              Cerrar Sesión
            </button>
          </div>
        `
        userInfo.classList.remove('hidden')
      }

      if (loginForm) {
        loginForm.classList.add('hidden')
      }
    } else {
      // Usuario no autenticado
      if (userInfo) {
        userInfo.classList.add('hidden')
      }

      if (loginForm) {
        loginForm.classList.remove('hidden')
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
document.addEventListener('DOMContentLoaded', function () {
  // Manejar callback de autenticación
  handleAuthCallback()

  // Configurar evento del formulario
  const loginForm = document.getElementById('login-form')
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
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
