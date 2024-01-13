import React from "react";

import { TableData } from "./TableData";

const TableBody = () => {
  return (
    <tbody>
      <tr className="border-b border-gray-200 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
        >
          Palengke A
        </th>
        <TableData />
      </tr>
      <tr className="border-b border-gray-200 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
        >
          Palengke B
        </th>
        <TableData />
      </tr>
      <tr className="border-b border-gray-200 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
        >
          LRT Circle
        </th>
        <TableData />
      </tr>
      <tr className="border-b border-gray-200 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
        >
          Sunshine
        </th>
        <TableData />
      </tr>
      <tr>
        <th
          scope="row"
          className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
        >
          Alta Tierra
        </th>
        <TableData />
        <TableData />
        <TableData />
        <TableData />
        <TableData />
        <TableData />
        <TableData />
      </tr>
    </tbody>
  );
};

export default TableBody;
