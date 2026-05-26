"use client";

import { useEffect } from "react";

import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";

import ExpenseForm from "@/components/forms/ExpenseForm";
import RecentTransactions from "@/components/tables/RecentTransactions";

import { useExpenseStore } from "@/store/expenseStore";

export default function ExpensesPage() {

  const {
    expenses,
    addExpense,
    setExpenses,
  } = useExpenseStore();

  useEffect(() => {

    const fetchExpenses = async () => {

      try {

        const response = await fetch(
          "https://expense-ai-dashboard.onrender.com/expenses",
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        setExpenses(data);

      } catch (error) {

        console.error(error);

      }
    };

    fetchExpenses();

    const interval = setInterval(
      fetchExpenses,
      2000
    );

    return () =>
      clearInterval(interval);

  }, [setExpenses]);

  return (
    <main className="min-h-screen bg-zinc-950 lg:flex">

      <Sidebar />

      <section className="flex-1">

        <Navbar />

        <div className="p-4 md:p-6">

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Expense Management
          </h1>

          <ExpenseForm
            addExpense={addExpense}
          />

          <div className="mt-8 overflow-x-auto">

            <RecentTransactions
              expenses={expenses}
            />

          </div>

        </div>

      </section>

    </main>
  );
}