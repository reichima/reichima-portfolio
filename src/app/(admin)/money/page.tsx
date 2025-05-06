import { getCurrent } from "@/features/auth/action";
import { redirect } from "next/navigation";

export default async function Money() {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">5月</h1>
    </div>
  );
}
