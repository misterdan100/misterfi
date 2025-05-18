"use client";

import { Card, CardContent } from "@/app/components/ui/card/Card";
import { Tabs, TabsContent } from "@/app/components/ui/tabs/Tabs";
import { useState } from "react";
import { MonthlyOverviewHeader } from "./components/MonthlyOverviewHeader";
import { PercentageChangeIndicator } from "./components/PercentageChangeIndicator";
import { TabsNavigation } from "./components/TabsNavigation";
import { TransactionList } from "./components/TransactionList";
import { useMonthlyOverviewQuery } from "@/app/lib/hooks/useMonthlyOverviewQuery";
import { Skeleton } from "@/app/components/ui/skeleton/Skeleton";

export function MonthlyOverviewWidget() {
  const [selectedTab, setSelectedTab] = useState<"income" | "expenses">(
    "income"
  );
  const { data, isLoading } = useMonthlyOverviewQuery();

  if (isLoading) {
    return (
      <Card className="flex flex-col h-[600px] sm:h-[400px]">
        <div className="space-y-4 p-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-40 h-4" />
            </div>
            <div className="space-y-1 text-right">
              <Skeleton className="ml-auto w-24 h-8" />
              <Skeleton className="ml-auto w-16 h-4" />
            </div>
          </div>
          <Skeleton className="w-full h-8" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-16" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const {
    netIncome,
    percentageChange,
    currentIncomeTransactions,
    currentExpenseTransactions,
  } = data;

  return (
    <Card className="flex flex-col h-[600px] sm:h-[400px]">
      <MonthlyOverviewHeader netIncome={netIncome} />
      <CardContent className="flex flex-col flex-1 p-0 overflow-hidden">
        <PercentageChangeIndicator
          percentageChange={percentageChange}
          netIncome={netIncome}
        />
        <Tabs
          value={selectedTab}
          onValueChange={(value) =>
            setSelectedTab(value as "income" | "expenses")
          }
          className="flex flex-col flex-1 overflow-hidden"
        >
          <TabsNavigation
            incomeCount={currentIncomeTransactions.length}
            expenseCount={currentExpenseTransactions.length}
          />
          <TabsContent value="income" className="flex-1 overflow-hidden">
            <TransactionList
              transactions={currentIncomeTransactions}
              type="income"
            />
          </TabsContent>
          <TabsContent value="expenses" className="flex-1 overflow-hidden">
            <TransactionList
              transactions={currentExpenseTransactions}
              type="expenses"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default MonthlyOverviewWidget;
