import { FormField, FormItem } from "@/app/components/ui/form/Form";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs/Tabs";
import { cn } from "@/app/lib/utils";
import { useFormContext } from "react-hook-form";

interface TransactionTypeFieldProps {
  isSubmitting: boolean;
}

export function TransactionTypeField({
  isSubmitting,
}: TransactionTypeFieldProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <Tabs
            defaultValue={field.value}
            value={field.value}
            onValueChange={field.onChange}
            className="w-full"
          >
            <TabsList className="gap-1 grid grid-cols-2 bg-muted w-full">
              <TabsTrigger
                value="expense"
                disabled={isSubmitting}
                className={cn(
                  "w-full data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
                )}
              >
                Expense
              </TabsTrigger>
              <TabsTrigger
                value="income"
                disabled={isSubmitting}
                className={cn(
                  "w-full data-[state=active]:bg-[#21BF73] data-[state=active]:text-white"
                )}
              >
                Income
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </FormItem>
      )}
    />
  );
}
