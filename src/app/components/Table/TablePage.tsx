"use client";
import React from "react";

import TableBody from "./TableBody";

type TScheduleProps = {
  id: number;
  username: string;
  time: string;
  place: string;
  date: string;
}[];

export const TablePage = ({
  appointments,
  selectedTime,
}: {
  appointments: TScheduleProps;
  selectedTime: string;
}) => {
  return (
    <section className="my-5 md:m-5">
      <p className="mt-5 px-4 text-sm font-bold pb-2 text-gray-800 uppercase dark:text-gray-200">
        {selectedTime}
      </p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-100">
          <TableBody schedules={appointments} />
        </table>
      </div>
    </section>
  );
};
