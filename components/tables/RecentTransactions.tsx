"use client";

interface Expense {
  id?: number;
  amount: number;
  category: string;
  purpose: string;
  date: string;
}

interface RecentTransactionsProps {
  expenses: Expense[];
}

export default function RecentTransactions({
  expenses,
}: RecentTransactionsProps) {

  const handleDelete = async (
    id?: number
  ) => {

    if (!id) return;

    try {

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}expenses/${id}`,
        {
          method: "DELETE",
        }
      );

      // Refresh page
      window.location.reload();

    } catch (error) {

      console.error(
        "Delete Error:",
        error
      );

    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-white text-2xl font-semibold mb-6">
        Recent Transactions
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="text-left text-zinc-400 border-b border-zinc-800">

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

            {expenses.map(
              (expense, index) => (

                <tr
                  key={index}
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
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all"
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

    </div>
  );
}