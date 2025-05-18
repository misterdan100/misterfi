import { TabsList, TabsTrigger } from "@/app/components/ui/tabs/Tabs";

type TabsNavigationProps = {
  incomeCount: number;
  expenseCount: number;
};

export function TabsNavigation({
  incomeCount,
  expenseCount,
}: TabsNavigationProps) {
  return (
    <div className="px-3 sm:px-6 pt-3">
      <TabsList className="grid grid-cols-2 p-1 w-full h-9">
        <TabsTrigger
          value="income"
          className="flex items-center gap-2 data-[state=active]:bg-accent text-sm"
        >
          Income{" "}
          <span className="bg-primary/10 px-2 py-0.5 rounded-full font-medium text-primary text-xs">
            {incomeCount}
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="expenses"
          className="flex items-center gap-2 data-[state=active]:bg-accent text-sm"
        >
          Expenses{" "}
          <span className="bg-primary/10 px-2 py-0.5 rounded-full font-medium text-primary text-xs">
            {expenseCount}
          </span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
}
