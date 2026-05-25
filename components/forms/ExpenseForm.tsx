"use client";

import { useState } from "react";

interface ExpenseFormProps {
  addExpense: (expense: {
    amount: number;
    category: string;
    purpose: string;
    date: string;
  }) => void;
}

export default function ExpenseForm({
  addExpense,
}: ExpenseFormProps) {

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [purpose, setPurpose] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async () => {

    if (
      !amount ||
      !category ||
      !purpose
    ) {
      return;
    }

    setLoading(true);

    const expenseData = {
      amount: Number(amount),
      category,
      purpose,
      date: new Date().toISOString(),
    };

    try {

      // Send data to FastAPI backend
      const response = await fetch(
        "http://127.0.0.1:8000/expenses",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            expenseData
          ),
        }
      );

      const data =
        await response.json();

      console.log(
        "Backend Response:",
        data
      );

      // Update frontend state
      addExpense(expenseData);

      // Reset form
      setAmount("");
      setCategory("");
      setPurpose("");

    } catch (error) {

      console.error(
        "Error adding expense:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-white text-2xl font-semibold mb-6">
        Add Expense
      </h2>

      <div className="space-y-4">

        {/* Amount */}
        <div>

          <label className="text-zinc-400 text-sm">
            Amount
          </label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white outline-none"
          />

        </div>

        {/* Category */}
        <div>

          <label className="text-zinc-400 text-sm">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white outline-none"
          >

            <option value="">Select Category</option>

<option value="Bills">
  Bills
</option>

<option value="Rent">
  Rent
</option>

<option value="Labour Wages">
  Labour Wages
</option>

<option value="Material Cost">
  Material Cost
</option>


<option value="Others">
  Others
</option>



          </select>

        </div>

        {/* Purpose */}
        <div>

          <label className="text-zinc-400 text-sm">
            Purpose
          </label>

          <input
            type="text"
            placeholder="Expense purpose"
            value={purpose}
            onChange={(e) =>
              setPurpose(
                e.target.value
              )
            }
            className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white outline-none"
          />

        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all text-white font-semibold py-3 rounded-xl"
        >

          {loading
            ? "Adding..."
            : "Add Expense"}

        </button>

      </div>

    </div>
  );
}