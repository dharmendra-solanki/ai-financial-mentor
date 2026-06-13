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
      <div className="grid gap-6 xl:grid-cols-[400px_1fr]">
        <form onSubmit={handleSubmit} className="panel rounded-lg p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-red-700">
              <CreditCard size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-950">Add Debt</h2>
              <p className="text-sm font-medium text-slate-500">
                Loan, credit card, EMI, borrowed money
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <input
              className="input-field"
              name="lenderName"
              placeholder="Lender name"
              value={formData.lenderName}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                className="input-field"
                type="number"
                name="totalAmount"
                placeholder="Total amount"
                value={formData.totalAmount}
                onChange={handleChange}
                required
              />

              <input
                className="input-field"
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
                className="input-field"
                type="number"
                name="emiAmount"
                placeholder="EMI amount"
                value={formData.emiAmount}
                onChange={handleChange}
                required
              />

              <input
                className="input-field"
                type="number"
                name="interestRate"
                placeholder="Interest %"
                value={formData.interestRate}
                onChange={handleChange}
              />
            </div>

            <input
              className="input-field"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
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
              Add Debt
            </button>
          </div>
        </form>

        <section className="panel rounded-lg p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Debt Tracker
              </h2>
              <p className="text-sm font-medium text-slate-500">
                {debts.length} active records
              </p>
            </div>
            <span className="badge badge-red">Repayment monitor</span>
          </div>

          {loading ? (
            <p className="p-6 text-center font-bold text-slate-500">
              Loading debts...
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {debts.length ? (
                debts.map((debt) => {
                  const progress = debt.progressPercentage || 0;

                  return (
                    <article
                      key={debt.id}
                      className="rounded-lg border border-slate-200 bg-white p-4"
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-black text-slate-950">
                            {debt.lenderName}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-slate-500">
                            EMI: {formatCurrency(debt.emiAmount)}
                          </p>
                        </div>

                        <button
                          className="danger-btn"
                          type="button"
                          onClick={() => handleDelete(debt.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="mb-3 h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-red-600"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="font-black text-red-700">
                          {progress}% paid
                        </span>
                        <span className="font-bold text-slate-600">
                          Remaining: {formatCurrency(debt.remainingAmount)}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <div className="rounded-lg bg-slate-50 p-3">
                          <p className="font-bold text-slate-500">Total</p>
                          <p className="font-black text-slate-900">
                            {formatCurrency(debt.totalAmount)}
                          </p>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-3">
                          <p className="font-bold text-slate-500">Due Date</p>
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
                <p className="rounded-lg bg-slate-50 p-6 text-center text-sm font-bold text-slate-500 md:col-span-2">
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