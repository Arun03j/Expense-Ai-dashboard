"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Expense } from "@/types/expense";

interface WeeklyBarChartProps {
  expenses: Expense[];
}

export default function WeeklyBarChart({
  expenses,
}: WeeklyBarChartProps) {

  const groupedData: Record<string, number> = {};

  expenses.forEach((expense) => {

    const day = new Date(expense.date).toLocaleDateString(
      "en-US",
      { weekday: "short" }
    );

    if (groupedData[day]) {
      groupedData[day] += expense.amount;
    } else {
      groupedData[day] = expense.amount;
    }
  });

  const chartData = Object.entries(groupedData).map(
    ([day, amount]) => ({
      day,
      amount,
    })
  );

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-white text-xl font-semibold mb-6">
        Weekly Spending Analytics
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a"
            />

            <XAxis
              dataKey="day"
              stroke="#71717a"
            />

            <YAxis stroke="#71717a" />

            <Tooltip />

            <Bar
              dataKey="amount"
              fill="#22c55e"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}