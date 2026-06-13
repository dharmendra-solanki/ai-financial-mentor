import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  CreditCard,
  Gauge,
  LockKeyhole,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Target,
  Wallet,
  TrendingUp,
  Zap,
  Shield,
  Star,
  Users,
  Globe,
} from "lucide-react";

const features = [
  { title: "Income Tracking", text: "Track salary, freelance, bonus, and business income.", icon: Wallet, color: "emerald" },
  { title: "Expense Control", text: "Understand where your money goes every month.", icon: ReceiptText, color: "rose" },
  { title: "Smart Budgets", text: "Set category limits and monitor budget usage.", icon: PiggyBank, color: "amber" },
  { title: "AI Money Mentor", text: "Ask practical finance questions using your real data.", icon: Bot, color: "violet" },
  { title: "Savings Goals", text: "Track goals like emergency fund, laptop, car, or travel.", icon: Target, color: "blue" },
  { title: "Debt Monitor", text: "Manage EMI, loans, remaining amount, and due dates.", icon: CreditCard, color: "orange" },
];

const benefits = [
  "JWT protected finance workspace",
  "MySQL and Prisma powered backend",
  "Dashboard summary from real API data",
  "Monthly reports with charts",
  "Budget alerts and notifications",
  "Clean frontend ready for future admin panel",
];

const statCards = [
  { value: "₹42.8k", label: "Available Balance", change: "+12%", positive: true },
  { value: "₹18k", label: "Goal Progress", change: "+5.2k", positive: true },
  { value: "3", label: "Active Alerts", change: "-1", positive: false },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-slate-900/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition" />
                <div className="relative h-11 w-11 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg">
                  <PiggyBank size={22} className="text-slate-900" />
                </div>
              </div>
              <div>
                <p className="text-lg font-bold bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
                  AI Financial Mentor
                </p>
                <p className="text-xs font-medium tracking-wider text-teal-300/70">
                  FINANCE COCKPIT
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2.5 text-sm font-semibold text-gray-300 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-900 rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-200 hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-sm">
                <Sparkles size={16} className="text-teal-400" />
                <span className="text-sm font-semibold text-teal-300">AI Powered Money Clarity</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-white via-white to-teal-300 bg-clip-text text-transparent">
                  Build better money habits
                </span>
                <br />
                <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  with AI mentor
                </span>
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                Track income, expenses, budgets, goals, debts, and get AI guidance 
                in one powerful personal finance dashboard.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl font-bold text-slate-900 overflow-hidden transition-all hover:shadow-xl hover:shadow-teal-500/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free Trial
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 rounded-xl font-semibold text-gray-300 border border-white/20 hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
                >
                  View Dashboard
                  <BarChart3 size={18} />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { label: "Active Users", value: "5K+", icon: Users },
                  { label: "Money Saved", value: "₹2.4Cr", icon: TrendingUp },
                  { label: "Happy Clients", value: "98%", icon: Star },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5">
                      <stat.icon size={16} className="text-teal-400" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card - Modern Dashboard Preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                {/* Header Stats */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm text-gray-400">Financial Health Score</p>
                    <p className="text-4xl font-bold text-white">86<span className="text-xl">%</span></p>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30">
                    <span className="text-sm font-semibold text-teal-300">Excellent</span>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-4 mb-6">
                  {[
                    { label: "Monthly Income", value: 85, amount: "₹75,000", color: "emerald" },
                    { label: "Expenses", value: 45, amount: "₹32,200", color: "rose" },
                    { label: "Budget Usage", value: 61, amount: "61%", color: "amber" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">{item.label}</span>
                        <span className="text-white font-semibold">{item.amount}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 bg-${item.color}-500`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {statCards.map((stat) => (
                    <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/10 transition">
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                      <p className={`text-xs font-semibold mt-1 ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stat.change}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full blur-2xl opacity-30" />
                <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full blur-2xl opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4">
              <Zap size={16} className="text-teal-400" />
              <span className="text-sm font-semibold text-teal-300">Powerful Features</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Everything you need to
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent"> master your money</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Complete financial toolkit with AI-powered insights and real-time tracking
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorMap = {
                emerald: "from-emerald-500 to-teal-500",
                rose: "from-rose-500 to-pink-500",
                amber: "from-amber-500 to-orange-500",
                violet: "from-violet-500 to-purple-500",
                blue: "from-blue-500 to-cyan-500",
                orange: "from-orange-500 to-red-500",
              };
              const gradient = colorMap[feature.color as keyof typeof colorMap] || colorMap.emerald;
              
              return (
                <div
                  key={feature.title}
                  className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition duration-300`} />
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4">
                <Shield size={16} className="text-teal-400" />
                <span className="text-sm font-semibold text-teal-300">Enterprise Grade</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Built for scale,
                <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent"> secure by design</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Your frontend connects directly with Express, Prisma, and MySQL backend. 
                Complete remaining modules without changing the UI.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={14} className="text-teal-400" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Gauge, title: "Lightning Fast", desc: "Optimized Vite frontend with instant responses", color: "emerald" },
                { icon: LockKeyhole, title: "Bank-Level Security", desc: "JWT tokens with encrypted data transfer", color: "blue" },
                { icon: ShieldCheck, title: "Future Ready", desc: "Easy to extend with admin panels & AI", color: "violet" },
                { icon: Globe, title: "API First", desc: "Connect any frontend to robust backend", color: "orange" },
              ].map((item) => (
                <div key={item.title} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-white/10 hover:border-teal-500/30 transition">
                  <item.icon size={32} className={`text-${item.color}-400 mb-3`} />
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-12 border border-white/10 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to take control of your finances?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Join thousands of users who trust AI Financial Mentor for their money management
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl font-bold text-slate-900 hover:shadow-xl hover:shadow-teal-500/25 transition-all hover:scale-105"
            >
              Start Your Journey
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
                <PiggyBank size={18} className="text-slate-900" />
              </div>
              <div>
                <p className="font-bold text-white">AI Financial Mentor</p>
                <p className="text-xs text-gray-500">Smart money management</p>
              </div>
            </div>
            <div className="flex gap-6">
              <Link to="/login" className="text-gray-400 hover:text-teal-400 transition">Login</Link>
              <Link to="/register" className="text-gray-400 hover:text-teal-400 transition">Register</Link>
              <Link to="/dashboard" className="text-gray-400 hover:text-teal-400 transition">Dashboard</Link>
            </div>
            <p className="text-sm text-gray-500">© 2024 AI Financial Mentor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;