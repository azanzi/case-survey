"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface OptionCardPrompts {
  value: string;
  wrong: boolean;
  isLoading: boolean;
  onClick: () => any;
}

export default function OptionCard({
  value,
  isLoading = false,
  wrong = false,
  onClick,
}: OptionCardPrompts) {
  return (
    <div
      onClick={onClick}
      className={cn(
        isLoading
          ? "cursor-wait"
          : "hover:cursor-pointer hover:shadow-md",
        wrong ? "bg-red-500 hover:cursor-not-allowed" : "hover:bg-slate-200",
        "flex items-center justify-center rounded-lg shadow-sm border  border-slate-300  duration-150"
      )}
    >
      {isLoading ? (
        <Skeleton className="w-[300px] lg:w-[450px] h-12 bg-slate-300 rounded-full" />
      ) : (
        <h4 className="text-3xl md:text-4xl">{value}</h4>
      )}
    </div>
  );
}
