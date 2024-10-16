import { SQLiteDatabase } from "expo-sqlite/next";

export async function initDB(db: SQLiteDatabase) {
  await db.execAsync(`

    CREATE TABLE IF NOT EXISTS categoria (
      id INTEGER,
      nome TEXT NOT NULL,
      tipo TEXT NOT NULL CHECK (tipo IN ('Despesa', 'Receita')),
      PRIMARY KEY (id, nome)
    );

    CREATE TABLE IF NOT EXISTS transacao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL CHECK (tipo IN ('Despesa', 'Receita')),
      total REAL NOT NULL,
      categoria_id INTEGER NOT NULL,
      data INTEGER NOT NULL,
      categoria TEXT,
      descricao VARCHAR(255),
      FOREIGN KEY (categoria_id) REFERENCES categoria(id)
    );
  `);

  const defaultCategories = [
    { id: 1, nome: "Alimentação", tipo: "Despesa" },
    { id: 2, nome: "Assinaturas", tipo: "Despesa" },
    { id: 3, nome: "Compras", tipo: "Despesa" },
    { id: 4, nome: "Despesas Moradia", tipo: "Despesa" },
    { id: 5, nome: "Educação", tipo: "Despesa" },
    { id: 6, nome: "Lazer", tipo: "Despesa" },
    { id: 7, nome: "Outras Despesas", tipo: "Despesa" },
    { id: 8, nome: "Pets", tipo: "Despesa" },
    { id: 9, nome: "Saúde", tipo: "Despesa" },
    { id: 10, nome: "Transporte", tipo: "Despesa" },
    { id: 11, nome: "Salário", tipo: "Receita" },
    { id: 12, nome: "Outras Receitas", tipo: "Receita" },
    { id: 13, nome: "Vendas", tipo: "Receita" },
  ];

  for (const category of defaultCategories) {
    await db.execAsync(`
    INSERT OR IGNORE INTO categoria (id, nome, tipo)
    VALUES (${category.id}, '${category.nome}', '${category.tipo}');
  `);
  }
}
