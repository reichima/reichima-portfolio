"use client";

import { AdminSidebar } from "@/components/admin-sidebar";
import { MobileAdminSidebar } from "@/components/mobile-admin-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UserButton } from "@/components/user-button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="bg-background min-h-screen">
      <div className="flex h-full w-full">
        <div className="fixed top-0 left-0 hidden h-full overflow-hidden lg:block lg:w-[264px]">
          <AdminSidebar />
        </div>
        <div className="w-full lg:pl-[264px]">
          <div className="mx-auto h-full max-w-screen-2xl">
            <nav className="flex items-center justify-between px-6 pt-4">
              <MobileAdminSidebar />
              <DashboardBreadcrumb />
              <UserButton />
            </nav>
            <main className="flex h-full flex-col px-6 py-8">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;

function DashboardBreadcrumb() {
  const pathname = usePathname();

  const pageNames: Record<string, string> = {
    "/home": "ホーム",
    "/money": "家計簿",
  };

  const currentPageName = pageNames[pathname];
  const isHomePage = pathname === "/home";

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {isHomePage ? (
          <BreadcrumbItem>
            <BreadcrumbPage>ホーム</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/home">ホーム</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {currentPageName && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPageName}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
