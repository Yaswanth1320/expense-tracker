"use client";

import React, { useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

interface BalanceData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

const ClientBalanceComponent = () => {
  const { user } = useKindeBrowserClient();
  const [balance, setBalance] = useState<BalanceData>({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/balance");
        if (response.ok) {
          const data = await response.json();
          setBalance(data);
        }
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [user]);

  if (!user || isLoading) {
    return (
      <div className="w-full h-full bg-white text-gray-800 p-6 rounded-2xl shadow-md border border-orange-200 animate-pulse flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-orange-200 rounded-full"></div>
          <div className="h-5 bg-orange-200 rounded w-28"></div>
        </div>

        {/* Total Balance */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-6 bg-orange-200 rounded w-32 mb-3"></div>
          <div className="h-10 bg-orange-200 rounded w-40"></div>
        </div>

        {/* Income & Expenses */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="h-20 bg-orange-200 rounded"></div>
          <div className="h-20 bg-orange-200 rounded"></div>
        </div>

        {/* Stats */}
        <div className="h-4 bg-orange-200 rounded w-1/2 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-white text-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
          <DollarSign className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold">Your Balance</h3>
      </div>

      {/* Total Balance */}
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500 mb-1">Total Balance</p>
        <div
          className={`inline-block px-8 py-6 rounded-lg shadow ${
            balance.totalBalance >= 0
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <p className="text-3xl font-bold">
            ${balance.totalBalance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Income & Expenses */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-5 bg-green-100 rounded-lg shadow-sm border border-green-200">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            <p className="text-xs text-green-700 font-medium">Income</p>
          </div>
          <p className="text-lg font-semibold text-green-700">
            ${balance.totalIncome.toFixed(2)}
          </p>
        </div>
        <div className="text-center p-4 bg-red-100 rounded-lg shadow-sm border border-red-200">
          <div className="flex items-center justify-center mb-1">
            <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
            <p className="text-xs text-red-700 font-medium">Expenses</p>
          </div>
          <p className="text-lg font-semibold text-red-700">
            ${balance.totalExpenses.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-auto pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          {balance.totalIncome > 0 && balance.totalExpenses > 0 && (
            <>
              {((balance.totalExpenses / balance.totalIncome) * 100).toFixed(1)}
              % of income spent
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default ClientBalanceComponent;
