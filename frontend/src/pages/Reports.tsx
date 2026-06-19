import { useState } from "react";
import type { FormEvent } from "react";
import { BarChart3, CalendarSearch } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardLayout from "../layouts/DashboardLayout";
import { getMonthlyReport } from "../services/report.service";
import type { MonthlyReport } from "../services/report.service";
import { formatCurrency } from "../utils/formatCurrency";

const chartColors = ["#0f766e", "#dc2626", "#f59e0b", "#2563eb", "#7c3aed"];

const Reports = () => {
  const now = new Date();
  const [month, setMonth] = useState(String(now.getMonth() + 1));
  const [year, setYear] = useState(String(now.getFullYear()));
  const [report, setReport] = useState<MonthlyReport | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const data = await getMonthlyReport(Number(month), Number(year));
      setReport(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    fetchReport();
  };

  const expensePieData = report
    ? Object.entries(report.expenseByCategory).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  return (
    <DashboardLayout
      title="Reports"
      subtitle="Monthly financial truth in charts and numbers."
    >
      <div className="space-y-8">

        {/* ===== FILTER CARD ===== */}
        <form
          onSubmit={handleSubmit}
          className="panel flex flex-wrap items-end gap-5 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >

          <div>
            <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Month
            </label>
            <input
              className="input-field w-36 rounded-xl border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              type="number"
              min={1}
              max={12}
              value={month}
              onChange={(event) => setMonth(event.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Year
            </label>
            <input
              className="input-field w-40 rounded-xl border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              type="number"
              min={2000}
              value={year}
              onChange={(event) => setYear(event.target.value)}
            />
          </div>

          <button
            className="primary-btn rounded-xl px-5 py-3 flex items-center gap-2 hover:scale-[1.02] transition"
            type="submit"
            disabled={loading}
          >
            <CalendarSearch size={18} />
            {loading ? "Generating..." : "Generate Report"}
          </button>
        </form>

        {report && (
          <>
            {/* ===== KPI CARDS ===== */}
            <section className="grid gap-5 sm:grid-cols-3">

              <div className="panel rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition">
                <p className="text-xs font-bold uppercase text-slate-500">
                  Monthly Income
                </p>
                <p className="mt-2 text-2xl font-black text-teal-600">
                  {formatCurrency(report.totalIncome)}
                </p>
              </div>

              <div className="panel rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition">
                <p className="text-xs font-bold uppercase text-slate-500">
                  Monthly Expense
                </p>
                <p className="mt-2 text-2xl font-black text-red-600">
                  {formatCurrency(report.totalExpense)}
                </p>
              </div>

              <div className="panel rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition">
                <p className="text-xs font-bold uppercase text-slate-500">
                  Balance
                </p>
                <p className="mt-2 text-2xl font-black text-slate-900">
                  {formatCurrency(report.balance)}
                </p>
              </div>

            </section>

            {/* ===== CHARTS ===== */}
            <section className="grid gap-6 xl:grid-cols-2">

              {/* PIE CHART */}
              <div className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="mb-5 flex items-center gap-2">
                  <BarChart3 size={20} className="text-teal-600" />
                  <h2 className="text-lg font-black text-slate-900">
                    Expenses by Category
                  </h2>
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expensePieData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                        label
                      >
                        {expensePieData.map((entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={chartColors[index % chartColors.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* BAR CHART */}
              <div className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <h2 className="mb-5 text-lg font-black text-slate-900">
                  Budget Usage
                </h2>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={report.budgetSummary}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                      <Bar
                        dataKey="limitAmount"
                        fill="#0f766e"
                        radius={[6, 6, 0, 0]}
                      />
                      <Bar
                        dataKey="usedAmount"
                        fill="#dc2626"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </section>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Reports;