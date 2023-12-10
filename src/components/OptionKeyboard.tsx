"use client";

import React from "react";
import OptionCard from "./OptionCard";

interface OptionKeyboardPrompts {
  options: string[];
  isLoading: boolean;
  onOptClick: (id: string) => any;
}

export default function OptionKeyboard({
  options,
  isLoading = false,
  onOptClick,
}: OptionKeyboardPrompts) {
  return (
    <div className="grow grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      {options.map((opt, i) => (
        <OptionCard
          onClick={() => onOptClick(opt)}
          key={i}
          value={opt}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
