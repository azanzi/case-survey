"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input";
import { Button } from "./button";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  sex: z.string().min(2).max(50),
  age: z.number().min(13).max(99),
  occupation: z.string().min(2).max(50),
  field: z.string().min(2).max(50),
  education: z.string().min(2).max(50),
});

interface Field {
  id: string;
  name: string;
}

const fieldsOfStudy: Field[] = [
  { id: "s-cs", name: "Computer Science" },
  { id: "s-eng", name: "Engineering (Mechanical, Electrical, Civil...)" },
  { id: "s-bus", name: "Business Administration" },
  { id: "s-psy", name: "Psychology" },
  { id: "s-bio", name: "Biology" },
  { id: "s-chm", name: "Chemistry" },
  { id: "s-phy", name: "Physics" },
  { id: "s-mat", name: "Mathematics" },
  { id: "s-eco", name: "Economics" },
  { id: "s-soc", name: "Sociology" },
  { id: "s-pol", name: "Political Sciences" },
  { id: "s-lit", name: "Literature" },
  { id: "s-hst", name: "History" },
  { id: "s-med", name: "Medicine" },
  { id: "s-edu", name: "Education" },
  { id: "s-oth", name: "Other :/" },
];

const fieldsOfWork: Field[] = [
  { id: "w-it", name: "Information Technology" },
  { id: "w-fin", name: "Finance" },
  { id: "w-mkt", name: "Marketing" },
  { id: "w-hlt", name: "Healthcare" },
  { id: "w-edu", name: "Education" },
  { id: "w-res", name: "Research" },
  { id: "w-art", name: "Arts & Design" },
  { id: "w-soc", name: "Social Services" },
  { id: "w-mgm", name: "Management" },
  { id: "w-law", name: "Law" },
  { id: "w-com", name: "Communication" },
  { id: "w-tor", name: "Hospitality & Tourism" },
  { id: "w-edu", name: "Education" },
  { id: "w-oth", name: "Other :/" },
];

export default function GetToKnowForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sex: "male",
      age: 18,
      occupation: "study",
      field: "",
      education: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <span className="whitespace-pre">I go by the name</span>
                  <Input className="w-56" placeholder="John Doe" {...field} />
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
                <RadioGroup>
                  <div className="flex items-center space-x-2">
                    <span>My sex is</span>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <span className="whitespace-pre">I am</span>
                  <Input type="number" className="w-20" />
                  <span className="whitespace-pre">years old</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <span className="whitespace-pre">I</span>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="occupation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="student">study</SelectItem>
                        <SelectItem value="worker">work</SelectItem>
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
                    <span className="whitespace-pre">in the field of</span>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="field" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {form.getValues().occupation === "study"
                          ? fieldsOfStudy.map((field) => (
                              <SelectItem value={field.id}>
                                {field.name}
                              </SelectItem>
                            ))
                          : fieldsOfWork.map((field) => (
                              <SelectItem value={field.id}>
                                {field.name}
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
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
                  <span className="whitespace-pre">
                    My highest degree of education is
                  </span>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-48">
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
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Iniziamo!</Button>
      </form>
    </Form>
  );
}
