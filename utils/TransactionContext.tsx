import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import {
  ITransacao,
  ITransacoesContextProps,
  ICategoria,
} from "../interface/types";
import { useSQLiteContext } from "expo-sqlite/next";

export const TransacoesContext = createContext<
  ITransacoesContextProps | undefined
>(undefined);

export default function TransacoesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const db = useSQLiteContext();
  const [transacoes, setTransacoes] = useState<ITransacao[]>([]);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  const getTransacoesDoDB = async (): Promise<ITransacao[]> => {
    const transacoes = await db.getAllAsync<ITransacao>(
      `SELECT * FROM transacao;`
    );
    return transacoes;
  };

  const getCategoriasDoDB = async (): Promise<ICategoria[]> => {
    const categorias = await db.getAllAsync<ICategoria>(
      `SELECT * FROM categoria;`
    );
    return categorias;
  };

  const addTransacaoNoDB = async (transaction: ITransacao): Promise<void> => {
    const query =
      "INSERT INTO transacao (total, descricao, data, tipo, categoria, categoria_id) VALUES (?, ?, ?, ?, ?, ?);";
    await db.runAsync(
      query,
      transaction.total,
      transaction.descricao,
      transaction.data,
      transaction.tipo,
      transaction.categoria,
      transaction.categoria_id
    );
  };

  const fetchTransacoes = async () => {
    const fetchedTransacoes = await getTransacoesDoDB();
    setTransacoes(fetchedTransacoes);
  };

  const fetchCategorias = async () => {
    const fetchedCategorias = await getCategoriasDoDB();
    setCategorias(fetchedCategorias);
  };

  const addTransacao = async (transaction: ITransacao) => {
    if (
      transaction.total === undefined ||
      transaction.data === undefined ||
      transaction.tipo === undefined ||
      transaction.descricao === undefined ||
      transaction.categoria === undefined
    ) {
      throw new Error(
        "Transação inválida, verifique se todos os campos estão preenchidos"
      );
    }
    await addTransacaoNoDB(transaction);
    fetchTransacoes();
  };

  const deleteTransacao = async (id: number) => {
    const query = "DELETE FROM transacao WHERE id = ?;";
    await db.runAsync(query, id);
    fetchTransacoes();
  };

  useEffect(() => {
    fetchTransacoes();
    fetchCategorias();
  }, [db]);

  const totalReceita = useMemo(() => {
    return transacoes
      .filter((t) => t.tipo === "Receita")
      .reduce((sum, t) => sum + t.total, 0);
  }, [transacoes]);

  const totalDespesa = useMemo(() => {
    return transacoes
      .filter((t) => t.tipo === "Despesa")
      .reduce((sum, t) => sum + t.total, 0);
  }, [transacoes]);

  const saldo = useMemo(() => {
    return totalReceita - totalDespesa;
  }, [totalReceita, totalDespesa]);

  return (
    <TransacoesContext.Provider
      value={{
        transacoes,
        categorias,
        addTransacao,
        fetchTransacoes,
        fetchCategorias,
        deleteTransacao,
        totalReceita,
        totalDespesa,
        saldo,
      }}
    >
      {children}
    </TransacoesContext.Provider>
  );
}
