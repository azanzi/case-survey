"use client";

import OptionKeyboard from "@/components/OptionKeyboard";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

const COUNTDOWN = 2;

type TaskRes = {
  id: number;
  prompt: string;
  options: string[];
};

export default function SurveyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [task, setTask] = useState<TaskRes>({ id: 0, prompt: "", options: [] });
  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  const [progress, setProgress] = useState<string>("");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);


  const startTS = new Date();
  startTS.setSeconds(startTS.getSeconds() + COUNTDOWN);

  const countdown = useTimer({
    expiryTimestamp: startTS,
    onExpire: () => startTask(),
    autoStart: false,
  });

  const getTask = async () => {
    try {
      const { data, status } = await axios.get(`/api/survey?flow=${flow}`);
      if (status === 204) {
        return router.push("/finished");
      }
      setTask(data.task);
      setProgress(data.progress);
      let nextTS = new Date();
      nextTS.setSeconds(nextTS.getSeconds() + COUNTDOWN);
      countdown.restart(nextTS, true);
    } catch (error) {
      console.log(error);
    }
  };

  // initial fetch
  useEffect(() => {
    getTask();
  }, []);

  const flow = searchParams.get("flow");
  if (!flow) {
    return router.push("/");
  }

  const recordTask = async (id: string) => {
    if (!startTime) return;
    const elapsedTime = Date.now() - startTime;

    try {
      const { data } = await axios.post(`/api/survey?flow=${flow}`, {
        taskId: task.id,
        answer: id,
        time: elapsedTime,
      });
      if (data.message === "wrong") {
        setWrongAnswers((prev) => [id, ...prev]);
        return;
      }
      // setStart(false);
      setShowOptions(false);
      // setTime(0);
      await getTask();
    } catch (error) {
      console.log(error);
    }
  };

  const startTask = () => {
    setStartTime(Date.now());
    setShowOptions(true);
    // setStart(true);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col items-center justify-center h-52 border-b border-slate-300 bg-slate-200">
        <p className="font-light text-lg">Click on the option you see</p>
        <h2 className="text-4xl md:text-5xl font-bold text-center">{task?.prompt || ""}</h2>
        <span className="text-light mt-2">{progress}</span>
      </div>
      <OptionKeyboard
        options={task.options}
        wrong={wrongAnswers}
        onOptClick={(id) => recordTask(id)}
        isLoading={!showOptions}
        countdown={countdown.seconds}
      />
    </div>
  );
}
