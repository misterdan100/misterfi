"use client";

import { useCallback, useMemo, useState } from "react";
import { useTransactionsQuery } from "@/app/lib/hooks/useTransactionsQuery";
import { DateRange } from "./types";
import { TransactionsHeader } from "./TransactionsHeader";
import { TransactionsFilters } from "./TransactionsFilters";
import { Filters } from "@/app/components/ui/filters/FiltersPopover";
import {
  endOfDay,
  startOfDay,
  isWithinInterval,
  addDays,
  format,
} from "date-fns";
import { TransactionsErrorBoundary } from "./ErrorBoundary";
import { EditTransactionDialog } from "@/app/components/shared/transactions/edit-transaction-dialog";
import { Transaction } from "@/app/lib/redux/slices/transactions/types";
import { groupTransactions, getGroupDisplayName } from "../utils";
import { cn } from "@/app/lib/utils";
import { formatCurrency } from "@/app/lib/utils";
import { getCategoryDisplayName } from "@/app/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible/Collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table/Table";
import { Badge } from "@/app/components/ui/badge/Badge";
import { DeleteTransactionDialog } from "@/app/components/shared/transactions/delete-transaction-dialog";

export function TransactionsContent() {
  const { data: transactions = [], isLoading } = useTransactionsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), -30), // Last 30 days
    to: new Date(),
  });
  const [activeFilters, setActiveFilters] = useState<Filters>({
    categories: [],
    type: "all",
    amountRange: {},
  });
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Get unique categories from transactions
  const availableCategories = useMemo(
    () => Array.from(new Set(transactions.map((t) => t.category))),
    [transactions]
  );

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((transaction) => {
        try {
          const matchesSearch = transaction.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          const withinDateRange = isWithinInterval(new Date(transaction.date), {
            start: startOfDay(dateRange.from),
            end: endOfDay(dateRange.to),
          });

          const matchesCategories =
            activeFilters.categories.length === 0 ||
            activeFilters.categories.includes(transaction.category);

          const matchesType =
            activeFilters.type === "all" ||
            activeFilters.type === transaction.type;

          const matchesAmountRange =
            (activeFilters.amountRange.min === undefined ||
              transaction.amount >= activeFilters.amountRange.min) &&
            (activeFilters.amountRange.max === undefined ||
              transaction.amount <= activeFilters.amountRange.max);

          return (
            matchesSearch &&
            withinDateRange &&
            matchesCategories &&
            matchesType &&
            matchesAmountRange
          );
        } catch (error) {
          console.error("Error filtering transaction:", error);
          return false;
        }
      }),
    [transactions, searchTerm, dateRange, activeFilters]
  );

  // Group filtered transactions
  const groupedTransactions = useMemo(
    () => groupTransactions(filteredTransactions),
    [filteredTransactions]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const handleDateRangeChange = useCallback((range: DateRange) => {
    setDateRange(range);
  }, []);

  const handleFiltersChange = useCallback((filters: Filters) => {
    setActiveFilters(filters);
  }, []);

  const handleTransactionClick = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditDialogOpen(true);
  }, []);

  const handleEditDialogClose = useCallback(() => {
    setIsEditDialogOpen(false);
    setSelectedTransaction(null);
  }, []);

  return (
    <TransactionsErrorBoundary>
      <div className="relative bg-background">
        <div className="mx-auto px-6 pb-6 w-full max-w-7xl">
          <div className="flex flex-col gap-6">
            <TransactionsHeader filteredTransactions={filteredTransactions} />
            <div className="relative bg-card border rounded-lg">
              <TransactionsFilters
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                dateRange={dateRange}
                onDateRangeChange={handleDateRangeChange}
                availableCategories={availableCategories}
                onFiltersChange={handleFiltersChange}
              />
              <div className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="mb-6 last:mb-0">
                        <div className="flex justify-between items-center mb-2">
                          <div className="bg-muted w-[100px] h-5 animate-pulse" />
                          <div className="bg-muted w-[60px] h-4 animate-pulse" />
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[120px]">Date</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead className="w-[120px] text-right">
                                Amount
                              </TableHead>
                              <TableHead className="w-[50px]" />
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {[1, 2].map((item) => (
                              <TableRow key={item}>
                                <TableCell>
                                  <div className="bg-muted w-[80px] h-4 animate-pulse" />
                                </TableCell>
                                <TableCell>
                                  <div className="bg-muted w-[120px] h-4 animate-pulse" />
                                </TableCell>
                                <TableCell>
                                  <div className="bg-muted w-[80px] h-4 animate-pulse" />
                                </TableCell>
                                <TableCell>
                                  <div className="bg-muted ml-auto w-[60px] h-4 animate-pulse" />
                                </TableCell>
                                <TableCell>
                                  <div className="bg-muted rounded-md w-8 h-8 animate-pulse" />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ))}
                  </div>
                ) : filteredTransactions.length === 0 ? (
                  <div className="flex flex-col justify-center items-center gap-4 min-h-[400px] text-center">
                    <div className="space-y-2">
                      <p className="text-muted-foreground text-sm">
                        {transactions.length === 0
                          ? "No transactions found"
                          : "No transactions match your filters"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(groupedTransactions)
                      .sort(([a], [b]) => b.localeCompare(a))
                      .map(([group, transactions]) =>
                        transactions.length > 0 ? (
                          <Collapsible
                            key={group}
                            defaultOpen
                            className="mb-4 last:mb-0"
                          >
                            <CollapsibleTrigger className="group flex justify-between items-center hover:bg-accent/50 p-2 rounded-lg w-full font-medium text-sm transition-colors">
                              <div className="flex items-center gap-3">
                                <h4 className="text-primary capitalize">
                                  {getGroupDisplayName(group, transactions)}
                                </h4>
                                <div className="flex items-center gap-2 text-primary/60 text-xs">
                                  <span>•</span>
                                  <span>{transactions.length} items</span>
                                </div>
                              </div>
                              <ChevronDown className="w-4 h-4 text-primary group-data-[state=open]:rotate-180 transition-all duration-200 ease-in-out" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pt-2">
                              <Table>
                                <TableHeader>
                                  <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[120px]">
                                      Date
                                    </TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="w-[180px]">
                                      Category
                                    </TableHead>
                                    <TableHead className="w-[120px] text-right">
                                      Amount
                                    </TableHead>
                                    <TableHead className="w-[50px]" />
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {transactions.map((transaction) => (
                                    <TableRow
                                      key={transaction.id}
                                      className="group hover:bg-muted/50 cursor-pointer"
                                      onClick={() =>
                                        handleTransactionClick(transaction)
                                      }
                                    >
                                      <TableCell className="font-medium">
                                        {format(
                                          new Date(transaction.date),
                                          "dd MMM yyyy"
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {transaction.description}
                                      </TableCell>
                                      <TableCell>
                                        <Badge
                                          variant="secondary"
                                          className="font-normal"
                                        >
                                          {getCategoryDisplayName(
                                            transaction.category
                                          )}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="tabular-nums text-right">
                                        <span
                                          className={cn(
                                            "font-medium",
                                            transaction.type === "expense"
                                              ? "text-red-500 dark:text-red-500"
                                              : "text-green-600 dark:text-green-500"
                                          )}
                                        >
                                          {transaction.type === "expense"
                                            ? "-"
                                            : "+"}
                                          {formatCurrency(transaction.amount)}
                                        </span>
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex justify-end">
                                          <div
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <DeleteTransactionDialog
                                              transaction={transaction}
                                            />
                                          </div>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : null
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedTransaction && (
        <EditTransactionDialog
          transaction={selectedTransaction}
          open={isEditDialogOpen}
          onOpenChange={handleEditDialogClose}
        />
      )}
    </TransactionsErrorBoundary>
  );
}
