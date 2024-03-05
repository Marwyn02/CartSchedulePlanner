import React from "react";

import { TableData } from "./TableData";
import { place } from "@/app/api/place";
import TableHead from "./TableHead";

type TScheduleProps = {
  id: number;
  place: string;
  date: string;
  time: string | null;
}[];

export const TableBody = ({
  schedules,
  days,
}: {
  schedules: TScheduleProps;
  days: string[];
}) => {
  const cart = place();

  const cartSchedule = cart.map(
    ({ id, place }: { id: number; place: string }): React.ReactNode => {
      const filteredSchedule = schedules.filter(
        (schedule: { place: string }) => schedule.place === place
      );

      const tableData = days.map((w: string, j: number) => (
        <TableData key={j} schedules={filteredSchedule} currentDate={w} />
      ));

      return (
        <tr className="border-b border-gray-200 dark:border-gray-800" key={id}>
          <th
            scope="row"
            className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
          >
            {place}
          </th>
          {tableData}
        </tr>
      );
    }
  );

  return (
    <>
      <TableHead dates={days} />
      <tbody>{cartSchedule}</tbody>
    </>
  );
};
