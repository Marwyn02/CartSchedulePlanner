"use client";

import React from "react";
import { date } from "@/app/api/date";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, LinkButton } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";

import createAppointment from "@/app/api/appointment/create";

import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Your name must be at least 2 characters.",
    })
    .max(20, {
      message: "I only accept names that don't exceed to 20 characters.",
    }),
  weekDays: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one.",
  }),
});

export const FormPage = () => {
  const weekDates = date();

  const weekDays = [
    {
      id: "1",
      day: weekDates[0],
    },
    {
      id: "2",
      day: weekDates[1],
    },
    {
      id: "3",
      day: weekDates[2],
    },
    {
      id: "4",
      day: weekDates[3],
    },
    {
      id: "5",
      day: weekDates[4],
    },
    {
      id: "6",
      day: weekDates[5],
    },
    {
      id: "7",
      day: weekDates[6],
    },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      weekDays: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createAppointment(values);
  };

  return (
    <div className=" p-5 md:px-20 md:pb-8">
      <div className="flex justify-between items-start py-5">
        <h1 className="text-3xl md:text-4xl font-light tracking-wide">
          Create an appointment.
        </h1>
        <LinkButton href={"/"} text="Back to home" />
      </div>
      <hr className="pb-8 border-gray-400" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Name form input  */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Date form picker  */}
          <FormField
            control={form.control}
            name="weekDays"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Date</FormLabel>
                </div>
                {weekDays.map((days) => (
                  <FormField
                    key={days.id}
                    control={form.control}
                    name="weekDays"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={days.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(days.day)}
                              onCheckedChange={(checked: any) => {
                                return checked
                                  ? field.onChange([...field.value, days.day])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: any) => value !== days.day
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {days.day}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
