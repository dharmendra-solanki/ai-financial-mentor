import type { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  tone: "teal" | "amber" | "red" | "slate";
}

const toneClasses = {
  teal: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    glow: "shadow-teal-200",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    glow: "shadow-amber-200",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-700",
    glow: "shadow-red-200",
  },
  slate: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    glow: "shadow-slate-200",
  },
};

const SummaryCard = ({ title, value, icon, tone }: SummaryCardProps) => {
  return (
    <div
      className={`
        panel rounded-xl p-5 transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        ${toneClasses[tone].glow}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left Content */}
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
        </div>

        {/* Icon Box */}
        <div
          className={`
            grid h-12 w-12 place-items-center rounded-xl
            ${toneClasses[tone].bg}
            ${toneClasses[tone].text}
            transition-transform duration-300
            group-hover:scale-110
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
