"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";

import DailySpendingChart from "@/components/charts/DailySpendingChart";
import WeeklyBarChart from "@/components/charts/WeeklyBarChart";
import CategoryPieChart from "@/components/charts/CategoryPieChart";

import DateFilter from "@/components/filters/DateFilter";

import { useExpenseStore } from "@/store/expenseStore";

export default function AnalyticsPage() {

  const {
    expenses,
    setExpenses,
  } = useExpenseStore();

  const [selectedFilter, setSelectedFilter] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchExpenses = async () => {

      try {

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}expenses`,
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

        setExpenses([]);

      } finally {

        setLoading(false);
      }
    };

    fetchExpenses();

  }, [setExpenses]);

  const filteredExpenses =

    Array.isArray(expenses)

      ? expenses.filter((expense) => {

          const expenseDate =
            new Date(expense.date);

          const now = new Date();

          if (
            selectedFilter === "Today"
          ) {

            return (
              expenseDate.toDateString() ===
              now.toDateString()
            );
          }

          if (
            selectedFilter === "Week"
          ) {

            const oneWeekAgo =
              new Date();

            oneWeekAgo.setDate(
              now.getDate() - 7
            );

            return (
              expenseDate >= oneWeekAgo
            );
          }

          if (
            selectedFilter === "Month"
          ) {

            return (

              expenseDate.getMonth() ===
                now.getMonth() &&

              expenseDate.getFullYear() ===
                now.getFullYear()
            );
          }

          return true;

        })

      : [];

  const totalSpending =
    filteredExpenses.reduce(
      (total, expense) =>
        total + expense.amount,
      0
    );

  const monthlySpending =
    filteredExpenses
      .filter(
        (expense) =>
          new Date(
            expense.date
          ).getMonth() ===
          new Date().getMonth()
      )
      .reduce(
        (total, expense) =>
          total + expense.amount,
        0
      );

  const labourWages =
    filteredExpenses
      .filter(
        (expense) =>
          expense.category ===
          "Labour Wages"
      )
      .reduce(
        (total, expense) =>
          total + expense.amount,
        0
      );

  const materialCost =
    filteredExpenses
      .filter(
        (expense) =>
          expense.category ===
          "Material Cost"
      )
      .reduce(
        (total, expense) =>
          total + expense.amount,
        0
      );

  if (loading) {

    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center">

        <h1 className="text-white text-2xl font-bold">
          Loading Analytics...
        </h1>

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-zinc-950 lg:flex w-full overflow-hidden">

      <Sidebar />

      <section className="flex-1 min-w-0 overflow-hidden">

        <Navbar />

        <div className="p-4 md:p-6">

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Expense Analytics
          </h1>

          <DateFilter
            selectedFilter={selectedFilter}
            setSelectedFilter={
              setSelectedFilter
            }
          />

          {/* KPI CARDS */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">

  {/* TOTAL SPENDING */}
  <div className="rounded-3xl p-6 bg-gradient-to-br from-emerald-900/40 to-zinc-900 border border-emerald-700/30 shadow-xl shadow-black/30 hover:scale-[1.02] transition-all duration-300">

    <p className="text-emerald-300 font-semibold text-sm tracking-wide uppercase">
      Total Spending
    </p>

    <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4">
      ₹{totalSpending}
    </h2>

  </div>

  {/* MONTHLY */}
  <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-900/40 to-zinc-900 border border-blue-700/30 shadow-xl shadow-black/30 hover:scale-[1.02] transition-all duration-300">

    <p className="text-blue-300 font-semibold text-sm tracking-wide uppercase">
      Monthly Spending
    </p>

    <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4">
      ₹{monthlySpending}
    </h2>

  </div>

  {/* LABOUR */}
  <div className="rounded-3xl p-6 bg-gradient-to-br from-orange-900/40 to-zinc-900 border border-orange-700/30 shadow-xl shadow-black/30 hover:scale-[1.02] transition-all duration-300">

    <p className="text-orange-300 font-semibold text-sm tracking-wide uppercase">
      Labour Wages
    </p>

    <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4">
      ₹{labourWages}
    </h2>

  </div>

  {/* MATERIAL */}
  <div className="rounded-3xl p-6 bg-gradient-to-br from-purple-900/40 to-zinc-900 border border-purple-700/30 shadow-xl shadow-black/30 hover:scale-[1.02] transition-all duration-300">

    <p className="text-purple-300 font-semibold text-sm tracking-wide uppercase">
      Material Costs
    </p>

    <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4">
      ₹{materialCost}
    </h2>

  </div>

</div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8 w-full min-w-0">

            <DailySpendingChart
              expenses={filteredExpenses}
            />

            <WeeklyBarChart
              expenses={filteredExpenses}
            />

          </div>

          {/* PIE CHART */}
          <div className="mt-8">

            <CategoryPieChart
              expenses={filteredExpenses}
            />

          </div>

        </div>

      </section>

    </main>
  );
}