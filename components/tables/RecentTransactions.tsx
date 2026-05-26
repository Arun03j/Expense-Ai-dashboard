"use client";
import { Expense } from "@/types/expense";

interface RecentTransactionsProps {
  expenses: Expense[];
}

export default function RecentTransactions({
  expenses,
}: RecentTransactionsProps) {

  const handleDelete = async (
    id: number
  ) => {

    try {

      console.log(
        "Deleting expense:",
        id
      );

      const response = await fetch(

        `${process.env.NEXT_PUBLIC_API_URL}expenses/${id}`,

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

      // Refresh page
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

      <h2 className="text-white text-2xl font-semibold mb-6">
        Recent Transactions
      </h2>

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

            {expenses.map((expense) => (

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

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}