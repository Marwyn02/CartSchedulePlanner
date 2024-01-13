"use client";
import { useState } from "react";
import { DatePicker } from "@mantine/dates";

export const CalendarPage = () => {
  const [value, setValue] = useState<Date | null>(null);

  console.log(value);

  return (
    <section className="flex justify-center mt-5">
      <DatePicker value={value} onChange={setValue} />
    </section>
  );
};
