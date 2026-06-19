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
          `${process.env.NEXT_PUBLIC_API_URL}/expenses`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {

          throw new Error(
            "Failed to fetch expenses"
          );

        }

        const data =
          await response.json();

        setExpenses(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.error(
          "Fetch Error:",
          error
        );

      }
    };

    fetchExpenses();

    const interval = setInterval(
      fetchExpenses,
      5000
    );

    return () =>
      clearInterval(interval);

  }, [setExpenses]);

  return (

    <main className="min-h-screen bg-zinc-950 lg:flex">

      <Sidebar />

      <section className="flex-1 min-w-0">

        <Navbar />

        <div className="p-4 md:p-6">

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Expense Management
          </h1>

          <ExpenseForm
            addExpense={addExpense}
          />

          <div className="mt-8">

            <RecentTransactions
              expenses={expenses}
            />

          </div>

        </div>

      </section>

    </main>

  );
}