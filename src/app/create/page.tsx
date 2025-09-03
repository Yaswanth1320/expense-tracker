"use client";
import React, { useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  FileText,
  DollarSign,
  Plus,
  LogIn,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { addTransactions } from "@/actions/addTransactions";
import { toast } from "sonner";
import ClientBalanceComponent from "@/components/ClientBalanceComponent";

interface UserData {
  id: string;
  email: string | null;
  given_name?: string | null;
  family_name?: string | null;
  picture?: string | null;
}

const Create = () => {
  const { user, isLoading: userLoading } = useKindeBrowserClient();
  const [refreshBalance, setRefreshBalance] = useState(0);

  if (userLoading) {
    return (
      <div className="min-h-[85vh] bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-6 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
          <p className="text-gray-500">
            Please wait while we verify your authentication status.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[85vh] bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-6 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Login Required</h1>
          <p className="text-gray-500">
            Please sign in to add new transactions and track your expenses.
          </p>
          <LoginLink className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg">
            <LogIn className="w-5 h-5 mr-2" />
            Sign In to Add Transaction
          </LoginLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Transaction Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">
              Add New Transaction
            </h1>
            <p className="text-gray-500">Track your spending easily</p>
          </div>

          <ExpenseForm
            user={user}
            onTransactionAdded={() => setRefreshBalance((prev) => prev + 1)}
          />
        </div>

        {/* Balance Component (live updating) */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          <ClientBalanceComponent key={refreshBalance} />
        </div>
      </div>
    </div>
  );
};

const ExpenseForm = ({
  user,
  onTransactionAdded,
}: {
  user: UserData;
  onTransactionAdded: () => void;
}) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const transactionData = {
      text,
      amount: parseFloat(amount),
      type,
      userId: user.id,
    };

    try {
      const response = await addTransactions(transactionData);
      if (response.success) {
        toast.success("Transaction added successfully");
        setText("");
        setAmount("");
        setType("EXPENSE");
        onTransactionAdded(); // 🔄 trigger live refresh
      } else {
        toast.error("Failed to add transaction");
      }
    } catch (error) {
      toast.error("Unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-600">
          <FileText className="w-4 h-4 mr-2 text-purple-600" />
          Expense Name
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          placeholder="e.g., Coffee at Starbucks"
          className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-600">
          <DollarSign className="w-4 h-4 mr-2 text-green-600" />
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="0.00"
          step="0.01"
          min="0"
          className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-600">
          <TrendingUp className="w-4 h-4 mr-2 text-orange-600" />
          Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "INCOME" | "EXPENSE")}
          required
          className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        >
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-orange-600 hover:bg-orange-700 disabled:cursor-not-allowed text-white p-3 rounded-lg font-semibold flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Plus className="w-4 h-4 mr-2" />
        )}
        {isLoading ? "Adding Transaction..." : "Add Transaction"}
      </button>
    </form>
  );
};

export default Create;
