"use client";

import { Expense } from "@/types/expense";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DailySpendingChartProps {
  expenses: Expense[];
}

export default function DailySpendingChart({
  expenses,
}: DailySpendingChartProps) {

  const groupedData: Record<
    string,
    number
  > = {};

  expenses.forEach((expense) => {

    const day = new Date(
      expense.date
    ).toLocaleDateString(
      "en-US",
      {
        weekday: "short",
      }
    );

    groupedData[day] =
      (groupedData[day] || 0) +
      expense.amount;
  });

  const chartData =
    Object.entries(
      groupedData
    ).map(([day, amount]) => ({
      day,
      amount,
    }));

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6 w-full min-w-0">

      <h2 className="text-white text-xl font-semibold mb-6">
        Daily Spending Analytics
      </h2>

      <div className="w-full h-[300px] min-w-0">

        <ResponsiveContainer
  width="100%"
  height={300}
>

          <LineChart data={chartData}>

            <XAxis
              dataKey="day"
              stroke="#71717a"
            />

            <YAxis
              stroke="#71717a"
            />

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