import React from "react";

const TableHead = () => {
  const getStartOfWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const difference = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - difference);

    return startOfWeek;
  };

  const formatMonthAndDate = (date: Date) => {
    const month = date.toLocaleString("en-us", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  const getWeekDays = (startOfWeek: Date) => {
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(formatMonthAndDate(day));
    }

    return weekDays;
  };

  const startOfWeek = getStartOfWeek();
  const datesOfWeek = getWeekDays(startOfWeek);
  return (
    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
          Place
        </th>
        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
          Monday <span className="text-gray-300">{datesOfWeek[0]}</span>
        </th>
        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
          Tuesday <span className="text-gray-300">{datesOfWeek[1]}</span>
        </th>
        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
          Wednesday <span className="text-gray-300">{datesOfWeek[2]}</span>
        </th>
        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
          Thursday <span className="text-gray-300">{datesOfWeek[3]}</span>
        </th>
        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
          Friday <span className="text-gray-300">{datesOfWeek[4]}</span>
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-blue-300 bg-gray-50 dark:bg-gray-800"
        >
          Saturday <span className="text-gray-300">{datesOfWeek[5]}</span>
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-red-500 bg-gray-50 dark:bg-gray-800"
        >
          Sunday <span className="text-gray-300">{datesOfWeek[6]}</span>
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
