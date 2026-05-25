"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Expense {
  amount: number;
  category: string;
  purpose: string;
  date: string;
}

interface CategoryPieChartProps {
  expenses: Expense[];
}

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#a855f7",
];

export default function CategoryPieChart({
  expenses,
}: CategoryPieChartProps) {

  const groupedData: Record<string, number> = {};

  expenses.forEach((expense) => {

    if (groupedData[expense.category]) {
      groupedData[expense.category] += expense.amount;
    } else {
      groupedData[expense.category] = expense.amount;
    }
  });

  const chartData = Object.entries(groupedData).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-white text-xl font-semibold mb-6">
        Category Expense Analysis
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >

              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}