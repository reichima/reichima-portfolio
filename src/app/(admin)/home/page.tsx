import { getCurrent } from "@/features/auth/action";
import { redirect } from "next/navigation";
import { HomeClient } from "@/features/expenses/components/home-client";

export default async function Home() {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }

  return <HomeClient />;
}
