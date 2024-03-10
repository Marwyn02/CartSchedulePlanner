"use client";

import React, { useState } from "react";
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
import updateAppointment from "@/app/api/appointment/update";
import deleteAppointment from "@/app/api/appointment/delete";

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
  updateWeekDays: z
    .string()
    .nullable()
    .refine((value) => value !== "", {
      message: "Please select a date.",
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
          userId: query.get("userId"),
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
      updateWeekDays: appointmentData ? appointmentData.date ?? "" : null,
      weekDays: appointmentData ? [appointmentData?.date ?? ""] : [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const id = query.get("id");
    const userId = query.get("userId");

    try {
      if (id && userId) {
        await updateAppointment(parseInt(id, 10), parseInt(userId, 10), values);
      } else {
        await createAppointment(values);
      }
    } catch (error) {
      console.error("Failed to create your appointment: ", error);
    }
  };

  const onDelete = async () => {
    const id = query.get("id");
    const userId = query.get("userId");

    try {
      if (id && userId) {
        await deleteAppointment(parseInt(id, 10), parseInt(userId, 10));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="p-5 md:px-20 md:pb-8">
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
                      disabled={query.get("id") ? true : false}
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
                          <FormLabel className="font-normal">
                            {t.time}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Date form picker  */}
            {!query.get("id") ? (
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
                              <FormLabel className="text-sm font-normal">
                                {days}
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
            ) : (
              <FormField
                control={form.control}
                name="updateWeekDays"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      <span className="flex items-center gap-x-1">
                        <IconCalendar />
                        When would you like schedule your cart witnessing?
                      </span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value || undefined}
                        className="flex flex-col space-y-1"
                      >
                        {weekDates.map((days, i) => (
                          <FormItem
                            key={i}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={days} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {days}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
                      defaultValue={field.value}
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
                          <FormLabel className="font-normal">
                            {c.place}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Create and Cancel button  */}
            <div className="flex gap-x-5 items-center justify-between md:justify-start">
              <Button type="submit">
                {query.get("id") ? "Update" : "Create"} my schedule
              </Button>

              <LinkButton href={"/"} text="Cancel" />
            </div>
          </form>
        </Form>
      </div>
      {query.get("id") && (
        <div className="flex justify-between items-center py-2.5 px-5 mt-3 bg-red-500 w-full">
          <p className="text-sm font-semibold text-white">
            Do you want to delete your appointment?
          </p>
          <button
            onClick={onDelete}
            className="text-xs text-white md:text-normal font-semibold px-4 md:px-5 py-1.5 md:py-2 rounded-lg hover:bg-gray-200 hover:text-gray-800 duration-300"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};
