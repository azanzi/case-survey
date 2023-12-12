"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold py-4">case-survey</h1>
      </div>

      <div className="grow flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center px-8 lg:px-48 2xl:px-96">
          <h3 className="font-bold text-2xl mb-2">First, a few simple rules</h3>
          {/* <p className="flex-wrap text-md font-light border-y py-4"> */}
          <div className="flex flex-col gap-2">
            <span>1) Read carefully the word</span>
            <span>2) Try to find the word between the options as fast as possible
            </span>
          </div>
          {/* </p> */}
        </div>
        <Button className="mt-4" onClick={() => router.push("/demo")}>
          Got it!
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
