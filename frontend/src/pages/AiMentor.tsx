import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { askAiMentor, getAiChats } from "../services/aiMentor.service";
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
      subtitle="Ask real money questions based on your financial data."
    >
      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">

        {/* ===== LEFT PANEL ===== */}
        <section className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition">

          <div className="mb-6 flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-700 shadow-sm">
              <Sparkles size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Ask Mentor
              </h2>
              <p className="text-sm text-slate-500">
                Budgeting • Saving • Debt • Investing
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <textarea
              className="input-field min-h-40 resize-none rounded-xl border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Example: How can I reduce expenses and save more?"
              required
            />

            <button
              className="primary-btn w-full rounded-xl py-3 flex items-center justify-center gap-2 hover:scale-[1.02] transition"
              type="submit"
              disabled={loading}
            >
              <Send size={18} />
              {loading ? "Thinking..." : "Ask AI Mentor"}
            </button>

          </form>

          <div className="mt-6 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 p-4 text-sm text-slate-600">
            💡 Tip: AI uses your income, expense, budget, and debt data to give personalized advice.
          </div>
        </section>

        {/* ===== CHAT PANEL ===== */}
        <section className="panel rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col">

          {/* HEADER */}
          <div className="mb-6 flex items-center gap-4">
            <Bot className="text-teal-600" size={22} />
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Chat History
              </h2>
              <p className="text-sm text-slate-500">
                Your financial AI conversations
              </p>
            </div>
          </div>

          {/* CHAT AREA */}
          <div className="flex-1 space-y-5 overflow-y-auto pr-2 max-h-[700px]">

            {chats.length ? (
              chats.map((chat) => (
                <div key={chat.id} className="space-y-3">

                  {/* USER MESSAGE */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl bg-slate-100 p-4 shadow-sm">
                      <p className="text-xs font-bold text-slate-500 mb-1">
                        You
                      </p>
                      <p className="text-sm text-slate-800">
                        {chat.question}
                      </p>
                    </div>
                  </div>

                  {/* AI RESPONSE */}
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 p-4 shadow-sm border border-teal-100">
                      <p className="text-xs font-black text-teal-700 mb-1">
                        AI Mentor
                      </p>
                      <p className="text-sm leading-6 text-slate-700 whitespace-pre-line">
                        {chat.answer}
                      </p>
                    </div>
                  </div>

                  <p className="text-center text-[11px] text-slate-400">
                    {formatDate(chat.createdAt)}
                  </p>

                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-sm font-bold text-slate-500 bg-slate-50 px-5 py-3 rounded-xl">
                  Start your first financial conversation 💬
                </p>
              </div>
            )}

          </div>
        </section>

      </div>
    </DashboardLayout>
  );
};

export default AiMentor;