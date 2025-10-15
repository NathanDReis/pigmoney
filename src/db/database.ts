import * as SQLite from 'expo-sqlite';

export const getDbConnection = async () => {
  return SQLite.openDatabaseAsync('app.db');
};

export const createTables = async (db: SQLite.SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS investimentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      valor REAL
    );
  `);
};
