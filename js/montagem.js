// ── DADOS E AUTENTICAÇÃO ──────────────────────────────────────────────────
// bloqueia acesso se não estiver logado
if (localStorage.getItem('logado') != 'true') {
    window.location.href = 'login.html'
}

// 1. Carrega os dados usando a mesma chave exata do Admin ('byp_componentes')
var componentesSalvos = JSON.parse(localStorage.getItem('byp_componentes') || 'null');

// 2. Fallback: Se o localStorage estiver vazio (primeira execução), popula com os dados iniciais do admin
if (!componentesSalvos || componentesSalvos.length === 0) {
    componentesSalvos = [
      { id: 1, nome: 'Intel Core i9-13900K',   categoria: 'processador',   specs: '24 cores, 32 threads, 5.8GHz',     preco: 3699, marca: 'Intel', serie: 'i9', imagem: '../img/i9.png' },
      { id: 2, nome: 'AMD Ryzen 9 7950X',      categoria: 'processador',   specs: '16 cores, 32 threads, 5.7GHz',     preco: 3499, marca: 'AMD', serie: 'Ryzen 9', imagem: '../img/r9.png' },
      { id: 3, nome: 'Intel Core i7-13700K',    categoria: 'processador',   specs: '16 cores, 24 threads, 5.4GHz',     preco: 1899, marca: 'Intel', serie: 'i7', imagem: '../img/i7.png' },
      { id: 4, nome: 'AMD Ryzen 5 7600X',       categoria: 'processador',   specs: '6 cores, 12 threads, 5.3GHz',      preco: 1349, marca: 'AMD', serie: 'Ryzen 5', imagem: '../img/r5.png' },
      { id: 5, nome: 'NVIDIA RTX 4090',         categoria: 'placa-video',   specs: '24GB GDDR6X, 450W TDP',            preco: 12999, marca: 'NVIDIA', serie: 'RTX 4090', imagem: '' },
      { id: 6, nome: 'AMD RX 7900 XTX',         categoria: 'placa-video',   specs: '24GB GDDR6, 355W TDP',             preco: 7999, marca: 'AMD', serie: 'RX 7900', imagem: '../img/rx7900xt.png' },
      { id: 7, nome: 'RTX 3060 12GB',           categoria: 'placa-video',   specs: 'NVIDIA Ampere, 12GB GDDR6',        preco: 1799, marca: 'NVIDIA', serie: 'RTX 3060', imagem: '../img/rtx3060.png' },
      { id: 8, nome: 'Corsair Vengeance 32GB',  categoria: 'memoria',       specs: '2x16GB DDR5-6000, CL36',           preco: 899, marca: 'Corsair', serie: 'DDR5', imagem: '../img/corsair-ddr4.png' },
      { id: 9, nome: 'Kingston Fury 16GB',      categoria: 'memoria',       specs: '2x8GB DDR4-3200, CL16',            preco: 299, marca: 'Kingston', serie: 'DDR4', imagem: '../img/kingston-ddr4.png' },
      { id:10, nome: 'ASUS ROG Crosshair X670', categoria: 'placa-mae',     specs: 'AMD AM5, ATX, Wi-Fi 6E',           preco: 2999, marca: 'ASUS', serie: 'X670', imagem: '' },
      { id:11, nome: 'MSI MAG B660M DDR4',      categoria: 'placa-mae',     specs: 'Intel LGA1700, mATX',              preco: 599, marca: 'MSI', serie: 'B660M', imagem: '../img/asus-b660m-pro-rs-ddr4.png' },
      { id:12, nome: 'Samsung 990 Pro 1TB',     categoria: 'armazenamento', specs: 'NVMe PCIe 4.0, 7450MB/s leitura', preco: 499, marca: 'Samsung', serie: '990 Pro', imagem: '' },
      { id:13, nome: 'Seagate Barracuda 2TB',   categoria: 'armazenamento', specs: 'HDD SATA III, 7200RPM',            preco: 249, marca: 'Seagate', serie: 'Barracuda', imagem: '' },
      { id:14, nome: 'Corsair RM850x',          categoria: 'fonte',         specs: '850W, 80 Plus Gold, Modular',      preco: 849, marca: 'Corsair', serie: 'RM', imagem: '' },
      { id:15, nome: 'NZXT H510',               categoria: 'gabinete',      specs: 'ATX Mid Tower, vidro temperado',   preco: 599, marca: 'NZXT', serie: 'H Series', imagem: '../img/nzxt-h510.png' },
      { id:16, nome: 'Noctua NH-D15',           categoria: 'cooler',        specs: 'Air cooler, 2x140mm, 250W TDP',    preco: 699, marca: 'Noctua', serie: 'NH', imagem: '../img/noctua-nh-d15.png' },
    ];
    localStorage.setItem('byp_componentes', JSON.stringify(componentesSalvos));
}

