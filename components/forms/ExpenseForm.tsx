"use client";

import { useState } from "react";

interface Expense {
  amount: number;
  category: string;
  purpose: string;
  date: string;
}

interface ExpenseFormProps {
  addExpense: (expense: Expense) => void;
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

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    // Validation
    if (
      !amount ||
      !category ||
      !purpose
    ) {
      alert(
        "Please fill all fields"
      );

      return;
    }

    const expenseData = {
      amount: Number(amount),
      category,
      purpose,
      date: new Date().toISOString(),
    };

    try {

      // IMPORTANT
      // Replace with your Render backend URL later
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}expenses`,
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

      if (!response.ok) {

        throw new Error(
          "Failed to add expense"
        );

      }

      const savedExpense =
        await response.json();

      addExpense(savedExpense);

      // Clear Form
      setAmount("");
      setCategory("");
      setPurpose("");

      alert(
        "Expense Added Successfully"
      );

      // Refresh latest data
      window.location.reload();

    } catch (error) {

      console.error(
        "Error adding expense:",
        error
      );

      alert(
        "Failed to add expense"
      );

    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6">

      <h2 className="text-white text-2xl font-semibold mb-6">
        Add Expense
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Amount */}
        <div>

          <label className="text-zinc-400 block mb-2">
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
            className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-white outline-none"
          />

        </div>

        {/* Category */}
        <div>

          <label className="text-zinc-400 block mb-2">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-white outline-none"
          >

            <option value="">
              Select Category
            </option>

            <option value="Labour Wages">
              Labour Wages
            </option>

            <option value="Material Cost">
              Material Cost
            </option>

            

            <option value="Bills">
              Bills
            </option>

            <option value="Rent">
              Rent
            </option>

          </select>

        </div>

        {/* Purpose */}
        <div>

          <label className="text-zinc-400 block mb-2">
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
            className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-white outline-none"
          />

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all text-white font-semibold py-4 rounded-xl"
        >
          Add Expense
        </button>

      </form>

    </div>
  );
}