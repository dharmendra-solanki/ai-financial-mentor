import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { PiggyBank, Plus, Trash2 } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  createBudget,
  deleteBudget,
  getBudgets,
} from "../services/budget.service";
import type { Budget } from "../types/finance.types";
import { formatCurrency } from "../utils/formatCurrency";

const categories = [
  "Food",
  "Rent",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Education",
  "Entertainment",
  "Loan EMI",
  "Other",
];

const Budgets = () => {
  const now = new Date();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [formData, setFormData] = useState({
    category: "Food",
    limitAmount: "",
    month: String(now.getMonth() + 1),
    year: String(now.getFullYear()),
  });
  const [loading, setLoading] = useState(true);

  const fetchBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await createBudget({
      category: formData.category,
      limitAmount: Number(formData.limitAmount),
      month: Number(formData.month),
      year: Number(formData.year),
    });

    setFormData({
      category: "Food",
      limitAmount: "",
      month: String(now.getMonth() + 1),
      year: String(now.getFullYear()),
    });

    fetchBudgets();
  };

  const handleDelete = async (id: number) => {
    await deleteBudget(id);
    fetchBudgets();
  };

  const totalBudget = budgets.reduce(
    (sum, budget) => sum + Number(budget.limitAmount),
    0
  );

  return (
    <DashboardLayout
      title="Budgets"
      subtitle="Set category limits and keep spending under control."
    >
      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
        
        {/* ===== FORM CARD (UI UPGRADE) ===== */}
        <form
          onSubmit={handleSubmit}
          className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          
          <div className="mb-6 flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-50 text-amber-600 shadow-sm">
              <PiggyBank size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Add Budget
              </h2>
              <p className="text-sm text-slate-500">
                Create monthly category limit
              </p>
            </div>
          </div>

          <div className="space-y-4">

            {/* CATEGORY */}
            <select
              className="input-field rounded-xl border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            {/* LIMIT */}
            <input
              className="input-field rounded-xl border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
              type="number"
              name="limitAmount"
              placeholder="Limit amount"
              value={formData.limitAmount}
              onChange={handleChange}
              required
            />

            {/* MONTH + YEAR */}
            <div className="grid grid-cols-2 gap-3">
              <input
                className="input-field rounded-xl border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                type="number"
                name="month"
                min={1}
                max={12}
                value={formData.month}
                onChange={handleChange}
                required
              />

              <input
                className="input-field rounded-xl border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                type="number"
                name="year"
                min={2000}
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>

            {/* BUTTON */}
            <button
              className="primary-btn w-full rounded-xl py-3 flex items-center justify-center gap-2 hover:scale-[1.02] transition"
              type="submit"
            >
              <Plus size={18} />
              Add Budget
            </button>
          </div>
        </form>

        {/* ===== TABLE CARD (UI UPGRADE) ===== */}
        <section className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          
          {/* HEADER */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Budget List
              </h2>
              <p className="text-sm text-slate-500">
                Total planned:{" "}
                <span className="font-bold text-amber-600">
                  {formatCurrency(totalBudget)}
                </span>
              </p>
            </div>

            <span className="rounded-full bg-amber-50 px-4 py-1 text-xs font-bold text-amber-600">
              {budgets.length} budgets
            </span>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="space-y-3">
              <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
              <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
              <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-100">

              <table className="w-full text-left">

                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="p-3">Category</th>
                    <th>Limit</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {budgets.length ? (
                    budgets.map((budget) => (
                      <tr
                        key={budget.id}
                        className="border-t hover:bg-amber-50 transition"
                      >
                        <td className="p-3 font-semibold text-slate-800">
                          {budget.category}
                        </td>

                        <td className="font-bold text-amber-600">
                          {formatCurrency(budget.limitAmount)}
                        </td>

                        <td className="text-slate-500">{budget.month}</td>

                        <td className="text-slate-500">{budget.year}</td>

                        <td>
                          <button
                            className="group rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100 hover:scale-110"
                            type="button"
                            onClick={() => handleDelete(budget.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-500">
                        No budgets yet
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Budgets;