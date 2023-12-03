import React from "react";

interface OptionCardPrompts {
  id: string;
  value: string;
}

export default function OptionCard({ id, value }: OptionCardPrompts) {
  return (
    <div className="flex items-center justify-center rounded-lg shadow-sm border border-slate-300 hover:bg-slate-200 hover:shadow-md duration-150">
      <h4 className="text-4xl">{value}</h4>
    </div>
  );
}
