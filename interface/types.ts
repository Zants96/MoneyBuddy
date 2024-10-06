export interface ICategory {
  id: number;
  name: string;
}

export interface ITransaction {
  id: number;
  type: "gain" | "expense";
  amount: number;
  category_id: number;
  date: string;
  category?: string;
}
