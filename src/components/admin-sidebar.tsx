import { AdminNavigation } from "@/components/admin-navigation";
import { DottedSeparator } from "@/components/dotted-separator";
import Image from "next/image";
import Link from "next/link";

export const AdminSidebar = () => {
  return (
    <aside className="h-full w-full bg-neutral-100 p-4">
      <Link href="/home">
        <Image
          src="/images/wakemeup.png"
          alt="logo"
          width={240}
          height={240}
          priority
        />
      </Link>
      <DottedSeparator className="my-2" />
      <AdminNavigation />
    </aside>
  );
};
