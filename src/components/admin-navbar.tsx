import { MobileAdminSidebar } from "@/components/mobile-admin-sidebar";
import { UserButton } from "@/components/user-button";

export const AdminNavbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 pt-4">
      <div className="hidden flex-col lg:flex">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-muted-foreground text-sm">
          Admin dashboard for managing the application
        </p>
      </div>
      <MobileAdminSidebar />
      <UserButton />
    </nav>
  );
};
