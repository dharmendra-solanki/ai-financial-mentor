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
      subtitle="Set category limits and keep spending inside the lane."
    >
      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <form onSubmit={handleSubmit} className="panel rounded-lg p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-amber-50 text-amber-700">
              <PiggyBank size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Add Budget
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Create monthly category limit
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <select
              className="input-field"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            <input
              className="input-field"
              type="number"
              name="limitAmount"
              placeholder="Limit amount"
              value={formData.limitAmount}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                className="input-field"
                type="number"
                name="month"
                min={1}
                max={12}
                value={formData.month}
                onChange={handleChange}
                required
              />

              <input
                className="input-field"
                type="number"
                name="year"
                min={2000}
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>

            <button className="primary-btn w-full" type="submit">
              <Plus size={18} />
              Add Budget
            </button>
          </div>
        </form>

        <section className="panel rounded-lg p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Budget List
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Total planned: {formatCurrency(totalBudget)}
              </p>
            </div>
            <span className="badge badge-amber">{budgets.length} budgets</span>
          </div>

          {loading ? (
            <p className="p-6 text-center font-bold text-slate-500">
              Loading budgets...
            </p>
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Limit</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {budgets.length ? (
                    budgets.map((budget) => (
                      <tr key={budget.id}>
                        <td className="font-bold text-slate-800">
                          {budget.category}
                        </td>
                        <td className="font-black text-amber-700">
                          {formatCurrency(budget.limitAmount)}
                        </td>
                        <td className="text-slate-500">{budget.month}</td>
                        <td className="text-slate-500">{budget.year}</td>
                        <td>
                          <button
                            className="danger-btn"
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
                      <td colSpan={5} className="text-center text-slate-500">
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