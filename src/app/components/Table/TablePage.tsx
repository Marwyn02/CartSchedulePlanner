"use client";
import React from "react";

import TableBody from "./TableBody";
import TableHead from "./TableHead";

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
          <TableHead />
          <TableBody />
        </table>
      </div>

      <div>
        {schedules.map((s: any, i: number) => (
          <div key={i}>
            <p>{s.username}</p>
            <p>{s.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
