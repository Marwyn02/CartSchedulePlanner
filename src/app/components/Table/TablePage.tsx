"use client";
import React from "react";

import TableBody from "./TableBody";

type TScheduleProps = {
  schedules: {
    id: number;
    username: string;
    date: string;
  }[];
};

export const TablePage = ({
  appointments,
}: {
  appointments: TScheduleProps;
}) => {
  const { schedules } = appointments;

  return (
    <section className="my-5 md:m-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-100">
          <TableBody schedules={schedules} />
        </table>
      </div>
    </section>
  );
};
