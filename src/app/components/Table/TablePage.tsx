import React from "react";

import TableBody from "./TableBody";
import TableHead from "./TableHead";

export const TablePage = () => {
  return (
    <section className="md:m-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-900">
          <TableHead />
          <TableBody />
        </table>
      </div>
    </section>
  );
};
