import { Link } from "react-router-dom";
import { ArrowLeft, ShieldAlert } from "lucide-react";

const Unauthorized = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 text-white">
      <section className="w-full max-w-lg rounded-lg border border-white/10 bg-white/10 p-8 text-center backdrop-blur">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-lg bg-red-500 text-white">
          <ShieldAlert size={32} />
        </div>

        <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-red-200">
          Access denied
        </p>

        <h1 className="mt-3 text-4xl font-black">Admin only</h1>

        <p className="mt-4 leading-7 text-white/65">
          This page is available only for admin users. Please login with an admin
          account to continue.
        </p>

        <div className="mt-7 flex justify-center gap-3">
          <Link to="/dashboard" className="secondary-btn">
            <ArrowLeft size={18} />
            Dashboard
          </Link>

          <Link to="/login" className="primary-btn">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Unauthorized;