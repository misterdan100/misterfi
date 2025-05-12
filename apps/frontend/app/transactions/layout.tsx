import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions | MisterFi",
  description: "Manage and track your financial activity",
};

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
