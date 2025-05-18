import { cn } from "@/app/lib/utils";
import { TransactionsFiltersProps } from "./types";
import { TransactionsFiltersActions } from "./TransactionsFiltersActions";

export function TransactionsFilters(props: TransactionsFiltersProps) {
  return (
    <div
      className={cn(
        "sticky top-16 z-10 px-6  transition-all duration-200",
        "border-b bg-background px-6 py-4"
      )}
    >
      <TransactionsFiltersActions {...props} />
    </div>
  );
}
