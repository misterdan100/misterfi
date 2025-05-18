"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet/Sheet";
import { ScrollArea } from "../ui/scroll-area/ScrollArea";
import { Separator } from "../ui/separator/Separator";
import { Button } from "../ui/button/Button";
import { MainNav } from "./Sidebar/MainNav";
import { QuickStats } from "./Sidebar/QuickStats";
import { Collapse } from "./Sidebar/Collapse";
import { Header } from "./Header";
import { cn } from "@/app/lib/utils";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = React.useState(false);
  const [isLargeScreen, setIsLargeScreen] = React.useState(false);
  const { isLoaded, isSignedIn } = useUser();

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Animation values
  const sidebarWidth = isDesktopCollapsed ? 80 : 240;
  const animationConfig = {
    type: "spring",
    stiffness: 200,
    damping: 25,
  };

  // Don't show anything while loading auth state
  if (!isLoaded) {
    return null;
  }

  return (
    <div className="relative flex items-center min-h-screen">

      {isSignedIn && (
        <>
          {/* Mobile Trigger */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="top-3 left-4 z-50 fixed"
              >
                <MenuIcon className="w-6 h-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <SheetHeader className="px-6 py-4 border-b">
                <SheetTitle>
                  <Image
                    src="https://raw.githubusercontent.com/misterdan100/misterdan-cv-v1/3c8a1efa2243b5df709c190cb4a142a259504922/src/assets/img/daniel-merchan-logo_4.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                    priority
                  />
                  MisterFi</SheetTitle>
              </SheetHeader>
              <MobileSidebar />
            </SheetContent>
          </Sheet>

          {/* Desktop Sidebar */}
          <motion.aside
            layout
            animate={{ width: sidebarWidth }}
            transition={animationConfig}
            className={cn(
              "fixed left-0 top-0 h-screen hidden lg:flex flex-col border-r bg-background z-40"
            )}
          >
            <div className="flex justify-center items-center h-16">
              <Link href="/" className={cn("flex items-center justify-center")}>
                <span
                  className={cn(
                    "text-lg font-semibold flex items-center gap-2"
                  )}
                >
                  <Image
                    src="https://raw.githubusercontent.com/misterdan100/misterdan-cv-v1/3c8a1efa2243b5df709c190cb4a142a259504922/src/assets/img/daniel-merchan-logo_4.svg"
                    alt="Logo"
                    width={30}
                    height={30}
                    priority
                  />
                  <span className={cn(isDesktopCollapsed && "hidden")}>
                    MisterFi
                  </span>
                </span>
              </Link>
            </div>
            <DesktopSidebar isCollapsed={isDesktopCollapsed} />
          </motion.aside>

          {/* Collapse button positioned outside the sidebar */}
          <motion.div
            className="hidden lg:block top-1/2 z-50 fixed -translate-y-1/2"
            animate={{ left: sidebarWidth }}
            transition={animationConfig}
          >
            <Collapse
              isCollapsed={isDesktopCollapsed}
              onToggle={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
            />
          </motion.div>
        </>
      )}

      {/* Main content area */}
      <motion.div
        layout
        animate={{
          marginLeft: isSignedIn
            ? isLargeScreen
              ? isDesktopCollapsed
                ? 80
                : 240
              : 0
            : 0,
          width: isSignedIn
            ? isLargeScreen
              ? `calc(100% - ${isDesktopCollapsed ? 80 : 240}px)`
              : "100%"
            : "100%",
        }}
        transition={isLargeScreen ? animationConfig : { duration: 0 }}
        className={cn(
          "flex-1 flex flex-col bg-background min-h-screen relative",
          !isSignedIn && "pl-0"
        )}
      >
        <motion.div
          layout
          className={cn(
            "sticky top-0 left-0 right-0 z-40 bg-background h-16 w-full border-b"
          )}
        >
          <Header className="h-full" />
        </motion.div>
        <main className="flex-1">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </motion.div>
    </div>
  );
}

function MobileSidebar() {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="flex flex-col items-center gap-4 p-6">
        <MainNav />
        <Separator />
        <QuickStats />
      </div>
    </ScrollArea>
  );
}

function DesktopSidebar({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div
        className={cn(
          "flex flex-col gap-4 flex-none",
          isCollapsed ? "px-2" : "px-6"
        )}
      >
        <MainNav isCollapsed={isCollapsed} />
      </div>
      <div className={cn(isCollapsed ? "p-2" : "p-6")}>
        <Separator />
        {!isCollapsed && (
          <h3 className="mt-4 font-medium text-muted-foreground text-sm">
            Quick Stats
          </h3>
        )}
      </div>
      <ScrollArea className="flex-1 h-[calc(100vh-12rem)]">
        <div className={cn(isCollapsed ? "p-2" : "p-6", "pt-0")}>
          <QuickStats isCollapsed={isCollapsed} showTitle={false} />
        </div>
      </ScrollArea>
    </div>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
