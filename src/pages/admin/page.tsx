import { useAdminAuth } from "@/hooks/use-admin-auth.ts";
import AdminLogin from "./_components/AdminLogin.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { LogOut } from "lucide-react";

export default function AdminPage() {
  const { isVerified, adminEmail, logout } = useAdminAuth();

  if (isVerified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="h-12 w-64" />
      </div>
    );
  }

  if (!isVerified) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Панель администратора</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{adminEmail}</span>
          <Button variant="ghost" size="sm" onClick={logout} className="cursor-pointer gap-2">
            <LogOut className="h-4 w-4" />
            Выйти
          </Button>
        </div>
      </header>
      <main className="p-6">
        <p className="text-muted-foreground">Добро пожаловать в панель администратора.</p>
      </main>
    </div>
  );
}
