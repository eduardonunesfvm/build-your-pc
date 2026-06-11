// ============================================================
//  BYP — auth.js
//  Responsável por: login, cadastro, logout, menu dinâmico
//  e validação de senha forte em tempo real
// ============================================================


// ── FUNÇÕES BASE ─────────────────────────────────────────────

function fazerLogin() {
  localStorage.setItem('logado', 'true')  // só marca que está logado
}

function fazerLogout() {
  localStorage.setItem('logado', 'false') // só desloga, não apaga os dados
  navegarComTransicao('../html/index.html')
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
    
    const senha = document.getElementById('password').value

    if (senha.length < 8) {
      alert('A senha deve ter no mínimo 8 caracteres.')
      return
    }

    localStorage.setItem('logado', 'true') 
    window.location.href = '../html/index.html'
  })
}


// ── FORMULÁRIO DE CADASTRO (COM SENHA FORTE LIVE) ────────────
const cadastroForm = document.querySelector('.cadastro-form');

if (cadastroForm) {
  const campoSenha = document.getElementById('password');
  const reqMaiuscula = document.getElementById('req-maiuscula');
  const reqNumero = document.getElementById('req-numero');
  const reqEspecial = document.getElementById('req-especial');

  // 1. ESCUTA EM TEMPO REAL: Se os elementos existirem na página, ativa a validação visual
  if (campoSenha && reqMaiuscula && reqNumero && reqEspecial) {
    campoSenha.addEventListener('input', function() {
      const senha = campoSenha.value;

      // Testes baseados em Expressões Regulares (Regex)
      const temMaiuscula = /[A-Z]/.test(senha);
      const temNumero = /[0-9]/.test(senha);
      const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

      // Atualiza as cores e ícones na caixinha embaixo do input
      atualizarIconeRequisito(reqMaiuscula, temMaiuscula);
      atualizarIconeRequisito(reqNumero, temNumero);
      atualizarIconeRequisito(reqEspecial, temEspecial);
    });
  }

  function mostrarAlerta(mensagem) {
    // Injeta o texto do aviso na caixinha
    document.getElementById('modal-alerta-mensagem').textContent = mensagem;
    // Abre o modal adicionando a classe 'ativo'
    document.getElementById('modal-alerta').classList.add('ativo');
  }

  function fecharAlerta() {
      // Fecha o modal removendo a classe
      document.getElementById('modal-alerta').classList.remove('ativo');
  }

  // Função interna auxiliar para trocar as classes de estilo e os ícones
  function atualizarIconeRequisito(elemento, condicaoSatisfeita) {
    const icone = elemento.querySelector('i');
    if (condicaoSatisfeita) {
      elemento.classList.remove('invalido');
      elemento.classList.add('valido');
      if (icone) icone.className = 'fa-solid fa-circle-check'; // Check verde
    } else {
      elemento.classList.remove('valido');
      elemento.classList.add('invalido');
      if (icone) icone.className = 'fa-solid fa-circle-xmark'; // X vermelho
    }
  }

  // 2. BLINDAGEM DO SUBMIT: Valida tudo rigidamente na hora do clique em Cadastrar
  cadastroForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const campoNome = document.getElementById('username');
    const campoEmail = document.getElementById('email');
    const campoConfirma = document.getElementById('confirm-password');

    const senha = campoSenha.value;

    // Critérios completos de segurança
    const tamanhoValido = senha.length >= 8;
    const temMaiuscula = /[A-Z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    if (!tamanhoValido) {
      mostrarAlerta('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    if (!temMaiuscula || !temNumero || !temEspecial) {
      mostrarAlerta('Sua senha está fraca! Garanta pelo menos uma letra maiúscula, um número e um caractere especial.');
      return;
    }

    if (senha !== campoConfirma.value) {
      mostrarAlerta('As senhas não coincidem!');
      return;
    }

    // Salva as credenciais no LocalStorage
    localStorage.setItem('nome', campoNome.value);
    localStorage.setItem('email', campoEmail.value);
    localStorage.setItem('logado', 'true');

    console.log("Cadastro realizado com sucesso! Redirecionando...");
    window.location.href = '../html/index.html'; 
  });
}


// ── TOGGLE DE SENHA (👁) ─────────────────────────────────────

const toggleBtns = document.querySelectorAll('.toggle-password')

toggleBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const input = btn.previousElementSibling

    if (input && input.type === 'password') {
      input.type      = 'text'
      btn.textContent = '👁'
    } else if (input) {
      input.type      = 'password'
      btn.textContent = '👁'
    }
  })
})


// ── INICIALIZA ───────────────────────────────────────────────
atualizarMenu()