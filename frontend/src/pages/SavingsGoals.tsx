import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Plus, Target, Trash2 } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  createSavingsGoal,
  deleteSavingsGoal,
  getSavingsGoals,
} from "../services/savingsGoal.service";
import type { SavingsGoal } from "../services/savingsGoal.service";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

const SavingsGoals = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
    note: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      const data = await getSavingsGoals();
      setGoals(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await createSavingsGoal({
      title: formData.title,
      targetAmount: Number(formData.targetAmount),
      currentAmount: formData.currentAmount
        ? Number(formData.currentAmount)
        : 0,
      deadline: formData.deadline || undefined,
      note: formData.note,
    });

    setFormData({
      title: "",
      targetAmount: "",
      currentAmount: "",
      deadline: "",
      note: "",
    });

    fetchGoals();
  };

  const handleDelete = async (id: number) => {
    await deleteSavingsGoal(id);
    fetchGoals();
  };

  return (
    <DashboardLayout
      title="Savings Goals"
      subtitle="Turn big money plans into visible progress."
    >
      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">

        {/* ===== FORM (UI UPGRADE) ===== */}
        <form
          onSubmit={handleSubmit}
          className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600 shadow-sm">
              <Target size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Add Goal
              </h2>
              <p className="text-sm text-slate-500">
                Emergency fund, travel, education, laptop
              </p>
            </div>
          </div>

          <div className="space-y-4">

            <input
              className="input-field rounded-xl border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              name="title"
              placeholder="Goal title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              className="input-field rounded-xl border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              type="number"
              name="targetAmount"
              placeholder="Target amount"
              value={formData.targetAmount}
              onChange={handleChange}
              required
            />

            <input
              className="input-field rounded-xl border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              type="number"
              name="currentAmount"
              placeholder="Current amount"
              value={formData.currentAmount}
              onChange={handleChange}
            />

            <input
              className="input-field rounded-xl border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />

            <input
              className="input-field rounded-xl border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
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
              Add Goal
            </button>
          </div>
        </form>

        {/* ===== GOALS LIST (UI UPGRADE) ===== */}
        <section className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition">

          {/* HEADER */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Goal Progress
              </h2>
              <p className="text-sm text-slate-500">
                {goals.length} active goals
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-4 py-1 text-xs font-bold text-blue-600">
              Savings Tracker
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
            <div className="grid gap-5 md:grid-cols-2">

              {goals.length ? (
                goals.map((goal) => {
                  const progress = goal.progressPercentage || 0;

                  return (
                    <article
                      key={goal.id}
                      className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >

                      {/* HEADER */}
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition">
                            {goal.title}
                          </h3>
                          <p className="text-xs text-slate-500">
                            {goal.deadline
                              ? `Deadline: ${formatDate(goal.deadline)}`
                              : "No deadline"}
                          </p>
                        </div>

                        <button
                          className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100 hover:scale-110"
                          type="button"
                          onClick={() => handleDelete(goal.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* PROGRESS BAR */}
                      <div className="mb-3 h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm transition-all"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>

                      {/* INFO */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-black text-blue-600">
                          {progress}%
                        </span>
                        <span className="font-semibold text-slate-600">
                          {formatCurrency(goal.currentAmount)} /{" "}
                          {formatCurrency(goal.targetAmount)}
                        </span>
                      </div>

                      {/* NOTE */}
                      {goal.note && (
                        <p className="mt-3 text-sm text-slate-500">
                          {goal.note}
                        </p>
                      )}
                    </article>
                  );
                })
              ) : (
                <p className="rounded-xl bg-slate-50 p-6 text-center text-sm font-bold text-slate-500 md:col-span-2">
                  No savings goals yet
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default SavingsGoals;