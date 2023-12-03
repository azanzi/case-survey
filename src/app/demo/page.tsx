import GetToKnowForm from "@/components/ui/GetToKnowForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React from "react";

type Props = {};

const DegmoPage = (props: Props) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold py-4">Case Survey</h1>
      </div>

      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center w-1/2">
          <h3 className="font-bold text-2xl mb-2">
            Let's get to know each other :)
          </h3>
          <GetToKnowForm />
        </div>
      </div>
    </div>
  );
};

export default DegmoPage;
