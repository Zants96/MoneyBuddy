import { SQLiteDatabase } from "expo-sqlite/next";

export async function initDB(db: SQLiteDatabase) {
  await db.execAsync(`
    
    CREATE TABLE IF NOT EXISTS categoria (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      tipo TEXT NOT NULL CHECK (tipo IN ('Despesa', 'Receita'))
    );

    CREATE TABLE IF NOT EXISTS transacao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL CHECK (tipo IN ('Despesa', 'Receita')),
      total REAL NOT NULL,
      categoria_id INTEGER NOT NULL,
      data INTEGER NOT NULL,
      categoria TEXT NOT NULL,
      descricao VARCHAR(255),
      FOREIGN KEY (categoria_id) REFERENCES categoria(id)
    );
  `);

  const result: any = await db.execAsync(
    `SELECT COUNT(*) as count FROM categoria;`
  );
  const count = result?.[0]?.rows?.[0]?.count;

  console.log("result", result);
  console.log("count", count);

  if (count === 0 || count === undefined) {
    await db.execAsync(`
      INSERT INTO categoria (nome, tipo) VALUES ('Alimentação', 'Despesa');
      INSERT INTO categoria (nome, tipo) VALUES ('Assinaturas', 'Despesa');
      INSERT INTO categoria (nome, tipo) VALUES ('Compras', 'Despesa');
      INSERT INTO categoria (nome, tipo) VALUES ('Despesas Moradia', 'Despesa');
      INSERT INTO categoria (nome, tipo) VALUES ('Educação', 'Despesa');
      INSERT INTO categoria (nome, tipo) VALUES ('Lazer', 'Despesa');
      INSERT INTO categoria (nome, tipo) VALUES ('Outras Despesas', 'Despesa');
      INSERT INTO categoria (nome, tipo) VALUES ('Pets', 'Despesa');
      INSERT INTO categoria (nome, tipo) VALUES ('Saúde', 'Despesa');
      INSERT INTO categoria (nome, tipo) VALUES ('Transporte', 'Despesa');
      INSERT INTO categoria (nome, tipo) VALUES ('Salário', 'Receita');
      INSERT INTO categoria (nome, tipo) VALUES ('Outras Receitas', 'Receita');
      INSERT INTO categoria (nome, tipo) VALUES ('Vendas', 'Receita');
    `);
  }
}
