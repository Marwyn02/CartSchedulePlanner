"use client";

import React from "react";

const TableHead = ({ dates }: { dates: string[] }) => {
  return (
    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
          Place
        </th>
        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
          Monday <span className="text-gray-300">{dates[0]}</span>
        </th>
        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
          Tuesday <span className="text-gray-300">{dates[1]}</span>
        </th>
        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
          Wednesday <span className="text-gray-300">{dates[2]}</span>
        </th>
        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
          Thursday <span className="text-gray-300">{dates[3]}</span>
        </th>
        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
          Friday <span className="text-gray-300">{dates[4]}</span>
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-blue-300 bg-gray-50 dark:bg-gray-800"
        >
          Saturday <span className="text-gray-300">{dates[5]}</span>
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-red-500 bg-gray-50 dark:bg-gray-800"
        >
          Sunday <span className="text-gray-300">{dates[6]}</span>
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
