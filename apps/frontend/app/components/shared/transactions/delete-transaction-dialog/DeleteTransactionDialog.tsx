"use client";

import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button/Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog/AlertDialog";
import { Transaction } from "@/app/lib/redux/slices/transactions/types";
import { useTransactionMutations } from "@/app/lib/hooks/useTransactionMutations";
import { useToast } from "@/app/components/ui/toast/use-toast";
import { formatCurrency } from "@/app/lib/utils";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteTransactionDialogProps {
  transaction: Transaction;
}

export function DeleteTransactionDialog({
  transaction,
}: DeleteTransactionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteTransaction } = useTransactionMutations();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      // Wait for both the deletion and the query invalidation
      await deleteTransaction(transaction.id);

      // Wait for the transactions query to finish refetching
      await queryClient.refetchQueries({ queryKey: ["transactions"] });

      toast({
        title: "Transaction deleted",
        description: "The transaction has been successfully deleted",
      });
      setOpen(false);
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete the transaction",
        variant: "destructive",
      });
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-destructive opacity-0 group-hover:opacity-100 p-0 w-8 h-8 text-muted-foreground hover:text-white"
        >
          <Trash2 className="w-4 h-4" />
          <span className="sr-only">Delete transaction</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this transaction?
            <div className="bg-muted/50 mt-4 p-4 border rounded-lg">
              <div className="gap-2 grid text-sm">
                <div className="grid grid-cols-2">
                  <span className="font-medium">Amount:</span>
                  <span
                    className={
                      transaction.type === "expense"
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {transaction.type === "expense" ? "-" : "+"}
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-medium">Description:</span>
                  <span>{transaction.description}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-medium">Category:</span>
                  <span>{transaction.category}</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-destructive text-sm">
              This action cannot be undone.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90 border hover:border-destructive border-transparent text-destructive-foreground hover:text-destructive" 
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
