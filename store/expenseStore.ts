import { create } from "zustand";

interface Expense {
  amount: number;
  category: string;
  purpose: string;
  date: string;
}

interface ExpenseStore {

  expenses: Expense[];

  addExpense: (
    expense: Expense
  ) => void;

  setExpenses: (
    expenses: Expense[]
  ) => void;
}

export const useExpenseStore =
  create<ExpenseStore>((set) => ({

    expenses: [],

    addExpense: (expense) =>
      set((state) => ({
        expenses: [
          ...state.expenses,
          expense,
        ],
      })),

    setExpenses: (expenses) =>
      set({
        expenses,
      }),

  }));