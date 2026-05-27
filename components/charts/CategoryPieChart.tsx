"use client";

import { Expense } from "@/types/expense";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CategoryPieChartProps {
  expenses: Expense[];
}

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f97316",
  "#eab308",
  "#a855f7",
];

export default function CategoryPieChart({
  expenses,
}: CategoryPieChartProps) {

  const groupedData: Record<
    string,
    number
  > = {};

  expenses.forEach((expense) => {

    groupedData[
      expense.category
    ] =
      (groupedData[
        expense.category
      ] || 0) +
      expense.amount;
  });

  const chartData =
    Object.entries(
      groupedData
    ).map(
      ([category, amount]) => ({
        category,
        amount,
      })
    );

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6 w-full min-w-0">

      <h2 className="text-white text-xl font-semibold mb-6">
        Category Analytics
      </h2>

      <div className="w-full h-[350px] min-w-0">

        <ResponsiveContainer
  width="100%"
  height={350}
>

          <PieChart>

            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              outerRadius={120}
              label
            >

              {chartData.map(
                (_, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}