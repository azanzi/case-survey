"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold py-4">Case Survey</h1>
      </div>

      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center w-1/2">
          <h3 className="font-bold text-2xl mb-2">A few simple rules</h3>
          <p className="flex-wrap">
            Regole Regole Regole Regole Regole Regole Regole Regole Regole
            Regole Regole Regole Regole Regole Regole Regole Regole Regole
            Regole Regole Regole Regole Regole Regole Regole Regole Regole
            Regole Regole Regole Regole Regole Regole Regole Regole Regole
            Regole Regole Regole Regole Regole Regole Regole Regole Regole
            Regole Regole Regole Regole Regole Regole Regole Regole Regole
            Regole Regole Regole Regole Regole Regole Regole Regole Regole
            Regole Regole Regole Regole Regole Regole Regole Regole Regole
            Regole Regole Regole Regole Regole Regole Regole Regole Regole
            Regole Regole Regole Regole
          </p>
        </div>
        <Button className="mt-6" onClick={() => router.push("/demo")}>
          Got it!
        </Button>
      </div>
    </div>
  );
}
