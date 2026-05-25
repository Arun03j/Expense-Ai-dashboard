"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  PieChart,
  Wallet,
  Bot,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Analytics",
    icon: PieChart,
    path: "/analytics",
  },
  {
    name: "Expenses",
    icon: Wallet,
    path: "/expenses",
  },
  {
    name: "AI Assistant",
    icon: Bot,
    path: "/assistant",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {

  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-[260px] bg-zinc-900 border-b lg:border-b-0 lg:border-r border-zinc-800 p-4 flex-shrink-0">

      {/* Logo */}
      <h1 className="text-2xl lg:text-4xl font-bold text-white mb-6">
        Expense AI
      </h1>

      {/* Menu */}
      <nav className="flex flex-row lg:flex-col gap-3 overflow-x-auto scrollbar-hide">

        {menuItems.map((item) => {

          const Icon = item.icon;

          const isActive =
            pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap transition-all flex-shrink-0

              ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }

              `}
            >

              <Icon size={20} />

              <span className="font-medium">
                {item.name}
              </span>

            </Link>
          );
        })}

      </nav>

    </aside>
  );
}