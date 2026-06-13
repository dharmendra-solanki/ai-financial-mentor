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
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Income", path: "/income", icon: Wallet },
  { label: "Expenses", path: "/expenses", icon: ReceiptText },
  { label: "Budgets", path: "/budgets", icon: PiggyBank },
  { label: "Goals", path: "/savings-goals", icon: Target },
  { label: "Debts", path: "/debts", icon: CreditCard },
  { label: "Reports", path: "/reports", icon: ChartPie },
  { label: "AI Mentor", path: "/ai-mentor", icon: Bot },
  { label: "Profile", path: "/profile", icon: User },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const navItems =
    user?.role === "ADMIN"
      ? [...baseNavItems, { label: "Admin", path: "/admin", icon: Shield }]
      : baseNavItems;

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <aside className="min-h-screen w-72 border-r border-slate-200 bg-white px-4 py-5">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal-700 text-white">
          <Flag size={22} />
        </div>
        <div>
          <p className="text-lg font-black text-slate-950">AI Finance</p>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Mentor
          </p>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-extrabold transition ${
                active
                  ? "bg-teal-700 text-white shadow-lg shadow-teal-700/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              <Icon size={19} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-8 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-extrabold text-red-600 hover:bg-red-50"
      >
        <LogOut size={19} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;