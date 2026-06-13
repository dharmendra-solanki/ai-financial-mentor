import {  useEffect, useState } from "react";
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
      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <form onSubmit={handleSubmit} className="panel rounded-lg p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-700">
              <Target size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-950">Add Goal</h2>
              <p className="text-sm font-medium text-slate-500">
                Emergency fund, laptop, travel, education
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <input
              className="input-field"
              name="title"
              placeholder="Goal title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              className="input-field"
              type="number"
              name="targetAmount"
              placeholder="Target amount"
              value={formData.targetAmount}
              onChange={handleChange}
              required
            />

            <input
              className="input-field"
              type="number"
              name="currentAmount"
              placeholder="Current amount"
              value={formData.currentAmount}
              onChange={handleChange}
            />

            <input
              className="input-field"
              type="date"
              name="deadline"
              value={formData.deadline}
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
              Add Goal
            </button>
          </div>
        </form>

        <section className="panel rounded-lg p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Goal Progress
              </h2>
              <p className="text-sm font-medium text-slate-500">
                {goals.length} active goals
              </p>
            </div>
            <span className="badge badge-blue">Savings tracker</span>
          </div>

          {loading ? (
            <p className="p-6 text-center font-bold text-slate-500">
              Loading goals...
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {goals.length ? (
                goals.map((goal) => {
                  const progress = goal.progressPercentage || 0;

                  return (
                    <article
                      key={goal.id}
                      className="rounded-lg border border-slate-200 bg-white p-4"
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-black text-slate-950">
                            {goal.title}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-slate-500">
                            {goal.deadline
                              ? `Deadline: ${formatDate(goal.deadline)}`
                              : "No deadline"}
                          </p>
                        </div>

                        <button
                          className="danger-btn"
                          type="button"
                          onClick={() => handleDelete(goal.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="mb-3 h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="font-black text-blue-700">
                          {progress}%
                        </span>
                        <span className="font-bold text-slate-600">
                          {formatCurrency(goal.currentAmount)} /{" "}
                          {formatCurrency(goal.targetAmount)}
                        </span>
                      </div>

                      {goal.note && (
                        <p className="mt-3 text-sm text-slate-500">
                          {goal.note}
                        </p>
                      )}
                    </article>
                  );
                })
              ) : (
                <p className="rounded-lg bg-slate-50 p-6 text-center text-sm font-bold text-slate-500 md:col-span-2">
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