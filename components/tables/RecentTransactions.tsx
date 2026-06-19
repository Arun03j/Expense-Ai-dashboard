"use client";

import { useState } from "react";
import { Expense } from "@/types/expense";

interface RecentTransactionsProps {
  expenses: Expense[];
}

export default function RecentTransactions({
  expenses,
}: RecentTransactionsProps) {

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 10;

  const indexOfLastExpense =
    currentPage * itemsPerPage;

  const indexOfFirstExpense =
    indexOfLastExpense - itemsPerPage;

  const currentExpenses =
    expenses.slice(
      indexOfFirstExpense,
      indexOfLastExpense
    );

  const totalPages =
    Math.ceil(
      expenses.length /
      itemsPerPage
    );

  const handleDelete = async (
    id: number
  ) => {

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/expenses/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {

        throw new Error(
          "Delete failed"
        );

      }

      alert(
        "Expense deleted successfully"
      );

      window.location.reload();

    } catch (error) {

      console.error(
        "Delete Error:",
        error
      );

      alert(
        "Failed to delete expense"
      );

    }
  };

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6">

      <h2 className="text-white text-2xl font-bold mb-2">
        Recent Transactions
      </h2>

      <p className="text-zinc-400 text-sm mb-6">

        Showing{" "}

        {expenses.length === 0
          ? 0
          : indexOfFirstExpense + 1}

        -

        {Math.min(
          indexOfLastExpense,
          expenses.length
        )}

        {" "}of{" "}

        {expenses.length}

        {" "}transactions

      </p>

      <div className="overflow-x-auto w-full">

        <table className="w-full min-w-[700px]">

          <thead>

            <tr className="border-b border-zinc-800 text-left text-zinc-400">

              <th className="pb-4">
                Category
              </th>

              <th className="pb-4">
                Purpose
              </th>

              <th className="pb-4">
                Amount
              </th>

              <th className="pb-4">
                Date
              </th>

              <th className="pb-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {currentExpenses.map(
              (expense) => (

                <tr
                  key={expense.id}
                  className="border-b border-zinc-800"
                >

                  <td className="py-4 text-white">
                    {expense.category}
                  </td>

                  <td className="py-4 text-zinc-400">
                    {expense.purpose}
                  </td>

                  <td className="py-4 text-emerald-400 font-semibold">
                    ₹{expense.amount}
                  </td>

                  <td className="py-4 text-zinc-500">
                    {new Date(
                      expense.date
                    ).toLocaleDateString()}
                  </td>

                  <td className="py-4">

                    <button
                      onClick={() =>
                        handleDelete(
                          expense.id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-xl"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      {totalPages > 1 && (

        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">

          <button
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
            disabled={
              currentPage === 1
            }
            className="
              px-4 py-2
              rounded-lg
              bg-zinc-800
              text-white
              disabled:opacity-50
            "
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, i) => (

              <button
                key={i}
                onClick={() =>
                  setCurrentPage(
                    i + 1
                  )
                }
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage ===
                  i + 1
                    ? "bg-emerald-500 text-white"
                    : "bg-zinc-800 text-zinc-300"
                }`}
              >
                {i + 1}
              </button>

            )
          )}

          <button
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
            disabled={
              currentPage ===
              totalPages
            }
            className="
              px-4 py-2
              rounded-lg
              bg-zinc-800
              text-white
              disabled:opacity-50
            "
          >
            Next
          </button>

        </div>

      )}

    </div>

  );
}