import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { getDbConnection, createTables } from '@/src/db/database';

type SQLiteContextType = {
  db: SQLite.SQLiteDatabase | null;
};

const SQLiteContext = createContext<SQLiteContextType>({ db: null });

export const useSQLite = () => useContext(SQLiteContext);

export const SQLiteProvider = ({ children }: { children: React.ReactNode }) => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  useEffect(() => {
    const initDb = async () => {
      const connection = await getDbConnection();
      await createTables(connection);
      setDb(connection);
    };
    initDb();
  }, []);

  if (!db) return null; // ou uma tela de loading

  return (
    <SQLiteContext.Provider value={{ db }}>
      {children}
    </SQLiteContext.Provider>
  );
};
