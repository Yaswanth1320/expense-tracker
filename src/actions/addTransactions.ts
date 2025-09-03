"use server";

import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

interface AddTransactionsProps {
  text: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
}

export const addTransactions = async ({
  text,
  amount,
  type,
}: AddTransactionsProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return { success: false, error: "User not found" };
  }

  const userId = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!userId) {
    return { success: false, error: "User not found" };
  }

  if (!text || !amount || !type) {
    return { success: false, error: "Missing required fields" };
  }

  const transaction = await db.transaction.create({
    data: { text, amount, type, userId: userId.id },
  });

  revalidatePath("/create");

  return { success: true, transaction };
};
