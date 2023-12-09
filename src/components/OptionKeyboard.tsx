"use client";

import React from "react";
import OptionCard from "./OptionCard";

interface OptionKeyboardPrompts {
  options: string[];
  onOptClick: (id: string) => any;
}

export default function OptionKeyboard({
  options,
  onOptClick,
}: OptionKeyboardPrompts) {
  return (
    <div className="grow h-52 px-56 pb-56 pt-16 grid grid-cols-2 gap-8">
      {options.map((opt, i) => (
        <OptionCard onClick={() => onOptClick(opt)} key={i} value={opt} />
      ))}
    </div>
  );
}
