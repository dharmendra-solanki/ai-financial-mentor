import { useEffect, useState } from "react";
import {
  Bot,
  CreditCard,
  PiggyBank,
  ReceiptText,
  Target,
  Trash2,
  Users,
  Wallet,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  deleteAdminUser,
  getAdminStats,
  getAdminUsers,
} from "../services/admin.service";
import type { AdminStats, AdminUser } from "../services/admin.service";
import SummaryCard from "../components/dashboard/SummaryCard";
import { formatDate } from "../utils/formatDate";

const Admin = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    setError("");

    try {
      const [statsData, usersData] = await Promise.all([
        getAdminStats(),
        getAdminUsers(),
      ]);

      setStats(statsData);
      setUsers(usersData);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load admin panel");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteUser = async (id: number) => {
    const confirmed = window.confirm("Delete this user and all related data?");
    if (!confirmed) return;

    await deleteAdminUser(id);
    fetchAdminData();
  };

  return (
    <DashboardLayout
      title="Admin Panel"
      subtitle="Monitor users, system activity, and platform usage."
    >
      {loading ? (
        <div className="panel rounded-lg p-8 text-center font-bold text-slate-500">
          Loading admin panel...
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 font-bold text-red-700">
          {error}
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">

          {/* ================= STATS GRID ================= */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              title="Users"
              value={String(stats?.totalUsers || 0)}
              icon={<Users size={22} />}
              tone="teal"
            />
            <SummaryCard
              title="Income Records"
              value={String(stats?.totalIncomes || 0)}
              icon={<Wallet size={22} />}
              tone="slate"
            />
            <SummaryCard
              title="Expense Records"
              value={String(stats?.totalExpenses || 0)}
              icon={<ReceiptText size={22} />}
              tone="red"
            />
            <SummaryCard
              title="Budgets"
              value={String(stats?.totalBudgets || 0)}
              icon={<PiggyBank size={22} />}
              tone="amber"
            />
            <SummaryCard
              title="Savings Goals"
              value={String(stats?.totalGoals || 0)}
              icon={<Target size={22} />}
              tone="teal"
            />
            <SummaryCard
              title="Debts"
              value={String(stats?.totalDebts || 0)}
              icon={<CreditCard size={22} />}
              tone="red"
            />
            <SummaryCard
              title="AI Chats"
              value={String(stats?.totalAiChats || 0)}
              icon={<Bot size={22} />}
              tone="slate"
            />
          </section>

          {/* ================= USER TABLE ================= */}
          <section className="panel rounded-lg p-5 sm:p-6 overflow-hidden">

            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-black text-slate-950">
                User Management
              </h2>
              <p className="text-sm text-slate-500">
                View users and their activity counts
              </p>
            </div>

            {/* RESPONSIVE TABLE WRAPPER */}
            <div className="w-full overflow-x-auto">
              <table className="data-table min-w-[900px] sm:min-w-full">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Country</th>
                    <th>Risk</th>
                    <th>Records</th>
                    <th>Joined</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.length ? (
                    users.map((user) => {
                      const recordCount =
                        user._count.incomes +
                        user._count.expenses +
                        user._count.budgets +
                        user._count.savingsGoals +
                        user._count.debts +
                        user._count.aiChats;

                      return (
                        <tr
                          key={user.id}
                          className="hover:bg-slate-50 transition"
                        >
                          <td className="whitespace-nowrap">
                            <p className="font-black text-slate-950">
                              {user.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {user.email}
                            </p>
                          </td>

                          <td className="whitespace-nowrap">
                            <span
                              className={`badge ${
                                user.role === "ADMIN"
                                  ? "badge-blue"
                                  : "badge-green"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>

                          <td className="whitespace-nowrap text-slate-500">
                            {user.profile?.country || "-"}
                          </td>

                          <td className="whitespace-nowrap text-slate-500">
                            {user.profile?.riskLevel || "-"}
                          </td>

                          <td className="whitespace-nowrap font-black text-slate-800">
                            {recordCount}
                          </td>

                          <td className="whitespace-nowrap text-slate-500">
                            {formatDate(user.createdAt)}
                          </td>

                          <td className="whitespace-nowrap">
                            <button
                              className="danger-btn"
                              type="button"
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={user.role === "ADMIN"}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center text-slate-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      )}
    </DashboardLayout>
  );
};

export default Admin;