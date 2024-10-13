export interface ICategory {
  id: number;
  nome: string;
  tipo: "Despesa" | "Receita";
}

export interface ITransaction {
  id: number;
  tipo: "Despesa" | "Receita";
  total: number;
  categoria_id: number;
  data: string;
  category?: string;
  descricao: string;
}
