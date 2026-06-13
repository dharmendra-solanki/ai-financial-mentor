import type { ReactNode } from "react";
import { BrainCircuit, ShieldCheck, TrendingUp } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <main className="auth-bg min-h-screen">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-white/15">
              <BrainCircuit size={24} />
            </div>
            <div>
              <p className="text-lg font-black">AI Financial Mentor</p>
              <p className="text-sm text-white/70">Money clarity, daily.</p>
            </div>
          </div>

          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-teal-200">
              Personal finance cockpit
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-tight">
              Track money, understand habits, and make sharper financial moves.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
              Income, expenses, budgets, goals, debt, reports, and AI guidance
              in one focused workspace.
            </p>
          </div>

          <div className="grid max-w-3xl grid-cols-2 gap-4">
            <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
              <TrendingUp className="mb-3 text-teal-200" size={24} />
              <p className="font-bold">Smart summaries</p>
              <p className="mt-1 text-sm text-white/65">
                See savings, spending, budget use, and progress quickly.
              </p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
              <ShieldCheck className="mb-3 text-amber-200" size={24} />
              <p className="font-bold">Secure backend</p>
              <p className="mt-1 text-sm text-white/65">
                JWT auth, MySQL, Prisma, and protected finance APIs.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10">
          <div className="panel w-full max-w-md rounded-lg p-7">
            <div className="mb-7">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-teal-700">
                Welcome
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {subtitle}
              </p>
            </div>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;