import { useState } from "react";
import type { ReactNode } from "react";
import { Menu, Search, X } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import NotificationBell from "../components/layout/NotificationBell";
import { getCurrentUser } from "../services/auth.service";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const DashboardLayout = ({
  children,
  title,
  subtitle,
}: DashboardLayoutProps) => {
  const user = getCurrentUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="app-shell flex min-h-screen">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/50"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
          />

          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl">
            <div className="flex justify-end border-b border-slate-200 p-3">
              <button
                type="button"
                className="secondary-btn h-10 w-10 p-0"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      <section className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 px-4 py-4 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="secondary-btn h-10 w-10 p-0 lg:hidden"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu size={18} />
                </button>

                <div>
                  <h1 className="truncate text-2xl font-black text-slate-950">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-slate-400">
                <Search size={16} />
                <span className="text-sm font-semibold">Search finance</span>
              </div>

              <NotificationBell />

              <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-900 text-sm font-black text-white">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 py-6 lg:px-8">{children}</div>
      </section>
    </main>
  );
};

export default DashboardLayout;
