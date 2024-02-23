import React from "react";

import { TableData } from "./TableData";
import { date } from "@/app/api/date";
import { place } from "@/app/api/place";

type TScheduleProps = {
  id: number;
  username: string;
  time: string;
  place: string;
  date: string;
}[];

const TableBody = ({ schedules }: { schedules: TScheduleProps }) => {
  const weekDates = date();
  const cart = place();

  const cartSchedule = cart.map(
    ({ id, place }: { id: number; place: string }): React.ReactNode => {
      const filteredSchedule = schedules.filter(
        (schedule: { place: string }) => schedule.place === place
      );

      const tableData = weekDates.map((w: string, j: number) => (
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
      <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
            Place
          </th>
          <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
            Monday <span className="text-gray-300">{weekDates[0]}</span>
          </th>
          <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
            Tuesday <span className="text-gray-300">{weekDates[1]}</span>
          </th>
          <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
            Wednesday <span className="text-gray-300">{weekDates[2]}</span>
          </th>
          <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
            Thursday <span className="text-gray-300">{weekDates[3]}</span>
          </th>
          <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
            Friday <span className="text-gray-300">{weekDates[4]}</span>
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-blue-300 bg-gray-50 dark:bg-gray-800"
          >
            Saturday <span className="text-gray-300">{weekDates[5]}</span>
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-red-500 bg-gray-50 dark:bg-gray-800"
          >
            Sunday <span className="text-gray-300">{weekDates[6]}</span>
          </th>
        </tr>
      </thead>
      <tbody>{cartSchedule}</tbody>
    </>
  );
};

export default TableBody;
