"use client";

import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart as RPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

type Txn = {
  id: string;
  text: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  createdAt: string | Date;
};

type Props = {
  userFirstName: string;
  transactions: Txn[];
  totals: {
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
  };
};

type LineDataPoint = {
  date: string;
  income: number;
  expenses: number;
};

export default function DashboardClient({
  userFirstName,
  transactions,
  totals,
}: Props) {
  const { totalBalance, totalIncome, totalExpenses } = totals;

  // Chart data: Pie
  const pieData = [
    { name: "Income", value: totalIncome, color: "#22c55e" },
    { name: "Expenses", value: totalExpenses, color: "#ef4444" },
  ];

  // Chart data: Bar (monthly aggregation)
  const monthly: Record<string, { income: number; expense: number }> = {};
  transactions.forEach((t) => {
    const d = new Date(t.createdAt);
    const key = d.toLocaleString("default", { month: "short" });
    if (!monthly[key]) monthly[key] = { income: 0, expense: 0 };
    if (t.type === "INCOME") monthly[key].income += t.amount;
    else monthly[key].expense += t.amount;
  });
  const barData = Object.entries(monthly).map(([month, v]) => ({
    month,
    income: v.income,
    expenses: v.expense,
  }));

  // Chart data: Line (date-wise trends)
  const lineData: LineDataPoint[] = transactions
    .map((t) => ({
      date: new Date(t.createdAt).toISOString().split("T")[0],
      income: t.type === "INCOME" ? t.amount : 0,
      expenses: t.type === "EXPENSE" ? t.amount : 0,
    }))
    .reduce<LineDataPoint[]>((acc, curr) => {
      const existing = acc.find((d) => d.date === curr.date);
      if (existing) {
        existing.income += curr.income;
        existing.expenses += curr.expenses;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);

  function formatDate(date: string | Date) {
    return new Intl.DateTimeFormat("en-GB").format(new Date(date));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background text-gray-900 dark:text-foreground">
      <div className="container mx-auto p-8">
        {/* Header */}
        <header className="mb-7">
          <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Welcome back, <span className="font-semibold">{userFirstName}</span>{" "}
            👋
          </p>
        </header>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Balance */}
          <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-md border border-gray-200 dark:border-border hover:shadow-lg transition">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-500 p-3 rounded-full">
                <DollarSign className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Total Balance
                </h3>
                <p className="text-3xl font-bold">${totalBalance.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Income */}
          <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-md border border-gray-200 dark:border-border hover:shadow-lg transition">
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 p-3 rounded-full">
                <TrendingUp className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Income
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  ${totalIncome.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-md border border-gray-200 dark:border-border hover:shadow-lg transition">
            <div className="flex items-center space-x-4">
              <div className="bg-red-500 p-3 rounded-full">
                <TrendingDown className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Expenses
                </h3>
                <p className="text-3xl font-bold text-red-600">
                  ${totalExpenses.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions + Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="bg-white dark:bg-card rounded-2xl shadow-md p-6 border border-gray-200 dark:border-border">
            <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
            <ul>
              {transactions.map((t) => (
                <li
                  key={t.id}
                  className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-border last:border-b-0 hover:bg-gray-50 dark:hover:bg-muted/20 rounded-md transition"
                >
                  <div>
                    <p className="font-semibold">{t.text}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(t.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`font-semibold px-3 py-1 rounded-full text-sm ${
                      t.type === "INCOME"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.type === "INCOME" ? "+" : "-"}${t.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Charts */}
          <div className="bg-white dark:bg-card rounded-2xl shadow-md p-6 border border-gray-200 dark:border-border space-y-8">
            <h2 className="text-2xl font-bold">Analytics</h2>

            {/* Pie + Bar side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-25">
              {/* Pie Chart */}
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <RPieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {pieData.map((d, i) => (
                        <Cell key={i} fill={d.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RPieChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="income"
                      fill="#22c55e"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="expenses"
                      fill="#ef4444"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Line Chart below */}
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#22c55e"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