// 3. Estrutura as categorias base do sistema
var categoriasBase = [
    { id: 'processador', categoria: 'PROCESSADOR' },
    { id: 'placa-video', categoria: 'PLACA DE VÍDEO' },
    { id: 'memoria', categoria: 'MEMÓRIA' },
    { id: 'placa-mae', categoria: 'PLACA-MÃE' },
    { id: 'armazenamento', categoria: 'ARMAZENAMENTO' },
    { id: 'fonte', categoria: 'FONTE' },
    { id: 'gabinete', categoria: 'GABINETE' },
    { id: 'cooler', categoria: 'COOLER' }
];

// 4. Agrupa e mapeia os itens dinamicamente para o formato da tela de montagem
var pecas = categoriasBase.map(function(cat) {
    var itensDaCategoria = componentesSalvos.filter(function(item) {
        return item.categoria === cat.id;
    });

    var opcoesMapeadas = itensDaCategoria.map(function(item) {
        return {
            nome: item.nome,
            detalhe: item.specs || item.detalhe || '', 
            preco: parseFloat(item.preco) || 0,
            marca: item.marca || '',
            serie: item.serie || '',
            imagem: item.imagem || ''
        };
    });

    return {
        id: cat.id,
        categoria: cat.categoria,
        opcoes: opcoesMapeadas
    };
});

// ── VARIÁVEIS DE ESTADO UNIFICADAS ──────────────────────────────────────────
var selecionados   = JSON.parse(localStorage.getItem('byp_build') || '{}');
var pecaAtiva      = null; // id da peça com painel aberto
var idBuildAtual   = localStorage.getItem('byp_id_build_atual') || '';
var nomeBuildAtual = localStorage.getItem('byp_nome_build_atual') || '';
var filtroMarca    = "";
var filtroSerie    = ""; 

// ── RENDERIZAR ESTRUTURA PRINCIPAL ─────────────────────────────────────────
function renderizar() {
  var esq = document.getElementById('lista-pecas')
  var dir = document.getElementById('lista-selecionados')
  esq.innerHTML = ''
  dir.innerHTML = ''

  for (var i = 0; i < pecas.length; i++) {
    var peca = pecas[i]
    var sel  = selecionados[peca.id]
    var ativa = pecaAtiva == peca.id ? ' ativa' : ''

    // esquerda
    esq.innerHTML +=
      '<div class="peca-row' + ativa + '" onclick="abrirPainel(\'' + peca.id + '\')">' +
        '<div class="peca-info">' +
          '<span class="peca-categoria">' + peca.categoria + '</span>' +
          '<span class="peca-nome">' + (sel ? sel.nome : peca.categoria) + '</span>' +
        '</div>' +
        '<i class="fa-solid fa-chevron-right peca-row-icon"></i>' +
      '</div>'

    // direita
    var preenchido = sel ? ' preenchido' : ''
    dir.innerHTML +=
      '<div class="selecionado-row' + preenchido + '">' +
        '<div class="sel-info">' +
          '<span class="sel-categoria">' + peca.categoria + '</span>' +
          '<span class="sel-nome">' + (sel ? sel.nome : '—') + '</span>' +
        '</div>' +
        '<div class="sel-direita">' +
          (sel ? '<span class="sel-preco">R$ ' + sel.preco.toLocaleString('pt-BR') + '</span>' : '') +
          (sel ? '<button class="sel-remover" onclick="remover(\'' + peca.id + '\')" title="Remover"><i class="fa-solid fa-xmark"></i></button>' : '') +
        '</div>' +
      '</div>'
  }

  calcularTotal()
}

