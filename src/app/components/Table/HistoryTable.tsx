import React from "react";

import { oldDate } from "@/app/api/date";
import { TableBody } from "./TableBody";

type TAppointmentProps = {
  id: number;
  date: string;
  place: string;
  time: string | null;
}[];

const HistoryTable = ({
  appointments,
  selectedTime,
}: {
  appointments: TAppointmentProps;
  selectedTime: string;
}) => {
  const weekDates: string[] = oldDate();

  return (
    <div>
      <p className="mt-5 px-4 text-sm font-bold pb-2 text-gray-800 uppercase dark:text-gray-200">
        {selectedTime}
      </p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-100">
          <TableBody schedules={appointments} days={weekDates} />
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
