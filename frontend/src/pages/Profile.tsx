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
      subtitle="Set your financial identity, income baseline, and risk comfort."
    >
      <div className="mx-auto max-w-3xl">
        <form onSubmit={handleSubmit} className="panel rounded-lg p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-slate-100 text-slate-700">
              <UserRound size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Financial Profile
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Used by dashboard and AI mentor context
              </p>
            </div>
          </div>

          {loading ? (
            <p className="p-6 text-center font-bold text-slate-500">
              Loading profile...
            </p>
          ) : (
            <div className="space-y-5">
              {message && (
                <div className="rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-bold text-teal-700">
                  {message}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Age
                  </label>
                  <input
                    className="input-field"
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
                    className="input-field"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Software Developer"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Monthly Income
                  </label>
                  <input
                    className="input-field"
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
                    className="input-field"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    placeholder="INR"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Country
                  </label>
                  <input
                    className="input-field"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="India"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Risk Level
                  </label>
                  <select
                    className="input-field"
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

              <button className="primary-btn" type="submit">
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