// ── CONFIGURAÇÕES INICIAIS DE ACESSIBILIDADE ─────────────────

document.addEventListener("DOMContentLoaded", function () {
  // Injeta o HTML do botão automaticamente em qualquer página que tenha o script
  injetarHtmlAcessibilidade();

  // Carrega as preferências salvas do usuário
  const altoContrasteAtivo = localStorage.getItem("byp_alto_contraste") === "true";
  const fonteDislexiaAtiva = localStorage.getItem("byp_fonte_dislexia") === "true";
  const tamanhoFonteSalvo = localStorage.getItem("byp_tamanho_fonte") || "normal";

  // Aplica as configurações salvas se existirem
  if (altoContrasteAtivo) document.body.classList.add("alto-contraste");
  if (fonteDislexiaAtiva) document.body.classList.add("fonte-dislexia");
  if (tamanhoFonteSalvo !== "normal") document.body.classList.add("fonte-" + tamanhoFonteSalvo);
});

// ── INJEÇÃO DO HTML DINÂMICO ────────────────────────────────

function injetarHtmlAcessibilidade() {
  const widget = document.createElement("div");
  widget.className = "a11y-widget";
  widget.innerHTML = `
    <button class="a11y-btn-flutuante" onclick="toggleMenuA11y()" title="Menu de Acessibilidade">
      <i class="fa-solid fa-universal-access"></i>
    </button>
    <div class="a11y-menu" id="a11y-menu">
      <div class="a11y-header">ACESSIBILIDADE</div>
      <button onclick="alterarFonte('aumentar')"><i class="fa-solid fa-font"></i> Aumentar Texto</button>
      <button onclick="alterarFonte('diminuir')"><i class="fa-solid fa-font fa-xs"></i> Diminuir Texto</button>
      <button onclick="toggleAltoContraste()"><i class="fa-solid fa-circle-half-stroke"></i> Alto Contraste</button>
      <button onclick="toggleFonteDislexia()"><i class="fa-solid fa-eye"></i> Ler com Facilidade</button>
    </div>
  `;
  document.body.appendChild(widget);
}

// ── FUNÇÕES DE CONTROLE ─────────────────────────────────────

function toggleMenuA11y() {
  const menu = document.getElementById("a11y-menu");
  menu.classList.toggle("aberto");
}

// Fecha o menu se o usuário clicar fora dele
document.addEventListener("click", function (e) {
  const menu = document.getElementById("a11y-menu");
  const widget = document.querySelector(".a11y-widget");
  if (menu && menu.classList.contains("aberto") && !widget.contains(e.target)) {
    menu.classList.remove("aberto");
  }
});

function alterarFonte(acao) {
  if (acao === "aumentar") {
    if (document.body.classList.contains("fonte-diminuir")) {
      document.body.classList.remove("fonte-diminuir");
      localStorage.setItem("byp_tamanho_fonte", "normal");
    } else if (!document.body.classList.contains("fonte-aumentar")) {
      document.body.classList.add("fonte-aumentar");
      localStorage.setItem("byp_tamanho_fonte", "aumentar");
    }
  } else if (acao === "diminuir") {
    if (document.body.classList.contains("fonte-aumentar")) {
      document.body.classList.remove("fonte-aumentar");
      localStorage.setItem("byp_tamanho_fonte", "normal");
    } else if (!document.body.classList.contains("fonte-diminuir")) {
      document.body.classList.add("fonte-diminuir");
      localStorage.setItem("byp_tamanho_fonte", "diminuir");
    }
  }
}

function toggleAltoContraste() {
  const ativo = document.body.classList.toggle("alto-contraste");
  localStorage.setItem("byp_alto_contraste", ativo);
}

function toggleFonteDislexia() {
  const ativa = document.body.classList.toggle("fonte-dislexia");
  localStorage.setItem("byp_fonte_dislexia", ativa);
}

// ── SCRIPT DE TRANSIÇÃO SUAVE ENTRE TELAS ──────────────────

// 1. Faz a página atual aparecer suavemente assim que o HTML estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function() {
    document.body.classList.add("pagina-carregada");
  }, 50); // Pequeno delay para o navegador processar o início
});

// 2. Intercepta cliques em links internos para fazer o Fade-Out antes de sair
document.addEventListener("click", function (e) {
  // Procura se o clique aconteceu em um link <a>
  const link = e.target.closest("a");

  // Se for um link válido, interno e não for uma âncora (#) ou link externo
  if (link && link.href && !link.href.includes("#") && link.target !== "_blank" && link.hostname === window.location.hostname) {
    
    // Se o link for um botão de voltar falso/js, não intercepta
    if (link.href.startsWith("javascript:")) return;

    e.preventDefault(); // Bloqueia o redirecionamento instantâneo do navegador
    const urlDestino = link.href;

    // Dispara o efeito de desaparecer
    document.body.classList.remove("pagina-carregada");
    document.body.classList.add("pagina-saindo");

    // Aguarda a animação de 400ms terminar e muda de página de verdade
    setTimeout(function () {
      window.location.href = urlDestino;
    }, 400);
  }
});

// 3. Função global para você usar em botões que usam "onclick=" em vez de links <a>
function navegarComTransicao(urlDestino) {
  document.body.classList.remove("pagina-carregada");
  document.body.classList.add("pagina-saindo");

  setTimeout(function () {
    window.location.href = urlDestino;
  }, 400);
}