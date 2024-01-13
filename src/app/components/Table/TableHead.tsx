import React from "react";

const TableHead = () => {
  const today = new Date();
  const firstDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const lastDay = new Date(
    firstDay.getFullYear(),
    firstDay.getMonth(),
    firstDay.getDate() + 6
  );

  const datesOfWeek = [];
  for (let i = 1; i <= 7; i++) {
    const date = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth(),
      firstDay.getDate() + i
    );
    const month = date.toLocaleString("default", { month: "short" }); // Get abbreviated month name
    const day = String(date.getDate()).padStart(2, "0"); // Pad day with leading zero if needed
    const formattedDate = `${month} ${day}`;
    datesOfWeek.push(formattedDate);
  }
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
