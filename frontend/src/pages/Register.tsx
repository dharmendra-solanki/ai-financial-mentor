import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, User, Eye, EyeOff, Sparkles } from "lucide-react";
import { registerUser, saveAuthData } from "../services/auth.service";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await registerUser(formData);
      saveAuthData(response.data);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 overflow-hidden">
      {/* Animated Background Elements - Same as landing page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Card */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Glass morphism card matching landing page style */}
          <div className="relative rounded-2xl border border-white/10 bg-slate-800/50 backdrop-blur-xl p-6 shadow-2xl">
            {/* Card gradient overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/5 to-emerald-500/5 pointer-events-none" />
            
            {/* Header */}
            <div className="relative mb-5 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 shadow-lg">
                <UserPlus size={20} className="text-slate-900" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="mt-1 text-xs text-gray-400">Start tracking your financial life with a clean mentor workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="relative space-y-4">
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300 backdrop-blur-sm">
                  {error}
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-300">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2.5 pl-10 text-white placeholder:text-gray-500 focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all text-sm"
                    type="text"
                    name="name"
                    placeholder="Jhon Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2.5 pl-10 text-white placeholder:text-gray-500 focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all text-sm"
                    type="email"
                    name="email"
                    placeholder="jhon@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2.5 pl-10 pr-10 text-white placeholder:text-gray-500 focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all text-sm"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Minimum 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Password Hint */}
              <p className="text-xs text-gray-500 -mt-1">Password must be at least 6 characters long</p>

              {/* Create Account Button */}
              <button
                className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 py-2.5 font-semibold text-slate-900 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-teal-500/25 disabled:opacity-50 disabled:hover:scale-100 text-sm"
                type="submit"
                disabled={loading}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Create account
                    </>
                  )}
                </span>
              </button>

              {/* OR Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-slate-800/50 px-3 text-gray-400 backdrop-blur-sm">OR</span>
                </div>
              </div>

              {/* Sign In Link */}
              <p className="text-center text-xs text-gray-400">
                Already have an account?{" "}
                <Link
                  className="font-semibold text-teal-400 hover:text-teal-300 transition"
                  to="/login"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;