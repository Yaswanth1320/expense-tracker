// app/dashboard/page.tsx
import { getTransactions } from "@/actions/getTransactions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import DashboardClient from "@/components/DashboardClient";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // If no user, show login prompt
  if (!user) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 dark:bg-background">
        <div className="bg-white dark:bg-card p-10 rounded-2xl shadow-lg border border-gray-200 dark:border-border text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">
            Please log in to view your dashboard
          </h2>
          <p className="text-muted-foreground mb-6">
            Sign in to track your income, expenses, and insights in real time.
          </p>
          <LoginLink className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition">
            Log In
          </LoginLink>
        </div>
      </div>
    );
  }

  // If user is logged in, fetch transactions
  const { transactions, totalBalance, totalIncome, totalExpenses } =
    await getTransactions();

  return (
    <DashboardClient
      userFirstName={user?.given_name ?? "there"}
      transactions={transactions}
      totals={{ totalBalance, totalIncome, totalExpenses }}
    />
  );
}
