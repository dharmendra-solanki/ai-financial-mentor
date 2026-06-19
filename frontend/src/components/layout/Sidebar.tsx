import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bot,
  ChartPie,
  CreditCard,
  Flag,
  LayoutDashboard,
  LogOut,
  PiggyBank,
  ReceiptText,
  Shield,
  Target,
  User,
  Wallet,
} from "lucide-react";
import { getCurrentUser, logoutUser } from "../../services/auth.service";

const baseNavItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    color: "text-indigo-600",
  },
  {
    label: "Income",
    path: "/income",
    icon: Wallet,
    color: "text-emerald-600",
  },
  {
    label: "Expenses",
    path: "/expenses",
    icon: ReceiptText,
    color: "text-rose-500",
  },
  {
    label: "Budgets",
    path: "/budgets",
    icon: PiggyBank,
    color: "text-orange-500",
  },
  {
    label: "Goals",
    path: "/savings-goals",
    icon: Target,
    color: "text-purple-600",
  },
  {
    label: "Debts",
    path: "/debts",
    icon: CreditCard,
    color: "text-cyan-600",
  },
  {
    label: "Reports",
    path: "/reports",
    icon: ChartPie,
    color: "text-pink-600",
  },
  {
    label: "AI Mentor",
    path: "/ai-mentor",
    icon: Bot,
    color: "text-violet-600",
  },
  {
    label: "Profile",
    path: "/profile",
    icon: User,
    color: "text-amber-500",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const navItems =
    user?.role === "ADMIN"
      ? [...baseNavItems, { label: "Admin", path: "/admin", icon: Shield , color: "text-slate-600"}]
      : baseNavItems;

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <aside className="flex min-h-screen w-72 flex-col border-r border-slate-200 bg-white px-4 py-5 shadow-sm">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
          <Flag size={22} />
        </div>

        <div>
          <h1 className="text-lg font-black text-slate-900">AI Financial</h1>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">
            Mentor
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 font-bold transition-all duration-300
            ${
              active
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-100 hover:scale-[1.02]"
            }`}
            >
              <Icon
                size={20}
                className={
                  active
                    ? "text-white"
                    : `${item.color} group-hover:scale-110 transition`
                }
              />

              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom User Section */}
      <div className="mt-auto pt-8">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-lg font-bold text-white">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            {/* User Details */}
            <div className="flex-1 min-w-0">
              <h3 className="truncate font-bold text-slate-900">
                {user?.name}
              </h3>

              <p className="truncate text-xs text-slate-500">{user?.email}</p>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
