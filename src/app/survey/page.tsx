"use client";

import OptionKeyboard from "@/components/OptionKeyboard";
import { Skeleton } from "@/components/ui/skeleton";
import { type Task } from "@/lib/tasks";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SurveyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [task, setTask] = useState<Task>({ prompt: "", options: [] });
  const [time, setTime] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const flow = searchParams.get("flow");
  if (!flow) {
    return router.push("/");
  }

  const getTask = async () => {
    try {
      setIsLoading(true);
      const { data, status } = await axios.get(`/api/survey?flow=${flow}`);
      if (status === 204) {
        return router.push("/finished");
      }
      setTask(data.task);
      setStart(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const recordTask = async (id: string) => {
    setStart(false);
    setIsLoading(true);
    try {
      await axios.post(`/api/survey?flow=${flow}`, {
        answer: id,
        time,
      });
      await getTask();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

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
        {isLoading ? (
          <Skeleton className="w-[300px] lg:w-[450px] h-12 bg-white rounded-full" />
        ) : (
          <h2 className="text-5xl font-bold">{task.prompt}</h2>
        )}
      </div>
      <OptionKeyboard
        options={task.options}
        onOptClick={(id) => recordTask(id)}
        isLoading={isLoading}
      />
    </div>
  );
}