// ── PAINEL DE SELEÇÃO ──────────────────────────────────────────────────────
function abrirPainel(id) {
    if (pecaAtiva == id) {
        fecharPainel();
        return;
    }

    pecaAtiva = id;
    filtroMarca = "";
    filtroSerie = "";

    var peca = getPeca(id);

    document.getElementById('painel-titulo').textContent = peca.categoria;
    document.getElementById('busca-input').value = '';
    
    renderizarOpcoes(peca.opcoes);

    document.getElementById('painel').classList.add('aberto');
    document.getElementById('overlay').classList.add('visivel');

    renderizar();
}

function fecharPainel() {
    pecaAtiva = null;
    document.getElementById('painel').classList.remove('aberto');
    document.getElementById('overlay').classList.remove('visivel');
    
    const containerPreview = document.getElementById('preview-lateral-container');
    if (containerPreview) containerPreview.style.display = 'none';
    
    renderizar();
}

function renderizarOpcoes(opcoes) {
  var lista = document.getElementById('painel-lista');
  var containerFiltros = document.getElementById('painel-filtros');
  lista.innerHTML = '';
  
  const marcasExistentes = [...new Set(opcoes.map(o => o.marca).filter(m => m))];
  
  if (marcasExistentes.length > 0) {
      containerFiltros.innerHTML = marcasExistentes.map(m => 
          `<button class="btn-filtro ${filtroMarca === m ? 'ativo' : ''}" 
                  onclick="setFiltroMarca('${m}')">${m}</button>`
      ).join('');
  } else {
      containerFiltros.innerHTML = '';
  }

  var busca = document.getElementById('busca-input').value.toLowerCase();
  
  let filtradas = opcoes.filter(op => {
      const bateMarca = filtroMarca === "" || op.marca === filtroMarca;
      const bateBusca = op.nome.toLowerCase().includes(busca);
      return bateMarca && bateBusca;
  });

  if (filtradas.length == 0) {
      lista.innerHTML = '<p style="color:#555;font-size:13px;padding:16px;">Nenhum resultado encontrado.</p>';
      return;
  }

  filtradas.forEach(op => {
      var sel = selecionados[pecaAtiva];
      var isSel = sel && sel.nome == op.nome;
      var classSel = isSel ? ' selecionada' : '';
      
      lista.innerHTML += `
          <div class="opcao-card ${classSel}" 
              onclick="selecionar('${op.nome}', ${op.preco}, '${op.detalhe}')"
              onmouseover="atualizarPreviewGrande('${op.imagem}', '${op.nome}')">
              <div class="opcao-info">
                  <span class="opcao-nome">${op.nome}</span>
                  <span class="opcao-detalhe">${op.detalhe}</span>
              </div>
              <div class="opcao-preco">
                  R$ ${op.preco.toLocaleString('pt-BR')}
                  <i class="fa-solid fa-check opcao-check"></i>
              </div>
          </div>`;
  });
}

// ── FUNÇÕES DE CONTROLE DE UI ──────────────────────────────
function setFiltroMarca(marca) {
    filtroMarca = (filtroMarca === marca) ? "" : marca;
    var peca = getPeca(pecaAtiva);
    renderizarOpcoes(peca.opcoes);
}

function atualizarPreviewGrande(url, nome) {
    const container = document.getElementById('preview-lateral-container');
    const img = document.getElementById('img-preview-grande');
    const txt = document.getElementById('preview-nome-grande');

    if (url && url !== "undefined" && url !== "") {
        img.src = url;
        if (txt) txt.textContent = nome;
        container.style.display = 'flex';
    } else {
        container.style.display = 'none';
    }
}

function filtrarOpcoes() {
    var peca = getPeca(pecaAtiva);
    renderizarOpcoes(peca.opcoes);
}

// ── AÇÕES DE SELEÇÃO INTERNA ───────────────────────────────────────────────
function selecionar(nome, preco, detalhe) {
  selecionados[pecaAtiva] = { nome: nome, preco: preco, detalhe: detalhe }
  var peca = getPeca(pecaAtiva)
  renderizarOpcoes(peca.opcoes)
  renderizar()
}

function remover(id) {
  delete selecionados[id]
  if (pecaAtiva == id) {
    var peca = getPeca(id)
    renderizarOpcoes(peca.opcoes)
  }
  renderizar()
}

