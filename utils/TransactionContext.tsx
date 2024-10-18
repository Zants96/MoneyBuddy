import React, { createContext, useState, useEffect, ReactNode } from "react";
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
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();
  const anoAtual = dataAtual.getFullYear();
  const [mesEscolhido, setMesEscolhido] = useState(new Date().getMonth());
  const [anoEscolhido, setAnoEscolhido] = useState(new Date().getFullYear());
  const [abaAtiva, setAbaAtiva] = useState<string>("Home");

  const atualizarAbaAtiva = (novaAba: string) => {
    setAbaAtiva(novaAba);
  };

  const formatarData = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const formatarTotal = (total: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(total);
  };

  const getTransacoesMesAtualDoDB = async (): Promise<ITransacao[]> => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const transacoes = await db.getAllAsync<ITransacao>(
      `SELECT * FROM transacao WHERE strftime('%Y', data) = ? AND strftime('%m', data) = ?;`,
      [currentYear.toString(), currentMonth.toString().padStart(2, "0")]
    );
    return transacoes;
  };

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

  const fetchTransacoesMesAtual = async () => {
    const fetchedTransacoes = await getTransacoesMesAtualDoDB();
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
  };

  useEffect(() => {
    if (abaAtiva === "Home") {
      fetchTransacoesMesAtual();
    } else if (abaAtiva === "Historico") {
      fetchTransacoes();
    } else if (abaAtiva === "Adicionar") {
      fetchCategorias();
    } else if (abaAtiva === "Transacoes") {
      fetchTransacoesMesAtual();
    }
  }, [abaAtiva]);

  const transacoesMesEscolhido = transacoes.filter((transacao) => {
    const dataTransacao = new Date(transacao.data);
    return (
      dataTransacao.getMonth() === mesEscolhido &&
      dataTransacao.getFullYear() === anoEscolhido
    );
  });

  const totalReceitaMesEscolhido = transacoesMesEscolhido
    .filter((transacao) => transacao.tipo === "Receita")
    .reduce((acc, transacao) => acc + transacao.total, 0);

  const totalDespesaMesEscolhido = transacoesMesEscolhido
    .filter((transacao) => transacao.tipo === "Despesa")
    .reduce((acc, transacao) => acc + transacao.total, 0);

  const saldoMesEscolhido = totalReceitaMesEscolhido - totalDespesaMesEscolhido;

  const transacoesMesAtual = transacoes.filter((transacao) => {
    const dataTransacao = new Date(transacao.data);
    return (
      dataTransacao.getMonth() === mesAtual &&
      dataTransacao.getFullYear() === anoAtual
    );
  });

  const totalReceita = transacoesMesAtual
    .filter((transacao) => transacao.tipo === "Receita")
    .reduce((acc, transacao) => acc + transacao.total, 0);

  const totalDespesa = transacoesMesAtual
    .filter((transacao) => transacao.tipo === "Despesa")
    .reduce((acc, transacao) => acc + transacao.total, 0);

  const saldo = totalReceita - totalDespesa;

  return (
    <TransacoesContext.Provider
      value={{
        transacoes,
        categorias,
        addTransacao,
        fetchTransacoes,
        fetchTransacoesMesAtual,
        fetchCategorias,
        deleteTransacao,
        totalReceita,
        totalDespesa,
        saldo,
        setMesEscolhido,
        setAnoEscolhido,
        totalReceitaMesEscolhido,
        totalDespesaMesEscolhido,
        saldoMesEscolhido,
        formatarData,
        formatarTotal,
        atualizarAbaAtiva,
        abaAtiva,
      }}
    >
      {children}
    </TransacoesContext.Provider>
  );
}
