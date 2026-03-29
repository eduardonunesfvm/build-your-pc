// Carrega os dados salvos no localStorage
    function carregarPerfil() {
      var nome    = localStorage.getItem('nome')    || '—';
      var email   = localStorage.getItem('email')   || '—';
      var usuario = localStorage.getItem('usuario') || '—';

      document.getElementById('exibe-nome').textContent    = nome;
      document.getElementById('exibe-email').textContent   = email;
      document.getElementById('exibe-usuario').textContent = usuario;

      document.getElementById('input-nome').value  = nome !== '—' ? nome : '';
      document.getElementById('input-email').value = email !== '—' ? email : '';
    }

    // Ativa o modo de edição
    function ativarEdicao() {
      document.getElementById('card-info').classList.add('editando');
    }

    // Salva as alterações
    function salvarInfo() {
      var nome  = document.getElementById('input-nome').value;
      var email = document.getElementById('input-email').value;

      if (nome == '' || email == '') {
        mostrarToast('Preencha todos os campos.', true);
        return;
      }

      localStorage.setItem('nome', nome);
      localStorage.setItem('email', email);

      document.getElementById('card-info').classList.remove('editando');
      carregarPerfil();
      mostrarToast('Informações salvas!');
    }

    // Mostra ou esconde a senha
    function verSenha(id, btn) {
      var input = document.getElementById(id);
      var icone = btn.querySelector('i');

      if (input.type == 'password') {
        input.type = 'text';
        icone.classList.remove('fa-eye');
        icone.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icone.classList.remove('fa-eye-slash');
        icone.classList.add('fa-eye');
      }
    }

    // Validação de senha (lógica do back-end vem depois)
    function alterarSenha() {
      var atual    = document.getElementById('senha-atual').value;
      var nova     = document.getElementById('senha-nova').value;
      var confirma = document.getElementById('senha-confirma').value;

      if (atual == '' || nova == '' || confirma == '') {
        mostrarToast('Preencha todos os campos.', true);
        return;
      }

      if (nova != confirma) {
        mostrarToast('As senhas não coincidem.', true);
        return;
      }

      // aqui você vai chamar o back-end futuramente
      mostrarToast('Senha alterada com sucesso!');
      document.getElementById('senha-atual').value    = '';
      document.getElementById('senha-nova').value     = '';
      document.getElementById('senha-confirma').value = '';
    }

    // Sai da conta
    function sair() {
      localStorage.clear();
      window.location.href = 'index.html';
    }

    // Exibe mensagem de feedback
    function mostrarToast(mensagem, erro) {
      var toast = document.getElementById('toast');
      toast.textContent = mensagem;
      toast.className = 'toast visivel';
      if (erro) {
        toast.className = 'toast visivel erro';
      }
      setTimeout(function() {
        toast.className = 'toast';
      }, 3000);
    }

    carregarPerfil();