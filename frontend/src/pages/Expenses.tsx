import {useEffect, useState } from "react";
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
      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <form onSubmit={handleSubmit} className="panel rounded-lg p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-red-700">
              <ReceiptText size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Add Expense
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Save new spending entry
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
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <input
              className="input-field"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <input
              className="input-field"
              name="note"
              placeholder="Note optional"
              value={formData.note}
              onChange={handleChange}
            />

            <button className="primary-btn w-full" type="submit">
              <Plus size={18} />
              Add Expense
            </button>
          </div>
        </form>

        <section className="panel rounded-lg p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Expense History
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Total: {formatCurrency(totalExpense)}
              </p>
            </div>
            <span className="badge badge-red">{expenses.length} entries</span>
          </div>

          {loading ? (
            <p className="p-6 text-center font-bold text-slate-500">
              Loading expenses...
            </p>
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Note</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.length ? (
                    expenses.map((expense) => (
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
                        <td className="text-slate-500">
                          {expense.note || "-"}
                        </td>
                        <td>
                          <button
                            className="danger-btn"
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
                      <td colSpan={5} className="text-center text-slate-500">
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