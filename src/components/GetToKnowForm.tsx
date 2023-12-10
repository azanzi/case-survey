"use client";

import React, { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { fieldsOfStudy, fieldsOfWork } from "@/lib/options";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2, Play } from "lucide-react";

enum Sex {
  Male = "male",
  Female = "female",
}

enum Occupation {
  Student = "study",
  Worker = "work",
}

enum Usage {
  Low = "low",
  Medium = "medium",
  High = "high",
  VeryHigh = "very-uhigh",
}

enum UseAtWork {
  Yes = "true",
  No = "false",
}

const formSchema = z.object({
  sex: z.nativeEnum(Sex, { required_error: "Mandatory" }),
  age: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Must be a number",
  }),
  occupation: z.nativeEnum(Occupation, { required_error: "Mandatory" }),
  field: z.string().min(1, { message: "Mandatory" }),
  education: z.string().min(1, { message: "Mandatory" }),
  usage: z.nativeEnum(Usage, { required_error: "Mandatory" }),
  workplace: z.nativeEnum(UseAtWork, { required_error: "Mandatory" }),
});

export default function GetToKnowForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sex: Sex.Male,
      age: "21",
      occupation: Occupation.Student,
      field: "",
      education: "",
      usage: Usage.Low,
      workplace: UseAtWork.Yes,
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/flow", values);
      router.push(`/survey?flow=${data.flow}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 lg:space-y-4">
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <span className="whitespace-pre hidden lg:block">
                      I am a
                    </span>
                    <span className="whitespace-pre lg:hidden">Age:</span>
                    <Input className="w-20" {...field} />
                    <span className="whitespace-pre hidden lg:block">
                      year old
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <span className="whitespace-pre lg:hidden">Sex:</span>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-24 min-w-fit">
                          <SelectValue placeholder="sex" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Sex.Male}>male</SelectItem>
                        <SelectItem value={Sex.Female}>female</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="whitespace-pre hidden lg:block">.</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <span className="whitespace-pre hidden lg:block">
                      At the moment I am
                    </span>
                    <span className="whitespace-pre lg:hidden">
                      Occupation:
                    </span>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-fit min-w-28">
                          <SelectValue placeholder="occupation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Occupation.Student}>
                          studying
                        </SelectItem>
                        <SelectItem value={Occupation.Worker}>
                          working
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="field"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <span className="whitespace-pre hidden lg:block">
                      in the field of
                    </span>
                    <span className="whitespace-pre lg:hidden">Field:</span>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-fit min-w-[140px]">
                          <SelectValue placeholder="Select a field" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {form.getValues().occupation === "study"
                          ? fieldsOfStudy.map((field) => (
                              <SelectItem key={field.id} value={field.id}>
                                {field.name}
                              </SelectItem>
                            ))
                          : fieldsOfWork.map((field) => (
                              <SelectItem key={field.id} value={field.id}>
                                {field.name}
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                    <span className="whitespace-pre hidden lg:block">.</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="education"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <span className="whitespace-pre hidden lg:block">
                    My highest degree of education is a
                  </span>
                  <span className="whitespace-pre lg:hidden">Education:</span>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-fit min-w-[150px]">
                        <SelectValue placeholder="Select an education" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="high-school">
                        High School Diploma
                      </SelectItem>
                      <SelectItem value="bachelor">
                        Bachelor's Degree
                      </SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">Doctorate</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="whitespace-pre hidden lg:block">.</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-wrap gap-2">
          <FormField
            control={form.control}
            name="usage"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <span className="whitespace-pre hidden lg:block">
                      Throughout the day I use electronic devices
                    </span>
                    <span className="whitespace-pre lg:hidden">
                      Daily electronics usage:
                    </span>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-28 min-w-fit">
                          <SelectValue placeholder="occupation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Usage.Low}>&lt; 1 hour</SelectItem>
                        <SelectItem value={Usage.Medium}>
                          1 - 3 hours
                        </SelectItem>
                        <SelectItem value={Usage.High}>3 - 5 hours</SelectItem>
                        <SelectItem value={Usage.VeryHigh}>
                          &gt; 5 hours
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="whitespace-pre hidden lg:block">,</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workplace"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <span className="whitespace-pre hidden lg:block">
                      I also
                    </span>
                    <span className="whitespace-pre lg:hidden">Electronics usage at work</span>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-fit min-w-[120px]">
                          <SelectValue placeholder="Select a field" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UseAtWork.Yes}>use</SelectItem>
                        <SelectItem value={UseAtWork.No}>don't use</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="whitespace-pre hidden lg:block">
                      them at my workplace.
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-center mt-4 border-t p-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Let's get started! <Play className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
