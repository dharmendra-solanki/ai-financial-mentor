import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Save, UserRound } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getProfile, updateProfile } from "../services/profile.service";

const Profile = () => {
  const [formData, setFormData] = useState({
    age: "",
    occupation: "",
    monthlyIncome: "",
    currency: "INR",
    country: "India",
    riskLevel: "MEDIUM" as "LOW" | "MEDIUM" | "HIGH",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchProfile = async () => {
    try {
      const profile = await getProfile();

      if (profile) {
        setFormData({
          age: profile.age ? String(profile.age) : "",
          occupation: profile.occupation || "",
          monthlyIncome: profile.monthlyIncome
            ? String(profile.monthlyIncome)
            : "",
          currency: profile.currency || "INR",
          country: profile.country || "India",
          riskLevel: profile.riskLevel || "MEDIUM",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setMessage("");
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await updateProfile({
      age: formData.age ? Number(formData.age) : undefined,
      occupation: formData.occupation,
      monthlyIncome: formData.monthlyIncome
        ? Number(formData.monthlyIncome)
        : undefined,
      currency: formData.currency,
      country: formData.country,
      riskLevel: formData.riskLevel,
    });

    setMessage("Profile updated successfully");
  };

  return (
    <DashboardLayout
      title="Profile"
      subtitle="Your financial identity and risk preference"
    >
      <div className="mx-auto max-w-3xl">

        <form className="panel rounded-2xl p-8 shadow-sm hover:shadow-md transition">
          
          {/* HEADER */}
          <div className="mb-8 flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 shadow-sm">
              <UserRound size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Financial Profile
              </h2>
              <p className="text-sm text-slate-500">
                Used for dashboard + AI personalization
              </p>
            </div>
          </div>

          {loading ? (
            <p className="p-6 text-center font-bold text-slate-500">
              Loading profile...
            </p>
          ) : (
            <div className="space-y-6">

              {/* SUCCESS MESSAGE */}
              {message && (
                <div className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-bold text-teal-700 shadow-sm">
                  {message}
                </div>
              )}

              {/* GRID */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Age
                  </label>
                  <input
                    className="input-field rounded-xl border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="24"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Occupation
                  </label>
                  <input
                    className="input-field rounded-xl border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Software Developer"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Monthly Income
                  </label>
                  <input
                    className="input-field rounded-xl border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    placeholder="50000"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Currency
                  </label>
                  <input
                    className="input-field rounded-xl border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Country
                  </label>
                  <input
                    className="input-field rounded-xl border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Risk Level
                  </label>
                  <select
                    className="input-field rounded-xl border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                    name="riskLevel"
                    value={formData.riskLevel}
                    onChange={handleChange}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </select>
                </div>

              </div>

              {/* SAVE BUTTON */}
              <button
                onClick={handleSubmit}
                className="primary-btn w-full rounded-xl py-3 flex items-center justify-center gap-2 hover:scale-[1.02] transition"
                type="submit"
              >
                <Save size={18} />
                Save Profile
              </button>

            </div>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;