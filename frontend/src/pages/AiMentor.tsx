import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  askAiMentor,
  getAiChats,
} from "../services/aiMentor.service";
import type { AiChat } from "../services/aiMentor.service";
import { formatDate } from "../utils/formatDate";

const AiMentor = () => {
  const [chats, setChats] = useState<AiChat[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchChats = async () => {
    const data = await getAiChats();
    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!question.trim()) return;

    setLoading(true);

    try {
      const chat = await askAiMentor(question);
      setChats((prev) => [chat, ...prev]);
      setQuestion("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="AI Mentor"
      subtitle="Ask practical money questions based on your real financial data."
    >
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <section className="panel rounded-lg p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal-50 text-teal-700">
              <Sparkles size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Ask Mentor
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Budgeting, saving, spending, debt
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="input-field min-h-40 resize-none"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="How can I reduce expenses and save more this month?"
              required
            />

            <button className="primary-btn w-full" type="submit" disabled={loading}>
              <Send size={18} />
              {loading ? "Thinking..." : "Ask AI Mentor"}
            </button>
          </form>

          <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-600">
            Tip: Your backend sends dashboard summary with the question, so the
            answer can use your income, expense, balance, and budget data.
          </div>
        </section>

        <section className="panel rounded-lg p-5">
          <div className="mb-5 flex items-center gap-3">
            <Bot className="text-teal-700" size={22} />
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Chat History
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Previous mentor answers
              </p>
            </div>
          </div>

          <div className="max-h-[680px] space-y-4 overflow-y-auto pr-2">
            {chats.length ? (
              chats.map((chat) => (
                <article
                  key={chat.id}
                  className="rounded-lg border border-slate-200 bg-white p-4"
                >
                  <div className="mb-3 rounded-lg bg-slate-100 p-3">
                    <p className="text-sm font-black text-slate-900">
                      You asked
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      {chat.question}
                    </p>
                  </div>

                  <div className="rounded-lg bg-teal-50 p-3">
                    <p className="text-sm font-black text-teal-800">
                      Mentor answer
                    </p>
                    <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-700">
                      {chat.answer}
                    </p>
                  </div>

                  <p className="mt-3 text-xs font-bold text-slate-400">
                    {formatDate(chat.createdAt)}
                  </p>
                </article>
              ))
            ) : (
              <p className="rounded-lg bg-slate-50 p-6 text-center text-sm font-bold text-slate-500">
                No AI chats yet
              </p>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AiMentor;