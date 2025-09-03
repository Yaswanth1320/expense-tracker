"use server";

import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getTransactions = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return { transactions: [], totalBalance: 0, totalIncome: 0, totalExpenses: 0 };
  }

  const userId = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!userId) {
    return { transactions: [], totalBalance: 0, totalIncome: 0, totalExpenses: 0 };
  }

  const transactions = await db.transaction.findMany({
    where: { userId: userId.id },
    orderBy: { createdAt: "desc" },
  });

  const totalBalance = transactions.reduce((acc, transaction) => {
    return transaction.type === "INCOME"
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => acc + t.amount, 0);

  return { transactions, totalBalance, totalIncome, totalExpenses };
};