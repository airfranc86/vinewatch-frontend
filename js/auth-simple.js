// Versión simplificada de autenticación para VineWatch
// Basada en la implementación que funciona en test-magic-link.html

let supabase = null

async function initSupabase() {
    try {
        const { createClient } = await import('https://cdn.skypack.dev/@supabase/supabase-js@2')

        supabase = createClient(
            window.VITE_SUPABASE_URL,
            window.VITE_SUPABASE_ANON_KEY,
            {
                auth: {
                    redirectTo: 'https://vinewatch.streamlit.app'
                }
            }
        )

        console.log('✅ Supabase inicializado correctamente')
        return true
    } catch (error) {
        console.error('❌ Error al inicializar Supabase:', error)
        return false
    }
}

async function sendMagicLink() {
    const emailInput = document.getElementById('email-input')
    const email = emailInput?.value?.trim()

    if (!email) {
        showMessage('Por favor, ingresa tu email', 'warning')
        return
    }

    if (!supabase) {
        showMessage('Supabase no está inicializado', 'error')
        return
    }

    console.log('📧 Enviando Magic Link a:', email)

    const button = document.getElementById('send-magic-link-btn')
    const originalText = button.innerHTML

    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...'
    button.disabled = true

    try {
        const { error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                emailRedirectTo: 'https://vinewatch.streamlit.app'
            }
        })

        if (error) {
            console.error('❌ Error:', error.message)
            showMessage('Error: ' + error.message, 'error')
        } else {
            console.log('✅ Magic Link enviado exitosamente')
            showMessage('¡Magic Link enviado! Revisa tu email.', 'success')
            emailInput.value = ''
        }
    } catch (error) {
        console.error('❌ Error inesperado:', error)
        showMessage('Error inesperado: ' + error.message, 'error')
    } finally {
        button.innerHTML = originalText
        button.disabled = false
    }
}

function showMessage(text, type) {
    // Crear o actualizar el elemento de mensaje
    let messageDiv = document.getElementById('auth-message')
    if (!messageDiv) {
        messageDiv = document.createElement('div')
        messageDiv.id = 'auth-message'
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `
        document.body.appendChild(messageDiv)
    }

    const colors = {
        success: '#065F46',
        error: '#7F1D1D',
        warning: '#92400E'
    }

    messageDiv.style.backgroundColor = colors[type] || colors.success
    messageDiv.textContent = text

    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv)
        }
    }, 5000)
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// Función para configurar eventos después de que el DOM esté listo
function setupAuth() {
    console.log('🔄 Configurando autenticación...')

    // Configurar evento del botón
    const sendButton = document.getElementById('send-magic-link-btn')
    if (sendButton) {
        console.log('✅ Botón encontrado, configurando evento')
        sendButton.addEventListener('click', function (e) {
            e.preventDefault()
            console.log('🖱️ Botón clickeado')
            sendMagicLink()
        })
    } else {
        console.error('❌ Botón no encontrado')
    }

    // Configurar evento del formulario
    const loginForm = document.getElementById('login-form')
    if (loginForm) {
        console.log('✅ Formulario encontrado, configurando evento')
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault()
            console.log('📝 Formulario enviado')
            sendMagicLink()
        })
    }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', async function () {
    console.log('🔄 Inicializando autenticación...')
    console.log('📁 auth-simple.js cargado correctamente')

    const success = await initSupabase()

    if (success) {
        setupAuth()
        console.log('✅ Autenticación configurada correctamente')
    } else {
        console.error('❌ No se pudo configurar la autenticación')
    }
})

// También intentar configurar después de un pequeño delay por si acaso
setTimeout(() => {
    if (document.getElementById('send-magic-link-btn')) {
        console.log('🔄 Reconfigurando después de delay...')
        setupAuth()
    }
}, 1000)
