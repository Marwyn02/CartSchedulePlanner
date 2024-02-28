"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { date } from "@/app/api/date";
import { place } from "@/app/api/place";
import { selectTime } from "@/app/api/time";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, LinkButton } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import createAppointment from "@/app/api/appointment/create";

import { IconSunMoon, IconCalendar, IconTrees } from "@tabler/icons-react";

import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Your name must be at least 3 characters.",
    })
    .max(20, {
      message: "I only accept names that don't exceed to 20 characters.",
    }),
  time: z.string().refine((value) => value !== "", {
    message: "Please select a time.",
  }),
  weekDays: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one.",
  }),
  place: z.string().refine((value) => value !== "", {
    message: "Please select a place.",
  }),
});

export const ScheduleForm = () => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const query = useSearchParams();
  const [appointmentData] = useState(
    query.get("id")
      ? {
          id: query.get("id"),
          name: query.get("name"),
          time: query.get("time"),
          place: query.get("place"),
          date: query.get("date"),
        }
      : null
  );

  const weekDates = date();
  const places = place();
  const time = selectTime();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: appointmentData ? appointmentData.name ?? "" : "",
      place: appointmentData ? appointmentData.place ?? "" : "",
      time: appointmentData ? appointmentData.time ?? "" : "",
      weekDays: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createAppointment(values);
    } catch (error) {
      console.error("Failed to create your appointment: ", error);
    }
  };

  return (
    <div className=" p-5 md:px-20 md:pb-8">
      <div className="flex justify-between items-start py-5">
        <h1 className="text-3xl md:text-4xl font-light tracking-wide">
          {query.get("id") ? "Update" : "Create"} your schedule.
        </h1>
        <LinkButton href={"/"} text="Back to home" />
      </div>
      <hr className="pb-8 border-gray-400" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Name form input  */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      "Enter your name here..." || appointmentData?.name
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Time form input */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  <span className="flex items-center gap-x-1">
                    <IconSunMoon />
                    Indicate your preferred time for cart witnessing.
                  </span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={
                      field.value !== undefined
                        ? field.value
                        : appointmentData?.time ?? ""
                    }
                    className="flex flex-col space-y-1"
                  >
                    {time.map((t) => (
                      <FormItem
                        key={t.id}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={t.time} />
                        </FormControl>
                        <FormLabel className="font-normal">{t.time}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
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
                  <FormLabel>
                    <span className="flex items-center gap-x-1">
                      <IconCalendar />
                      When would you like schedule your cart witnessing?
                    </span>
                    {query.get("id") && (
                      <p className="mt-2 text-gray-300">
                        Your last selected date is on:{" "}
                        <span className="text-blue-400 font-semibold ml-2">
                          {query.get("date")}
                        </span>
                      </p>
                    )}
                  </FormLabel>
                </div>
                {weekDates.map((days, i) => (
                  <FormField
                    key={i}
                    control={form.control}
                    name="weekDays"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={i}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(days)}
                              onCheckedChange={(checked: any) => {
                                return checked
                                  ? field.onChange([...field.value, days])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: any) => value !== days
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel
                            className={`text-sm font-normal ${
                              days === query.get("date")
                                ? "text-blue-400 font-semibold"
                                : ""
                            }`}
                          >
                            {days}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
                {query.get("id") && (
                  <p className="mt-3 text-gray-500">
                    Note: You may select again your last selected date if you
                    still wanted to schedule yourself there.
                  </p>
                )}
              </FormItem>
            )}
          />
          {/* Place picker */}
          <FormField
            control={form.control}
            name="place"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  <span className="flex items-center gap-x-1">
                    <IconTrees />
                    Where you want to schedule your cart witnessing?
                  </span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={
                      field.value !== undefined
                        ? field.value
                        : appointmentData?.place ?? ""
                    }
                    className="flex flex-col space-y-1"
                  >
                    {places.map((c) => (
                      <FormItem
                        key={c.id}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={c.place} />
                        </FormControl>
                        <FormLabel className="font-normal">{c.place}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-x-5 items-center justify-between md:justify-start">
            <Button type="submit">Create my schedule</Button>
            <Link
              href={"/"}
              className="font-medium text-sm hover:bg-gray-200 px-5 py-2 dark:hover:text-gray-800 rounded-md duration-300"
            >
              Cancel
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};