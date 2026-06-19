import { useEffect, useState } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  IndianRupee,
  PiggyBank,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import SummaryCard from "../components/dashboard/SummaryCard";
import { getDashboardSummary } from "../services/dashboard.service";
import type { DashboardSummary } from "../types/finance.types";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

const Dashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    try {
      const data = await getDashboardSummary();
      setSummary(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Your money overview, live from your backend."
    >
      {loading ? (
        <div className="panel rounded-2xl p-10 text-center font-bold text-slate-500 shadow-sm animate-pulse">
          Loading dashboard...
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* ===== SUMMARY CARDS (UI UPGRADE ONLY) ===== */}
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="hover:-translate-y-1 transition duration-300">
              <SummaryCard
                title="Total Income"
                value={formatCurrency(summary?.totalIncome || 0)}
                icon={<ArrowUpCircle className="text-emerald-500" size={24} />}
                tone="teal"
              />
            </div>

            <div className="hover:-translate-y-1 transition duration-300">
              <SummaryCard
                title="Total Expense"
                value={formatCurrency(summary?.totalExpense || 0)}
                icon={<ArrowDownCircle className="text-rose-500" size={24} />}
                tone="red"
              />
            </div>

            <div className="hover:-translate-y-1 transition duration-300">
              <SummaryCard
                title="Balance"
                value={formatCurrency(summary?.balance || 0)}
                icon={<IndianRupee className="text-indigo-500" size={24} />}
                tone="slate"
              />
            </div>

            <div className="hover:-translate-y-1 transition duration-300">
              <SummaryCard
                title="Budget Used"
                value={`${summary?.budgetUsedPercentage || 0}%`}
                icon={<PiggyBank className="text-amber-500" size={24} />}
                tone="amber"
              />
            </div>
          </section>

          {/* ===== MAIN GRID ===== */}
          <section className="grid gap-7 xl:grid-cols-[1.2fr_0.8fr]">
            
            {/* ===== EXPENSES ===== */}
            <div className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              
              {/* HEADER */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    Recent Expenses
                  </h2>
                  <p className="text-sm text-slate-500">
                    Latest spending activity
                  </p>
                </div>

                <span className="rounded-full bg-gradient-to-r from-red-100 to-rose-100 px-4 py-1 text-xs font-bold text-rose-600 shadow-sm">
                  {formatCurrency(summary?.currentMonthExpense || 0)} this month
                </span>
              </div>

              {/* TABLE */}
              <div className="overflow-hidden rounded-xl border border-slate-100">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="p-3">Category</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {summary?.recentExpenses?.length ? (
                      summary.recentExpenses.map((expense) => (
                        <tr
                          key={expense.id}
                          className="border-t hover:bg-rose-50 transition"
                        >
                          <td className="p-3 font-semibold text-slate-800">
                            {expense.category}
                          </td>
                          <td className="font-bold text-rose-600">
                            {formatCurrency(expense.amount)}
                          </td>
                          <td className="text-slate-500">
                            {formatDate(expense.date)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="p-6 text-center text-slate-500"
                        >
                          No expenses yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ===== INCOME ===== */}
            <div className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              
              <div className="mb-5">
                <h2 className="text-xl font-black text-slate-900">
                  Recent Income
                </h2>
                <p className="text-sm text-slate-500">
                  Latest money received
                </p>
              </div>

              <div className="space-y-4">
                {summary?.recentIncomes?.length ? (
                  summary.recentIncomes.map((income) => (
                    <div
                      key={income.id}
                      className="group flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-emerald-600 transition">
                          {income.source}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatDate(income.date)}
                        </p>
                      </div>

                      <p className="font-black text-emerald-600">
                        {formatCurrency(income.amount)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl bg-slate-50 p-6 text-center text-sm font-medium text-slate-500">
                    No income yet
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;