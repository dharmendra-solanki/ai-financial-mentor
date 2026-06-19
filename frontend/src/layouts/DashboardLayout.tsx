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
    <main className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl">
            <div className="flex justify-end border-b border-slate-200 p-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition"
              >
                <X size={18} />
              </button>
            </div>

            <Sidebar />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="flex-1 min-w-0 h-screen overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 lg:px-8">
            {/* Left */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white lg:hidden"
              >
                <Menu size={18} />
              </button>

              <div>
                <h1 className="text-2xl font-black text-slate-900">{title}</h1>

                {subtitle && (
                  <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
                )}
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <Search size={18} className="text-slate-400" />

                <input
                  type="text"
                  placeholder="Search..."
                  className="w-40 bg-transparent outline-none text-sm"
                />
              </div>

              {/* Notifications */}
              <NotificationBell />

              {/* User Avatar */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <h3 className="font-bold text-slate-900">{user?.name}</h3>

                  <p className="text-xs text-slate-500">{user?.role}</p>
                </div>

                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-4 py-6 lg:px-8">{children}</div>
      </section>
    </main>
  );
};

export default DashboardLayout;
