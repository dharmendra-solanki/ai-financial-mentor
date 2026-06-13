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
        <div className="panel rounded-lg p-8 text-center font-bold text-slate-500">
          Loading dashboard...
        </div>
      ) : (
        <div className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              title="Total Income"
              value={formatCurrency(summary?.totalIncome || 0)}
              icon={<ArrowUpCircle size={22} />}
              tone="teal"
            />
            <SummaryCard
              title="Total Expense"
              value={formatCurrency(summary?.totalExpense || 0)}
              icon={<ArrowDownCircle size={22} />}
              tone="red"
            />
            <SummaryCard
              title="Balance"
              value={formatCurrency(summary?.balance || 0)}
              icon={<IndianRupee size={22} />}
              tone="slate"
            />
            <SummaryCard
              title="Budget Used"
              value={`${summary?.budgetUsedPercentage || 0}%`}
              icon={<PiggyBank size={22} />}
              tone="amber"
            />
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="panel rounded-lg p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-950">
                    Recent Expenses
                  </h2>
                  <p className="text-sm font-medium text-slate-500">
                    Latest spending activity
                  </p>
                </div>
                <span className="badge badge-red">
                  {formatCurrency(summary?.currentMonthExpense || 0)} this month
                </span>
              </div>

              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary?.recentExpenses?.length ? (
                      summary.recentExpenses.map((expense) => (
                        <tr key={expense.id}>
                          <td className="font-bold text-slate-800">
                            {expense.category}
                          </td>
                          <td className="font-black text-red-600">
                            {formatCurrency(expense.amount)}
                          </td>
                          <td className="text-slate-500">
                            {formatDate(expense.date)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center text-slate-500">
                          No expenses yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel rounded-lg p-5">
              <div className="mb-4">
                <h2 className="text-lg font-black text-slate-950">
                  Recent Income
                </h2>
                <p className="text-sm font-medium text-slate-500">
                  Latest money received
                </p>
              </div>

              <div className="space-y-3">
                {summary?.recentIncomes?.length ? (
                  summary.recentIncomes.map((income) => (
                    <div
                      key={income.id}
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4"
                    >
                      <div>
                        <p className="font-black text-slate-900">
                          {income.source}
                        </p>
                        <p className="text-sm font-medium text-slate-500">
                          {formatDate(income.date)}
                        </p>
                      </div>
                      <p className="font-black text-teal-700">
                        {formatCurrency(income.amount)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="rounded-lg bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
                    No income yet
                  </p>
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