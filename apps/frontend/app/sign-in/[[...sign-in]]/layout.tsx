import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | MisterFi",
  description: "Sign in to your MisterFi account",
};

// This is required for static export with dynamic routes
export function generateStaticParams() {
  return [{ "sign-in": [] }, { "sign-in": ["sso-callback"] }];
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
