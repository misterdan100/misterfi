"use client";

import { useTransactionsQuery } from "@/app/lib/hooks/useTransactionsQuery";
import { useTransactionsLoading } from "@/app/lib/redux/hooks/transactions";
import { WidgetGrid, Widget } from "./WidgetGrid";
import { TransactionsWidget } from "@/app/components/layout/Dashboard/Widgets/TransactionsWidget/index";
import { MonthlyOverviewWidget } from "@/app/components/layout/Dashboard/Widgets/MonthlyOverviewWidget/index";
import { SpendingByCategoryWidget } from "@/app/components/layout/Dashboard/Widgets/SpendingByCategoryWidget/index";
import { Card } from "@/app/components/ui/card/Card";
import { Plus, Database } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { DatabaseActionsDialog } from "../../shared/database/DatabaseActionsDialog";
import { AddTransactionDialog } from "../../shared/transactions/add-transaction-dialog";
import { Button } from "../../ui/button/Button";

export function DashboardWidgets() {
  const { isSignedIn } = useUser()

  const { data: transactions = [], isLoading: queryLoading } =
    useTransactionsQuery();
  const reduxLoading = useTransactionsLoading();

  // Consider the dashboard loading if either Redux or React Query is loading
  const isLoading = reduxLoading || queryLoading;

  // Don't show the welcome screen while data is still loading
  // This ensures we only show it when we've confirmed there are no transactions
  if (!isLoading && transactions.length === 0) {
    return (
      <Card className="flex flex-col justify-center items-center p-8 min-h-[400px]">
        <div className="flex flex-col items-center space-y-8 mx-auto max-w-[420px]">
          <h3 className="font-semibold text-2xl">Welcome to MisterFi</h3>
          <div className="space-y-8 w-full">
            <p className="text-muted-foreground text-base text-center">
              Start tracking your finances in two ways:
            </p>
            <div className="gap-6 grid">
              <div className="flex items-start gap-4">
                <div className="flex justify-center items-center bg-background border rounded-lg w-10 h-10 shrink-0">
                  {/* <Plus className="w-5 h-5" /> */}
                  {isSignedIn && (
                    <AddTransactionDialog>
                      <Button variant="ghost" size="icon">
                        <Plus className="w-5 h-5" />
                        <span className="sr-only">Add transaction</span>
                      </Button>
                    </AddTransactionDialog>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-base">
                    Add transactions manually
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Use the plus button in the top bar to add your transactions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div 

                className="flex justify-center items-center bg-background border rounded-lg w-10 h-10 shrink-0">
                  {/* <Database className="w-5 h-5" /> */}
                  {isSignedIn && <DatabaseActionsDialog />}

                </div>
                <div className="space-y-1">
                  <p className="font-medium text-base">Use sample data</p>
                  <p className="text-muted-foreground text-sm">
                    Click the database icon to populate test transactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // If loading or has transactions, show the regular dashboard
  return (
    <WidgetGrid>
      <Widget>
        <TransactionsWidget />
      </Widget>
      <Widget>
        <MonthlyOverviewWidget />
      </Widget>
      <Widget fullWidth>
        <SpendingByCategoryWidget />
      </Widget>
    </WidgetGrid>
  );
}
