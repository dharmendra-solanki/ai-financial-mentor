import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  CreditCard,
  PiggyBank,
  ReceiptText,
  Sparkles,
  Target,
  Wallet,
  TrendingUp,
  Star,
  Brain,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    title: "Income Tracking",
    text: "Track salary, freelance, bonus, and business income.",
    icon: Wallet,
    color: "emerald",
  },
  {
    title: "Expense Control",
    text: "Understand where your money goes every month.",
    icon: ReceiptText,
    color: "rose",
  },
  {
    title: "Smart Budgets",
    text: "Set category limits and monitor budget usage.",
    icon: PiggyBank,
    color: "amber",
  },
  {
    title: "AI Money Mentor",
    text: "Ask practical finance questions using your real data.",
    icon: Bot,
    color: "violet",
  },
  {
    title: "Savings Goals",
    text: "Track goals like emergency fund, laptop, car, or travel.",
    icon: Target,
    color: "blue",
  },
  {
    title: "Debt Monitor",
    text: "Manage EMI, loans, remaining amount, and due dates.",
    icon: CreditCard,
    color: "orange",
  },
];

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}

      <nav className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <PiggyBank size={22} className="text-white" />
              </div>

              <div>
                <p className="text-lg font-bold text-slate-900">
                  AI Financial Mentor
                </p>
                <p className="text-xs tracking-wider text-indigo-500">
                  SMART FINANCE PLATFORM
                </p>
              </div>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex gap-3">
              <Link
                to="/login"
                className="px-5 py-2.5 text-slate-600 font-semibold hover:text-indigo-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-105 transition"
              >
                Register
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              {isOpen ? (
                <X size={24} className="text-slate-700" />
              ) : (
                <Menu size={24} className="text-slate-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4">
              <Link
                to="/login"
                className="px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-center"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100">
              <Sparkles size={16} className="text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-600">
                AI Powered Money Insights
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-slate-900">Smarter Finance,</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Powered By AI
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Track expenses, budgets, investments and receive AI-powered
              financial guidance from one intelligent dashboard.
            </p>

            <div className="flex gap-4">
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-xl hover:scale-105 transition"
              >
                Start Free
              </Link>

              <Link
                to="/dashboard"
                className="px-8 py-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Dashboard Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8">
            <div className="flex justify-between mb-8">
              <div>
                <p className="text-slate-500">Financial Health Score</p>
                <p className="text-5xl font-bold text-slate-900">
                  86<span className="text-xl">%</span>
                </p>
              </div>

              <div className="h-fit px-4 py-2 rounded-full bg-emerald-100">
                <span className="font-semibold text-emerald-600">
                  Excellent
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Monthly Income",
                  value: 85,
                  amount: "₹75,000",
                  color: "bg-emerald-500",
                },
                {
                  title: "Expenses",
                  value: 45,
                  amount: "₹32,200",
                  color: "bg-rose-500",
                },
                {
                  title: "Budget Usage",
                  value: 61,
                  amount: "61%",
                  color: "bg-amber-500",
                },
              ].map((item) => (
                <div key={item.title}>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-600">{item.title}</span>
                    <span className="font-semibold text-slate-900">
                      {item.amount}
                    </span>
                  </div>

                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-5">
              Everything you need to
              <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                {" "}
                master your money
              </span>
            </h2>

            <p className="text-slate-500 max-w-2xl mx-auto">
              Powerful tools designed to simplify personal finance and help you
              make better financial decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:-translate-y-3 hover:shadow-2xl transition duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                    <Icon className="text-white" size={24} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-2xl">
            {/* Left Gradient Side */}
            <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />

            <div className="grid lg:grid-cols-2 gap-12 p-12 lg:p-16 items-center">
              {/* Left Content */}
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 font-semibold text-sm">
                  Start Today 🚀
                </span>

                <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  Make Every
                  <span className="text-indigo-600"> Financial Decision </span>
                  Smarter With AI
                </h2>

                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                  From budgeting and expense tracking to AI-powered insights, AI
                  Financial Mentor helps you build better money habits and
                  achieve your goals faster.
                </p>
              </div>

              {/* Right Side */}
              <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                      <TrendingUp className="text-emerald-600" size={22} />
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900">
                        Track Expenses
                      </h4>
                      <p className="text-slate-500 text-sm">
                        Stay in control of your spending.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center">
                      <Brain className="text-purple-600" size={22} />
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900">
                        AI Recommendations
                      </h4>
                      <p className="text-slate-500 text-sm">
                        Get personalized financial insights.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-pink-100 flex items-center justify-center">
                      <Target className="text-pink-600" size={22} />
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900">
                        Reach Your Goals
                      </h4>
                      <p className="text-slate-500 text-sm">
                        Build wealth with confidence.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/register"
                  className="mt-10 flex justify-center items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 text-white font-bold hover:scale-105 transition"
                >
                  Start Free
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">
              Testimonials
            </span>

            <h2 className="mt-6 text-5xl font-bold text-slate-900">
              Loved by Users Worldwide
            </h2>

            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Thousands of people trust AI Financial Mentor to manage their
              finances and make smarter decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                AI Financial Mentor completely transformed how I manage my
                expenses. The AI insights are incredibly helpful.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  RS
                </div>

                <div>
                  <h4 className="font-bold text-slate-900">Rahul Sharma</h4>

                  <p className="text-sm text-slate-500">Software Engineer</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                Budget tracking and goal planning have become so much easier.
                This app is exactly what I needed.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                  PG
                </div>

                <div>
                  <h4 className="font-bold text-slate-900">Priya Gupta</h4>

                  <p className="text-sm text-slate-500">Entrepreneur</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                The AI recommendations helped me improve my savings and build
                better financial habits.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                  AV
                </div>

                <div>
                  <h4 className="font-bold text-slate-900">Aman Verma</h4>

                  <p className="text-sm text-slate-500">Data Analyst</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-2xl font-bold text-indigo-400">
                AI Financial Mentor
              </h3>

              <p className="mt-4 text-slate-400">
                Smarter financial planning powered by AI.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-emerald-400 mb-4">Features</h4>

              <div className="space-y-3 text-slate-400">
                <p className="hover:text-indigo-400 cursor-pointer transition">
                  Expense Tracking
                </p>
                <p className="hover:text-purple-400 cursor-pointer transition">
                  Budget Management
                </p>
                <p className="hover:text-pink-400 cursor-pointer transition">
                  AI Insights
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-orange-400 mb-4">Company</h4>

              <div className="space-y-3 text-slate-400">
                <p className="hover:text-indigo-400 cursor-pointer transition">
                  About
                </p>
                <p className="hover:text-purple-400 cursor-pointer transition">
                  Blog
                </p>
                <p className="hover:text-pink-400 cursor-pointer transition">
                  Contact
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-cyan-400 mb-4">Support</h4>

              <div className="space-y-3 text-slate-400">
                <p className="hover:text-indigo-400 cursor-pointer transition">
                  Help Center
                </p>
                <p className="hover:text-purple-400 cursor-pointer transition">
                  Privacy Policy
                </p>
                <p className="hover:text-pink-400 cursor-pointer transition">
                  Terms
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-10 pt-6 text-center text-slate-500">
            © 2026 AI Financial Mentor. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
