import type { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  tone: "teal" | "amber" | "red" | "slate";
}

const toneClasses = {
  teal: "bg-teal-50 text-teal-700",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-red-50 text-red-700",
  slate: "bg-slate-100 text-slate-700",
};

const SummaryCard = ({ title, value, icon, tone }: SummaryCardProps) => {
  return (
    <div className="panel rounded-lg p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
        </div>

        <div className={`grid h-11 w-11 place-items-center rounded-lg ${toneClasses[tone]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;