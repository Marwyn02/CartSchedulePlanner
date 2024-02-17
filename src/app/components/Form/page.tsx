"use client";

import React from "react";
import { date } from "@/app/api/date";
import { place } from "@/app/api/place";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, LinkButton } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

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
  place: z.string(),
});

export const FormPage = () => {
  const weekDates = date();
  const places = place();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      weekDays: [],
      place: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log("Values: ", values);

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
                  <Input placeholder="Enter your name here..." {...field} />
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
                    When would you like schedule your cart witnessing?
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
          {/* Place picker */}
          <FormField
            control={form.control}
            name="place"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Where you want to schedule your cart witnessing?
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
                        <FormLabel className="font-normal">{c.place}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
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
