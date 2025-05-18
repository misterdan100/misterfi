"use client";

import * as React from "react";
import { Button } from "../ui/button/Button";
import { Plus, Moon, Sun } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "next-themes";
import { cn } from "@/app/lib/utils";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { AddTransactionDialog } from "@/app/components/shared/transactions/add-transaction-dialog";
import { DatabaseActionsDialog } from "@/app/components/shared/database/DatabaseActionsDialog";
import { usePathname } from "next/navigation";

export function Header({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const isAuthPage =
    pathname.includes("sign-in") || pathname.includes("sign-up");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className={cn("bg-background px-6 py-3 w-full", className)}>
      <div className="flex justify-end items-center">

        {/* Add padding-right to leave space for GitHub corner */}
        <div className="flex flex-wrap items-center gap-4 pr-2 sm:pr-16">

          {/* Quick Add Transaction - Only show when signed in */}
            {isSignedIn && (
              <AddTransactionDialog>
                <Button
                  variant="ghost" 
                  // size="icon"
                  className="bg-accent hover:bg-transparent border hover:border-accent border-transparent w-fit hover:text-accent text-accent-foreground"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:block">Add</span>
                </Button>
              </AddTransactionDialog>
            )}

            {isSignedIn && <DatabaseActionsDialog />}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative"
          >
            <Moon className="absolute w-5 h-5 scale-100 dark:scale-0" />
            <Sun className="w-5 h-5 scale-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isSignedIn ? (
            <>
              {/* User Button */}
              <UserButton />
            </>
          ) : (
            !isAuthPage && (
              <SignInButton>
                <Button variant="default" size="sm">
                  Sign in
                </Button>
              </SignInButton>
            )
          )}

          {/* GitHub Button */}
          <a
            href="https://github.com/misterdan100/misterfi"
            target="_blank"
            className="inline-flex relative justify-center items-center gap-2 hover:bg-accent disabled:opacity-50 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-9 h-9 [&_svg]:size-6 font-medium text-gray-600 dark:text-gray-200 text-lg whitespace-nowrap transition-colors hover:text-accent-foreground [&_svg]:pointer-events-none disabled:pointer-events-none [&_svg]:shrink-0"
          >
            <FaGithub className="absolute scale-100" />
            <span className="sr-only">GitHub Repository</span>
          </a>
        </div>
      </div>
    </header>
  );
}
