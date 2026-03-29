// ============================================================
//  BYP — auth.js
//  Responsável por: login, cadastro, logout e menu dinâmico
// ============================================================


// ── FUNÇÕES BASE ─────────────────────────────────────────────

function fazerLogin(nome) {
  localStorage.setItem('logado', 'true')  // só marca que está logado
}

function fazerLogout() {
  localStorage.setItem('logado', 'false') // só desloga, não apaga os dados
  window.location.href = '../html/index.html'
}

function getUsuario() {
  if (localStorage.getItem('logado') == 'true') {
    return localStorage.getItem('nome')   // só retorna se estiver logado
  }
  return null
}


// ── MENU DINÂMICO (só roda na index.html) ───────────────────

function atualizarMenu() {
  const menuGuest = document.getElementById('menu-guest')
  const menuUser  = document.getElementById('menu-user')

  if (!menuGuest || !menuUser) return

  const logado = localStorage.getItem('logado')  // verifica a sessão

  if (logado == 'true') {
    menuGuest.style.display = 'none'
    menuUser.style.display  = 'flex'

    // exibe o nome se tiver, senão exibe o email
    const nomeEl = document.getElementById('user-nome')
    if (nomeEl) {
      nomeEl.textContent = localStorage.getItem('nome') || localStorage.getItem('email')
    }

  } else {
    menuGuest.style.display = 'flex'
    menuUser.style.display  = 'none'
  }
}


// ── FORMULÁRIO DE LOGIN ──────────────────────────────────────

const loginForm = document.querySelector('.login-form')

if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault()
    localStorage.setItem('logado', 'true')  // só isso
    window.location.href = '../html/index.html'
  })
}


// ── FORMULÁRIO DE CADASTRO ───────────────────────────────────

const cadastroForm = document.querySelector('.cadastro-form')

if (cadastroForm) {
  cadastroForm.addEventListener('submit', function(e) {
    e.preventDefault()

    const nome    = document.getElementById('username').value
    const email   = document.getElementById('email').value
    const usuario = document.getElementById('usuario').value

    localStorage.setItem('nome',    nome)
    localStorage.setItem('email',   email)
    localStorage.setItem('usuario', usuario)
    localStorage.setItem('logado',  'true')  // marca como logado

    window.location.href = '../html/index.html'
  })
}


// ── TOGGLE DE SENHA (👁) ─────────────────────────────────────

const toggleBtns = document.querySelectorAll('.toggle-password')

toggleBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const input = btn.previousElementSibling

    if (input.type === 'password') {
      input.type      = 'text'
      btn.textContent = '👁'
    } else {
      input.type      = 'password'
      btn.textContent = '👁'
    }
  })
})


// ── INICIALIZA ───────────────────────────────────────────────
atualizarMenu()
