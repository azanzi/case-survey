import OptionCard from "@/components/OptionCard";
import React from "react";

type Props = {};

const SurveyPage = (props: Props) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col items-center justify-center h-52">
        <p className="font-light text-lg">Click on the option you see</p>
        <h2 className="text-5xl font-bold">old-location</h2>
      </div>
      <div className="grow h-52 px-56 pb-56 pt-16 grid grid-cols-2 gap-8">
        <OptionCard id="2" value="old-location" />
        <OptionCard id="2" value="odd-location" />
        <OptionCard id="2" value="cold-location" />
        <OptionCard id="2" value="old-nation" />
      </div>
    </div>
  );
};

export default SurveyPage;
