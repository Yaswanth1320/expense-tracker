import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userId = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const transactions = await db.transaction.findMany({
    where: { userId: userId.id },
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

  return NextResponse.json({
    totalBalance,
    totalIncome,
    totalExpenses,
  });
}
