import {  useState } from "react";
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
      <div className="space-y-6">
        <form
          onSubmit={handleSubmit}
          className="panel flex flex-wrap items-end gap-4 rounded-lg p-5"
        >
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Month
            </label>
            <input
              className="input-field w-36"
              type="number"
              min={1}
              max={12}
              value={month}
              onChange={(event) => setMonth(event.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Year
            </label>
            <input
              className="input-field w-40"
              type="number"
              min={2000}
              value={year}
              onChange={(event) => setYear(event.target.value)}
            />
          </div>

          <button className="primary-btn" type="submit" disabled={loading}>
            <CalendarSearch size={18} />
            {loading ? "Loading..." : "Generate Report"}
          </button>
        </form>

        {report && (
          <>
            <section className="grid gap-4 sm:grid-cols-3">
              <div className="panel rounded-lg p-5">
                <p className="text-sm font-bold text-slate-500">
                  Monthly Income
                </p>
                <p className="mt-2 text-2xl font-black text-teal-700">
                  {formatCurrency(report.totalIncome)}
                </p>
              </div>

              <div className="panel rounded-lg p-5">
                <p className="text-sm font-bold text-slate-500">
                  Monthly Expense
                </p>
                <p className="mt-2 text-2xl font-black text-red-600">
                  {formatCurrency(report.totalExpense)}
                </p>
              </div>

              <div className="panel rounded-lg p-5">
                <p className="text-sm font-bold text-slate-500">Balance</p>
                <p className="mt-2 text-2xl font-black text-slate-950">
                  {formatCurrency(report.balance)}
                </p>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
              <div className="panel rounded-lg p-5">
                <div className="mb-4 flex items-center gap-2">
                  <BarChart3 size={20} className="text-teal-700" />
                  <h2 className="text-lg font-black text-slate-950">
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
                        outerRadius={110}
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

              <div className="panel rounded-lg p-5">
                <h2 className="mb-4 text-lg font-black text-slate-950">
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
                      <Bar dataKey="limitAmount" fill="#0f766e" />
                      <Bar dataKey="usedAmount" fill="#dc2626" />
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