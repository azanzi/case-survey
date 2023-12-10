"use client";

import OptionKeyboard from "@/components/OptionKeyboard";
import { Skeleton } from "@/components/ui/skeleton";
import { type Task } from "@/lib/tasks";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

export default function SurveyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [task, setTask] = useState<Task>({ prompt: "", options: [] });
  const [time, setTime] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const startTS = new Date();
  startTS.setSeconds(startTS.getSeconds() + 3);

  const countdown = useTimer({
    expiryTimestamp: startTS,
    onExpire: () => startTask(),
    autoStart: false,
  });

  const flow = searchParams.get("flow");
  if (!flow) {
    return router.push("/");
  }

  const getTask = async () => {
    try {
      const { data, status } = await axios.get(`/api/survey?flow=${flow}`);
      if (status === 204) {
        return router.push("/finished");
      }
      setTask(data.task);
      let nextTS = new Date();
      nextTS.setSeconds(nextTS.getSeconds() + 3);
      countdown.restart(nextTS, true);
    } catch (error) {
      console.log(error);
    }
  };

  const recordTask = async (id: string) => {
    setStart(false);
    setShowOptions(false);
    try {
      await axios.post(`/api/survey?flow=${flow}`, {
        answer: id,
        time,
      });
      setTime(0);
      await getTask();
    } catch (error) {
      console.log(error);
    }
  };

  const startTask = () => {
    setStart(true);
    setShowOptions(true);
  };

  // initial fetch
  useEffect(() => {
    getTask();
  }, []);

  // timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | undefined = undefined;
    if (start) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [start]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col items-center justify-center h-52 border-b border-slate-300 bg-slate-200">
        <p className="font-light text-lg">Click on the option you see</p>
        <h2 className="text-5xl font-bold">{task?.prompt || ""}</h2>
      </div>
      <OptionKeyboard
        options={task.options}
        onOptClick={(id) => recordTask(id)}
        isLoading={!showOptions}
        countdown={countdown.seconds}
      />
    </div>
  );
}
