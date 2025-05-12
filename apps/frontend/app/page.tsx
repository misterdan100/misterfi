"use client";

import { SignUpButton, useAuth, useSignIn } from "@clerk/nextjs";
import { Button } from "./components/ui/button/Button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();

  const signInWithDemo = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: "demo@misterfi.app",
        password: "demo-password-123",
      });

      if (result.status === "complete") {
        await result.createdSessionId;
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Error signing in with demo account:", err);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, router]);

  if (isSignedIn) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center p-4 min-h-[calc(100vh-64px)] text-center">
      <div className="space-y-6 max-w-3xl">
        <div className="space-y-2">
          <p className="font-medium text-primary text-lg">Welcome to MisterFi</p>
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl tracking-tighter">
            Bringing <span className="text-primary">Clarity</span> to Your
            Finances
          </h1>
        </div>

        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          MisterFi makes expense tracking crystal clear. Our modern, intuitive
          interface helps you understand your spending with perfect clarity.
        </p>

        <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
          <SignUpButton mode="modal">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </SignUpButton>
          <Button size="lg" variant="outline" onClick={signInWithDemo}>
            Try Demo Account
          </Button>
        </div>

        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-12">
          <div className="space-y-2">
            <h3 className="font-bold text-xl">Clear Transaction Entry</h3>
            <p className="text-muted-foreground">
              Add transactions instantly with our streamlined input system
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-xl">Transparent Management</h3>
            <p className="text-muted-foreground">
              View, edit, and delete your transactions with perfect clarity
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-xl">Visual Comfort</h3>
            <p className="text-muted-foreground">
              Light and dark themes for crystal-clear viewing any time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
