import {useEffect, useState } from "react";
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
      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <form onSubmit={handleSubmit} className="panel rounded-lg p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal-50 text-teal-700">
              <Wallet size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-950">Add Income</h2>
              <p className="text-sm font-medium text-slate-500">
                Save new income entry
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <input
              className="input-field"
              name="source"
              placeholder="Source e.g. Salary"
              value={formData.source}
              onChange={handleChange}
              required
            />

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
              Add Income
            </button>
          </div>
        </form>

        <section className="panel rounded-lg p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Income History
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Total: {formatCurrency(totalIncome)}
              </p>
            </div>
            <span className="badge badge-green">{incomes.length} entries</span>
          </div>

          {loading ? (
            <p className="p-6 text-center font-bold text-slate-500">
              Loading incomes...
            </p>
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Note</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {incomes.length ? (
                    incomes.map((income) => (
                      <tr key={income.id}>
                        <td className="font-bold text-slate-800">
                          {income.source}
                        </td>
                        <td className="font-black text-teal-700">
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
                            className="danger-btn"
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
                      <td colSpan={5} className="text-center text-slate-500">
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