import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Plus, ReceiptText, Trash2 } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  createExpense,
  deleteExpense,
  getExpenses,
} from "../services/expense.service";
import type { Expense } from "../types/finance.types";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

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

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [formData, setFormData] = useState({
    category: "Food",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    note: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
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

    await createExpense({
      category: formData.category,
      amount: Number(formData.amount),
      date: formData.date,
      note: formData.note,
    });

    setFormData({
      category: "Food",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      note: "",
    });

    fetchExpenses();
  };

  const handleDelete = async (id: number) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  return (
    <DashboardLayout
      title="Expenses"
      subtitle="Track where your money goes and spot the leaks quickly."
    >
      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
        
        {/* ===== FORM (UI UPGRADE) ===== */}
        <form className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition" onSubmit={handleSubmit}>
          
          <div className="mb-6 flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-red-50 text-red-600 shadow-sm">
              <ReceiptText size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Add Expense
              </h2>
              <p className="text-sm text-slate-500">
                Save a new spending entry
              </p>
            </div>
          </div>

          <div className="space-y-4">

            {/* CATEGORY */}
            <select
              className="input-field rounded-xl border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            {/* AMOUNT */}
            <input
              className="input-field rounded-xl border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            {/* DATE */}
            <input
              className="input-field rounded-xl border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            {/* NOTE */}
            <input
              className="input-field rounded-xl border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
              name="note"
              placeholder="Note (optional)"
              value={formData.note}
              onChange={handleChange}
            />

            {/* BUTTON */}
            <button
              className="primary-btn w-full rounded-xl py-3 flex items-center justify-center gap-2 hover:scale-[1.02] transition"
              type="submit"
            >
              <Plus size={18} />
              Add Expense
            </button>
          </div>
        </form>

        {/* ===== TABLE (UI UPGRADE) ===== */}
        <section className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          
          {/* HEADER */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Expense History
              </h2>
              <p className="text-sm text-slate-500">
                Total: <span className="font-bold text-red-600">{formatCurrency(totalExpense)}</span>
              </p>
            </div>

            <span className="rounded-full bg-red-50 px-4 py-1 text-xs font-bold text-red-600">
              {expenses.length} entries
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
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Note</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {expenses.length ? (
                    expenses.map((expense) => (
                      <tr
                        key={expense.id}
                        className="border-t hover:bg-red-50 transition"
                      >
                        <td className="p-3 font-semibold text-slate-800">
                          {expense.category}
                        </td>

                        <td className="font-bold text-red-600">
                          {formatCurrency(expense.amount)}
                        </td>

                        <td className="text-slate-500">
                          {formatDate(expense.date)}
                        </td>

                        <td className="text-slate-500">
                          {expense.note || "-"}
                        </td>

                        <td>
                          <button
                            className="group rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100 hover:scale-110"
                            type="button"
                            onClick={() => handleDelete(expense.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-500">
                        No expense entries yet
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

export default Expenses;