import GetToKnowForm from "@/components/GetToKnowForm";
import React from "react";

type Props = {};

const DegmoPage = (props: Props) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold py-4">Case Survey</h1>
      </div>

      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center px-8 lg:px-48 2xl:px-96">
          <h3 className="font-bold text-2xl">
            Let's get to know each other :)
          </h3>
          <p className="border-b text-sm font-light pb-2 mb-4">This information is exclusively used for statistical analysis, no other kind of information is taken.</p>
          <GetToKnowForm />
        </div>
      </div>
    </div>
  );
};

export default DegmoPage;
