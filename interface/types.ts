export interface ICategoria {
  id: number;
  nome: string;
  tipo: "Receita" | "Despesa";
}

export interface ITransacao {
  id?: number;
  tipo: "Receita" | "Despesa" | string;
  total: number;
  categoria_id: number;
  data: string;
  categoria: string;
  descricao: string;
}

export interface ITransacoesContextProps {
  transacoes: ITransacao[];
  categorias: ICategoria[];
  addTransacao: (transaction: ITransacao) => void;
  fetchTransacoes: () => void;
  fetchTransacoesMesAtual: () => void;
  fetchCategorias: () => void;
  deleteTransacao: (id: number) => void;
  totalReceita: number;
  totalDespesa: number;
  saldo: number;
  totalReceitaMesEscolhido: number;
  totalDespesaMesEscolhido: number;
  saldoMesEscolhido: number;
  setMesEscolhido: (mes: number) => void;
  setAnoEscolhido: (ano: number) => void;
  formatarData: (dateString: string) => string;
  formatarTotal: (total: number) => string;
  abaAtiva: string;
  atualizarAbaAtiva: (aba: string) => void;
}
