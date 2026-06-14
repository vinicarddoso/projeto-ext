import * as BancoDados from '../dao/ProjetoDAO';

export const ProjetoController = {
  
  cadastrarUsuario: async (nome, email, senha) => {
    if (!nome || !nome.trim()) {
      return { sucesso: false, erro: 'O nome é obrigatório.' };
    }
    if (!email || !email.trim()) {
      return { sucesso: false, erro: 'O e-mail é obrigatório.' };
    }
    if (!senha || senha.length < 6) {
      return { sucesso: false, erro: 'A senha deve conter pelo menos 6 caracteres.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { sucesso: false, erro: 'Digite um e-mail válido.' };
    }

    try {
      const usuarioFormatado = {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha: senha
      };

      await BancoDados.cadastrarUsuario(usuarioFormatado);
      return { sucesso: true, mensagem: 'Usuário cadastrado com sucesso!' };
    } catch (error) {
      if (error.message && error.message.includes('UNIQUE')) {
        return { sucesso: false, erro: 'Este e-mail já está cadastrado.' };
      }
      return { sucesso: false, erro: 'Erro interno ao salvar no banco de dados.' };
    }
  },

  login: async (email, senha) => {
    if (!email || !senha) {
      return { sucesso: false, erro: 'Preencha todos os campos.' };
    }

    try {
      const emailFormatado = email.trim().toLowerCase();
      const resultado = await BancoDados.realizarLogin(emailFormatado, senha);
      
      if (resultado.autenticado) {
        return { sucesso: true, usuario: resultado.usuario };
      } else {
        return { sucesso: false, erro: resultado.erro };
      }
    } catch (error) {
      return { sucesso: false, erro: 'Erro ao tentar realizar o login.' };
    }
  },

  gerarPix: async (usuarioId, valor, chaveCopiaCola) => {
    if (!usuarioId) {
      return { sucesso: false, erro: 'Usuário não identificado.' };
    }
    
    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      return { sucesso: false, erro: 'O valor do PIX deve ser maior que zero.' };
    }

    if (!chaveCopiaCola || !chaveCopiaCola.trim()) {
      return { sucesso: false, erro: 'A chave Copia e Cola do PIX é obrigatória.' };
    }

    try {
      await BancoDados.registrarPix(usuarioId, valorNumerico, chaveCopiaCola.trim());
      return { sucesso: true, mensagem: 'PIX registrado com sucesso!' };
    } catch (error) {
      return { sucesso: false, erro: 'Erro ao registrar o pagamento no sistema.' };
    }
  },

  mudarStatusPix: async (id, novoStatus) => {
    const statusPermitidos = ['PENDENTE', 'PAGO', 'EXPIRADO', 'CANCELADO'];
    
    if (!statusPermitidos.includes(novoStatus)) {
      return { sucesso: false, erro: 'Status de pagamento inválido.' };
    }

    try {
      await BancoDados.atualizarStatusPix(id, novoStatus);
      return { sucesso: true, mensagem: `Status atualizado para ${novoStatus}.` };
    } catch (error) {
      return { sucesso: false, erro: 'Erro ao atualizar o status do PIX.' };
    }
  },

  obterHistoricoPix: async (usuarioId) => {
    if (!usuarioId) {
      return { sucesso: false, erro: 'Usuário não especificado para a busca.' };
    }

    try {
      const lista = await BancoDados.listarHistoricoPixPorUsuario(usuarioId);
      return { sucesso: true, dados: lista };
    } catch (error) {
      return { sucesso: false, erro: 'Não foi possível carregar o histórico.' };
    }
  },

  deletarPix: async (id) => {
    if (!id) {
      return { sucesso: false, erro: 'ID do registro inválido.' };
    }

    try {
      await BancoDados.apagarRegistroPix(id);
      return { sucesso: true, mensagem: 'Registro removido com sucesso.' };
    } catch (error) {
      return { sucesso: false, erro: 'Erro ao tentar excluir o registro.' };
    }
  }
};
