"use client";

import { Expense } from "@/types/expense";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WeeklyBarChartProps {
  expenses: Expense[];
}

export default function WeeklyBarChart({
  expenses,
}: WeeklyBarChartProps) {

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
        Weekly Spending Analytics
      </h2>

      <div className="w-full h-[300px] min-w-0">

        <ResponsiveContainer
  width="100%"
  height={300}
>

          <BarChart data={chartData}>

            <XAxis
              dataKey="day"
              stroke="#71717a"
            />

            <YAxis
              stroke="#71717a"
            />

            <Tooltip />

            <Bar
              dataKey="amount"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}