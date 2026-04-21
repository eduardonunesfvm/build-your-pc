// ============================================================
//  BYP — auth.js
//  Responsável por: login, cadastro, logout e menu dinâmico
// ============================================================


// ── FUNÇÕES BASE ─────────────────────────────────────────────

function fazerLogin() {
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


// ... (mantenha as funções base e menu dinâmico)

// ── FORMULÁRIO DE LOGIN ──────────────────────────────────────
const loginForm = document.querySelector('.login-form')

if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault()
    
    const senha = document.getElementById('password').value

    if (senha.length < 8) {
      alert('A senha deve ter no mínimo 8 caracteres.')
      return
    }

    localStorage.setItem('logado', 'true') 
    window.location.href = '../html/index.html'
  })
}

// ── FORMULÁRIO DE CADASTRO ───────────────────────────────────
const cadastroForm = document.querySelector('.cadastro-form');

if (cadastroForm) {
  cadastroForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Captura dos elementos (verificando se os IDs existem)
    const campoNome = document.getElementById('username');
    const campoEmail = document.getElementById('email');
    const campoSenha = document.getElementById('password');
    const campoConfirma = document.getElementById('confirm-password');

    // Validações
    if (campoSenha.value.length < 8) {
      alert('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    if (campoSenha.value !== campoConfirma.value) {
      alert('As senhas não coincidem!');
      return;
    }

    // Salva no LocalStorage
    localStorage.setItem('nome', campoNome.value);
    localStorage.setItem('email', campoEmail.value);

    localStorage.setItem('logado', 'true');

    console.log("Cadastro realizado! Redirecionando...");

    // Tente usar apenas 'index.html' se os arquivos estiverem na mesma pasta
    // Se estiverem em pastas diferentes, mantenha '../html/index.html'
    window.location.href = '../html/index.html'; 
  });
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
