import React from "react";

import { TableData } from "./TableData";
import { date } from "@/app/api/date";

const cartPlaces = [
  {
    place: "Palengke A",
  },
  {
    place: "Palengke B",
  },
  {
    place: "LRT Circle",
  },
  {
    place: "Sunshine",
  },
  {
    place: "Alta Tierra",
  },
];

const TableBody = ({ schedules }: { schedules: any }) => {
  const weekDates = date();

  const tableDatas = (
    <>
      <TableData schedules={schedules} currentDate={weekDates[0]} />
      <TableData schedules={schedules} currentDate={weekDates[1]} />
      <TableData schedules={schedules} currentDate={weekDates[2]} />
      <TableData schedules={schedules} currentDate={weekDates[3]} />
      <TableData schedules={schedules} currentDate={weekDates[4]} />
      <TableData schedules={schedules} currentDate={weekDates[5]} />
      <TableData schedules={schedules} currentDate={weekDates[6]} />
    </>
  );

  const tableContent = cartPlaces.map((place: any, i: any) => (
    <tr className="border-b border-gray-200 dark:border-gray-700" key={i}>
      <th
        scope="row"
        className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
      >
        {place.place}
      </th>
      {tableDatas}
    </tr>
  ));
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
      <tbody>{tableContent}</tbody>
    </>
  );
};

export default TableBody;