// ── LOGICA DO MODAL CUSTOMIZADO NEON (NOVA BUILD) ──────────────────────────
function novaBuild() {
  // Limpa o campo do input do modal customizado antes de abrir
  document.getElementById('input-nome-build').value = '';
  
  // Abre o modal removendo o bloqueio de display
  document.getElementById('modal-nome-build').classList.add('aberto');
  
  // Foca automaticamente no campo de texto
  setTimeout(function() {
    document.getElementById('input-nome-build').focus();
  }, 300);
}

function confirmarNovaBuild() {
  var nome = document.getElementById('input-nome-build').value.trim();
  
  if (nome === "") {
    mostrarToast("A build precisa de um nome válido!", true);
    return;
  }

  // Reseta os estados locais
  selecionados = {};
  idBuildAtual = Math.random().toString(36).slice(2, 10); 
  nomeBuildAtual = nome;

  // Atualiza as chaves no LocalStorage
  localStorage.setItem('byp_id_build_atual', idBuildAtual);
  localStorage.setItem('byp_nome_build_atual', nomeBuildAtual);
  localStorage.setItem('byp_build', JSON.stringify(selecionados));

  // Fecha o painel, esconde o modal e atualiza a UI
  fecharModalCustomizado();
  fecharPainel();
  renderizar();
  mostrarToast('Build "' + nomeBuildAtual + '" iniciada!');
}

function fecharModalCustomizado() {
  document.getElementById('modal-nome-build').classList.remove('aberto');
}

// ── LOGICA DE SALVAMENTO NO HISTÓRICO ──────────────────────────────────────
function salvarBuild() {
  var totalPecas = Object.keys(selecionados).length;
  if (totalPecas == 0) {
    mostrarToast('Selecione ao menos uma peça antes de salvar.', true);
    return;
  }

  // UX Guard: se burlar a entrada sem nome, o modal reabre forçadamente
  if (!nomeBuildAtual) {
    novaBuild();
    return;
  }

  var total = 0;
  for (var id in selecionados) { total += selecionados[id].preco; }

  var listaBuilds = JSON.parse(localStorage.getItem('byp_lista_builds') || '[]');
  var idx = listaBuilds.findIndex(function(b) { return b.id === idBuildAtual; });

  var dadosBuild = {
    id: idBuildAtual,
    nome: nomeBuildAtual,
    pecas: selecionados,
    total: total,
    data: new Date().toLocaleDateString('pt-BR')
  };

  if (idx >= 0) {
    listaBuilds[idx] = dadosBuild;
    mostrarToast('Build "' + nomeBuildAtual + '" atualizada!');
  } else {
    listaBuilds.push(dadosBuild);
    mostrarToast('Build "' + nomeBuildAtual + '" salva com sucesso!');
  }

  localStorage.setItem('byp_lista_builds', JSON.stringify(listaBuilds));
  localStorage.setItem('byp_build', JSON.stringify(selecionados));
}

// ── UTILITÁRIOS E AUXILIARES ───────────────────────────────────────────────
function calcularTotal() {
  var total = 0
  for (var id in selecionados) { total += selecionados[id].preco }
  document.getElementById('total-geral').textContent = 'R$ ' + total.toLocaleString('pt-BR')
}

// Retorna o objeto da categoria filtrando pelo ID
function getPeca(id) {
  for (var i = 0; i < pecas.length; i++) {
    if (pecas[i].id == id) return pecas[i]
  }
  return null
}

function mostrarToast(msg, erro) {
  var t = document.getElementById('toast')
  t.textContent = msg
  t.className = 'toast visivel'
  if (erro) t.style.background = '#ff4d4d'
  else t.style.background = '#00ffae'
  setTimeout(function() { t.className = 'toast' }, 3000)
}

// ── CHECAGEM AUTOMÁTICA DE UX AO CARREGAR ──────────────────────────────────
function verificarBuildInicial() {
  // Se veio direto da home sem uma build em andamento, abre o modal na hora
  if (!nomeBuildAtual || nomeBuildAtual.trim() === "") {
    novaBuild();
  } else {
    // Se o LocalStorage já possuía rascunho ativo, carrega e exibe o Toast informativo
    mostrarToast('Editando: ' + nomeBuildAtual);
  }
}

// Execução inicializada
renderizar();
verificarBuildInicial();