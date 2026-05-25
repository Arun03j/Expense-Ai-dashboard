"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Expense {
  amount: number;
  category: string;
  purpose: string;
  date: string;
}

interface DailySpendingChartProps {
  expenses: Expense[];
}

export default function DailySpendingChart({
  expenses,
}: DailySpendingChartProps) {

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
        Daily Spending Analytics
      </h2>

      <div className="h-[300px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={chartData}>

            <XAxis
              dataKey="day"
              stroke="#71717a"
            />

            <YAxis stroke="#71717a" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#22c55e"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}