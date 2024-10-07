import { SQLiteDatabase } from "expo-sqlite/next";

export async function initDB(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS categoria (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      tipo TEXT NOT NULL CHECK (type IN ('Gasto', 'Receita'))
    );

    CREATE TABLE IF NOT EXISTS transacao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL CHECK (tipo IN ('Gasto', 'Receita')),
      total REAL NOT NULL,
      categoria_id INTEGER NOT NULL,
      data INTEGER NOT NULL,
      descricao VARCHAR(255),
      FOREIGN KEY (categoria_id) REFERENCES categoria(id)
    );
  `);
}
