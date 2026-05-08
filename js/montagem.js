// ── DADOS ──────────────────────────────────────────────────
    // bloqueia acesso se não estiver logado
    if (localStorage.getItem('logado') != 'true') {
    window.location.href = 'login.html'
    }

    var pecas = [
        // Exemplo de como deve ficar o array de processadores
      {
        id: 'processador', categoria: 'PROCESSADOR',
        opcoes: [
        { nome: 'Intel Core i5-13400F', detalhe: '10 cores, 16 threads, 4.6GHz', preco: 1199, marca: 'Intel', serie: 'i5', imagem: '../img/i5.png' },
        { nome: 'Intel Core i7-13700K', detalhe: '16 cores, 24 threads, 5.4GHz', preco: 1899, marca: 'Intel', serie: 'i7', imagem: '../img/i7.png' },
        { nome: 'AMD Ryzen 5 7600X', detalhe: '6 cores, 12 threads, 5.3GHz', preco: 1349, marca: 'AMD', serie: 'Ryzen 5', imagem: '../img/r5.png' },
        { nome: 'AMD Ryzen 7 7700X',    detalhe: '8 cores, 16 threads, 5.4GHz',  preco: 1999, marca: 'AMD', serie: 'Ryzen 7', imagem: '../img/r7.png' },
        { nome: 'Intel Core i9-13900K', detalhe: '24 cores, 32 threads, 5.8GHz', preco: 3499, marca: 'Intel', serie: 'i9', imagem: '../img/i9.png' },
        ]
      },

      {
        id: 'placa-video', categoria: 'PLACA DE VÍDEO',
        opcoes: [
          { nome: 'RX 6600 XT 8GB',         detalhe: 'AMD RDNA 2, 8GB GDDR6',        preco: 1399, marca: 'AMD', serie: 'RX 6600', imagem: '../img/rx6600.png' },
          { nome: 'RTX 3060 12GB',           detalhe: 'NVIDIA Ampere, 12GB GDDR6',    preco: 1799, marca: 'NVIDIA', serie: 'RTX 3060', imagem: '../img/rtx3060.png' },
          { nome: 'RTX 4060 Ti 8GB',         detalhe: 'NVIDIA Ada Lovelace, 8GB',     preco: 2499, marca: 'NVIDIA', serie: 'RTX 4060 Ti', imagem: '../img/rtx4060ti.png' },
          { nome: 'RX 7900 XT 20GB',         detalhe: 'AMD RDNA 3, 20GB GDDR6',       preco: 4299, marca: 'AMD', serie: 'RX 7900 XT', imagem: '../img/rx7900xt.png' },
        ]
      },
      {
        id: 'memoria', categoria: 'MEMÓRIA',
        opcoes: [
          { nome: 'DDR4 16GB 3200MHz', detalhe: '2x8GB, CL16', preco: 299, marca: ' Kingston', serie: 'DDR4', imagem: '../img/kingston-ddr4.png' },
          { nome: 'DDR4 32GB 3600MHz', detalhe: '2x16GB, CL18', preco: 549, marca: 'Corsair', serie: 'DDR4', imagem: '../img/corsair-ddr4.png' },
          { nome: 'DDR5 16GB 5600MHz', detalhe: '2x8GB, CL36',  preco: 499, marca: 'G.Skill', serie: 'DDR5', imagem: '../img/gskill-ddr5.png' },
          { nome: 'DDR5 32GB 6000MHz', detalhe: '2x16GB, CL30', preco: 899, marca: 'Crucial', serie: 'DDR5', imagem: '../img/crucial-ddr5.png' },
        ]
      },
      {
        id: 'placa-mae', categoria: 'PLACA-MÃE',
        opcoes: [
          { nome: 'B660M Pro RS DDR4',    detalhe: 'Intel LGA1700, mATX',  preco: 599, marca: 'ASUS', serie: 'B660M Pro RS', imagem: '../img/asus-b660m-pro-rs-ddr4.png' },
          { nome: 'Z790 Aorus Elite AX',  detalhe: 'Intel LGA1700, ATX',   preco: 1799, marca: 'Gigabyte', serie: 'Z790 Aorus Elite AX', imagem: '../img/gigabyte-z790-aorus-elite-ax.png' },
          { nome: 'B650 Steel Legend',    detalhe: 'AMD AM5, ATX',          preco: 999, marca: 'MSI', serie: 'B650 Steel Legend', imagem: '../img/msi-b650-steel-legend.png' },
          { nome: 'X670E Taichi',         detalhe: 'AMD AM5, ATX',          preco: 2999, marca: 'Gigabyte', serie: 'X670E Taichi', imagem: '../img/gigabyte-x670e-taichi.png' },
        ]
      },
      {
        id: 'armazenamento', categoria: 'ARMAZENAMENTO',
        opcoes: [
          { nome: 'SSD NVMe 500GB',  detalhe: 'PCIe 3.0, 3500MB/s leitura', preco: 249 },
          { nome: 'SSD NVMe 1TB',    detalhe: 'PCIe 4.0, 7000MB/s leitura', preco: 399 },
          { nome: 'SSD NVMe 2TB',    detalhe: 'PCIe 4.0, 7000MB/s leitura', preco: 699 },
          { nome: 'HDD 2TB 7200RPM', detalhe: 'SATA III, 220MB/s leitura',  preco: 249 },
        ]
      },
      {
        id: 'fonte', categoria: 'FONTE',
        opcoes: [
          { nome: 'Corsair CV550 550W',       detalhe: '80 Plus Bronze', preco: 349 },
          { nome: 'EVGA 650 GQ 650W',         detalhe: '80 Plus Gold',   preco: 549 },
          { nome: 'Seasonic Focus GX 850W',   detalhe: '80 Plus Gold',   preco: 849 },
          { nome: 'be quiet! Dark Power 1000W',detalhe: '80 Plus Platinum', preco: 1499 },
        ]
      },
      {
        id: 'gabinete', categoria: 'GABINETE',
        opcoes: [
          { nome: 'Cooler Master Q300L', detalhe: 'mATX, lateral em acrílico', preco: 299 },
          { nome: 'NZXT H510',           detalhe: 'ATX, vidro temperado',       preco: 599 },
          { nome: 'Lian Li Lancool 216', detalhe: 'ATX, 2 fans inclusos',       preco: 899 },
          { nome: 'Fractal Define 7',    detalhe: 'ATX, isolamento acústico',   preco: 1299 },
        ]
      },
      {
        id: 'cooler', categoria: 'COOLER',
        opcoes: [
          { nome: 'Cooler Master Hyper 212', detalhe: 'Air cooler, 120mm',      preco: 199 },
          { nome: 'Noctua NH-D15',           detalhe: 'Air cooler, 2x140mm',    preco: 699 },
          { nome: 'NZXT Kraken X53 240mm',   detalhe: 'AIO líquido, 240mm',     preco: 799 },
          { nome: 'Corsair H150i 360mm',     detalhe: 'AIO líquido, 360mm',     preco: 1299 },
        ]
      },
    ]

    var selecionados = {}
    var pecaAtiva    = null  // id da peça com painel aberto

    // ── RENDERIZAR ─────────────────────────────────────────────

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

   // ── VARIÁVEIS DE CONTROLE DE FILTRO ──
