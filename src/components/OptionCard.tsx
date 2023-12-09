"use client";

import React from "react";

interface OptionCardPrompts {
  value: string;
  onClick: () => any;
}

export default function OptionCard({ value, onClick }: OptionCardPrompts) {
  return (
    <div onClick={onClick} className="flex items-center justify-center rounded-lg shadow-sm border hover:cursor-pointer border-slate-300 hover:bg-slate-200 hover:shadow-md duration-150">
      <h4 className="text-4xl">{value}</h4>
    </div>
  );
}
