import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  createDebt,
  deleteDebt,
  getDebts,
} from "../services/debt.service";
import type { Debt } from "../services/debt.service";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

const Debts = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [formData, setFormData] = useState({
    lenderName: "",
    totalAmount: "",
    remainingAmount: "",
    emiAmount: "",
    interestRate: "",
    dueDate: "",
    note: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchDebts = async () => {
    try {
      const data = await getDebts();
      setDebts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDebts();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await createDebt({
      lenderName: formData.lenderName,
      totalAmount: Number(formData.totalAmount),
      remainingAmount: Number(formData.remainingAmount),
      emiAmount: Number(formData.emiAmount),
      interestRate: formData.interestRate
        ? Number(formData.interestRate)
        : undefined,
      dueDate: formData.dueDate || undefined,
      note: formData.note,
    });

    setFormData({
      lenderName: "",
      totalAmount: "",
      remainingAmount: "",
      emiAmount: "",
      interestRate: "",
      dueDate: "",
      note: "",
    });

    fetchDebts();
  };

  const handleDelete = async (id: number) => {
    await deleteDebt(id);
    fetchDebts();
  };

  return (
    <DashboardLayout
      title="Debts"
      subtitle="Track loans, EMI pressure, and repayment progress."
    >
      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">

        {/* ===== FORM ===== */}
        <form onSubmit={handleSubmit} className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          
          <div className="mb-6 flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-red-50 text-red-600 shadow-sm">
              <CreditCard size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Add Debt
              </h2>
              <p className="text-sm text-slate-500">
                Loan, EMI, credit card, borrowed money
              </p>
            </div>
          </div>

          <div className="space-y-4">

            <input
              className="input-field rounded-xl border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
              name="lenderName"
              placeholder="Lender name"
              value={formData.lenderName}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-2 gap-3">

              <input
                className="input-field rounded-xl border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                type="number"
                name="totalAmount"
                placeholder="Total"
                value={formData.totalAmount}
                onChange={handleChange}
                required
              />

              <input
                className="input-field rounded-xl border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                type="number"
                name="remainingAmount"
                placeholder="Remaining"
                value={formData.remainingAmount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">

              <input
                className="input-field rounded-xl border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                type="number"
                name="emiAmount"
                placeholder="EMI"
                value={formData.emiAmount}
                onChange={handleChange}
                required
              />

              <input
                className="input-field rounded-xl border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                type="number"
                name="interestRate"
                placeholder="Interest %"
                value={formData.interestRate}
                onChange={handleChange}
              />
            </div>

            <input
              className="input-field rounded-xl border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />

            <input
              className="input-field rounded-xl border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
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
              Add Debt
            </button>
          </div>
        </form>

        {/* ===== LIST ===== */}
        <section className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Debt Tracker
              </h2>
              <p className="text-sm text-slate-500">
                {debts.length} active records
              </p>
            </div>

            <span className="rounded-full bg-red-50 px-4 py-1 text-xs font-bold text-red-600">
              Repayment Monitor
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
              <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
              <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">

              {debts.length ? (
                debts.map((debt) => {
                  const progress = debt.progressPercentage || 0;

                  return (
                    <article
                      key={debt.id}
                      className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >

                      <div className="mb-4 flex items-start justify-between">

                        <div>
                          <h3 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition">
                            {debt.lenderName}
                          </h3>

                          <p className="text-xs text-slate-500">
                            EMI: {formatCurrency(debt.emiAmount)}
                          </p>
                        </div>

                        <button
                          className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100 hover:scale-110"
                          type="button"
                          onClick={() => handleDelete(debt.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* PROGRESS */}
                      <div className="mb-3 h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-red-500 to-pink-600 shadow-sm transition-all"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="font-black text-red-600">
                          {progress}% paid
                        </span>
                        <span className="font-semibold text-slate-600">
                          Remaining: {formatCurrency(debt.remainingAmount)}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">

                        <div className="rounded-xl bg-slate-50 p-3">
                          <p className="text-xs font-bold text-slate-500">
                            Total
                          </p>
                          <p className="font-black text-slate-900">
                            {formatCurrency(debt.totalAmount)}
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-3">
                          <p className="text-xs font-bold text-slate-500">
                            Due Date
                          </p>
                          <p className="font-black text-slate-900">
                            {debt.dueDate ? formatDate(debt.dueDate) : "-"}
                          </p>
                        </div>

                      </div>

                      {debt.note && (
                        <p className="mt-3 text-sm text-slate-500">
                          {debt.note}
                        </p>
                      )}
                    </article>
                  );
                })
              ) : (
                <p className="rounded-xl bg-slate-50 p-6 text-center text-sm font-bold text-slate-500 md:col-span-2">
                  No debts yet
                </p>
              )}

            </div>
          )}

        </section>
      </div>
    </DashboardLayout>
  );
};

export default Debts;