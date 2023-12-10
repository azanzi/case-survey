"use client";

import React from "react";
import OptionCard from "./OptionCard";

interface OptionKeyboardPrompts {
  options: string[];
  isLoading: boolean;
  countdown: number;
  onOptClick: (id: string) => any;
}

export default function OptionKeyboard({
  options,
  isLoading = false,
  countdown,
  onOptClick,
}: OptionKeyboardPrompts) {
  return (
    <div className="relative grow grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      {options.map((opt, i) => (
        <OptionCard
          onClick={() => onOptClick(opt)}
          key={i}
          value={opt}
          isLoading={isLoading}
        />
      ))}
      {isLoading && (
        <div className="absolute h-full w-full flex items-center justify-center bg-slate-100/60">
          <div className="flex items-center justify-center h-[200px] w-[200px] rounded-full bg-slate-300 shadow-xl">
            <span className="text-5xl font-light">{countdown}</span>
          </div>
        </div>
      )}
    </div>
  );
}
