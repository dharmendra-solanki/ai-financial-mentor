import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Plus, Trash2, Wallet } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  createIncome,
  deleteIncome,
  getIncomes,
} from "../services/income.service";
import type { Income } from "../types/finance.types";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

const IncomePage = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    note: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchIncomes = async () => {
    try {
      const data = await getIncomes();
      setIncomes(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await createIncome({
      source: formData.source,
      amount: Number(formData.amount),
      date: formData.date,
      note: formData.note,
    });

    setFormData({
      source: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      note: "",
    });

    fetchIncomes();
  };

  const handleDelete = async (id: number) => {
    await deleteIncome(id);
    fetchIncomes();
  };

  const totalIncome = incomes.reduce(
    (sum, income) => sum + Number(income.amount),
    0
  );

  return (
    <DashboardLayout
      title="Income"
      subtitle="Track salary, freelance, business, and other money coming in."
    >
      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
        
        {/* ===== FORM CARD (UPGRADED UI) ===== */}
        <form
          onSubmit={handleSubmit}
          className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-teal-50 text-teal-700 shadow-sm">
              <Wallet size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Add Income
              </h2>
              <p className="text-sm text-slate-500">
                Save a new income entry
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <input
              className="input-field rounded-xl border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              name="source"
              placeholder="Source e.g. Salary"
              value={formData.source}
              onChange={handleChange}
              required
            />

            <input
              className="input-field rounded-xl border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <input
              className="input-field rounded-xl border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <input
              className="input-field rounded-xl border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              name="note"
              placeholder="Note (optional)"
              value={formData.note}
              onChange={handleChange}
            />

            <button
              className="primary-btn w-full rounded-xl py-3 flex items-center justify-center gap-2 hover:scale-[1.02] transition"
              type="submit"
            >
              <Plus size={18} />
              Add Income
            </button>
          </div>
        </form>

        {/* ===== TABLE CARD (UPGRADED UI) ===== */}
        <section className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          
          {/* HEADER */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Income History
              </h2>
              <p className="text-sm text-slate-500">
                Total: <span className="font-bold text-teal-700">{formatCurrency(totalIncome)}</span>
              </p>
            </div>

            <span className="rounded-full bg-emerald-50 px-4 py-1 text-xs font-bold text-emerald-600">
              {incomes.length} entries
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
                    <th className="p-3">Source</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Note</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {incomes.length ? (
                    incomes.map((income) => (
                      <tr
                        key={income.id}
                        className="border-t hover:bg-teal-50 transition"
                      >
                        <td className="p-3 font-semibold text-slate-800">
                          {income.source}
                        </td>

                        <td className="font-bold text-teal-600">
                          {formatCurrency(income.amount)}
                        </td>

                        <td className="text-slate-500">
                          {formatDate(income.date)}
                        </td>

                        <td className="text-slate-500">
                          {income.note || "-"}
                        </td>

                        <td>
                          <button
                            className="group rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100 hover:scale-110"
                            type="button"
                            onClick={() => handleDelete(income.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-500">
                        No income entries yet
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

export default IncomePage;