var filtroMarca = "";
var filtroSerie = ""; // Caso queira filtrar por i5, i7, Ryzen 5, etc.

// ── PAINEL ─────────────────────────────────────────────────

function abrirPainel(id) {
    // Se clicou na mesma peça, fecha
    if (pecaAtiva == id) {
        fecharPainel();
        return;
    }

    // RESETAR FILTROS AO ABRIR NOVA CATEGORIA
    pecaAtiva = id;
    filtroMarca = "";
    filtroSerie = "";

    var peca = getPeca(id);

    document.getElementById('painel-titulo').textContent = peca.categoria;
    document.getElementById('busca-input').value = '';
    
    // Renderiza as opções iniciais
    renderizarOpcoes(peca.opcoes);

    document.getElementById('painel').classList.add('aberto');
    document.getElementById('overlay').classList.add('visivel');

    renderizar();
}

function fecharPainel() {
    pecaAtiva = null;
    document.getElementById('painel').classList.remove('aberto');
    document.getElementById('overlay').classList.remove('visivel');
    
    // ESCONDE O PREVIEW DO FUNDO AO FECHAR
    const containerPreview = document.getElementById('preview-lateral-container');
    if (containerPreview) containerPreview.style.display = 'none';
    
    renderizar();
}

  function renderizarOpcoes(opcoes) {
      var lista = document.getElementById('painel-lista');
      var containerFiltros = document.getElementById('painel-filtros');
      lista.innerHTML = '';
      
      // 1. GERAR BOTÕES DE MARCA
      // Pega as marcas únicas das opções (ex: Intel, AMD)
      const marcasExistentes = [...new Set(opcoes.map(o => o.marca).filter(m => m))];
      
      if (marcasExistentes.length > 0) {
          containerFiltros.innerHTML = marcasExistentes.map(m => 
              `<button class="btn-filtro ${filtroMarca === m ? 'ativo' : ''}" 
                      onclick="setFiltroMarca('${m}')">${m}</button>`
          ).join('');
      } else {
          containerFiltros.innerHTML = '';
      }

      // 2. APLICAR FILTROS (Marca e Busca)
      var busca = document.getElementById('busca-input').value.toLowerCase();
      
      let filtradas = opcoes.filter(op => {
          const bateMarca = filtroMarca === "" || op.marca === filtroMarca;
          const bateBusca = op.nome.toLowerCase().includes(busca);
          return bateMarca && bateBusca;
      });

      // 3. RENDERIZAR OS CARDS
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

  // ── FUNÇÕES DE CONTRELE DE UI ──────────────────────────────

  function setFiltroMarca(marca) {
      // Toggle: se clicar na mesma, desmarca
      filtroMarca = (filtroMarca === marca) ? "" : marca;
      var peca = getPeca(pecaAtiva);
      renderizarOpcoes(peca.opcoes);
  }

  // Função que faz a mágica no "Espaço Vazio" à esquerda
  function atualizarPreviewGrande(url, nome) {
      const container = document.getElementById('preview-lateral-container');
      const img = document.getElementById('img-preview-grande');
      const txt = document.getElementById('preview-nome-grande');

      // Só mostra se houver uma URL de imagem válida
      if (url && url !== "undefined" && url !== "") {
          img.src = url;
          if (txt) txt.textContent = nome;
          container.style.display = 'flex';
      } else {
          container.style.display = 'none';
      }
  }

  // Ajuste na função de busca para conversar com os filtros
  function filtrarOpcoes() {
      var peca = getPeca(pecaAtiva);
      renderizarOpcoes(peca.opcoes);
  }

    // ── AÇÕES ───────────────────────────────────────────────────

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

    function novaBuild() {
      selecionados = {}
      fecharPainel()
      mostrarToast('Build resetada!')
    }

    function salvarBuild() {
      var totalPecas = Object.keys(selecionados).length
      if (totalPecas == 0) {
        mostrarToast('Selecione ao menos uma peça antes de salvar.', true)
        return
      }
      localStorage.setItem('byp_build', JSON.stringify(selecionados))
      mostrarToast('Build salva com sucesso!')
    }

    function calcularTotal() {
      var total = 0
      for (var id in selecionados) { total += selecionados[id].preco }
      document.getElementById('total-geral').textContent = 'R$ ' + total.toLocaleString('pt-BR')
    }

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

    // carrega build salva se existir
    var buildSalva = localStorage.getItem('byp_build')
    if (buildSalva) { selecionados = JSON.parse(buildSalva) }

    renderizar()