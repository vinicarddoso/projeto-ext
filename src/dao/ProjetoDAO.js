import * as SQLite from 'expo-sqlite';

let dbInstance = null;

async function abrirConexao(){
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('projeto_extensao.db');
  }
  return dbInstance;
}

export async function iniciarTabelas(){
    try {
      const db = await abrirConexao();
      
      await db.execAsync(`PRAGMA foreign_keys = ON;`);

      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS usuarios(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          senha TEXT NOT NULL,
          dataCriacao TEXT NOT NULL
        );`
      );

      return await db.execAsync(
        `CREATE TABLE IF NOT EXISTS pagamentos_pix(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_id INTEGER NOT NULL,
          chave_copia_cola TEXT NOT NULL,
          valor REAL NOT NULL,
          status TEXT NOT NULL DEFAULT 'PENDENTE',
          dataCriacao TEXT NOT NULL,
          FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
        );`
      );
    } catch(error){
      console.error("Erro DDL (Criar Tabelas):", error);
      throw error;
    }
}

export async function cadastrarUsuario(usuario){
    try {
      const db = await abrirConexao();
      return await db.runAsync(
        'INSERT INTO usuarios (nome, email, senha, dataCriacao) VALUES (?, ?, ?, ?);',
        [usuario.nome, usuario.email, usuario.senha, new Date().toISOString()]
      );
    } catch(error){
      console.error('Erro ao cadastrar usuário:', error);
      throw error;
    }
}

export async function realizarLogin(email, senha){
    try {
      const db = await abrirConexao();
      const usuario = await db.getFirstAsync(
        'SELECT id, nome, email FROM usuarios WHERE email = ? AND senha = ?;',
        [email, senha]
      );
      
      if (usuario) {
        return { autenticado: true, usuario };
      } else {
        return { autenticado: false, erro: 'E-mail ou senha incorretos.' };
      }
    } catch(error){
      console.error('Erro ao realizar login:', error);
      throw error;
    }
}

export async function registrarPix(usuarioId, valor, chaveCopiaCola){
    try {
      const db = await abrirConexao();
      return await db.runAsync(
        'INSERT INTO pagamentos_pix (usuario_id, valor, chave_copia_cola, dataCriacao) VALUES (?, ?, ?, ?);',
        [usuarioId, valor, chaveCopiaCola, new Date().toISOString()]
      );
    } catch(error){
      console.error('Erro ao registrar PIX:', error);
      throw error;
    }
}

export async function atualizarStatusPix(id, novoStatus){
    try {
      const db = await abrirConexao();
      return await db.runAsync(
        'UPDATE pagamentos_pix SET status=? WHERE id=?;',
        [novoStatus, id]
      ); 
    } catch(error){
      console.error('Erro ao atualizar status do PIX:', error);
      throw error;
    }
}

export async function listarHistoricoPixPorUsuario(usuarioId){
    try {
      const db = await abrirConexao();
      return await db.getAllAsync(
        'SELECT * FROM pagamentos_pix WHERE usuario_id = ? ORDER BY dataCriacao DESC;',
        [usuarioId]
      );
    } catch(error){
      console.error('Erro ao listar histórico de PIX:', error);
      throw error;
    }
}

export async function apagarRegistroPix(id){
    try {
      const db = await abrirConexao();
      return await db.runAsync('DELETE FROM pagamentos_pix WHERE id = ?;', [id]);
    } catch(error){
      console.error('Erro ao deletar registro de PIX:', error);
      throw error;
    }
}
