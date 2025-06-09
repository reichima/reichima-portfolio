import { getCurrent } from "@/features/auth/action";
import { redirect } from "next/navigation";
import { MoneyClient } from "@/features/expenses/components/money-client";

export default async function Money() {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }
  
  return <MoneyClient />;
}
